<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 13-11-14
  Time: 上午10:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <title>继续教育在线考试系统</title>
    <link href="static/jslib/ext-4.2/resources/css/ext-all-neptune.css" rel="stylesheet"/>
    <link href="static/css/main.css" rel="stylesheet"/>
    <link href="static/css/xwq_exam_main.css" rel="stylesheet"/>
    <link href="static/css/images/yg-logo32.jpg" rel="shortcut icon">
    <script src="static/jslib/ext-4.2/ext-all.js"></script>
    <script src="static/jslib/ext-4.2/locale/ext-lang-zh_CN.js"></script>
    <style>
        h3{
            color: rgba(11, 12, 12, 0.99);/*字体颜色黑色*/
        }
    </style>
    <script>
        var opt_flag = false;
        var check_sckt_flag = false;
        var check_yk_flag = false;
        //定时刷新任务列表
        Ext.define('Exam', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id'},
                {name: 'name'},
                {name: 'sex'},
                {name: 'education'},
                {name: 'card'},
                {name: 'address'},
                {name: 'workunit'},
                {name: 'drvschool'},
                {name: 'lictype'},
                {name: 'licdt'},
                {name: 'applytp'},
                {name: 'qulfnum'},
                {name: 'licmd'},
                {name: 'checklist1'},
                {name: 'checklist2'},
                {name: 'checklist3'},
                {name: 'checklist4'},
                {name: 'checklist5'},
                {name: 'promise'},
                {name: 'photo'},
                {name: 'status'},
                {name: 'scores'},
                {name: 'result'},
                {name: 'remark'},
                {name: 'qtbh'},
                {name: 'ks_status'},
                {name: 'list'},
                {name: 'right'},
                {name: 'wrong'},
                {name: 'no'}
            ]
        });

        var sdata = Ext.create('Ext.data.Store', {
            model: 'Exam',
            proxy: {
                type: 'ajax',
                url: 'obtain_infocheck',
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'list'
                }
            },
            autoLoad: false
        });

    </script>
    <script type="text/javascript" src="static/app/app_exam.js"></script>
    <script type="text/javascript" src="static/xtemplate/main_exam.js"></script>
    <script src="static/jslib/jquery-2.1.1.js"></script>
    <script src="static/jslib/sweetalert/lib/sweet-alert.min.js"></script>
    <link type="text/css" rel="stylesheet" href="static/jslib/sweetalert/lib/sweet-alert.css">
    <script>
        //处理考试倒计时事件
        var maxtime = 5;//半个小时，按秒计算，自己调整!
        var timer;
        function CountDown() {

            console.log(maxtime);
            if (maxtime >= 0) {
                var minutes = Math.floor(maxtime / 60);
                var seconds = Math.floor(maxtime % 60);
                var msg = "距考试开始:" + minutes + "分" + seconds + "秒";
                document.all["exam_status_span"].innerHTML = msg;

                --maxtime;
            }
            else {
                 opt_flag = true;
                clearInterval(timer);
                document.all["exam_status_span"].innerHTML = "<h3>开始考试！</h3>";
            }
        };
        timer = setInterval("CountDown()", 1000);
        console.log(maxtime);
    </script>
</head>
<body>
<div id="container"></div>
</body>
</html>
