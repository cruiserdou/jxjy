﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%--<%@ page import="com.xwq.common.util.sqlBean" %>--%>
<%@ page import="java.sql.*" %>
<%@ page import="java.sql.ResultSet" %>

<%
    String action=request.getParameter("action");


    Connection conn = null;
    Statement Stmt= null;
    String userName="postgres";
    String userPwd="postgres";
    String driverName = "org.postgresql.Driver";
    Class.forName(driverName).newInstance();
    String url = "jdbc:postgresql://127.0.0.1:5432/exam";
    conn = DriverManager.getConnection(url, userName, userPwd);
    Stmt = conn.createStatement();

//    sqlBean db = new sqlBean();
    out.println("<?xml version='1.0' encoding='utf-8'?>");
    out.println("<root>");
    if("roomInfo".equals(action)){//房间信息接口
        String roomID=request.getParameter("roomID");//房间序号

        String roomName="";//房间名称
        String roomMaxUsers="";//房间最大用户数
        String roomMode="";//房间默认模式：0表示培训模式，1表示讨论模式，2表示视频模式
        String discussFlag="";//是否允许讨论模式,值只能是1表示允许,0表示不允许
        String videosFlag="";//是否允许视频模式,值只能是1表示允许,0表示不允许
        String autoMic="";//是否设置为自动上麦,值只能是1表示允许自动上麦,0表示不允许
        String dibbling="";//是否允许单独查看文件,0:不允许;1允许
        String callFlag="";//是否允许屏幕共享时呼叫对方,0:不允许;1允许
        String downloadFlag="";//是否允许下载资料共享,0:不允许;1:允许
        String visitor="";//是否游客进入,值只能是1表示允许游客,0表示不允许
        String note="";//房间公告
        String rtmptVideo="";//视频流媒体地址,默认为空,如果有多台服务器才考虑
        //以下是写死的测试数据，要先从数据库里的数据读出来替换现有的测试数据就可以实现数据整合功能

        String result="Error";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,如果操作失败就要设置失败信息
        /**
         * 1)根据房间序号roomID可以获取到数据库房间表里的房间数据
         * 2)房间表(tc_room)字段：[id(自动编码), roomName(房间名称/字符型/默认值:空且不为null/长度:100), roomMaxUsers(房间最大人数/整型/默认值:0/长度:4), roomMode(房间默认模式/整型/默认值:0/长度:1), discussFlag(是否允许讨论模式/整型/默认值:1/长度:1), videosFlag(是否允许视频模式/整型/默认值:1/长度:1), autoMic(是否设置自动上麦/整型/默认值:1/长度:1), dibbling(是否允许单独查看文件/整型/默认值:1/长度:1), callFlag(是否允许屏幕共享时呼叫对方/整型/默认值:1/长度:1), downloadFlag(是否允许下载/整型/默认值:1/长度:1), visitor(是否允许游客/整型/默认值:0/长度:1), note(房间公告/字符型/默认值:空且不为null/长度:250), rtmptVideo(视频流媒体地址/字符型/默认值:空且不为null/长度:100), hostID(房间主讲ID/整型/默认值:0/长度:4)]
         */

        String sql = "select * from work.tc_room where id="+ Integer.parseInt(roomID);
        ResultSet rs=Stmt.executeQuery(sql);
        while(rs.next()){
            roomName = rs.getString("roomname");
            roomMaxUsers=rs.getString("roommaxusers");
            roomMode=rs.getString("roommode");
            discussFlag=rs.getString("discussflag");
            videosFlag=rs.getString("videosflag");
            autoMic=rs.getString("automic");
            dibbling=rs.getString("dibbling");
            callFlag=rs.getString("callflag");
            downloadFlag=rs.getString("downloadflag");
            visitor=rs.getString("visitor");
            note=rs.getString("note");
            rtmptVideo=rs.getString("rtmptvideo");

            result="Success";
        }



        out.println("<room>");
        out.println("<id>"+roomID+"</id>");//房间序号
        out.println("<roomName>"+roomName+"</roomName>");//房间名称
        out.println("<roomMaxUsers>"+roomMaxUsers+"</roomMaxUsers>");//房间最大用户数
        out.println("<roomMode>"+roomMode+"</roomMode>");//房间默认模式：0表示培训模式，1表示讨论模式，2表示视频模式
        out.println("<discussFlag>"+discussFlag+"</discussFlag>");//是否允许讨论模式,值只能是1表示允许,0表示不允许
        out.println("<videosFlag>"+videosFlag+"</videosFlag>");//是否允许视频模式,值只能是1表示允许,0表示不允许
        out.println("<autoMic>"+autoMic+"</autoMic>");//是否设置为自动上麦,值只能是1表示允许自动上麦,0表示不允许
        out.println("<dibbling>"+dibbling+"</dibbling>");//是否允许单独查看文件,0:不允许;1允许
        out.println("<callFlag>"+callFlag+"</callFlag>");//是否允许屏幕共享时呼叫对方,0:不允许;1允许
        out.println("<downloadFlag>"+downloadFlag+"</downloadFlag>");//是否允许下载资料共享,0:不允许;1:允许
        out.println("<visitor>"+visitor+"</visitor>");//是否游客进入,值只能是1表示允许游客,0表示不允许
        out.println("<note>"+note+"</note>");//房间公告
        out.println("<rtmptVideo></rtmptVideo>");//视频流媒体地址,默认为空,如果有多台服务器才考虑
        out.println("<roomPwd>-1</roomPwd>");
        out.println("</room>");
        out.println("<result>"+result+"</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");

    }else if("checkSession".equals(action)){//用户登录会话验证接口
        String roomID=request.getParameter("roomID");//房间序号
        String account = (String) session.getAttribute("user");
        String password = (String) session.getAttribute("password");
//		String account=request.getParameter("account");//用户账号
//		String password=request.getParameter("password");;//用户密码

        Boolean flag=false;//是否存在用户会话，如果存在就设置为true,并且返回用户信息;如果不存在，就设置为false

        String result="Error";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,值为空就行

        String sql = "select * from work.users where username='"+account+"' and password='"+password+"'";
        ResultSet  rs1=Stmt.executeQuery(sql);
        while(rs1.next()){

            flag=true;
            result="Success";
        }

        /**
         * 1)通过用户会话就可以获取到账号和密码
         */
        if(flag){
            out.println("<user>");
            out.println("<account>"+account+"</account>");//用户账号
            out.println("<password>"+password+"</password>");//用户密码
            out.println("</user>");
        }else{
            result="Error";
        }
        out.println("<result>"+result+"</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");

    }else if("login".equals(action)){//用户登录接口
        String roomID=request.getParameter("roomID");//房间序号
        String account=request.getParameter("account");//用户账号
        String password=request.getParameter("password");//用户密码
        String visitorFlag=request.getParameter("visitorFlag");//是否游客(0:否;1:是)
        String encryptPwdFlag=request.getParameter("encryptPwdFlag");//密码是否加密(0:否;1:是)

        String id="";//用户昵称
        String name="";//用户昵称
        String userType="";//用户类别,值只能是isServer表示主讲,isUser表示会员,根据roomID找到hostID，如果hostID和用户ID相等则是isServer,否则是isUser
        String headImg="";//头像地址
        String sex="";//性别,值只能是1表示男,0表示女
        String roomAdmin="";//是否有管理权限,值只能是1表示有,0表示无
        String visitor=visitorFlag;//是否游客(0:否;1:是)
        String userIP="";//用户IP

        String result="Success";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,如果操作失败就要设置失败信息
        String hostid="";

        String sql1 = "select * from work.tc_room where id ="+roomID;
        ResultSet rs=Stmt.executeQuery(sql1);
        while(rs.next()){
            hostid= rs.getString("hostid");
        }
        String sql4 = "select * from work.users where username='"+account+"' and password='"+password+"'";
        ResultSet rs4=Stmt.executeQuery(sql4);
        while(rs4.next()){
            id= rs4.getString("id");
        }


        if ("1".equals(visitorFlag)){
            Random random = new Random();
            id = (100000 + random.nextInt(900000))+"";
            if(account==null || "".equals(account)){
                account = id.substring(0,4);
            }
            name="游客"+account;
            visitor="1";
        }else if("client1".equals(account)){
            id="101";
            name="客户一";
        }else if("roomAdmin".equals(account)){
            id="11";
            name="房间管理员";
            roomAdmin="1";
        }else if(hostid.equals(id)){
            String   username="";
            String myid="";
            String sql2 = "select id,username,password,case sex  when '女' then 0 else 1 end sex,remark,headimg from work.users where username='"+account+"'";
            ResultSet rs2 =  Stmt.executeQuery(sql2);
            while(rs2.next()){
                username= rs2.getString("username");
                headImg= rs2.getString("headimg");
                sex= rs2.getString("sex");
                password= rs2.getString("password");
                myid=rs2.getString("id");
            }
//            id="1";
            id=myid;
            name=username;
            userType="isServer";
            roomAdmin="1";
            sex="0";
        }else{

            String myid="";
            String sql3 = "select id,username,password,case sex  when '女' then 0 else 1 end sex,remark,headimg from work.users where username='"+account+"'";
            ResultSet rs3 =  Stmt.executeQuery(sql3);
            while(rs3.next()){
                myid=rs3.getString("id");
                headImg= rs3.getString("headimg");
                sex= rs3.getString("sex");
                password= rs3.getString("password");
            }
            id=myid;
//            id=account;
            name=account;
            userType="isUser";
        }

        /**
         * 1)根据用户账号和用户密码查找数据库用户表，如果验证成功，则返回用户数据
         * 2)根据房间序号roomID可以获取到房间的主讲的用户序号，如果当前登录用户是主讲账号的话，则把userType的值设置为isServer
         * 3)如果用户是主讲或是房间普通管理员时，则把roomAdmin的值设置为1
         * 4)当获取visitorFlag的值为1时，则表示是游客登录,这时用户序号id值就要构造一个6位数的随机数，且visitor的值要设置为1，表示此用户是游客身份
         * 5)用户表用自己的，但要包含以下字段：[id(自动编码),
         * account(用户账号/字符型/默认值:空且不为null/长度:50),
         * name(用户昵称/字符型/默认值:空且不为null/长度:50),
         * password(用户陪你密码/字符型/默认值:空且不为null/长度:50),
         * sex(用户性别/整型/默认值:0/长度:1),
         * headImg(用户头像/字符型/默认值:空且不为null/长度:250)]
         */
        out.println("<user>");

        out.println("<id>"+new String(id.getBytes("ISO8859-1"), "utf-8")+"</id>");//用户序号
        out.println("<account>"+account+"</account>");//用户账号
        out.println("<name>"+name+"</name>");//用户昵称
        out.println("<password>"+password+"</password>");//用户密码
        out.println("<userType>"+userType+"</userType>");//用户类别,值只能是isServer表示主讲,isUser表示会员,根据roomID找到hostID，如果hostID和用户ID相等则是isServer,否则是isUser
        out.println("<sex>"+sex+"</sex>");//性别,值只能是1表示男,0表示女
        out.println("<headImg>"+headImg+"</headImg>");//头像地址
        out.println("<roomAdmin>"+roomAdmin+"</roomAdmin>");//是否有管理权限,值只能是1表示有,0表示无
        out.println("<visitor>"+visitor+"</visitor>");//是否游客(0:否;1:是)
        out.println("<userIP>"+userIP+"</userIP>");//用户IP
        out.println("</user>");

        out.println("<result>"+result+"</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");

    }else if("saveRecordVideo".equals(action)){//录制视频接口
        String roomID=request.getParameter("roomID");//房间序号
        String userID=request.getParameter("userID");//用户序号
        String password=request.getParameter("password");//用户密码
        String recordType=request.getParameter("recordType");//录制类型,值只能是sharing表示录制成共享资料,并同时返回uploadFile结构数据, courseware表示录制成课件,不用返回uploadFile结构数据
        String publicFile=request.getParameter("publicFile");//是否公开,值只能是1表示公开,0表示私有
        String recordName=request.getParameter("recordName");//录制标题
        recordName = new String(recordName.getBytes("ISO8859-1"), "utf-8");
        String recordFileName=request.getParameter("recordFileName");//录制文件名
        String httpRecord=request.getParameter("httpRecord");//录制网址

        String result="Error";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,如果操作失败就要设置失败信息


        String sql = "insert into work.tc_file(roomid,userid,filename,filetype,url,publicfile) values('"+roomID+"','"+userID+"','"+recordName+"','"+recordType+"','"+httpRecord+"','"+publicFile+"')";
        Stmt.executeUpdate(sql);


        String sql3 = "select max(id) max from work.tc_file ";
        String maxid="";
        ResultSet rs3 =  Stmt.executeQuery(sql3);
        while(rs3.next()){
            maxid= rs3.getString("max");
            result="Success";
        }
        /**
         * 1)获取到参数，然后插入到数据库共享文件表中，并返回共享文件序号id值
         * 2)如果recordType值为sharing时，则要返回此录制数据
         * 3)共享文件表(tc_file)字段：[id(自动编码), roomID(房间序号/整型/默认值:0/长度:4), userID(用户序号/整型/默认值:0/长度:4), fileName(文件标题/字符型/默认值:空且不为null/长度:250), fileType(文件类型/字符型/默认值:空且不为null/长度:250), url(文件网址/字符型/默认值:空且不为null/长度:250), count(文件页码/整型/默认值:0/长度:4), publicFile(是否公开/整型/默认值:1/长度:1)]
         */
        if("sharing".equals(recordType)){//录制类型,值只能是sharing表示录制成共享资料,并同时返回uploadFile结构数据, courseware表示录制成课件,不用返回uploadFile结构数据
            out.println("<uploadFile>");
            out.println("<id>"+maxid+"</id>");//共享文件序号,1的值要改成插入数据库后返回的id值
            out.println("<userID>"+userID+"</userID>");//用户序号
            out.println("<fileName>"+recordName+"</fileName>");//录制标题
            out.println("<fileType>flv</fileType>");//文件格式，只能是flv
            out.println("<url>"+httpRecord+"/"+recordFileName+"</url>");//录制后网络地址(注意：这里的url的值是httpRecord和recordFileName拼凑而成)
            out.println("<count>1</count>");//文件页数，只能为1
            out.println("<publicFile>"+publicFile+"</publicFile>");//是否公开,值只能是1表示公开,0表示私有
            out.println("</uploadFile>");
        }

        out.println("<recordType>"+recordType+"</recordType>");
        out.println("<result>"+result+"</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");

    }else if("saveUploadFile".equals(action)){//保存共享文件接口
        String roomID=request.getParameter("roomID");//房间序号
        String userID=request.getParameter("userID");//用户序号
        String password=request.getParameter("password");//用户密码
        String fileName=request.getParameter("fileName");//文件标题
        fileName = new String(fileName.getBytes("ISO8859-1"), "utf-8");
        String fileType=request.getParameter("fileType");//文件类型
        String urls=request.getParameter("url");//文件网络地址
        String count=request.getParameter("count");//文件页数
        String publicFile=request.getParameter("publicFile");//是否公开,值只能是1表示公开,0表示私有

        String result="Success";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,如果操作失败就要设置失败信息


        String sql = "insert into work.tc_file(roomid,userid,filename,filetype,url,count,publicfile) values('"+roomID+"','"+userID+"','"+fileName+"','"+fileType+"','"+urls+"','"+count+"','"+publicFile+"')";
        Stmt.executeUpdate(sql);


        String sql3 = "select max(id) max from work.tc_file ";
        String maxid="";
        ResultSet rs3 =  Stmt.executeQuery(sql3);
        while(rs3.next()){
            maxid= rs3.getString("max");
        }
        /**
         * 1)获取到参数，然后插入到数据库共享文件表中，并返回共享文件序号id
         * 2)共享文件表(tc_file)字段：[id(自动编码), roomID(房间序号/整型/默认值:0/长度:4), userID(用户序号/整型/默认值:0/长度:4), fileName(文件标题/字符型/默认值:空且不为null/长度:250), fileType(文件类型/字符型/默认值:空且不为null/长度:250), url(文件网址/字符型/默认值:空且不为null/长度:250), count(文件页码/整型/默认值:0/长度:4), publicFile(是否公开/整型/默认值:1/长度:1)]
         */
        out.println("<id>"+maxid+"</id>");//共享文件序号
        out.println("<result>"+result+"</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");

    }else if("listUploadFile".equals(action)){//房间共享文件列表接口
        String roomID=request.getParameter("roomID");//房间序号

        String id="";
        String userid="";
        String filename="";
        String filetype="";
        String urls="";
        String count="";
        String publicfile="";
        String sql3 = "select * from work.tc_file where roomid="+roomID;
        ResultSet rs3 = Stmt.executeQuery(sql3);
        while(rs3.next()){
            id=rs3.getString("id");
            userid=rs3.getString("userid");
            filename=rs3.getString("filename");
            filetype=rs3.getString("filetype");
            urls=rs3.getString("url");
            count=rs3.getString("count");
            publicfile=rs3.getString("publicfile");

        }
        /**
         * 1)根据房间序号roomID从共享文件列表中获取本房间的文件列表数据
         */
        out.println("<uploadFileList>");

        out.println("<uploadFile>");
        out.println("<id>"+id+"</id>");//共享文件序号
        out.println("<userID>"+userid+"</userID>");//用户序号
        out.println("<fileName>"+filename+"</fileName>");//文件标题
        out.println("<fileType>"+filetype+"</fileType>");//文件类型
        out.println("<url>"+urls+"</url>");//文件网络地址
        out.println("<count>"+count+"</count>");//文件页数
        out.println("<publicFile>"+publicfile+"</publicFile>");//是否公开,值只能是1表示公开,0表示私有
        out.println("</uploadFile>");

        out.println("</uploadFileList>");

    }else if("deleteUploadFile".equals(action)){//删除共享文件接口
        String roomID=request.getParameter("roomID");//房间序号
        String userID=request.getParameter("userID");//用户序号
        String password=request.getParameter("password");//用户密码
        String id=request.getParameter("id");//共享文件序号

        String result="Error";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,如果操作失败就要设置失败信息

        String testuserid="";
        String sql3 = "select * from work.tc_file where id="+id;
        ResultSet rs3 =  Stmt.executeQuery(sql3);
        while(rs3.next()){
            testuserid= rs3.getString("userid");


        }
        if(testuserid.equals(userID)){
            String sql = "delete from work.tc_file where id="+id;
            Stmt.executeUpdate(sql);
            result="Success";

        }

        /**
         * 1)根据用户序号和用户密码验证用户是否有权限操作
         * 2)根据共享文件id删除共享文件表中的相应的记录
         */
        out.println("<result>"+result+"</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");

    }else if("makeUploadFile".equals(action)){//设置共享文件权限接口
//        String userID= (String) session.getAttribute("id");
        String roomID=request.getParameter("roomID");//房间序号
        String userID=request.getParameter("userID");//用户序号
        String password=request.getParameter("password");//用户密码
        String id=request.getParameter("id");//共享文件序号
        String publicFile=request.getParameter("publicFile");//是否公开,值只能是1表示公开,0表示私有

        String result="Error";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,如果操作失败就要设置失败信息

        String testuserid="";
        String sql3 = "select * from work.tc_file where id="+id;
        ResultSet rs3 = Stmt.executeQuery(sql3);
        while(rs3.next()){
            testuserid= rs3.getString("userid");
        }
        if(testuserid.equals(userID)){
            String sql = "update work.tc_file set publicfile='"+publicFile+"' where id="+id;
            Stmt.executeUpdate(sql);
            result="Success";
        }
        /**
         * 1)根据用户序号和用户密码验证用户是否有权限操作
         * 2)根据共享文件id设置共享文件表中的相应的记录
         */
        out.println("<result>"+result+"</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");

    }else if("saveChat".equals(action)){//保存聊天记录接口
        String roomID=request.getParameter("roomID");//房间序号
        String sendUserID=request.getParameter("sendUserID");//发送用户序号
        String sendUserName=request.getParameter("sendUserName");//发送用户昵称
        sendUserName = new String(sendUserName.getBytes("ISO8859-1"), "utf-8");
        String acceptUserID=request.getParameter("acceptUserID");//接收用户序号
        String acceptUserName=request.getParameter("acceptUserName");//接收用户昵称
        acceptUserName = new String(acceptUserName.getBytes("ISO8859-1"), "utf-8");
        String content=request.getParameter("content");//聊天内容
        content = new String(content.getBytes("ISO8859-1"), "utf-8");

        String result="Error";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,如果操作失败就要设置失败信息
        String sql = "insert into work.tc_chat(roomid,senduserid,sendusername,acceptuserid,acceptusername,content) values('"+roomID+"','"+sendUserID+"','"+sendUserName+"','"+acceptUserID+"','"+acceptUserName+"','"+content+"')";
        Stmt.executeUpdate(sql);
        /**
         * 1)获取到参数，然后插入到数据库聊天记录表中
         * 2)聊天记录表(tc_chat)字段：[id(自动编码), roomID(房间序号/整型/默认值:0/长度:4), sendUserID(发送用户序号/整型/默认值:0/长度:4), sendUserName(发送用户昵称/字符型/默认值:空且不为null/长度:50), acceptUserID(接收者用户序号/整型/默认值:0/长度:4), acceptUserName(接收用户昵称/字符型/默认值:空且不为null/长度:50), content(聊天内容/字符型/默认值:空且不为null/长度:250)]
         */
        out.println("<result>"+result+"</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");

    }else if("editNickname".equals(action)){//修改昵称接口
        String roomID=request.getParameter("roomID");//房间序号
//        String operatorID=request.getParameter("operatorID");//操作者用户序号
        String operatorPWD=request.getParameter("operatorPWD");//操作者用户密码

        String operatorID= (String) session.getAttribute("id");//操作者用户序号
        String userID=request.getParameter("userID");//用户序号
        String nickname=request.getParameter("nickname");//用户昵称
        nickname = new String(nickname.getBytes("ISO8859-1"), "utf-8");

        String result="Error";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,如果操作失败就要设置失败信息



        String tf="error";
        String sql7 = "select  *  from work.users where password='"+operatorPWD+"' and id="+operatorID;
        ResultSet rs5 =Stmt.executeQuery(sql7);
        while(rs5.next()){
            tf="Success";
        }

        if(tf.equals("Success")){

            String sql = "update work.users set name='"+nickname+"' where id="+userID;
            Stmt.executeUpdate(sql);
            result="Success";
        }

        result="Success";

        /**
         * 1)根据操作者用户序号和操作者用户密码验证用户是否有权限操作
         * 2)根据用户序号userID设置新的用户昵称
         */
        out.println("<result>" + result + "</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");
    }else if("editPassword".equals(action)){//修改密码接口
        String roomID=request.getParameter("roomID");//房间序号

        //String userID=request.getParameter("userID");//用户序号
        String oldPWD=request.getParameter("oldPWD");//旧密码
        String newPWD=request.getParameter("newPWD");//新密码

        String userID= (String) session.getAttribute("id");

        String result="Error";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,如果操作失败就要设置失败信息


        String testpasswd="";
        String sql3 = "select *  from work.users where id="+userID;
        ResultSet rs3 =Stmt.executeQuery(sql3);
        while(rs3.next()){
            testpasswd= rs3.getString("password");
        }
        if(testpasswd.equals(oldPWD)){
            String sql = "update work.users set password='"+newPWD+"' where id="+userID;
            Stmt.executeUpdate(sql);
            result="Success";
        }

        /**
         * 1)根据用户序号和用户旧密码验证用户是否有权限操作
         * 2)根据用户序号userID设置新密码
         */
        out.println("<password>"+newPWD+"</password>");
        out.println("<result>"+result+"</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");
    }else if("editRoom".equals(action)){//修改房间接口
        String roomID=request.getParameter("roomID");//房间序号
        String userID= (String) session.getAttribute("id");
//        String userID=request.getParameter("userID");//用户序号
        String password=request.getParameter("password");//用户密码
        String editType=request.getParameter("editType");//房间表要修改的字段名(房间名称:roomName,房间公告:note,查看文件:dibbling,呼叫对方:callFlag）
        String editData=request.getParameter("editData");//修改数据
        editData=new String(editData.getBytes("ISO8859-1"), "utf-8");

        String result="Error";//结果,值只能为Success表示成功,Error表示失败
        String resultInfo="";//结果提示,如果操作失败就要设置失败信息

        String testpasswd="";
        String sql3 = "select *  from work.users where id="+userID;
        ResultSet rs3 = Stmt.executeQuery(sql3);
        while(rs3.next()){
            testpasswd= rs3.getString("password");
        }
        if(testpasswd.equals(password)){
            String sql = "update work.tc_room set "+editType+"='"+editData+"' where id="+roomID;
            Stmt.executeUpdate(sql);
            result="Success";
        }

        /**
         * 1)根据用户序号和用户密码验证用户是否有权限操作
         * 2)根据要修改的房间序号roomID去更新字段名editType的值为修改数据editData
         */
        out.println("<result>"+result+"</result>");
        out.println("<resultInfo>"+resultInfo+"</resultInfo>");

    }else if("chatfaceList".equals(action)) {//聊天表情接口
        /**
         * 1)循环列出聊天表情数据
         */
        out.println("<chatfaceList>");
        for (int i = 1; i <= 90; i++) {
            out.println("<chatface>");
            out.println("<id>" + i + "</id>");
            out.println("<ico>" + i + ".swf</ico>");
            out.println("<name>" + i + "</name>");
            out.println("</chatface>");
        }
        out.println("</chatfaceList>");

    }
    out.println("</root>");
%>