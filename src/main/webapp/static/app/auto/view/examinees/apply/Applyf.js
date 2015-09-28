var str = "static/upload/";
Ext.define('App.view.examinees.apply.Applyf', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.applyf',
    iconCls: "icon_upload",
    layout: 'fit',
    applyTpl: [
        '<div class="wrap_center">',
        '<form id="apply_form">',
        '<h2 align="center">武威市道路交通运输驾驶员继续教育学员登记表</h2>',
        '<table id="appro_table">',
        '<tr>',
        '<td>姓名<span style="color: red">*</span></td><td><input id="apply_form_id_name" style="width:60px;" name="name"  type="text" value="{name}"/></td>',
        '<td>性别<span style="color: red">*</span></td><td>' +
            '<select id="apply_form_id_sex"  name="sex" size="1"  style="margin:-2;width:100%;height:100%;font-size:13px;background:#FFFFFF">',
            '<option name="sex" value="男" selected="">男</option>',
            '<option name="sex" value="女" >女</option>',
        '</select>',
        '</td>',
        '<td>电话<span style="color: red">*</span></td><td><input id="apply_form_id_education" style="width:100px;" name="education"  type="text" value="{education}"/></td>',
        '</td>',
        '<td style="width:120px;" rowspan="4">',
        '<img onclick="pub_upload_file(\'apply_form_img\')" src="static/upload/per.png?id=<$new Date()$>" id="apply_form_img" name="photo" value="{photo}" src="" style="width: 136px; height: 120px;" title="点击上传照片"  alt="点击上传照片"/>',
        '<span>点击上传照片</span>',
        '</td></tr>',
        '<tr>',
        '<td>服务单位<span style="color: red">*</span></td><td colspan="5"><input id="apply_form_id_workunit"   style="width:450px;" name="workunit"  type="text" value="{workunit}"/></td>',
        '</tr>',
        '<tr>',
        ' <td>详细地址<span style="color: red">*</span></td><td colspan="5"><input id="apply_form_id_address"  style="width:450px;" name="address"  type="text" value="{address}"/></td>',
        '</tr>',
        '<tr>',
            '<td>身份证号<span style="color: red">*</span></td><td colspan="5"><input  onblur="card_check()" id="apply_form_id_card" style="width:150px;" name="card"  type="text" value="{card}"/></td>',
        '</tr>',
        '<tr>',
        ' <td>原从业资格证件号<span style="color: red">*</span></td><td colspan="6"><input style="width:98px;"  id="apply_form_id_lictype"    name="lictype"  type="text" value="{lictype}"/></td>',
        '</tr>',
        ' <td>申请类别<span style="color: red">*</span></td><td colspan="6">',
        '<input type="checkbox" id="apply_form_id_licmd" name="licmd" value="道路旅客运输" />道路旅客运输&nbsp;',
        '<input type="checkbox" id="apply_form_id_licmd_goods" name="licmd"  name="licmd_goods" value="道路货物运输"/>道路货物运输&nbsp;',
        '<input type="checkbox" id="apply_form_id_checklist1" name="licmd"  name="checklist1" value="道路危险货物运输"/>道路危险货物运输&nbsp;',
        '<input type="checkbox" id="apply_form_id_checklist2" name="licmd"  name="checklist2" value="出租客运"/>出租客运&nbsp;',
        '</td>',
        '</td>',
        '</tr>',
        '<tr>',
        ' <td>材料清单<span style="color: red">*</span></td><td colspan="6">',
        '<input type="checkbox" name="checklist3" value="驾驶员及复印件"/>驾驶员及复印件&nbsp;',
        '<input type="checkbox" name="checklist4" value="身份证及复印件"/>身份证及复印件&nbsp;',
        '<input type="checkbox" name="checklist5" value="从业资格证及复印件"/>从业资格证及复印件&nbsp;',
        '</td>',
        '</tr>',
        '<tr>',
        '<td colspan="7"><p  style="text-indent:24px;">本人承诺所提供的继续再教育信息及相关材料真实、有效、并承担由此产生的法律责任。</p></br></br>',
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        '驾驶员签字：<input id="apply_form_id_promise" style="width:98px;" name="promise"  type="text" value="{promise}"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '日期：<input type="date"  id="apply_form_id_promisedt" name="promisedt"  value="{promisedt}" />',
        '</td>',
        '</tr>',
        ' <td>继续教育培训机构</td><td colspan="6"><input id="apply_form_drvschool" style="width:60px;" name="drvschool"  type="text" value="{drvschool}"/></td>',
        '</tr>',
        '</tr>',
        ' <td>参加继续教育时间</td><td colspan="6"><input type="date"  id="apply_form_id_st_tk_dt" name="st_tk_dt"  value="{st_tk_dt}" /> &nbsp;至 &nbsp;    <input type="date"  id="apply_form_id_end_tk_dt" name="end_tk_dt"  value="{end_tk_dt}" /></td>',
        '</tr>',
        '</tr>',
        ' <td>参加继续周期起止年月</td><td colspan="6"><input type="date" id="apply_form_id_zq_st_tk_dt" name="zq_st_tk_dt"  value="{zq_st_tk_dt}" /> &nbsp;至 &nbsp;    <input type="date"  id="apply_form_id_zq_end_tk_dt" name="zq_end_tk_dt"  value="{zq_end_tk_dt}" /></td>',
        '</tr>',
        '<tr>',
        '<td rowspan="2">继续教育培训机构意见</td>',
        '<td colspan="6"><input id="apply_form_remark" style="width:600px; height:100px " name="remark"  type="text" value="{remark}"/></td>',
        '</tr>',
        '</table>',
        '<p  style="text-indent:24px;">说明：此表由道路运输驾驶员继续教育培训机构保存</p>',
        '</form>',
        '</div>'
    ],
    border: false,
    id: 'image-upload',
    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                id: 'applyf_panel',
                autoScroll: true,
                tpl: Ext.create('Ext.XTemplate', this.applyTpl),
                listeners: {
                    afterrender: function () {
                        var obtain_panel = Ext.getCmp('applyf_panel');
                        obtain_panel.tpl.overwrite(obtain_panel.body, {});
                    }
                },
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        border: true,
                        items: [
                            {
                                text: '新建',
                                iconCls: 'icon_add',
                                handler: function () {
                                    document.getElementById('apply_form').reset();
                                    document.getElementById('apply_form_img').src = '';
                                }
                            },
                            '-',
                            {
                                text: '保存',
                                iconCls: 'icon_save',
                                handler: function () {
                                    var id = document.getElementById("apply_form_id_card").value;


                                    if (id == "") {
                                        Ext.Msg.alert("提示", "<span style='color: red;'>身份证号不能为空！</span>")
                                        return;
                                    }
                                    if (document.getElementById("apply_form_id_name").value == "") {
                                        Ext.Msg.alert("提示", "<span style='color: red;'>考生姓名不能为空！</span>")
                                        return;
                                    }
                                    if (document.getElementById("apply_form_id_education").value == "") {
                                        Ext.Msg.alert("提示", "<span style='color: red;'>电话不能为空！</span>")
                                        return;
                                    }
                                    if (document.getElementById("apply_form_id_address").value == "") {
                                        Ext.Msg.alert("提示", "<span style='color: red;'>详细地址不能为空！</span>")
                                        return;
                                    }
                                    if (document.getElementById("apply_form_id_workunit").value == "") {
                                        Ext.Msg.alert("提示", "<span style='color: red;'>服务单位不能为空！</span>")
                                        return;
                                    }

                                    if (document.getElementById("apply_form_id_lictype").value == "") {
                                        Ext.Msg.alert("提示", "<span style='color: red;'>原从业资格证件号不能为空！！</span>")
                                        return;
                                    }

                                    if(document.getElementById("apply_form_id_licmd").checked==false
                                        && document.getElementById("apply_form_id_licmd_goods").checked==false
                                        && document.getElementById("apply_form_id_checklist1").checked==false
                                        && document.getElementById("apply_form_id_checklist2").checked==false){
                                        Ext.Msg.alert("提示", "<span style='color: red;'>申请类别不能为空！</span>")
                                        return;
                                    }

                                    if (document.getElementById("apply_form_id_promise").value == "") {
                                        Ext.Msg.alert("提示", "<span style='color: red;'>本人签字不能为空！</span>")
                                        return;
                                    }

                                    obt_card_check();

                                }
                            }
                        ]
                    }
                ]
            }
        ]
        this.callParent(arguments);
    }
});


function NumberCheck(num)
{
    var regex = /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/;
    return regex.exec(num) != null;
}

function card_check()
{
    if (!NumberCheck(document.getElementById('apply_form_id_card').value))
    {
        Ext.Msg.alert("提示：","身份证格式不对！请重新输入。");
        return;
    }
}

var photo_file="";
function pub_card_check(card) {
    if (!NumberCheck(document.getElementById('apply_form_id_card').value)) {
        Ext.Msg.alert("提示：", "身份证格式不对！请重新输入。");
        return;
    }
}



function pub_upload_file(id) {
    var cust_id = document.getElementById('apply_form_id_card').value;
    if (cust_id == "") {
        Ext.Msg.alert("提示", "<b style='color: red;'>请先填写身份证号！</b>");
        return;
    }


    Ext.create('widget.window', {
        title: '上传照片',
        modal: true,
        iconCls: 'icon_add',
        id:'uploadpic_windows',
        width: 270,
        height: 120,
        border: false,
        layout: 'fit',
        defaults: {
            width: 200,
            allowBlank: false
        },
        items: [
            {
                xtype: 'form',
                frame: true,
                bodyPadding: 10,
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 70
                },
                defaults: {
                    labelAlign: 'right',
                    xtype: 'textfield'
                },
                items: [
                    {
                        xtype: 'filefield',
                        labelWidth: 60,
                        name: 'file',
                        fieldLabel: '照片上传',
                        buttonText: '选择文件'
                    }
                ],
                buttonAlign: "center",
                buttons: [
                    {
                        text: '保存',
                        iconCls: 'icon_save',
                        handler: function () {
                            document.getElementById('apply_form_img').src ='static/upload/per.png';
                            var cust_id = document.getElementById('apply_form_id_card').value;
                            if (cust_id != "") {
                                var form = this.up('form').getForm();
                                if (form.isValid()) {
                                    form.submit({
                                        url: 'upload_file_xwq',
                                        method: 'POST',
                                        params: {
                                            card_id: cust_id
                                        },
                                        waitMsg: '正在保存...',
                                        success: function (form, action) {
                                            Ext.Msg.alert("成功", "保存成功!");
                                            document.getElementById('apply_form_img').src = 'static/upload/'+ cust_id+".jpg";
                                            Ext.getCmp('uploadpic_windows').close();
                                        },
                                        failure: function (form, action) {
                                            Ext.Msg.alert("失败", "保存失败!");
                                        }
                                    });
                                }
                            } else {
                                Ext.Msg.alert("提示", "请先输入身份证号！");
                            }
                        }
                    },
                    {
                        text: '重置',
                        iconCls: 'icon_reset',
                        handler: function () {
                            this.up('form').getForm().reset();
                        }
                    }
                ]
            }

        ]
    }).show(Ext.get(id));
};


//考生信息
function obt_apply_insert() {
    var form_obt_apply = document.getElementById("apply_form");
    Ext.Ajax.request({
        method: "POST",
        params: {
//            card:card,
            name: form_obt_apply['name'].value,
            sex: form_obt_apply['sex'].value,
            education: form_obt_apply['education'].value,
            address: form_obt_apply['address'].value,
            workunit: form_obt_apply['workunit'].value,
            card: form_obt_apply['card'].value,
            lictype: form_obt_apply['lictype'].value,
            applytp: "",
            licmd: form_obt_apply['licmd'].checked,
            licmd_goods: form_obt_apply['licmd_goods'].checked,
            photo:photo_file,
            checklist1: form_obt_apply['checklist1'].checked,
            checklist2: form_obt_apply['checklist2'].checked,
            checklist3: form_obt_apply['checklist3'].checked,
            checklist4: form_obt_apply['checklist4'].checked,
            checklist5: form_obt_apply['checklist5'].checked,
            st_tk_dt: form_obt_apply['st_tk_dt'].value,
            end_tk_dt: form_obt_apply['end_tk_dt'].value,
            zq_st_tk_dt: form_obt_apply['zq_st_tk_dt'].value,
            zq_end_tk_dt: form_obt_apply['zq_end_tk_dt'].value,
            promise: form_obt_apply['promise'].value,
            promisedt:form_obt_apply['promisedt'].value,
            remark: form_obt_apply['remark'].value
        },
        url: 'add_trainers_info',
        success: function () {
            Ext.Msg.alert("提示", "保存成功！");
        },
        failure: function () {
            Ext.Msg.alert("提示", "保存失败！");
        }
    });
}


//考生身份证检查
function obt_card_check() {
    var form_obt_apply_card = document.getElementById("apply_form");
    Ext.Ajax.request({
        method: "POST",
        params: {
            card: form_obt_apply_card['card'].value
        },
        url: 'check_card_trainers_info',
        success: function (response,opts) {
            var obj=Ext.decode(response.responseText);

            if(obj.success)
            {
                obt_apply_insert()
                document.getElementById('apply_form').reset();
                document.getElementById('apply_form_img').src = '';
            }else{
                Ext.Msg.alert("提示", "该学员身份证已报名，无法保存！");
            }
        },
        failure: function (response,opts) {
            Ext.Msg.alert("提示", "错");
            obt_apply_insert()
            document.getElementById('apply_form').reset();
            document.getElementById('apply_form_img').src = '';
        }
    });
}