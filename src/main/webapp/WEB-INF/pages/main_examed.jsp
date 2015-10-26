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
    <title>武威运管继续教育在线考试系统</title>
    <!-- 引入Font Awesome的css文件 -->
    <link type="text/css" rel="stylesheet" href="static/css/css/font-awesome.css">
    <link type="text/css" rel="stylesheet" href="static/css/css/module.css">
    <script src="static/jslib/sweetalert/lib/sweet-alert.min.js"></script>
    <link type="text/css" rel="stylesheet" href="static/jslib/sweetalert/lib/sweet-alert.css">
    <style>
        * {
            font-family: '微软雅黑';
        }
	
	.a_has_answer{
		background-color: #38ad5a;
		color: #fff;
		font-weight: bold;
	}

        fieldset {
            margin: 16px;
            border: none;
            border-radius: 3px;
        }

        fieldset legend {
            font-weight: bold;
            font-size: 14px;
        }

        fieldset span {
            display: table;
            width: 100%;
            border-collapse: collapse;
        }

        fieldset {
            padding: 1em;
        }

        fieldset span span {
            display: table-cell;
            width: 5%;
            text-align: center;
            border-collapse: collapse;
            padding: 0.3em;
        }

        fieldset span a {
            border: 1px solid #C7CCD1;
            border-radius: 4px;
            padding: 0.6em 0;
            display: block;
            transition: all 0.3s;
            color: black;
        }

        fieldset span a:hover {
            background-color: gray;
        }

        table {
            width: 96%;
            margin: 10px auto;
        }

        table td {
            border: 1px solid #cccccc;
            margin: 9px;
            padding: 8px;
            width: 5%;
            text-align: center;
        }

        button {
            border-radius: 3px;
            width: 60px;
            height: 36px;
            font-size: 18px;
            margin: 0 10px;
        }

        .trainer_table td {
            text-align: left;
        }

        .xwq_btn {
            color: #38AD5A;
            background-color: #ffffff;
            display: inline-block;
            text-align: center;
            padding: 3px 10px;
            margin: 0 20px 16px 0;
            font-size: 14px;
            border: 1px solid #38AD5A;
            border-radius: 12px;
            text-decoration: none;
        }

        .xwq_btn:hover {
            cursor: hand;
            color: #ffffff;
            border: 1px solid #38AD5A;
            background-color: #38AD5A;
            text-decoration: none;
        }

        .black_overlay {
            display: none;
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;
            background-color: gray;
            z-index: 1001;
            -moz-opacity: 0.8;
            opacity: .80;
            filter: alpha(opacity=30);
        }

        .white_content {
            display: none;
            position: absolute;
            top: 25%;
            left: 25%;
            width: 50%;
            height: 50%;
            padding: 16px;
            border: 1px solid orange;
            border-radius: 5px;
            background-color: white;
            z-index: 1002;
            overflow: auto;
            margin: 0 auto;
        }

        h2 {
            color: #38AD5A;
        }

        #light div {
            margin: 20px auto;
            width: 200px;
            text-align: center;
            border: 1px solid #fdb811;
            border-radius: 5px;
            padding: 10px;
        }

        #light div a, #light div h2 {
            color: inherit;
        }

        #light div:hover {
            background-color: #fdb811;
            border: #fff;
        }
    </style>
    <link rel="stylesheet" href="static/jslib/ext-4.2/resources/css/ext-all.css"/>
    <link rel="stylesheet" href="static/css/main.css"/>
    <link rel="stylesheet" href="static/css/xwq_exam_main.css"/>
    <link href="static/css/images/yg-logo32.jpg" rel="shortcut icon">
    <script src="static/jslib/ext-4.2/ext-all.js"></script>
    <script src="static/jslib/ext-4.2/locale/ext-lang-zh_CN.js"></script>
    <script src="static/xtemplate/main_examed.js"></script>
    <script>
        var b_result = false;
        var b_begin = true;
        var s_card = "";
        var s_qtbh = "";
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



        Ext.define('Questions', {
            extend: 'Ext.data.Model',
            fields: ['id',
                'qtbh',
                 'xh',
                'qtnum',
                'question',
                'type',
                'qt_a',
                'qt_b',
                'qt_c',
                'qt_d',
                'answer',
                'score',
                'remark']
        });

        var st_questions = Ext.create('Ext.data.Store', {
            model: 'Questions',
            proxy: {
                type: 'ajax',
                url: 'obtain_questions_list_info',
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


        Ext.define('train_img', {
            extend: 'Ext.data.Model',
            fields: [
                'img1',
                'img2',
                'img3']
        });

        var st_train_img = Ext.create('Ext.data.Store', {
            model: 'train_img',
            proxy: {
                type: 'ajax',
                url: 'obtain_train_img_info',
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

        function  check_exams_stat(){
            Ext.Ajax.request({
                method: "POST",
                url:'check_wj_trainer_info',
                success: function (response,opts) {
                    var obj=Ext.decode(response.responseText);
                    if(obj.success)
                    {
                        Ext.Ajax.request({
                            method: "POST",
                            url:'obtain_check_exams_info',
                            success: function (response,opts) {
                                var obj=Ext.decode(response.responseText);
                                if(!obj.success){
                                    swal({
                                        title: "信息提示",
                                        text: "您已提交成绩，无法再次考试！",
                                        type: "warning",
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "OK ",
                                        closeOnConfirm: false
                                    }, function (isConfirm) {
                                        if (isConfirm) {
                                            document.location.href="https://www.wwyg.com:8443/jxyj/";
                                        }else{
                                            document.location.href="https://www.wwyg.com:8443/jxyj/";
                                        }
                                    });
                                }
                            },
                            failure: function () {
                                Ext.Msg.alert("提示", "联系系统管理员，检查考生状态！");
                            }
                        });
                    }else{
                        swal({
                            title: "信息提示",
                            text: "您存在违纪行为！",
                            type: "warning",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "OK ",
                            closeOnConfirm: false
                        }, function (isConfirm) {
                            if (isConfirm) {
                                document.location.href="https://www.wwyg.com:8443/jxjy/";
                            }else{
                                document.location.href="https://www.wwyg.com:8443/jxjy/";
                            }
                        });
                    }
                },
                failure: function () {
                    Ext.Msg.alert("提示", "联系系统管理员，检查考生状态！");
                }
            });

        }

        function changeQuest(id) {

            sdata.load({
                callback: function (records, operation, success) {
                    if (success) {
                        var myarray = new Array();
                        for (var i = 0; i < sdata.getCount(); i++) {
                            myarray[i] = sdata.getAt(i).getData();
                        }
                        if (id == 1 && b_begin==true) {
                            b_begin=false;
                            var panel_exam_room_tpl = Ext.getCmp('e_exam_room');
                            panel_exam_room_tpl.tpl = Ext.create('Ext.XTemplate', panel_exam_room_tpl.e_exam_room_tpl);
                            panel_exam_room_tpl.tpl.overwrite(panel_exam_room_tpl.body, myarray[0]);

                            var panel_exam_man_tpl = Ext.getCmp('e_exam_man');
                            panel_exam_man_tpl.tpl = Ext.create('Ext.XTemplate', panel_exam_man_tpl.e_exam_man_tpl);
                            panel_exam_man_tpl.tpl.overwrite(panel_exam_man_tpl.body, myarray[0]);


                            var panel_status_tpl = Ext.getCmp('e_status_tpl_id');
                            panel_status_tpl.tpl = Ext.create('Ext.XTemplate', panel_status_tpl.e_status_tpl);
                            panel_status_tpl.tpl.overwrite(panel_status_tpl.body, {});


                        }
                        sdata.each(function (exam) {
                            s_qtbh = exam.get('qtbh');
                            s_card = exam.get('card');
                            st_questions.load({
                                params: {
                                    qtbh: s_qtbh,
                                    qtnum: id
                                },
                                callback: function (records, operation, success) {
                                    if (success) {
                                        var myarray = new Array();
                                        for (var i = 0; i < st_questions.getCount(); i++) {
                                            myarray[i] = st_questions.getAt(i).getData();
                                        }

                                        var panel_tpl = Ext.getCmp('questions_tpl_id');
                                        panel_tpl.tpl = Ext.create('Ext.XTemplate', panel_tpl.questions_tpl);
                                        panel_tpl.tpl.overwrite(panel_tpl.body, myarray[0]);
                                    }
                                }
                            });
                        });


                    }
                }
            });

        } ;


        //提交
        function obt_answers_insert(qtbh) {
            if (b_result) {
                document.getElementById('light').style.display = 'block';
                document.getElementById('fade').style.display = 'block';
                javascript:window.history.forward(1);
            }

            if (b_result) {

                Ext.Msg.alert("提示", "已提交，不能重复提交！");
                return;
            }
            Ext.Ajax.request({
                method: "POST",
                url:'check_wj_trainer_info',
                success: function (response,opts) {
                    var obj=Ext.decode(response.responseText);
                    if(obj.success)
                    {
                        var result = '';
                        var storage = window.localStorage;
                        for (var i = 0; i < storage.length; i++) {
                            var answer;
                            if (storage.getItem(storage.key(i)) != null) {
                                answer = storage.getItem(storage.key(i));
                            } else {
                                answer = "X";
                            }
                            result = result + storage.key(i) + ',' + answer + ','
                        }

                        document.getElementById('fade').style.display = 'block';
                        Ext.Ajax.request({
                            method: "POST",
                            params: {
                                admbh: s_card,
                                qtbh: s_qtbh,
                                qtnum: 1,
                                answer: result
                            },
                            url: 'add_answers_info',
                            waitMsg: '正在计算成绩，请等待...',
                            success: function () {
                                localStorage.clear();
                                b_result = true;
                                document.location.href = "score";
                            },
                            failure: function () {
                            }
                        });
                    }else{
                        localStorage.clear();
                        swal({
                            title: "信息提示",
                            text: "您存在违纪行为！",
                            type: "warning",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "OK ",
                            closeOnConfirm: false
                        }, function (isConfirm) {
                            if (isConfirm) {
                                document.location.href="https://www.wwyg.com:8443/jxjy/";
                            }else{
                                document.location.href="https://www.wwyg.com:8443/jxjy/";
                            }
                        });
                    }
                },
                failure: function () {
                    Ext.Msg.alert("提示", "联系系统管理员，检查考生状态！");
                }
            });

        };

        //处理考试倒计时事件
        var maxtime = 3000;//半个小时，按秒计算，自己调整!
        var timer;
        function CountDown() {
            if (maxtime >= 0) {

                var minutes = Math.floor(maxtime / 60);
                var seconds = Math.floor(maxtime % 60);
                var msg = "距考试结束:" + minutes + "分" + seconds + "秒";
                if (minutes == 40 && seconds == 50){
                    var videoElement = document.getElementById('user-media');
                    var canvasObj = document.getElementById('canvas1');
                    var context1 = canvasObj.getContext('2d');
                    context1.fillStyle = "#ffffff";
                    context1.fillRect(0, 0, 300, 200);
                    context1.drawImage(videoElement, 0, 0, 300, 200);

                    //上传图片
                    var imgstr = document.getElementById('canvas1').toDataURL();
                    imgstr = encodeURIComponent(imgstr);

                    $.ajax({
                        type: "POST",
                        url: "upload_phote",
                        data: {
                            "img": imgstr,
                            "id_card": document.getElementById("trainer_table").getAttribute("data_card"),
                            "num": '1'
                        },
                        success: function (msg) {

                        }
                    });
                };

                if (minutes == 30 && seconds == 30){
                    var videoElement = document.getElementById('user-media');
                    var canvasObj = document.getElementById('canvas2');
                    var context1 = canvasObj.getContext('2d');
                    context1.fillStyle = "#ffffff";
                    context1.fillRect(0, 0, 300, 200);
                    context1.drawImage(videoElement, 0, 0, 300, 200);


                    //上传图片
                    var imgstr = document.getElementById('canvas2').toDataURL();
                    imgstr = encodeURIComponent(imgstr);

                    $.ajax({
                        type: "POST",
                        url: "upload_phote",
                        data: {
                            "img": imgstr,
                            "id_card": document.getElementById("trainer_table").getAttribute("data_card"),
                            "num": '2'
                        },
                        success: function (msg) {

                        }
                    });
                };

                if (minutes == 20 && seconds == 10){
                    var videoElement = document.getElementById('user-media');
                    var canvasObj = document.getElementById('canvas3');
                    var context1 = canvasObj.getContext('2d');
                    context1.fillStyle = "#ffffff";
                    context1.fillRect(0, 0, 300, 200);
                    context1.drawImage(videoElement, 0, 0, 300, 200);

                    //上传图片
                    var imgstr = document.getElementById('canvas3').toDataURL();
                    imgstr = encodeURIComponent(imgstr);

                    $.ajax({
                        type: "POST",
                        url: "upload_phote",
                        data: {
                            "img": imgstr,
                            "id_card": document.getElementById("trainer_table").getAttribute("data_card"),
                            "num": '3'
                        },
                        success: function (msg) {

                        }
                    });
                };

                document.all["timer"].innerHTML = msg;
                --maxtime;
            }
            else {
                clearInterval(timer);
                swal({
                    title: "信息提示",
                    text: "时间到，考试结束!!",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK ",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        obt_answers_insert('{card}', '{qtbh}');
                    } else {
                        swal("信息提示！", "保存失败。", "error");
                    }
                });
            }
        };
        timer = setInterval("CountDown()", 1000);


        function obt_answers_last(num) {
            if (num > 1) {
                changeQuest(num - 1);
            }
        };

        function obt_answers_next(num) {
            if (num < 100) {
                changeQuest(Number(num) + 1);
            }
        };


        function obt_answer(answer) {
            if (b_result) {
                Ext.Msg.alert("提示", "已提交，无法修改！");
                return;
            }
            var num = document.getElementById("question_id").getAttribute("data_x");
            document.getElementById("e_status_a_" + num).innerText = num.toString() + " (" + answer + ")";
            document.getElementById("e_status_a_" + num).className = 'a_has_answer';
            localStorage.setItem(num, answer);
        };


        //定义键盘事件
        function getKey(e) {
            e = e || window.event;
            var keycode = e.which ? e.which : e.keyCode;
            if (keycode == 191) { //如果按下ENTER键
                //在这里设置你想绑定的事件
            }
        }
        ;

        // 把keyup事件绑定到document中
        function listenKey() {
            if (document.addEventListener) {
                document.addEventListener("keyup", getKey, false);
            } else if (document.attachEvent) {
                document.attachEvent("onkeyup", getKey);
            } else {
                document.onkeyup = getKey;
            }
        } ;


        var storage = window.localStorage;
        Ext.onReady(function () {

            new Ext.Viewport({
                layout: 'border',
                items: [
                    {
                        region: 'north',
                        html: '<h1 align="center" style="margin: 0.5em auto;">继续教育考试</h1>',
                        border: false,
                        height: 50
                    },
                    {
                        region: 'center',
                        border: false,
                        layout: 'border',
                        items: [
                            {
                                region: 'west',
                                width: 300,
                                border: false,
                                html: 'info',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                    pack: 'start'
                                },
                                items: [
                                    {
                                        id: 'e_exam_room',
                                        title: '驾校',
                                        height: 80,
                                        e_exam_room_tpl: [
                                            '<h2 style="margin: 1em">{drvschool}</h2>'
                                        ],
                                        listeners: {
                                            afterrender: function (this_) {
                                                var panel_tpl = Ext.getCmp('e_exam_room');
                                                panel_tpl.tpl = Ext.create('Ext.XTemplate', this_.e_exam_room_tpl);
                                                panel_tpl.tpl.overwrite(panel_tpl.body, {});
                                            }
                                        }
                                    },
                                    {
                                        id: 'e_exam_man',
                                        title: '考生信息',
                                        flex: 1,
                                        scrollable: true,
                                        e_exam_man_tpl: [
                                            '<div style="margin: 0;">',
                                            '<table class="trainer_table" style="text-align:left;" id="trainer_table" data_card={card}>',
                                            '<tr>',
                                            '<td>考生姓名:</td>',
                                            '<td>{name}</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>性别:</td>',
                                            '<td>{sex}</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>身份证</td>',
                                            '<td>{card}</td>',
                                            '</tr>',
//                                            '<tr>',
//                                            '<td>资格类别</td>',
//                                            '<td>{licmd}</td>',
//                                            '</tr>',
                                            '<tr>',
                                            '<td colspan="2" style="padding: 0;text-align: center"><img src="static/upload/{photo}" style="margin: 2px; height: 120px;border: none;"/></td>',
                                            '</tr>',
                                            '</table>',
                                            '</div>'
                                        ],
                                        listeners: {
                                            afterrender: function (this_) {
                                                var panel_tpl = Ext.getCmp('e_exam_man');
                                                panel_tpl.tpl = Ext.create('Ext.XTemplate', this_.e_exam_man_tpl);
                                                panel_tpl.tpl.overwrite(panel_tpl.body, {});
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                region: 'center',
                                id: 'questions_tpl_id',
                                title: '考试题目',
                                autoScroll: true,
                                questions_tpl: [
                                    '<fieldset>' +
                                    '<form id="questions_form" action="add_answers_info" method="post">',
                                    '<p style="font-size: 16px;" data_x = "{xh}"><span id="question_id" data_x = "{xh}"></span>' +
                                    '{xh}、{question}</p>',
                                    '<br/><br/>',
                                    '<p>A、{qt_a}</p>',
                                    '<br/>',
                                    '<p>B、{qt_b}</p>',
                                    '<br/>',
                                    '<p>C、{qt_c}</p>',
                                    '<br/>',
                                    '<p>D、{qt_d}</p>',
                                    '<div style="margin: 1em 0;">请选择答案：</div>',
                                    '<div>',
                                    '<a href="#" class="xwq_btn" onclick="obt_answer(\'A\')"> A </a>',
                                    '<a href="#" class="xwq_btn" onclick="obt_answer(\'B\')"> B </a>',
                                    '<a href="#" class="xwq_btn" onclick="obt_answer(\'C\')"> C </a>',
                                    '<a href="#" class="xwq_btn" onclick="obt_answer(\'D\')"> D </a>',
                                    '</div>',
                                    '<div style="width:300px; margin: 10px auto">',
                                    '<a href="#" onclick="obt_answers_last(\'{xh}\')" class="xwq_btn"><i class="fa fa-hand-o-left"></i>&nbsp;上一题</a>',
                                    '<a href="#" onclick="obt_answers_next(\'{xh}\')" class="xwq_btn"><i class="fa fa-hand-o-right"></i>&nbsp;下一题</a>',
                                    '<a href="#" onclick="obt_answers_insert(\'{qtbh}\');" class="xwq_btn"><i class="fa fa-bus"></i>&nbsp;交卷</a>',
                                    '</div>',
                                    '</div>',
                                    '</fieldset>'
                                ],
                                listeners: {
                                    afterrender: function (this_) {
                                        var panel_tpl = Ext.getCmp('questions_tpl_id');
                                        panel_tpl.tpl = Ext.create('Ext.XTemplate', this_.questions_tpl);
                                        panel_tpl.tpl.overwrite(panel_tpl.body, changeQuest(1));
                                    }
                                },
                                html: 'quest'
                            },
                            {

                                region: 'east',
                                width: 300,
                                border: false,
                                html: '提示',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                    pack: 'start'
                                },
                                items: [
                                    {
                                        title: '摄像头',
                                        html: '<video style="width: 100%;" id="user-media" autoplay></video>',
                                        height: 200,
                                        listeners: {
                                            afterrender: function () {
                                                var num = 0;
                                                var b_start = 0;
                                                // Do the vendor prefix dance
                                                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                                                        navigator.mozGetUserMedia || navigator.msGetUserMedia;

                                                // Set up an error handler on the callback
                                                var errCallback = function (e) {
                                                    console.log('Did you just reject me?!', e);
                                                };

                                                // Request the user's media
                                                function requestMedia() {
                                                    //e.preventDefault();

                                                    // Use the vendor prefixed getUserMedia we set up above and request just video
                                                    navigator.getUserMedia({
                                                        video: true,
                                                        audio: false
                                                    }, showMedia, errCallback);
                                                };

                                                var localStream;
                                                // Actually show the media
                                                function showMedia(stream) {
                                                    var video = document.getElementById('user-media');
                                                    video.src = window.URL.createObjectURL(stream);

                                                    //localStream.stop()可以关闭调用的摄像头 然后设置localStream = null
                                                    localStream = stream;
                                                    video.onloadedmetadata = function (e) {
                                                        console.log('Locked and loaded.');
                                                    };
                                                };

                                                requestMedia();
                                            }
                                        }
                                    },
                                    {
                                        id: 'e_exam_phone',
                                        border: false,
                                        title: '照片',
                                        scrollable: true,
                                        flex: 1,
                                        e_exam_phone_tpl: [
                                            '<canvas id="canvas1" style="width: 80px; "></canvas>',
                                            '<canvas id="canvas2" style="width: 80px; "></canvas>',
                                            '<canvas id="canvas3" style="width: 80px; "></canvas>'
                                        ],
                                        listeners: {
                                            afterrender: function (this_) {
                                                var panel_tpl = Ext.getCmp('e_exam_phone');
                                                panel_tpl.tpl = Ext.create('Ext.XTemplate', this_.e_exam_phone_tpl);
                                                panel_tpl.tpl.overwrite(panel_tpl.body, {});
                                            }
                                        }
                                    },
                                    {
                                        id: 'e_exam_time',
                                        title: '剩余时间',
                                        height: 120,
                                        e_exam_time_tpl: [
                                            '<fieldset>' +
                                            '<div id="timer" style="color:red;font-size:16px; margin: 10px 20px;"></div>',
                                            '</fieldset>'
                                        ],
                                        listeners: {
                                            afterrender: function (this_) {
                                                var panel_tpl = Ext.getCmp('e_exam_time');
                                                panel_tpl.tpl = Ext.create('Ext.XTemplate', this_.e_exam_time_tpl);
                                                panel_tpl.tpl.overwrite(panel_tpl.body, {});
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        region: 'south',
                        title: '答题信息',
                        id: 'e_status_tpl_id',
                        e_status_tpl: e_status_tpl,
                        height: 240,
                        listeners: {
                            afterrender: function (this_) {
                                var panel_tpl = Ext.getCmp('e_status_tpl_id');
                                panel_tpl.tpl = Ext.create('Ext.XTemplate', this_.e_status_tpl);
                                panel_tpl.tpl.overwrite(panel_tpl.body, {});
                            }
                        }
                    }
                ]
            });
        });
    </script>
    <script src="static/jslib/jquery-2.1.1.js"></script>1
</head>
<body onload="check_exams_stat()">
<div id="container"></div>
<p>
    <a href="javascript:void(0)" onclick="document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block'"></a>
</p>

<div id="light" class="white_content">
    <h1>考试已经结束！</h1>
    <div>
        <h2><a href="#"><i class="fa fa-print"></i>打印成绩</a></h2>
    </div>
</div>
</div>
<div id="fade" class="black_overlay"></div>
</body>
</html>
