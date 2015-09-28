<%@ page import="java.util.Map" %>
<%@ page contentType="text/html;charset=UTF-8" import="com.xwq.common.util.sqlBean" language="java" %>
<%@ page import="java.sql.ResultSet" %>
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
            background-origin: content-box;
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
            font-size: 10px;
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
           text-align: center;
        }
    </style>
</head>
<body>


<div id="wrap">

    <h2 align="center">武威市继续教育制证、发证登记册</h2>
    <table   style=" width: 100%;margin:auto border:1px solid red;border-collapse:collapse;">
        <tr>
        <td colspan="1" width="5%">序号</td>
        <td colspan="1" width="8%">姓名</td>
        <td colspan="1" width="5%">性别</td>
        <td colspan="1" width="15%">身份证号</td>
        <td colspan="1" width="15%">工作单位或家庭住址</td>
        <td colspan="1" width="7%">准驾车型</td>
        <td colspan="1" width="10%">驾照初领日期</td>
        <td colspan="1" width="20%">资格类别</td>
        <td colspan="1" width="10%">是否同意考试</td>
        <td colspan="1" width="5%">成绩</td>
        </tr>
        <%
            sqlBean db = new sqlBean();
            String sql = "select name,sex,card,address,lictype,licdt,licmd,status,scores from work.trainer where status in ('终审','同意考试')";
            ResultSet rs = db.executeQuery(sql);
            int i = 0;
            while(rs.next()){ ++i;%>
        <tr>
            <td colspan="1" width="5%"><%=i%></td>
            <td colspan="1" width="8%"><%=rs.getString("name")%></td>
            <td colspan="1" width="5%"><%=rs.getString("sex")%></td>
            <td colspan="1" width="15%"><%=rs.getString("card")%></td>
            <td colspan="1" width="15%"><%=rs.getString("address")%></td>
            <td colspan="1" width="7%"><%=rs.getString("lictype")%></td>
            <td colspan="1" width="10%"><%=rs.getString("licdt")%></td>
            <td colspan="1" width="20%"><%=rs.getString("licmd")%></td>
            <td colspan="1" width="10%">同意</td>
            <td colspan="1s" width="5%"><%=rs.getString("scores")%></td>
        </tr>
        <%} %>
    </table>

    <%--<div style="margin-top: 30px;">打印日期： 2014-09-01</div>--%>

</div>


<script>
    print();
</script>
</body>
</html>