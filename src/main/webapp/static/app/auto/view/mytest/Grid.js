var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.mytest.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mytest_grid',
    store: 'syj_mytest',
    selModel: sm,
    id :'grid_mytest',
    initComponent: function () {
        this.columns = [
            {text: '驾校ID', width: 80, dataIndex: 'id' ,hidden:true},
            {text: '驾校编号', width: 120, dataIndex: 'code' },
            {text: '驾校名称', width: 120, dataIndex: 'name'},
            {text: '驾校等级', width: 120, dataIndex: 'grade' },
            {text: '驾校法人', width: 120, dataIndex: 'legal'},
            {text: '联系电话', width: 120, dataIndex: 'cont' },
            {text: '驾校地址', width: 120, dataIndex: 'addr'},
            {text: '驾校描述', width: 120, dataIndex: 'des'},
            {text: '备注',  flex: 1, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_mytest',
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