/**
 * Created by xwq on 14-5-2.
 */
var sel_exam_Tpl = [
    '<div class="examing_wrap">',
    '<h2 style="display: inline;">考试成绩：</h2><span id="ala" style="color:green;">{scores}</span><span id="score_ok" style="color: green">{result}</span>',
    '<hr><br/><br/>',

    '<div id="base_info">',
    '<table>',
    '<tr>',
    '<th>姓名:</th>',
    '<td>{name}</td>',
    '</tr>',
    '<tr>',
    '<th>性别:</th>',
    '<td>{sex}</td>',
    '</tr>',
    '<tr>',
    '<th>身份证号:</th>',
    '<td>{card}</td>',
    '</tr>',
    '<tr>',
    '<th>准驾车型:</th>',
    '<td>{lictype}</td>',
    '</tr>',
    '<tr>',
    '<th>资格类别:</th>',
    '<td>{licmd}</td>',
    '</tr>',
    '</table>',
    '</div>',

    '<div id="img">',
    '<img src="static/upload/{photo}"/>',
//    '<div id="score_wrap"><span id="han">成绩：</span><span id="ala">89</span></div>',
    '</div>',

    '<div style="margin: 1; border:1px">',
//    '<table  class="trainer_table" style="width: 100%;align:center; margin:auto; border:1px solid #0C0000;border-collapse:collapse;">',
    '<table style="width: 100%; align:center; border-collapse:collapse;" border="1">',
    '<tr align=center bgcolor="#cccccc">',
    '<td>×</td>',
    '<td>√</td>',
    '<td>空</td>',
    '<td>成绩</td>',
    '<td>结果</td>',
    '</tr>',
    '<tr align=center>',
    '<td>{wrong}</td>',
    '<td>{right}</td>',
    '<td>{no}</td>',
    '<td>{scores}</td>',
    '<td>{result}</td>',
    '</tr>',
    '</table>',

    //'<a onclick="print_trainer_score(\'{card}\');"   id="start_btn">成绩单打印</a>',

    '</div>'
];


var login_exam_Tpl = [
    '<div id="login_form">',
    '<form >',
    '<table id="login_table">',
    '<tr>',
    '<td colspan="2">资格考试1</td>',
    '</tr>',
    '<tr>',
    '<td class="td_head">身份证号：</td>',
    '<td><input type="text" name="id"/></td>',
    '</tr>',
    '<tr>',
    '<td class="td_head">姓名：</td>',
    '<td><input type="text" name="id"/></td>',
    '</tr>',
    '<tr>',
    '<td class="td_head">密码：</td>',
    '<td><input type="password" name="id"/></td>',
    '</tr>',
    '</table>',
    '</form>',
    '</div>'
];



function print_trainer_scorew(card) {

    //document.location.href="print_trainer_score";
    //document.location.href="http://192.168.3.13:8081/test_mvc/print?card="+card;
    document.location.href="http://10.47.83.209:8080/test_mvc/print?card="+card;

}

