<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">

    <title>My JSP 'MyJsp.jsp' starting page</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <!--
        <link rel="stylesheet" type="text/css" href="styles.css">
        -->
    <script src="static/jslib/jquery.mini.js"></script>
    <%--<script src="js/jquery-1.7.2.js"></script>--%>
</head>

<body>
<video id="video" autoplay="" width="320px" height="240px"></video>
<canvas id="canvas1" width="320" height="240"></canvas>
<button  onclick="scamera()">拍照</button>
<button  onclick="uploadPhoto2()">上传</button>
<script type="text/javascript">
    var video = document.getElementById("video");
    navigator.getUserMedia = navigator.getUserMedia
            || navigator.webkitGetUserMedia;
    if (navigator.getUserMedia) {
        if (navigator.webkitURL) {
            navigator.getUserMedia("video", function(stream) {
                video.src = window.webkitURL.createObjectURL(stream);
            }, function(error) {
                alert(error);
            });
        } else {
            navigator.getUserMedia({
                video : true
            }, function(stream) {
                video.src = window.webkitURL.createObjectURL(stream);
            }, function(error) {
                alert(error);
            });
        }
    } else {
        alert("navigator.getUserMedia Error");
    }

    function scamera() {
        var videoElement = document.getElementById('video');
        var canvasObj = document.getElementById('canvas1');
        var context1 = canvasObj.getContext('2d');
        context1.fillStyle = "#ffffff";
        context1.fillRect(0, 0, 320, 240);
        context1.drawImage(videoElement, 0, 0, 320, 240);
    }

    function uploadPhoto2()//上传拍照的图片  
    {
        var imgstr = document.getElementById('canvas1').toDataURL();
        imgstr = encodeURIComponent(imgstr);

        $.ajax({
            type: "POST",
            url: "upload_phote",
            data: {
                "img":imgstr
            },
            success: function(msg){
                console.log("Upload ok");
            }
        });
    }
</script>
</body>
</html>