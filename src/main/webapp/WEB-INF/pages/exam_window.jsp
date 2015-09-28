<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 13-11-14
  Time: 上午9:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>武威运管继续教育</title>
    <link href="static/css/images/yg-logo32.jpg" rel="shortcut icon">
    <script src="static/jslib/jquery-2.1.1.js"></script>

    <link href="static/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <script src="static/bootstrap/js/bootstrap.min.js"></script>
    <style rel="stylesheet">
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .header {
            width: 100%;
            background-color: white;
            color: #0099CC;
            display: table;
            padding-left: 2em;
        }

        .container {
            background-image: -webkit-linear-gradient(top, #D8E9FE, white);
            margin: 0;
            padding: 0;
            width: 100%;
        }

        .header {
            width: 100%;
            background-color: #e2e2e2;
            color: #0099CC;
            display: table;
            padding-left: 2em;
            background-attachment: scroll, scroll, scroll;
            background-clip: border-box, border-box, border-box;
            background-color: rgb(238, 238, 238);
            background-image: url(static/css/images/bg-gradient-sky.png), url(static/css/images/grain.png), none;
            background-origin: padding-box, padding-box, padding-box;
            background-size: auto, auto, auto;
        }

        .header .header-cell {
            display: table-cell;
            vertical-align: middle;
        }

        .header img {
            width: 10em;
        }

        .header h2 {
            margin-top: 0.3em;
        }

        form {
            border-radius: 3px;
            padding: 1em;
            margin: 0 auto;
        }

        fieldset {
            background-color: white;
            margin-bottom: 1em;
            border-radius: 3px;
            padding: 1em;
            border: thin solid #CCCCCC;
            box-shadow: 0 1px 1px #CCC;
        }

        legend {
            width: 8em;
            border: none;
        }

        legend img {
            display: inline-block;
            width: 32px;
            margin-right: 1em;
        }

        input {
            margin-right: 2em;
            color: red;
        }

        input[type="radio"] {
            margin: 0 1em 0 2em;
        }

        textarea {
            width: 100%;
            height: 14em;
            border: 1px solid #E2E2E6;
            box-shadow: inset 0 0 3px #CCCCCC;
        }

        .opt_div {
            display: table;
            width: 800px;
            margin: 0 auto;
        }

        .opt_div div {
            display: table-cell;
            width: 50%;
            text-align: center;
        }

        .info-send-btn {
            color: #262626;
            font-weight: bold;
            opacity: .7;
            display: inline-block;
            font-size: 14px;
            border: 1px solid #d9d9d9;
            border-radius: 3px;
            box-shadow: 0 1px 0 rgba(0, 0, 0, .05);
            transition: background-color .218s, border-color .218s, box-shadow .218s;
            background-color: white;
            line-height: 28px;
            padding: 0 10px;
            -webkit-font-smoothing: antialiased;
            word-wrap: break-word;
            margin: 1em 0.4em 1em 0;
            cursor: hand;
            text-decoration: none;
        }

        .info-send-btn:hover {
            background-color: #EEE;
        }

        .col-md-3 {
            padding: 2em 0 0 2.3em;
        }

        .col-md-3 div {
            display: table;
            width: 100%;
        }

        .col-md-3 div div {
            display: table-cell;
            width: 10%;
            padding: 5px 2px;
        }

        .col-md-3 div div a {
            display: block;
            border: 1px solid #CCC;
            background-color: white;
            box-shadow: 1px 1px #E2E2E6;
            border-radius: 5px;
            text-align: center;
            transition: all 0.3s;
        }

        .col-md-3 div div a:hover {
            background-color: #CCC;
        }

        .col-md-2 img {
            display: block;
            width: 80%;
            margin: 0 auto;
            margin-top: 2.3em;
        }

        .col-md-2 video {
            display: block;
            width: 80%;
            height: 194px;
            margin: 0 auto;
            margin-top: 2.3em;
        }

        .col-md-2 canvas{
            display: block;
            width: 80%;
            height: 194px;
            margin: 0 auto;
            margin-top: 2.3em;
            display: none;
        }

        .col-md-2 p {
            text-align: center;
        }

        .col-md-3 h3 {
            border: 1px solid #E2E2E6;
            border-radius: 3px;
            background-color: white;
            box-shadow: 1px 1px 1px #CCC;
            text-align: justify;
            padding: 1em 0.6em;
            color: #2C527B;
            overflow: scroll;
        }

        fieldset h3 {
            display: inline-block;
            margin: 0 2em;
        }

        .cover{
            position: absolute;
            background-color: white;
            opacity: 0.96;
            top: 0;
            left: 0;
            z-index: 100;
            height: 100%;
            width: 100%;
            display: none;
        }

        .warn-div{
            z-index: 101;
            background-color: #FF8F00;
            border: 1px solid #FF8F00;
            border-radius: 3px;
            margin: 10em auto;
            width: 320px;
            height: 280px;
            padding: 1em;
        }

        .warn-div h1, .warn-div h3{
            color: black;
        }
    </style>

    <script>

        var num=0;
        var b_start=0;
        // Do the vendor prefix dance
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia;

        // Set up an error handler on the callback
        var errCallback = function (e) {
            console.log('Did you just reject me?!', e);
        };

        // Request the user's media
        function requestMedia(e) {
            e.preventDefault();

        // Use the vendor prefixed getUserMedia we set up above and request just video
            navigator.getUserMedia({video: true, audio: false}, showMedia, errCallback);
        }

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
        }

        // Set up a click handler to kick off the process
        $(function () {
            $('#ok-btn').click(requestMedia);
        });

        function changeQuest(num) {

            $.ajax({
                url: '/exam/obtain_questions_choice_info',
                type: 'post',
                data: {
                    'qtbh':'BH001',
                    'qtnum': num
                },
                success: function (data) {
                    var s_question=data;
                    if (data == "fail") {
                        $("#question").html("获取考题失败！");
                    }
                    else {
                        $("#question").html(s_question);
                    }
                }
            });

        }

        function obt_questions(qtnum) {
            if (b_start == 1) {
                changeQuest(qtnum);
                num = qtnum;
                $("#qt_num").html("第" + num + "题");
            } else {
                alert("请确认开始！")
            }
        }

        function obt_questions_start(qtnum) {
            b_start=1;
            iTime = 3600;
            RemainTime();
            num = qtnum;
            changeQuest(num);
            $("#qt_num").html("第"+num+"题");
        }

        function obt_questions_last() {
            if (b_start == 1) {
                if (num > 1) {
                    changeQuest(num - 1);
                    num = num - 1;
                    $("#qt_num").html("第"+num+"题");
                }
            } else {
                alert("请确认开始！")
            }
        }

        function obt_questions_next() {
            if (b_start == 1) {
                if (num < 100) {
                    changeQuest(Number(num) + 1);
                    num = num + 1;
                    $("#qt_num").html("第"+num+"题");
                }
            } else {
                alert("请确认开始！")
            }
        }

        //验证码有效期倒计时
        function RemainTime() {
            var iSecond;
            var sSecond = "", sTime = "";

            if (iTime >= 0) {
                iSecond = parseInt(iTime % 3600);
                if (iSecond >= 0) {
                    sSecond = iTime + "秒";
                }
                sTime = "<span style='color:darkorange;font-size:13px;'>" + sSecond + "</span>";
                if (iTime == 0) {
                    clearTimeout(Account);
                    codecheck = false;
                }
                else {
                    Account = setTimeout("RemainTime()", 1000);
                }
                iTime = iTime - 1;
            }
            $("#sTime").html("剩余时间："+sTime);
        }

    </script>
</head>
<body>
<div class="cover">
    <div class="warn-div">
        <h1>考试已经结束！</h1>
        <h3>等待打印成绩单</h3>
        <h3 style="position: absolute;margin-top: 4em;border-bottom: 1em;"><span class="fa">打印</span></h3>
    </div>
</div>
<div class="header">
    <img class="header-cell" src="static/css/images/t-wwyg-logo.png">

    <div class="header-cell">
        <h1 style="display: inline-block">道路客货运输驾驶员</h1>

        <h2 style="display: inline-block;">--从业资格考试</h2>
    </div>
</div>

<div class="container">
    <div class="row">

        <div class="col-md-3">
            <div>
                <div><a href="#" onclick="obt_questions(1);">1</a></div>
                <div><a href="#" onclick="obt_questions(2);">2</a></div>
                <div><a href="#" onclick="obt_questions(3);">3</a></div>
                <div><a href="#" onclick="obt_questions(4);">4</a></div>
                <div><a href="#" onclick="obt_questions(5);">5</a></div>
                <div><a href="#" onclick="obt_questions(6);">6</a></div>
                <div><a href="#" onclick="obt_questions(7);">7</a></div>
                <div><a href="#" onclick="obt_questions(8);">8</a></div>
                <div><a href="#" onclick="obt_questions(9);">9</a></div>
                <div><a href="#" onclick="obt_questions(10);">10</a></div>
            </div>
            <div>
                <div><a href="#"  onclick="obt_questions(11);">11</a></div>
                <div><a href="#"  onclick="obt_questions(12);">12</a></div>
                <div><a href="#"  onclick="obt_questions(13);">13</a></div>
                <div><a href="#"  onclick="obt_questions(14);">14</a></div>
                <div><a href="#"  onclick="obt_questions(15);">15</a></div>
                <div><a href="#"  onclick="obt_questions(16);">16</a></div>
                <div><a href="#"  onclick="obt_questions(17);">17</a></div>
                <div><a href="#"  onclick="obt_questions(18);">18</a></div>
                <div><a href="#"  onclick="obt_questions(19);">19</a></div>
                <div><a href="#"  onclick="obt_questions(20);">20</a></div>
            </div>
            <div>
                <div><a href="#"  onclick="obt_questions(21);">21</a></div>
                <div><a href="#"  onclick="obt_questions(22);">22</a></div>
                <div><a href="#"  onclick="obt_questions(23);">23</a></div>
                <div><a href="#"  onclick="obt_questions(24);">24</a></div>
                <div><a href="#"  onclick="obt_questions(25);">25</a></div>
                <div><a href="#"  onclick="obt_questions(26);">26</a></div>
                <div><a href="#"  onclick="obt_questions(27);">27</a></div>
                <div><a href="#"  onclick="obt_questions(28);">28</a></div>
                <div><a href="#"  onclick="obt_questions(29);">29</a></div>
                <div><a href="#"  onclick="obt_questions(30);">30</a></div>
            </div>
            <div>
                <div><a href="#"  onclick="obt_questions(31);">31</a></div>
                <div><a href="#"  onclick="obt_questions(32);">32</a></div>
                <div><a href="#"  onclick="obt_questions(33);">33</a></div>
                <div><a href="#"  onclick="obt_questions(34);">34</a></div>
                <div><a href="#"  onclick="obt_questions(35);">35</a></div>
                <div><a href="#"  onclick="obt_questions(36);">36</a></div>
                <div><a href="#"  onclick="obt_questions(37);">37</a></div>
                <div><a href="#"  onclick="obt_questions(38);">38</a></div>
                <div><a href="#"  onclick="obt_questions(39);">39</a></div>
                <div><a href="#"  onclick="obt_questions(40);">40</a></div>
            </div>
            <div>
                <div><a href="#"  onclick="obt_questions(41);">41</a></div>
                <div><a href="#"  onclick="obt_questions(42);">42</a></div>
                <div><a href="#"  onclick="obt_questions(43);">43</a></div>
                <div><a href="#"  onclick="obt_questions(44);">44</a></div>
                <div><a href="#"  onclick="obt_questions(45);">45</a></div>
                <div><a href="#"  onclick="obt_questions(46);">46</a></div>
                <div><a href="#"  onclick="obt_questions(47);">47</a></div>
                <div><a href="#"  onclick="obt_questions(48);">48</a></div>
                <div><a href="#"  onclick="obt_questions(49);">49</a></div>
                <div><a href="#"  onclick="obt_questions(50);">50</a></div>
            </div>
            <div>
                <div><a href="#"  onclick="obt_questions(51);">51</a></div>
                <div><a href="#"  onclick="obt_questions(52);">52</a></div>
                <div><a href="#"  onclick="obt_questions(53);">53</a></div>
                <div><a href="#"  onclick="obt_questions(54);">54</a></div>
                <div><a href="#"  onclick="obt_questions(55);">55</a></div>
                <div><a href="#"  onclick="obt_questions(56);">56</a></div>
                <div><a href="#"  onclick="obt_questions(57);">57</a></div>
                <div><a href="#"  onclick="obt_questions(58);">58</a></div>
                <div><a href="#"  onclick="obt_questions(59);">59</a></div>
                <div><a href="#"  onclick="obt_questions(60);">60</a></div>
            </div>
            <div>
                <div><a href="#"  onclick="obt_questions(61);">61</a></div>
                <div><a href="#"  onclick="obt_questions(62);">62</a></div>
                <div><a href="#"  onclick="obt_questions(63);">63</a></div>
                <div><a href="#"  onclick="obt_questions(64);">64</a></div>
                <div><a href="#"  onclick="obt_questions(65);">65</a></div>
                <div><a href="#"  onclick="obt_questions(66);">66</a></div>
                <div><a href="#"  onclick="obt_questions(67);">67</a></div>
                <div><a href="#"  onclick="obt_questions(68);">68</a></div>
                <div><a href="#"  onclick="obt_questions(69);">69</a></div>
                <div><a href="#"  onclick="obt_questions(70);">70</a></div>
            </div>
            <div>
                <div><a href="#"  onclick="obt_questions(71);">71</a></div>
                <div><a href="#"  onclick="obt_questions(72);">72</a></div>
                <div><a href="#"  onclick="obt_questions(73);">73</a></div>
                <div><a href="#"  onclick="obt_questions(74);">74</a></div>
                <div><a href="#"  onclick="obt_questions(75);">75</a></div>
                <div><a href="#"  onclick="obt_questions(76);">76</a></div>
                <div><a href="#"  onclick="obt_questions(77);">77</a></div>
                <div><a href="#"  onclick="obt_questions(78);">78</a></div>
                <div><a href="#"  onclick="obt_questions(79);">79</a></div>
                <div><a href="#"  onclick="obt_questions(80);">80</a></div>
            </div>
            <div>
                <div><a href="#"  onclick="obt_questions(81);">81</a></div>
                <div><a href="#"  onclick="obt_questions(82);">82</a></div>
                <div><a href="#"  onclick="obt_questions(83);">83</a></div>
                <div><a href="#"  onclick="obt_questions(84);">84</a></div>
                <div><a href="#"  onclick="obt_questions(85);">85</a></div>
                <div><a href="#"  onclick="obt_questions(86);">86</a></div>
                <div><a href="#"  onclick="obt_questions(87);">87</a></div>
                <div><a href="#"  onclick="obt_questions(88);">88</a></div>
                <div><a href="#"  onclick="obt_questions(89);">89</a></div>
                <div><a href="#"  onclick="obt_questions(90);">90</a></div>
            </div>
            <div>
                <div><a href="#"  onclick="obt_questions(91);">91</a></div>
                <div><a href="#"  onclick="obt_questions(92);">92</a></div>
                <div><a href="#"  onclick="obt_questions(93);">93</a></div>
                <div><a href="#"  onclick="obt_questions(94);">94</a></div>
                <div><a href="#"  onclick="obt_questions(95);">95</a></div>
                <div><a href="#"  onclick="obt_questions(96);">96</a></div>
                <div><a href="#"  onclick="obt_questions(97);">97</a></div>
                <div><a href="#"  onclick="obt_questions(98);">98</a></div>
                <div><a href="#"  onclick="obt_questions(99);">99</a></div>
                <div><a href="#"  onclick="obt_questions(100);">100</a></div>
            </div>
            <h3 id="sTime">剩余时间：60分钟</h3>

            <h3>姓名<br><span style="display: inline-block;font-size: 0.8em; margin-top: 0.6em">622801198609261432</span>
            </h3>
        </div>
        <div class="col-md-7">
            <form style="padding-top: 2.3em">
                <fieldset>
                    <h3>共 100 题</h3>

                    <h3 id="qt_num">第 100 题</h3>
                </fieldset>

                <fieldset>
                    <legend><img src="static/css/images/q-file.png">题目内容</legend>
                    <textarea readonly id="question"></textarea>
                </fieldset>

                <fieldset>
                    <legend><img src="static/css/images/q-answer.png">选择答案</legend>
                    <input name="answer" type="radio">A
                    <input name="answer" type="radio">B
                    <input name="answer" type="radio">C
                    <input name="answer" type="radio">D
                </fieldset>
            </form>

            <div class="opt_div">
                <div>
                    <a class="info-send-btn" href="#" onclick="obt_questions_start(1);">开始</a>
                    <a class="info-send-btn" href="#" onclick="obt_questions_last()">上一题</a>
                    <a class="info-send-btn" href="#" onclick="obt_questions_next()">下一题</a>
                </div>

                <div>
                    <a class="info-send-btn" id="ok-btn" href="#">交卷</a>
                    <a class="info-send-btn" href="#">退出</a>
                    <a class="info-send-btn" href="#">帮助</a>
                </div>
            </div>
        </div>
        <div class="col-md-2" style="padding: 0 2.6em 2em 0">
            <img src="static/css/images/id2.jpg">

            <p>报名照片</p>
            <%--<img src="static/css/images/id2.jpg">--%>
            <canvas id="canvas1"></canvas>

            <video id="user-media" autoplay></video>
            <p>考试中照片</p>
        </div>
    </div>
</div>
</body>
</html>