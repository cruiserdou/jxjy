var sm = new Ext.selection.CheckboxModel({checkOnly: false});

Ext.define('App.view.orders.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ordersf_grid',
    store: 'syj_orders',
    selModel: sm,
    id :'grid_orders',
    listeners: {
        itemclick: function (this_, record_) {
            var trainer_ordersf_panel = Ext.getCmp('trainer_orders_info');
            trainer_ordersf_panel.tpl.overwrite(trainer_ordersf_panel.body, record_.data);
        }
    },
    initComponent: function () {
        this.columns = [
            {text: 'ID', width: 80, dataIndex: 'id' ,hidden:true},
            {text: '开始时间', width: 400, dataIndex: 'examks'},
            {text: '结束时间', width: 400, dataIndex: 'examjs'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_orders',
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