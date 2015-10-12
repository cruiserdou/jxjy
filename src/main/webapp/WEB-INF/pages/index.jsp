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
    <title>继续教育在线考试系统</title>
    <link rel="stylesheet" href="static/css/index.css"/>
    <link href="static/css/images/yg-logo32.jpg" rel="shortcut icon">
    <script src="static/jslib/jquery-2.1.1.js"></script>
    <link href="static/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <script src="static/bootstrap/js/bootstrap.min.js"></script>

    <style id="jsbin-css">
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
            height: 128px;
        }

        .header h2 {
            margin-top: 1em;
        }
    </style>
</head>
<body>
<div class="header">
    <img class="header-cell" src="static/css/images/yglogo.png">

    <div class="header-cell">
        <h1>经营性道路客货运输驾驶员继续教育考试管理系统</h1>
    </div>
</div>
<div id="login">

    <h2><span><img src="static/css/images/login.png"></span>登陆</h2>

    <form action="ks" method="POST">
        <fieldset>

            <p><label for="account">身份证号</label></p>

            <p><input name="account" type="text" id="account"></p>
            <!-- JS because of IE support; better: placeholder="password" -->

            <p><input type="submit" value="登录"></p>
        </fieldset>
    </form>
</div>
</body>
</html>