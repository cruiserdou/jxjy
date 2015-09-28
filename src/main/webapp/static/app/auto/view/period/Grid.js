var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.period.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.periodf_grid',
    store: 'period',
    selModel: sm,
    id :'grid_period',
    listeners: {
        itemclick: function (this_, record_) {
            var depts_panel = Ext.getCmp('depts_info');
            depts_panel.tpl.overwrite(depts_panel.body, record_.data);
        }
    },
    initComponent: function () {
        this.columns = [
            {text: '期数ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '培训期数', width: 150, dataIndex: 'period_count'},
            {text: '录入人', width: 150, dataIndex: 'period_person'},
            {text: '录入时间', width: 150, dataIndex: 'period_time'},
            {text: '开班状态', width: 150, dataIndex: 'status'},
            {text: '备注',flex: 1, dataIndex: 'period_remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'period',
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