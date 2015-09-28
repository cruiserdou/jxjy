var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.qtcont.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.qtcontf_grid',
    store: 'qt_cont',
    selModel: sm,
    id :'grid_qt_cont',
    initComponent: function () {

        this.columns = [
            {text: '考题ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '考试类型', width: 200, dataIndex: 'lictype'},
            {text: '题本编号', width: 200, dataIndex: 'qtbh'},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'qt_cont',
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