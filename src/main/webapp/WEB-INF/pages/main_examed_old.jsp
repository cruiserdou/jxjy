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
<!-- 引入Font Awesome的css文件 -->
<link type="text/css" rel="stylesheet" href="static/css/css/font-awesome.css">
<link type="text/css" rel="stylesheet" href="static/css/css/module.css">
<style>
    fieldset {
        margin: 10px;
        border: 1px solid #cccccc;
        border-radius: 3px;
    }

    fieldset legend {
        font-weight: bold;
        font-size: 14px;
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

    .examing_center {
        margin: 30px 26px;
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
</style>
<link rel="stylesheet" type="text/css" href="static/jslib/ext-4.2/resources/css/ext-all.css"/>
<link rel="stylesheet" type="text/css" href="static/css/main.css"/>
<link rel="stylesheet" type="text/css" href="static/css/xwq_exam_main.css"/>
<link href="static/css/images/yg-logo32.jpg" rel="shortcut icon">
<script type="text/javascript" src="static/jslib/ext-4.2/ext-all.js"></script>
<script type="text/javascript" src="static/jslib/ext-4.2/locale/ext-lang-zh_CN.js"></script>
<script>
    //定时刷新任务列表
    Ext.define('Exam', {
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'name',
            'sex',
            'education',
            'card',
            'address',
            'workunit',
            'drvschool',
            'lictype',
            'licdt',
            'applytp',
            'qulfnum',
            'licmd',
            'checklist1',
            'checklist2',
            'checklist3',
            'checklist4',
            'checklist5',
            'promise',
            'photo',
            'status',
            'scores',
            'result',
            'remark',
            'qtbh',
            'ks_status',
            'list'
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
            'qtnum',
            'question_xwq',
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

    var qtbh="";
    function changeQuest(id) {
            sdata.load({
        callback: function (records, operation, success) {
            if (success) {
                var myarray = new Array();
                for (var i = 0; i < sdata.getCount(); i++) {
                    myarray[i] = sdata.getAt(i).getData();
                }

                var panel_exam_room_tpl = Ext.getCmp('e_exam_room');
                panel_exam_room_tpl.tpl = Ext.create('Ext.XTemplate', panel_exam_room_tpl.e_exam_room_tpl);
                panel_exam_room_tpl.tpl.overwrite(panel_exam_room_tpl.body, myarray[0]);

                var panel_exam_man_tpl = Ext.getCmp('e_exam_man');
                panel_exam_man_tpl.tpl = Ext.create('Ext.XTemplate', panel_exam_man_tpl.e_exam_man_tpl);
                panel_exam_man_tpl.tpl.overwrite(panel_exam_man_tpl.body, myarray[0]);


                var panel_status_tpl = Ext.getCmp('e_status_tpl_id');
                panel_status_tpl.tpl = Ext.create('Ext.XTemplate', panel_status_tpl.e_status_tpl);
                panel_status_tpl.tpl.overwrite(panel_status_tpl.body, {});

                sdata.each(function (exam) {
//                        alert(exam.get('qtbh'));
                        var qtbh=exam.get('qtbh');

                    st_questions.load({
                        params: {
                            qtbh:qtbh,
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
                    return qtbh;
                    });


            }
        }
    });


    }


//    function changeQuest(id) {
//        st_questions.load({
//            params: {
//                qtbh:qtbh,
//                qtnum: id
//            },
//            callback: function (records, operation, success) {
//                if (success) {
//                    var myarray = new Array();
//                    for (var i = 0; i < st_questions.getCount(); i++) {
//                        myarray[i] = st_questions.getAt(i).getData();
//                    }
//
//                    var panel_tpl = Ext.getCmp('questions_tpl_id');
//                    panel_tpl.tpl = Ext.create('Ext.XTemplate', panel_tpl.questions_tpl);
//                    panel_tpl.tpl.overwrite(panel_tpl.body, myarray[0]);
//                }
//            }
//        });
//    }




    var maxtime = 3600 //半个小时，按秒计算，自己调整!
    function CountDown() {
        if (maxtime >= 0) {
            minutes = Math.floor(maxtime / 60);
            seconds = Math.floor(maxtime % 60);
            msg = "距离结束:" + minutes + "分" + seconds + "秒";
            document.all["timer"].innerHTML = msg;
            if (maxtime == 5 * 60) alert('注意，还有5分钟!');
            --maxtime;
        }
        else {
            clearInterval(timer);
            alert("时间到，考试结束!");
            obt_answers_insert('{card}', '{qtbh}');
        }
    }
    timer = setInterval("CountDown()", 1000);


    function obt_answers_last(num){
        if(num>1) {
            changeQuest(num - 1);
        }
    }

    function obt_answers_next(num){
        if(num<100) {
        changeQuest(Number(num)+1);
        }
    }

    function obt_answers(qtnum,ams) {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f1 = fso.CreateTextFile("test.csv", true);
        f1.WriteLine("Hello");
        f1.WriteBlankLines(1); //换行
        f1.Close();

        var ofile=fso.getFile("test.csv");
        alert(ofile.path); var ofile=fso.getFile("test.csv");
        alert(ofile.path);


    }

</script>
<script>
Ext.onReady(function () {
    new Ext.Viewport({
        layout: 'border',
        items: [
            {
                region: 'north',
                html: '<h1 align="center">经营性道路客货运输驾驶员从业资格考试</h1>',
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
                                html: '驾校',
                                id: 'e_exam_room',
                                border: false,
                                height: 80,
                                e_exam_room_tpl: [
                                    '<fieldset><legend>驾校</legend>',
                                    '<div style="margin: 5px 10px">{drvschool}</div>',
                                    '</fieldset>'
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
                                html: '考生信息',
                                id: 'e_exam_man',
                                border: false,
                                flex: 1,
                                e_exam_man_tpl: [
                                    '<fieldset><legend>考生信息</legend>',
                                    '<div style="margin: 0;">',
                                    '<table class="trainer_table" style="text-align:left; font-size: 12px; border-collapse: collapse;">',
                                    '<tr>',
                                    '<td>考生姓名:</td>',
                                    '<td>{name}</td>',
                                    '</tr>',
                                    '<tr>',
                                    '<td>性别:</td>',
                                    '<td>{sex}</td>',
                                    '</tr>',
                                    '<tr>',
                                    '<td>准驾车型</td>',
                                    '<td>{lictype}</td>',
                                    '</tr>',
                                    '<tr>',
                                    '<td colspan="2" style="padding: 0;"><img src="static/upload/{photo}" style="margin: 2px; height: 134px;"/></td>',
                                    '</tr>',
                                    '</table>',
                                    '</div>',
                                    '</fieldset>'
                                ],
                                listeners: {
                                    afterrender: function (this_) {
                                        var panel_tpl = Ext.getCmp('e_exam_man');
                                        panel_tpl.tpl = Ext.create('Ext.XTemplate', this_.e_exam_man_tpl);
                                        panel_tpl.tpl.overwrite(panel_tpl.body, {});
                                    }
                                }
                            },
                            {
                                html: '剩余时间',
                                id: 'e_exam_time',
                                border: false,
                                height: 100,
                                e_exam_time_tpl: [
                                    '<fieldset><legend>剩余时间</legend>',
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
                    },
                    {
                        region: 'center',
                        id: 'questions_tpl_id',
                        border: false,
                        questions_tpl: [
                            '<fieldset><legend>考试题目</legend>',
                            '<div class="examing_center">',
                            '<form id="questions_form" action="add_answers_info" method="post">',
                            '<p style="font-size: 16px;">{qtnum}、{question_xwq}</p>',
                            '<br/><br/>',
                            '<p>A、{qt_a}</p>',
                            '<br/>',
                            '<p>B、{qt_b}</p>',
                            '<br/>',
                            '<p>C、{qt_c}</p>',
                            '<br/>',
                            '<p>D、{qt_d}</p>',
                            '<br/>',
                            '<div style="margin: 10px 0;">您选择的答案：  请选择：</div>',
                            '<div>',
                            '<a href="#" class="xwq_btn" onclick="obt_answers(\'{qtnum}\',\'{qt_a}\')">A</a>',
                            '<a href="#" class="xwq_btn" onclick="obt_answers(\'{qtnum}\',\'{qt_b}\')">B</a>',
                            '<a href="#" class="xwq_btn" onclick="obt_answers(\'{qtnum}\',\'{qt_c}\')">C</a>',
                            '<a href="#" class="xwq_btn" onclick="obt_answers(\'{qtnum}\',\'{qt_d}\')">D</a>',
                            '</div>',
                            '<div style="width:260px; margin: 10px auto">',
                                    '<a href="#" onclick="obt_answers_last(\'{qtnum}\')" class="xwq_btn"><i class="fa fa-hand-o-left"></i>&nbsp;上一题</a>' +
                                    '<a href="#" onclick="obt_answers_next(\'{qtnum}\')" class="xwq_btn"><i class="fa fa-hand-o-right"></i>&nbsp;下一题</a>',
                            '</div>',
                            '</form>',
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
                        id: 'e_exam_tip',
                        border: false,
                        html: '提示于操作',
                        width: 200,
                        e_exam_tip_tpl: [
                            '<fieldset><legend>提示信息</legend>',
                            '<div style="margin: 5px 10px">选择题，请再备选答案中选择你认为正确的答案！</div>',
                            '</fieldset>'
                        ],
                        listeners: {
                            afterrender: function (this_) {
                                var panel_tpl = Ext.getCmp('e_exam_tip');
                                panel_tpl.tpl = Ext.create('Ext.XTemplate', this_.e_exam_tip_tpl);
                                panel_tpl.tpl.overwrite(panel_tpl.body, {});
                            }
                        }
                    }
                ]
            },
            {
                region: 'south',
                border: false,
                id: 'e_status_tpl_id',
                e_status_tpl: [
                            '<fieldset><legend>答题信息</legend>' +
                            '<table class="e_status_table">' +
                            '<tr>' +
                            '<td><a href="#" onclick="changeQuest(1);">1</a></td>' +
                            '<td><a href="#" onclick="changeQuest(2);">2</a></td>' +
                            '<td><a href="#" onclick="changeQuest(3);">3</a></td>' +
                            '<td><a href="#" onclick="changeQuest(4);">4</a></td>' +
                            '<td><a href="#" onclick="changeQuest(5);">5</a></td>' +
                            '<td><a href="#" onclick="changeQuest(6);">6</a></td>' +
                            '<td><a href="#" onclick="changeQuest(7);">7</a></td>' +
                            '<td><a href="#" onclick="changeQuest(8);">8</a></td>' +
                            '<td><a href="#" onclick="changeQuest(9);">9</a></td>' +
                            '<td><a href="#" onclick="changeQuest(10);">10</a></td>' +
                            '<td><a href="#" onclick="changeQuest(11);">11</a></td>' +
                            '<td><a href="#" onclick="changeQuest(12);">12</a></td>' +
                            '<td><a href="#" onclick="changeQuest(13);">13</a></td>' +
                            '<td><a href="#" onclick="changeQuest(14);">14</a></td>' +
                            '<td><a href="#" onclick="changeQuest(15);">15</a></td>' +
                            '<td><a href="#" onclick="changeQuest(16);">16</a></td>' +
                            '<td><a href="#" onclick="changeQuest(17);">17</a></td>' +
                            '<td><a href="#" onclick="changeQuest(18);">18</a></td>' +
                            '<td><a href="#" onclick="changeQuest(19);">19</a></td>' +
                            '<td><a href="#" onclick="changeQuest(20);">20</a></td>' +
                            '</tr>' +


                            '<tr>' +
                            '<td><a href="#" onclick="changeQuest(21);">21</a></td>' +
                            '<td><a href="#" onclick="changeQuest(22);">22</a></td>' +
                            '<td><a href="#" onclick="changeQuest(23);">23</a></td>' +
                            '<td><a href="#" onclick="changeQuest(24);">24</a></td>' +
                            '<td><a href="#" onclick="changeQuest(25);">25</a></td>' +
                            '<td><a href="#" onclick="changeQuest(26);">26</a></td>' +
                            '<td><a href="#" onclick="changeQuest(27);">27</a></td>' +
                            '<td><a href="#" onclick="changeQuest(28);">28</a></td>' +
                            '<td><a href="#" onclick="changeQuest(29);">29</a></td>' +
                            '<td><a href="#" onclick="changeQuest(30);">30</a></td>' +
                            '<td><a href="#" onclick="changeQuest(31);">31</a></td>' +
                            '<td><a href="#" onclick="changeQuest(32);">32</a></td>' +
                            '<td><a href="#" onclick="changeQuest(33);">33</a></td>' +
                            '<td><a href="#" onclick="changeQuest(34);">34</a></td>' +
                            '<td><a href="#" onclick="changeQuest(35);">35</a></td>' +
                            '<td><a href="#" onclick="changeQuest(36);">36</a></td>' +
                            '<td><a href="#" onclick="changeQuest(37);">37</a></td>' +
                            '<td><a href="#" onclick="changeQuest(38);">38</a></td>' +
                            '<td><a href="#" onclick="changeQuest(39);">39</a></td>' +
                            '<td><a href="#" onclick="changeQuest(40);">49</a></td>' +

                            '</tr>' +

                            '<tr>' +
                            '<td><a href="#" onclick="changeQuest(41);">41</a></td>' +
                            '<td><a href="#" onclick="changeQuest(42);">42</a></td>' +
                            '<td><a href="#" onclick="changeQuest(43);">43</a></td>' +
                            '<td><a href="#" onclick="changeQuest(44);">44</a></td>' +
                            '<td><a href="#" onclick="changeQuest(45);">45</a></td>' +
                            '<td><a href="#" onclick="changeQuest(46);">46</a></td>' +
                            '<td><a href="#" onclick="changeQuest(47);">47</a></td>' +
                            '<td><a href="#" onclick="changeQuest(48);">48</a></td>' +
                            '<td><a href="#" onclick="changeQuest(49);">49</a></td>' +
                            '<td><a href="#" onclick="changeQuest(50);">50</a></td>' +
                            '<td><a href="#" onclick="changeQuest(51);">51</a></td>' +
                            '<td><a href="#" onclick="changeQuest(52);">52</a></td>' +
                            '<td><a href="#" onclick="changeQuest(53);">53</a></td>' +
                            '<td><a href="#" onclick="changeQuest(54);">54</a></td>' +
                            '<td><a href="#" onclick="changeQuest(55);">55</a></td>' +
                            '<td><a href="#" onclick="changeQuest(56);">56</a></td>' +
                            '<td><a href="#" onclick="changeQuest(57);">57</a></td>' +
                            '<td><a href="#" onclick="changeQuest(58);">58</a></td>' +
                            '<td><a href="#" onclick="changeQuest(59);">59</a></td>' +
                            '<td><a href="#" onclick="changeQuest(60);">60</a></td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td><a href="#" onclick="changeQuest(61);">61</a></td>' +
                            '<td><a href="#" onclick="changeQuest(62);">62</a></td>' +
                            '<td><a href="#" onclick="changeQuest(63);">63</a></td>' +
                            '<td><a href="#" onclick="changeQuest(64);">64</a></td>' +
                            '<td><a href="#" onclick="changeQuest(65);">65</a></td>' +
                            '<td><a href="#" onclick="changeQuest(66);">66</a></td>' +
                            '<td><a href="#" onclick="changeQuest(67);">67</a></td>' +
                            '<td><a href="#" onclick="changeQuest(68);">68</a></td>' +
                            '<td><a href="#" onclick="changeQuest(69);">69</a></td>' +
                            '<td><a href="#" onclick="changeQuest(70);">70</a></td>' +
                            '<td><a href="#" onclick="changeQuest(71);">71</a></td>' +
                            '<td><a href="#" onclick="changeQuest(72);">72</a></td>' +
                            '<td><a href="#" onclick="changeQuest(73);">73</a></td>' +
                            '<td><a href="#" onclick="changeQuest(74);">74</a></td>' +
                            '<td><a href="#" onclick="changeQuest(75);">75</a></td>' +
                            '<td><a href="#" onclick="changeQuest(76);">76</a></td>' +
                            '<td><a href="#" onclick="changeQuest(77);">77</a></td>' +
                            '<td><a href="#" onclick="changeQuest(78);">78</a></td>' +
                            '<td><a href="#" onclick="changeQuest(79);">79</a></td>' +
                            '<td><a href="#" onclick="changeQuest(80);">80</a></td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td><a href="#" onclick="changeQuest(81);">81</a></td>' +
                            '<td><a href="#" onclick="changeQuest(82);">82</a></td>' +
                            '<td><a href="#" onclick="changeQuest(83);">83</a></td>' +
                            '<td><a href="#" onclick="changeQuest(84);">84</a></td>' +
                            '<td><a href="#" onclick="changeQuest(85);">85</a></td>' +
                            '<td><a href="#" onclick="changeQuest(86);">86</a></td>' +
                            '<td><a href="#" onclick="changeQuest(87);">87</a></td>' +
                            '<td><a href="#" onclick="changeQuest(88);">88</a></td>' +
                            '<td><a href="#" onclick="changeQuest(89);">89</a></td>' +
                            '<td><a href="#" onclick="changeQuest(90);">90</a></td>' +
                            '<td><a href="#" onclick="changeQuest(91);">91</a></td>' +
                            '<td><a href="#" onclick="changeQuest(92);">92</a></td>' +
                            '<td><a href="#" onclick="changeQuest(93);">93</a></td>' +
                            '<td><a href="#" onclick="changeQuest(94);">94</a></td>' +
                            '<td><a href="#" onclick="changeQuest(95);">95</a></td>' +
                            '<td><a href="#" onclick="changeQuest(96);">96</a></td>' +
                            '<td><a href="#" onclick="changeQuest(97);">97</a></td>' +
                            '<td><a href="#" onclick="changeQuest(98);">98</a></td>' +
                            '<td><a href="#" onclick="changeQuest(99);">99</a></td>' +
                            '<td><a href="#" onclick="changeQuest(100);">100</a></td>' +
                            '</tr>' +
                            '</table>' +
                            '</fieldset>'
                ],
                height: 260,
                listeners: {
                    afterrender: function (this_) {
                        var panel_tpl = Ext.getCmp('e_status_tpl_id');
                        panel_tpl.tpl = Ext.create('Ext.XTemplate', this_.e_status_tpl);
                        panel_tpl.tpl.overwrite(panel_tpl.body, {});
                    }
                },
                html: 'foot'
            }
        ]
    });
});
</script>
</head>
<body>
<div id="container"></div>
</body>
</html>
