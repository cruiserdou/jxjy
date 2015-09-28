var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.examinees.maint.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.maintf_grid',
    store: 'syj_trainer_maint',
    selModel: sm,
    id :'grid_trainer_maint',
    listeners: {
        listeners: {
            itemclick: function (this_, record_) {
                var trainer_maintf_panel = Ext.getCmp('trainer_maint_info');
                trainer_maintf_panel.tpl.overwrite(trainer_maintf_panel.body, record_.data);
            }
        },
        'itemdblclick': function (view, record, item, index, e) {
        //创建模板
        var apply_edits = new Ext.XTemplate(
            '<div class="wrap_center">',
            '<form id="apply_edit_form">',
            '<h2 align="center">武威市道路交通运输驾驶员继续教育学员登记表</h2>',
//            '<button align="center" onclick="obt_apply_insert({card});">保存</button>',
            '<a href="#"  onclick="obt_apply_update(\'{card}\')">保存</a>',
            '<table id="appro_table">',
            '<tr>',
            '<td>姓名<span style="color: red">*</span></td><td><input id="apply_form_id_name" style="width:60px;" name="name"  type="text" value="{name}"/></td>',
            '<td>性别<span style="color: red">*</span></td><td>' +
            '<select id="apply_form_id_sex" name="sex"  size="1"  style="margin:-2;width:100%;height:100%;font-size:13px;background:#FFFFFF">',
            '<option name="sex" value="男"  >男</option>',
            '<option name="sex" value="女"  <tpl if="this.checkSex_f(sex)">selected=""</tpl> >女</option>',
            '</select>',
            '</td>',
            '<td>电话<span style="color: red">*</span></td><td><input id="apply_form_id_education" style="width:60px;" name="education"  type="text" value="{education}"/></td>',
            '<td style="width:120px;" rowspan="4">',
            '<img onclick="pub_upload_file_edit(\'{card}\',\'apply_form_img_edit\')" id="apply_form_img_edit" name="photo" value="{photo}"   style="width: 136px; height: 139px;" src="static/upload/{photo}?id=<$new Date()$>"  alt="点击上传照片"/>',
            '</td></tr>',
            '<tr>',
            ' <td>服务单位<span style="color: red">*</span></td><td colspan="5"><input id="apply_form_id_workunit"  style="width:90px;" name="workunit"  type="text" value="{workunit}"/></td>',
            '</tr>',
            '<tr>',
            '<td>详细地址<span style="color: red">*</span></td><td colspan="5"><input id="apply_form_id_address"  style="width:90px;" name="address"  type="text" value="{address}"/></td>',
            '</tr>',
            '<tr>',
                '<td>身份证号<span style="color: red">*</span></td><td colspan="5"><span id="apply_form_id_card_edit"  style="width:150px;" name="card"  type="text" value="{card}">{card}</span></td>' +
                //'<td><input style="visibility:hidden" id="apply_form_id_pxnum"  name="pxnum"  type="text" value="{pxnum}"/></td>',
            '</tr>',
                '<tr><td>驾驶证准驾车型<span style="color: red">*</span></td><td colspan="2">' +
                '<select id="apply_form_id_lictype" name="lictype"  size="1"  style="margin:-2;width:100%;height:100%;font-size:13px;background:#FFFFFF">',
            '<option name="lictype" value="A1" <tpl if="this.checktype_A1(lictype)">selected=""</tpl>>A1</option>',
            '<option name="lictype" value="A2" <tpl if="this.checktype_A2(lictype)">selected=""</tpl>>A2</option>',
            '<option name="lictype" value="A3" <tpl if="this.checktype_A3(lictype)">selected=""</tpl>>A3</option>',
            '<option name="lictype" value="B1" <tpl if="this.checktype_B1(lictype)">selected=""</tpl>>B1</option>',
            '<option name="lictype" value="B2" <tpl if="this.checktype_B2(lictype)">selected=""</tpl>>B2</option>',
            '<option name="lictype" value="C1" <tpl if="this.checktype_C1(lictype)">selected=""</tpl>>C1</option>',
            '<option name="lictype" value="C2" <tpl if="this.checktype_C2(lictype)">selected=""</tpl>>C2</option>',
            '<option name="lictype" value="C3" <tpl if="this.checktype_C3(lictype)">selected=""</tpl>>C3</option>',
            '</select>',
                '</td>' +
                '<td>初领驾驶证日期<span style="color: red">*</span></td><td colspan="3"><input onchange="change_licdt_edit()"   style="width:160px;" id="apply_form_id_licdt_edit" name="licdt"  type="date" value="{licdt}"/></td>',

            '</tr>',
            '<tr>',
            '<td>申请种类<span style="color: red">*</span></td><td colspan="3">',
            '<input style="width:60px;" name="applytp"  type="radio" value="初领" <tpl if="this.checkapplytp_Y(applytp)">checked="true"</tpl>/>初领',
            '<td style="border-left: none;" colspan="3"><input style="width:60px;" name="applytp"  type="radio" value="增驾" <tpl if="this.checkapplytp_N(applytp)">checked="true"</tpl>/>增驾',
            '</td>',
            '</tr>',
            '<tr>',
            ' <td>原从业资格证件号</td><td colspan="6"><input style="width:98px;" name="qulfnum"  type="text" value="{qulfnum}"/></td>',
            '</tr>',
            ' <td>申请类别<span style="color: red">*</span></td><td colspan="6">',
            '<input id="apply_form_id_licmd_edit"   onclick="click_licmd_edit()"     type="checkbox" name="licmd" value="道路旅客运输" <tpl if="this.checklicmd_Y(licmd)">checked="true"</tpl>/>道路旅客运输&nbsp;',
            '<input  id="apply_form_id_licmd_goods_edit"  onclick="click_licmd_goods_edit()" type="checkbox" name="licmd_goods" value="道路货物运输" <tpl if="this.checklicmd_N(licmd_goods)">checked="true"</tpl>/>道路货物运输&nbsp;',
            '</td>',
            '</td>',
            '</tr>',
            '<tr>',
            ' <td>材料清单<span style="color: red">*</span></td><td colspan="6">',
            '<input type="checkbox" name="checklist1" value="身份证明原件" <tpl if="this.checkchecklist1(checklist1)">checked="true"</tpl>/>身份证明原件&nbsp;',
            '<input type="checkbox" name="checklist2" value="身份证明复印件" <tpl if="this.checkchecklist2(checklist2)">checked="true"</tpl>/>身份证明复印件&nbsp;',
            '<input type="checkbox" name="checklist3" value="驾驶证原件" <tpl if="this.checkchecklist3(checklist3)">checked="true"</tpl>/>驾驶证原件&nbsp;',
            '<input type="checkbox" name="checklist4" value="驾驶证复印件" <tpl if="this.checkchecklist4(checklist4)">checked="true"</tpl>/>驾驶证复印件&nbsp;',
            '<input type="checkbox" name="checklist5" value="无重大以上责任事故记录证明" <tpl if="this.checkchecklist5(checklist5)">checked="true"</tpl>/>无重大以上责任事故记录证明&nbsp;',
            '</td>',
            '</tr>',
            '<tr>',
            '<td>承&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp诺<span style="color: red">*</span></td><td colspan="6"><p>本人承诺上述所有内容真实、有效、并承担由此产生的法律责任</p>',
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;驾驶员签字：<input id="apply_form_id_promise" style="width:98px;" name="promise"  type="text" value="{promise}"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '日期：<input type="date" name="promisedt"  value="{promisedt}" />',
            '</td>',
            '</tr>',
            '<tr>',
            '<td rowspan="5">考试记录</td><td colspan="2">成绩</td><td colspan="2">考核员</td><td colspan="2">考核员</td>',
            '</tr>',
            '<tr>',
            '<td colspan="2"><input type="text" name="score1" /></td><td colspan="2"><input type="text" name="pa1"></td><td colspan="2"><input type="text" name="pa2"></td>',
            '</tr>',
            '<tr>',
            '<td colspan="2"><input type="text" name="score1" /></td><td colspan="2"><input type="text" name="pa2"></td><td colspan="2"><input type="text" name="pa2"></td>',
            '</tr>',
            '<tr>',
            '<td colspan="2"><input type="text" name="score1" /></td><td colspan="2"><input type="text" name="pa3"></td><td colspan="2"><input type="text" name="pa2"></td>',
            '</tr>',
            '<tr>',
            '<td colspan="2"><input type="text" name="score1" /></td><td colspan="2"><input type="text" name="pa4"></td><td colspan="2"><input type="text" name="pa2"></td>',
            '</tr>',
            '<tr>',
            ' <td>道路运输管理机构意见</td><td colspan="6">（盖章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="date" /></td>',
            '</tr>',
            '<tr>',
            '<td rowspan="2">从业资格证发放</td>',
            '<td>发放人（签字）</td><td colspan="2"><input type="text"></td><td>日期</td><td colspan="2"><input type="date" /></td>',
            '</tr>',
            '<tr>',
            '<td>领取人（签字）</td><td colspan="2"><input type="text"></td><td>日期</td><td colspan="2"><input type="date" /></td>',
            '</tr>',
            '</table>',
            '</form>',
            '</div>',
            {
                checkSex_f: function (sex) {
                    return sex!="男";
                },
                checkSex_m: function (sex) {
                    return sex =="男";
                },
                checktype_C3: function (lictype) {
                    return lictype=="C3";
                },
                checktype_C2: function (lictype) {
                    return lictype=="C2";
                },
                checktype_C1: function (lictype) {
                    return lictype=="C1";
                },
                checktype_B2: function (lictype) {
                    return lictype=="B2";
                },
                checktype_B1: function (lictype) {
                    return lictype=="B1";
                },
                checktype_A3: function (lictype) {
                    return lictype=="A3";
                },
                checktype_A2: function (lictype) {
                    return lictype=="A2";
                },
                checktype_A1: function (lictype) {
                    return lictype=="A1";
                },
                checkapplytp_Y : function (applytp) {
                    return applytp =="初领";
                },
                checkapplytp_N : function (applytp) {
                    return applytp !="初领";
                },
                checklicmd_Y : function (licmd) {
                    return licmd == "道路旅客运输";
                },
                checklicmd_N : function (licmd_goods) {
                    return licmd_goods == "道路货物运输";
                },
                checkchecklist1 : function (checklist1) {
                    return checklist1=="true";
                },
                checkchecklist2 : function (checklist2) {
                    return checklist2=="true";
                },
                checkchecklist3 : function (checklist3) {
                    return checklist3=="true";
                },
                checkchecklist4 : function (checklist4) {
                    return checklist4=="true";
                },
                checkchecklist5 : function (checklist5) {
                    return checklist5=="true";
                }
            }
        );

        //呈现组件
        var mypanel = new Ext.form.FormPanel({
            id: "mypanel",
            width: 820,
            frame: true,
            height: 600,
            bodyStyle : 'overflow-x:hidden; overflow-y:scroll',
            renderTo: Ext.getBody()
        });


        //重写绑定模板
        apply_edits.overwrite(mypanel.body, record.data);
        var editWindow = new Ext.Window({
            layout: 'fit',
            width: 830,
            height: 650,
            modal: true,
            title: '查看考生信息',
//            bodyStyle : 'overflow-x:hidden; overflow-y:scroll',
            items: [mypanel]
        });
        editWindow.show(Ext.get('examinees_query_id'));

    }},
    initComponent: function () {

        this.columns = [
            {text: '考生ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '考生状态', width: 80, dataIndex: 'status'},
            {text: '姓名', width: 100, dataIndex: 'name'},
            {text: '性别', width: 60, dataIndex: 'sex'},
            {text: '身份证号', width: 200, dataIndex: 'card'},
            //{text: '申请种类', width: 80, dataIndex: 'applytp'},
            {text: '照片', width: 120, dataIndex: 'photo',hidden:true},
            {text: '驾校名称', width: 150, dataIndex: 'drvschool'},
            {text: '考生联系地址', width: 150, dataIndex: 'address'},
            //{text: '准驾车型', width: 80, dataIndex: 'lictype'},
            //{text: '驾照初领日期', width: 120, dataIndex: 'licdt'},
            {text: '资格类别', width: 160, dataIndex: 'licmd',hidden:true},
            //{text: '资格类别', width: 160,
            //    renderer:function(v,m,record){
            //        var s_licmd= record.get('licmd');
            //        var s_licmd_goods= record.get('licmd_goods');
            //        if(s_licmd!=null && s_licmd_goods!=null)
            //            return s_licmd + s_licmd_goods;
            //        else if(s_licmd=="")
            //            return s_licmd_goods;
            //        else if(s_licmd_goods==null)
            //            return s_licmd;
            //    }},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_trainer_maint',


                displayInfo: true,
                displayMsg: '第 {0} 到 {1} 条数据, 共{2}条',
                emptyMsg: '无数据'
            }),
            columnLines: true,
            enableLocking: true
        });

        this.callParent(arguments);
    }
});


function obt_apply_update(card) {
    var form_update_apply = document.getElementById("apply_edit_form");
//    var card = form_update_apply['card'].value;
//    alert(card);
    Ext.Ajax.request({
        method: "POST",
        params: {
            name: form_update_apply['name'].value,
            sex: form_update_apply['sex'].value,
            education: form_update_apply['education'].value,
            address: form_update_apply['address'].value,
            workunit: form_update_apply['workunit'].value,
            card: card,
            lictype: form_update_apply['lictype'].value,
            licdt: form_update_apply['licdt'].value,
            applytp: form_update_apply['applytp'].value,
            qulfnum: form_update_apply['qulfnum'].value,
            licmd: form_update_apply['licmd'].checked,
            licmd_goods: form_update_apply['licmd_goods'].checked,
            photo:photo_file,
            promise: form_update_apply['promise'].value,
            checklist1: form_update_apply['checklist1'].checked,
            checklist2: form_update_apply['checklist2'].checked,
            checklist3: form_update_apply['checklist3'].checked,
            checklist4: form_update_apply['checklist4'].checked,
            checklist5: form_update_apply['checklist5'].checked,
            pxnum: 0,
            promisedt:form_update_apply['promisedt'].value,
            remark: '修改',
            status: '报名'

        },
        url: 'update_trainer_qtbh_info',
        success: function () {
            Ext.Msg.alert("提示", "保存成功！");
            Ext.getCmp('grid_trainer_maint').getStore().reload();
        },
        failure: function () {
            Ext.Msg.alert("提示", "保存失败！");
        }
    });
}


function click_licmd_edit() {
    var form_obt_apply = document.getElementById("apply_edit_form");
    if (document.getElementById("apply_form_id_licdt_edit").value == "") {
        Ext.Msg.alert("提示", "<span style='color: red;'>初领驾照日期！</span>")
        document.getElementById("apply_form_id_licmd_edit").checked==false
        form_obt_apply['licmd_edit'].checked=false;
        return;
    }else{
        var date = new Date();
        var lic_Date=document.getElementById("apply_form_id_licdt_edit").value;
        var lic_Year = new Date(lic_Date);
        var result = lic_Year.getFullYear()+'-'+(lic_Year.getMonth()+1)+'-'+lic_Year.getDate()

        result = new Date(result.replace(/-/g, "/"));

        var days = date.getTime() - result.getTime();
        var time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time<365){
            Ext.Msg.alert("提示", "<span style='color: red;'>初领驾照日期不满一年！</span>");
            document.getElementById("apply_form_id_licmd_edit").checked==false
            form_obt_apply['apply_form_id_licmd_edit'].checked=false;
        }
    }

}

function click_licmd_goods_edit() {

    if (document.getElementById("apply_form_id_licdt_edit").value == "") {
        Ext.Msg.alert("提示", "<span style='color: red;'>初领驾照日期不能为空！</span>")
        document.getElementById("apply_form_id_licmd_goods_edit").checked==false

        var form_obt_apply = document.getElementById("apply_edit_form");
        form_obt_apply['apply_form_id_licmd_goods_edit'].checked=false;

        return;
    }
}

function change_licdt_edit(obj){
    var form_obt_apply = document.getElementById("apply_edit_form");
    var date = new Date();
    var lic_Date=document.getElementById("apply_form_id_licdt_edit").value;
    var lic_Year = new Date(lic_Date);
    var result = lic_Year.getFullYear()+'-'+(lic_Year.getMonth()+1)+'-'+lic_Year.getDate()

    result = new Date(result.replace(/-/g, "/"));

    var days = date.getTime() - result.getTime();
    var time = parseInt(days / (1000 * 60 * 60 * 24));
    if(time<365){
        if(document.getElementById("apply_form_id_licmd_edit").checked==true){
            Ext.Msg.alert("提示", "<span style='color: red;'>初领驾照日期不满一年！</span>");
            document.getElementById("apply_form_id_licmd_edit").checked==false
            form_obt_apply['apply_form_id_licmd_edit'].checked=false;
        }
    }
}

function pub_upload_file_edit(card,id) {
    var cust_id = card;
    Ext.create('widget.window', {
        title: '上传照片',
        modal: true,
        iconCls: 'icon_add',
        id:'uploadpic_edit_windows',
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
                            document.getElementById('apply_form_img_edit').src ='static/upload/per.png';
                            var cust_id = card;
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

                                            document.getElementById('apply_form_img_edit').src = 'static/upload/'+ cust_id+".jpg";
                                            Ext.getCmp('uploadpic_edit_windows').close();
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

