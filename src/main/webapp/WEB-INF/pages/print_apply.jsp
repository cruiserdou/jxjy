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
            width: 600px;
            height: 500px;
            border: 1px solid #ccc;
            border-radius: 2px;
            padding: 30px;
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
            font-size: 12px;
            border: 0px solid #0C0000;
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
<div>
    <h2 align="center">经营性道路客货运输驾驶员继续教育申请表</h2>
       <table  style="width: 75%;align:center; margin:auto; border:1px solid #0C0000;border-collapse:collapse;">
                <tr>
                    <td  height="25" width="20%">姓名</td><td  width="15%">${name}</td>
                    <td  width="15%">性别</td><td width="15%">${sex}</td>
                    <td  width="12%">学历</td><td width="12%">${education}</td>
                    <td   width="11%" rowspan="4">
                        <img   width=100% height=100% style="height:100px;" src="static/upload/${photo}"/>
                    </td></tr>
                <tr>
                    <td height="25">住址</td><td colspan="5"><span  style="width:90px;" >${address}</span></td>
                </tr>
                <tr>
                    <td height="25">工作单位</td><td colspan="5"><span style="width:90px;" >${workunit}</span></td>
                </tr>
                <tr>
                    <td height="25">身份证号</td><td colspan="5">${card}</td>
                </tr>
                <tr><td >驾驶证准驾车型</td><td colspan="2">${lictype}</td>
                    <td>初领驾驶证日期</td><td colspan="3">${licdt}</td>
                </tr>
                <tr>
                    <td>申请种类</td><td colspan="3">

                    <input type="radio" name="applytp" value="初领" ${applytp=='初领'?'checked':'' }/>初领
                       <td style="border-left: none;" colspan="3">
                    <input type="radio" name="applytp" value="增驾" ${applytp=='增驾'?'checked':'' }/>增驾
                     </td>
                </tr>
                <tr>
                    <td>原从业资格证件号</td><td colspan="6">${qulfnum}</td>
                </tr>
                <td>申请类别</td><td colspan="6">
                <input type="checkbox" disabled name="licmd" value="道路旅客运输" ${licmd!=''?'checked':'' }/>道路旅客运输&nbsp;
                <input type="checkbox" disabled name="licmd_goods" value="道路货物运输" ${licmd_goods=='道路货物运输'?'checked':'' }/>道路货物运输&nbsp;
            </td>
            </td>
                <tr>
                    <td>材料清单</td><td colspan="6">
                    <input type="checkbox" disabled name="checklist1" value="身份证明原件" ${checklist1 ?'checked':'' }/> 身份证明原件&nbsp;
                    <input type="checkbox" disabled name="checklist2" value="身份证明复印件" ${checklist2 ?'checked':'' }/>身份证明复印件&nbsp;
                    <input type="checkbox" disabled name="checklist3" value="驾驶证原件" ${checklist3==true?'checked':'' }/>驾驶证原件&nbsp;
                    <input type="checkbox" disabled name="checklist4" value="驾驶证复印件" ${checklist4=='true'?'checked':'' }/>驾驶证复印件&nbsp;
                    <input type="checkbox" disabled name="checklist5" value="无重大以上责任事故记录证明" ${checklist5=='true'?'checked':'' }/>无重大以上责任事故记录证明&nbsp;
                </td>
                </tr>
                <tr>
                    <td>承&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp诺</td><td colspan="6"><p>本人承诺上述所有内容真实、有效、并承担由此产生的法律责任</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人签字：${promise}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：${promisedt}
                </tr>
                <tr>
                    <td rowspan="5">考试记录</td><td colspan="2">成绩</td><td colspan="2">考核员</td><td colspan="2">考核员</td>
                </tr>
                <tr>
                    <td colspan="2" height="23"></td><td colspan="2" height="23"></td><td colspan="2" height="23"></td>
                </tr>
                <tr>
                    <td colspan="2"height="23" ></td><td colspan="2" height="23"></td><td colspan="2" height="23"></td>
                </tr>
                <tr>
                    <td colspan="2" height="23"></td><td colspan="2" height="23"></td><td colspan="2" height="23"></td>
                </tr>
                <tr>
                    <td colspan="2" height="23"></td><td colspan="2" height="23"></td><td colspan="2" height="23"></td>
                </tr>
                <tr>
                    <td>道路运输管理机构意见</td><td colspan="6">（盖章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  type="date" /></td>
                </tr>
                <tr>
                    <td rowspan="2">从业资格证发放</td>
                    <td>发放人（签字）</td><td colspan="2"></td><td>日期</td><td colspan="2"><span  type="date" /></td>
                </tr>
                <tr>
                    <td>领取人（签字）</td><td colspan="2"></td><td>日期</td><td colspan="2"><span  type="date" /></td>
                </tr>
            </table>



</div>
<script>
    print();
</script>
</body>
</html>