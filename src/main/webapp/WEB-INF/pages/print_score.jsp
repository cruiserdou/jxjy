<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <!-- 引入Font Awesome的css文件 -->
    <link type="text/css" rel="stylesheet" href="static/power/css/font-awesome.css">
    <link type="text/css" rel="stylesheet" href="static/power/css/module.css">

    <!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" type="text/javascript" src="static/power/bootstrap.js"></script>

    <style>
        #wrap{
            margin: 30px auto;
            width: 800px;
            height: 600px;
            border: 1px solid #ccc;
            border-radius: 2px;
            padding: 5px;
        }
        h2{
            margin-bottom: 30px;
        }
        img{
            height: 160px;
            margin-right: 20px;
        }

        table{
            margin: 20px 0;
            font-size: 15px;
            border: 0px solid #0C0000;
            align:center;
        }
        tr  {
            border: 0px solid #0C0000;
            padding: 3px;
        }

       td{
            border: 1px solid #0C0000;
            padding: 3px;
        }
    </style>
</head>
<body>
<div id="wrap">
<%--<div>--%>
    <h2 align="center">继续教育考试成绩单</h2>
    <table   style=" width: 100%;margin:auto border:1px solid red;border-collapse:collapse;">
        <tr>
            <td colspan="2" width="20%">姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名：</td>
            <td colspan="3" width="20%">${name}</td>
            <td colspan="2" width="20%">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别：</td>
            <td colspan="3" width="20%">${sex}</td>
            <td colspan="2" rowspan="5"  width="20%">
                <img  width=100% height=100% style="height:120px;" src="static/upload/${photo}"/></td>
        </tr>

        <tr><td colspan="2" width="20%">身份证号：</td><td colspan="8">${card}</td>
        </tr>
        <tr>
            <td colspan="2" width="20%">申请种类：</td><td colspan="8">${licmd}</td></tr>
        <tr>
            <td colspan="2" width="20%">准驾车型：</td><td colspan="3" width="20%">${lictype}</td>
            <td colspan="2" width="20%">申请类别：</td><td colspan="3" width="20%">${examsite}</td>
        </tr>
        <tr>
            <td colspan="2" width="20%">驾&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp校：</td>
            <td colspan="3" width="20%">${drvschool}</td>
            <td colspan="2" width="20%">成&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp绩：</td>
            <td colspan="3" width="20%">${scores}</td>
        </tr>

    </table>

    <%--<div style="margin-top: 30px;">打印日期： 2014-09-01</div>--%>

</div>
<script>
    print();
</script>
</body>
</html>