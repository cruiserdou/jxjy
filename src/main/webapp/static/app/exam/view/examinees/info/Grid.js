var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.examinees.info.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.examinees_grid',
    store: 'syj_examinees',
    selModel: sm,
    id :'grid_examinees',
    initComponent: function () {

        this.columns = [
            {text: '考生ID', width: 80, dataIndex: 'id'},
            {text: '姓名', width: 120, dataIndex: 'name'},
            {text: '性别', width: 60, dataIndex: 'sex'},
            {text: '身份证号', width: 160, dataIndex: 'card'},
            {text: '照片', width: 160, dataIndex: 'photo'},
            {text: '考生联系地址', width: 200, dataIndex: 'address'},
            {text: '准驾车型', width: 80, dataIndex: 'lictype',
                store:Ext.create('Ext.data.Store',
                    {
                        fields:['type'],
                        data:
                            [
                                {'type':'A3'},
                                {'type':'B1'},
                                {'type':'B2'},
                                {'type':'C1'},
                                {'type':'C2'},
                                {'type':'C3'},
                                {'type':'C4'},
                                {'type':'M'}
                            ]
                    }
                ),
                displayField:'type',
                valueField:'type'},
            {text: '驾照初领日期', width: 100, dataIndex: 'licdt'},
            {text: '资格类别', width: 80, dataIndex: 'licmd'},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_examinees',
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



