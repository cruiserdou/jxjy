/**
 * Created by xwq on 14-5-2.
 */
var sel_exam_Tpl = [
    '<div class="examed_wrap">',
    '<h2>选择题</h2>',
    '<hr><br/><br/>',

    '<div>',
    '<ol>',

    '<tpl for="list">',
    '<li class="question_xwq">',
    '{question_xwq}',
    '<ol class="answer">',
    '<li type="A"><input name={qtnum}  type="radio" value="A"/>{qt_a}</li>',
    '<li type="A"><input name={qtnum}  type="radio" value="B"/>{qt_b}</li>',
    '<li type="A"><input name={qtnum}  type="radio" value="C"/>{qt_c}</li>',
    '<li type="A"><input name={qtnum}  type="radio" value="D"/>{qt_d}</li>',
    '</ol>',
    '</li>',
    '</tpl>',


    '</ol>',

    '<a href="score" id="start_btn">交卷</a>',

    '</div>'
];


//考生信息
function obt_answers_insert() {
    var form_obt_answers = document.getElementById("examed_wrap");
    Ext.Ajax.request({
        method: "POST",
        params: {
            answer: form_obt_answers['answer'].value
        },
        url: 'add_answers_info',
        success: function () {
            Ext.Msg.alert("提示", "保存成功！");
        },
        failure: function () {
            Ext.Msg.alert("提示", "保存失败！");
        }
    });
}

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