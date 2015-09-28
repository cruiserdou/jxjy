Ext.define('App.view.roster.train_roster.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.train_rosterf_grid',
    store: 'syj_trainer_cred_roster',
    id :'grid_train_roster',
    listeners: {
        itemclick: function (this_, record_) {
            var train_roster_panel = Ext.getCmp('train_roster_info');
            train_roster_panel.tpl.overwrite(train_roster_panel.body, record_.data);
        }
    },
    initComponent: function () {

        this.columns = [
            {text: '培训ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '姓名', width: 80, dataIndex: 'name'},
            {text: '性别', width: 60, dataIndex: 'sex'},
            {text: '学历', width: 100, dataIndex: 'education',hidden:true},
            {text: '身份证号', width: 160, dataIndex: 'card'},
            {text: '照片', width: 100, dataIndex: 'photo',hidden:true},
            {text: '住址', width: 200, dataIndex: 'address'},
            {text: '工作单位', width: 120, dataIndex: 'workunit',hidden:true},
            {text: '驾校名称', width: 130, dataIndex: 'drvschool'},
            {text: '准驾车型', width: 80, dataIndex: 'lictype'},
            {text: '驾照初领日期', width: 110, dataIndex: 'licdt'},
            {text: '申请种类', width: 110, dataIndex: 'applytp',hidden:true},
            {text: '原从业资格证件号', width: 100, dataIndex: 'qulfnum',hidden:true},
            {text: '申请类别', width: 130, dataIndex: 'licmd'},
            {text: '材料清单', width: 120, dataIndex: 'checklist',hidden:true},
            {text: '承诺', width: 120, dataIndex: 'promise',hidden:true },
            {text: '培训状态', width: 80, dataIndex: 'status',hidden:true},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_trainer_cred_roster',
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