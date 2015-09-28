<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 13-11-14
  Time: 上午10:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>继续教育在线考试系统</title>
    <link rel="stylesheet" type="text/css" href="static/jslib/ext-4.2/resources/css/ext-all.css"/>
    <link rel="stylesheet" type="text/css" href="static/css/main.css"/>
    <link rel="stylesheet" type="text/css" href="static/css/xwq_exam_main.css"/>
    <link href="static/css/images/yg-logo32.jpg" rel="shortcut icon">
    <script type="text/javascript" src="static/jslib/ext-4.2/ext-all.js"></script>
    <script type="text/javascript" src="static/jslib/ext-4.2/locale/ext-lang-zh_CN.js"></script>
    <script>
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
    <script type="text/javascript" src="static/xtemplate/main_exam_score.js"></script>
</head>
<body>
<div id="container"></div>
</body>
</html>