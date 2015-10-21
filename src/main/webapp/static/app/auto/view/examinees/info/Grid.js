var card="";
//var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.examinees.info.Grid', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.examinees_grid',

    //features:[{ftype:'grouping'}],
    store: 'syj_trainer',
//    selModel: sm,
    id :'grid_info_trainer',

    listeners: {
            itemclick: function (this_, record_) {
                var info_trainerf_panel = Ext.getCmp('info_trainer_info');
                info_trainerf_panel.tpl.overwrite(info_trainerf_panel.body, record_.data);
            },
        'itemdblclick': function (view, record, item, index, e) {
        //创建模板

        var tp1 = new Ext.XTemplate(
            '<div class="wrap_center">',
            '<form id="apply_check_form">',
            '<h2 align="center">武威市道路交通运输驾驶员继续教育学员登记表</h2>',
            '<table id="appro_table">',
            '<tr>',
            '<td>姓名</td><td><span style="width:60px;">{name}</span></td>',
            '<td>性别</td><td><span>{sex}</span></td>',
            '<td>电话</td><td><span style="width:60px;">{education}</span></td>',
            '<td style="width:120px;" rowspan="4">',
            '<img style="width: 136px; height: 139px;" src="static/upload/{photo}"/>',
            '</td></tr>',
            '<tr>',
            ' <td>服务单位</td><td colspan="5"><span  style="width:90px;" >{workunit}</span></td>',
            '</tr>',
            '<tr>',
            '<td>详细地址</td><td colspan="5"><span style="width:90px;" >{address}</span></td>',
            '</tr>',
            '<tr>',
                '<td>身份证号</td><td colspan="5"><span id="apply_form_id_card" style="width:150px;">{card}</span></td>' ,
            '</tr>',
            '<tr>',
            ' <td>原从业资格证件号</td><td colspan="6"><span  style="width:98px;" >{lictype}</span></td>',
            '</tr>',
            '<td>申请类别</td><td colspan="6">',
            '<input type="checkbox" disabled name="licmd" value="道路旅客运输" <tpl if="this.checklicmd(licmd)">checked="true"</tpl>/>道路旅客运输&nbsp;',
            '<input type="checkbox" disabled name="licmd_goods" value="道路货物运输" <tpl if="this.checklicmd_goods(licmd_goods)">checked="true"</tpl>/>道路货物运输&nbsp;',
            '<input type="checkbox" disabled name="checklist1" value="道路危险货物运输" <tpl if="this.checkchecklist1(checklist1)">checked="true"</tpl>/>道路危险货物运输&nbsp;',
            '<input type="checkbox" disabled name="checklist2" value="出租客运" <tpl if="this.checkchecklist2(checklist2)">checked="true"</tpl>/>出租客运&nbsp;',
            '</td>',
            '</tr>',
            '<tr>',
            ' <td>材料清单<span style="color: red">*</span></td><td colspan="6">',
            '<input type="checkbox" disabled name="checklist3" value="驾驶员及复印件" <tpl if="this.checkchecklist3(checklist3)">checked="true"</tpl>/>驾驶员及复印件&nbsp;',
            '<input type="checkbox" disabled name="checklist4" value="身份证及复印件" <tpl if="this.checkchecklist4(checklist4)">checked="true"</tpl>/>身份证及复印件&nbsp;',
            '<input type="checkbox" disabled name="checklist5" value="从业资格证及复印件" <tpl if="this.checkchecklist5(checklist5)">checked="true"</tpl>/>从业资格证及复印件&nbsp;',
            '</td>',
            '</tr>',
            '<tr>',
            '<td>承&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp诺</td><td colspan="6"><p>本人承诺所提供的继续再教育信息及相关材料真实、有效、并承担由此产生的法律责任。</p>',
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;驾驶员签字：<span style="width:98px;">{promise}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '日期：<span   style="width:200px;">{promisedt}</span>',
            '</tr>',
            '</tr>',
            ' <td>继续教育培训机构</td><td colspan="6"><span    style="width:60px;" >{drvschool}</span></td>',
            '</tr>',
            '</tr>',
            ' <td>参加继续教育时间</td><td colspan="6"><span   style="width:200px;">{st_tk_dt}</span> &nbsp;至 &nbsp;    <span   style="width:200px;">{end_tk_dt}</span></td>',
            '</tr>',
            '</tr>',
            ' <td>参加继续周期起止年月</td><td colspan="6"><span   style="width:200px;">{zq_st_tk_dt}</span> &nbsp;至 &nbsp;    <span   style="width:200px;">{zq_end_tk_dt}</span></td>',
            '</tr>',
            '<tr>',
            '<td rowspan="2">继续教育培训机构意见</td>',
            '<td colspan="6"><span   style="width:600px; height:300px">{remark}</span></td>',
            '</tr>',
            '</table>',
            '<p  style="text-indent:24px;">说明：此表由道路运输驾驶员继续教育培训机构保存</p>',
            '</form>',
            '</div>',
            {

                checklicmd : function (licmd) {
                    return licmd == "true";
                },
                checklicmd_goods : function (licmd_goods) {
                    return licmd_goods == "true";
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
                height: 700,
                bodyStyle : 'overflow-x:hidden; overflow-y:scroll',
                renderTo: Ext.getBody()
            });


            //重写绑定模板
            tp1.overwrite(mypanel.body, record.data);
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

    }
    },
    initComponent: function () {

        this.columns = [
            {text: '考生ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '考生状态', width: 80, dataIndex: 'status'},
            {text: '姓名', width: 90, dataIndex: 'name'},
            {text: '性别', width: 60, dataIndex: 'sex'},
            {text: '身份证号', width: 200, dataIndex: 'card'},
            {text: '驾校名称', width: 130, dataIndex: 'drvschool'},
            //{text: '申请种类', width: 80, dataIndex: 'applytp'},
            {text: '照片', width: 160, dataIndex: 'photo',hidden:true},
            {text: '考生联系地址', width: 150, dataIndex: 'address'},
        //    {text: '准驾车型', width: 80, dataIndex: 'lictype'},
        //    {text: '驾照初领日期', width: 120, dataIndex: 'licdt'},
        //    {text: '资格类别', width: 160,
        //              renderer:function(v,m,record){
        //        var s_licmd= record.get('licmd');
        //        var s_licmd_goods= record.get('licmd_goods');
        //         if(s_licmd!=null && s_licmd_goods!=null)
        //             return s_licmd + s_licmd_goods;
        //                  else if(s_licmd=="")
        //                      return s_licmd_goods;
        //                  else return s_licmd;
        //}},

//            {text: '资格类别', width: 160, dataIndex: 'licmd_goods'},
            {text: '照片', width: 160, dataIndex: 'photo',hidden:true},
            //{text: '打印申请表', flex: 1, dataIndex: 'card', renderer: function(value){
            //    return '<a style="color: gray;text-decoration: none;" href="print_apply?card=' + value + '" target="_blank"><i class="fa fa-print"></i>' + ' &nbsp;打印</a>'
            //}},
            {text: '备注', width: 60, dataIndex: 'remark',hidden:true}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_trainer',
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

//function trainer_export(card) {
//    alert(card);
//    Ext.Ajax.request({
//        url: 'print_examdoc_info',
//        params: {
//            "card": card
//        },
//        waitMsg: '正在导出数据...',
//        success: function (form, action) {
//            Ext.Msg.alert("成功", "导出成功!");
//        },
//        failure: function (form, action) {
//            Ext.Msg.alert("失败", "导出失败!");
//        }
//    });
//};













