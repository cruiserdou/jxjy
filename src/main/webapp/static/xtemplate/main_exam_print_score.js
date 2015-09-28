/**
 * Created by xwq on 14-5-2.
 */
var sel_exam_Tpl = [


    '<div class="sel_exam_wrap">',
    '<img style="height: 60px; width: 80px;" src="static/css/images/loading.jpg"/>',
    '<a  onclick="print_score(\'{card}\');"  href="#" value="我的成绩"><span>确定打印</span></a>',
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



function print_score(card) {
    document.location.href="http://10.47.83.209:8080/test_mvc/print?card="+card;
}
