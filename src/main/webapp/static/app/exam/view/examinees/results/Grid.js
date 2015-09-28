Ext.define('App.view.examinees.results.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.resultsf_grid',
    store: 'syj_examinees',
    id :'grid_results',
    initComponent: function () {

        this.columns = [
            {text: '考生ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '状态', width: 80, dataIndex: 'status',
            renderer :function(value){
                if(value=='通过'){
                    return "<span style='color: green;'>通过</span>";
                }else if (value=='未通过'){
                    return "<span style='color: red;'>未通过</span>";
                }
            }},
            {text: '姓名', width: 120, dataIndex: 'name'},
            {text: '性别', width: 60, dataIndex: 'sex'},
            {text: '身份证号', width: 160, dataIndex: 'card'},
            {text: '照片', width: 160, dataIndex: 'photo',hidden:true},
            {text: '考生联系地址', width: 200, dataIndex: 'address'},
            {text: '准驾车型', width: 80, dataIndex: 'lictype'},
            {text: '驾照初领日期', width: 100, dataIndex: 'licdt', renderer:Ext.util.Format.dateRenderer('Y-m-d')},
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
