/**
 * Created by xwq on 14-5-2.
 */


var sel_exam_Tpl = [
    '<div id="sel_exam_wrap_top" class="sel_exam_wrap">',
    '<a onclick="check_exams_ks(\'{status}\');"  href="#">继续教育考试</a>',
    '</div>',
    '<div class="sel_exam_wrap">',
    '<a  onclick="check_score(\'{status}\');"  href="#" value="我的成绩"><span>我的成绩</span></a>',
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

function check_score(status) {

        Ext.Ajax.request({
            method: "POST",
            url:'check_trainer_score',
            success: function (response,opts) {
                var obj=Ext.decode(response.responseText);
                if(obj.success)
                {
                    document.location.href="score_query";

                }else{
                    swal("您好！您还没有参加考试！");
                    document.location.href="https://www.wwyg.com:8443/jxjy/";
                }
            },
            failure: function () {
                Ext.Msg.alert("提示", "联系系统管理员，检查考生状态！");
            }
        });
}

function check_exams_ks(status) {
    Ext.Ajax.request({
        method: "POST",
        url:'check_wj_trainer_info',
        success: function (response,opts) {
            var obj=Ext.decode(response.responseText);
            if(obj.success)
            {
                Ext.Ajax.request({
                    method: "POST",
                    url: 'obtain_check_exams_info',
                    success: function (response, opts) {
                        var obj = Ext.decode(response.responseText);
                        if (obj.success) {
                            document.location.href = "examing";

                        } else {
                            swal({
                                title: "信息提示",
                                text: "您已提交成绩，无法再次考试！",
                                type: "warning",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "OK ",
                                closeOnConfirm: false
                            }, function (isConfirm) {
                                if (isConfirm) {
                                    document.location.href = "https://www.wwyg.com:8443/jxjy/";
                                } else {
                                    document.location.href = "https://www.wwyg.com:8443/jxjy/";
                                }
                            });
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert("提示", "联系系统管理员，检查考生状态！");
                    }
                });

            }else{
                swal({
                    title: "信息提示",
                    text: "您存在违纪行为！",
                    type: "warning",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK ",
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        document.location.href="https://www.wwyg.com:8443/jxjy/";
                    }else{
                        document.location.href="https://www.wwyg.com:8443/jxjy/";
                    }
                });
            }
        },
        failure: function () {
            Ext.Msg.alert("提示", "联系系统管理员，检查考生状态！");
        }
    });

}
