
//var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.examinees.agree.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.agreef_grid',
    store: 'syj_trainer_agree',
    //selModel: sm,
    selModel:new Ext.selection.CheckboxModel(
        {checkOnly: false,  width:300}
    ),
    //features:[{ftype:'grouping'}],
    id :'grid_trainer_agree',
    listeners: {
        itemclick: function (this_, record_) {
            var trainer_agree_panel = Ext.getCmp('trainer_agree_info');
            trainer_agree_panel.tpl.overwrite(trainer_agree_panel.body, record_.data);
        }
    },
    initComponent: function () {

        this.columns = [
            {text: '驾校名称', width: 150, dataIndex: 'drvschool'},
            {text: '考生ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '考生状态', width: 80, dataIndex: 'status'},
            {text: '姓名', width: 100, dataIndex: 'name'},
            {text: '性别', width: 60, dataIndex: 'sex'},
            {text: '身份证号', width: 200, dataIndex: 'card'},
            {text: '照片', width: 160, dataIndex: 'photo',hidden:true},
            {text: '考生联系地址', width: 200, dataIndex: 'address'},
            //{text: '准驾车型', width: 80, dataIndex: 'lictype'},
            //{text: '驾照初领日期', width: 120, dataIndex: 'licdt'},
            {text: '资格类别', width: 160, dataIndex: 'licmd',hidden:true},
            //{text: '资格类别', width: 160,
            //    renderer:function(v,m,record){
            //        var s_licmd= record.get('licmd');
            //        var s_licmd_goods= record.get('licmd_goods');
            //        if(s_licmd!=null && s_licmd_goods!=null)
            //            return s_licmd + s_licmd_goods;
            //        else if(s_licmd==null)
            //            return s_licmd_goods;
            //        else return s_licmd;
            //    }},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_trainer_agree',
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

