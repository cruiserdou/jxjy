var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.schoolcount.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.school_count_grid',
    store: 'school_count',
    selModel: sm,
    id :'grid_school_count',
    listeners: {
        itemclick: function (this_, record_) {
            var store = Ext.getCmp('school_gridschool').getStore();
            store.load({
                params: {
                    id: record_.get('id')
                }
            })
        }
    },
    initComponent: function () {
        this.columns = [
            {text: '驾校id', width: 150,dataIndex: 'id',hidden:true},
//            {text: '驾校id', width: 150,dataIndex: 'id'},
            {text: '驾校名称', width: 150,dataIndex: 'schoolname'},
            {text: '客货', width: 150,dataIndex: 'passenger_cargo'},
            {text: '货运', width: 150,dataIndex: 'cargo'},
            {text: '乘务员',flex: 1,dataIndex: 'passenger'}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'school_count',
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