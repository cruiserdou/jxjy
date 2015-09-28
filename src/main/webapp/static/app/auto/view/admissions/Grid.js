var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.admissions.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.admissionsf_grid',
    store: 'syj_admissions',
    selModel: sm,
    id :'grid_admissions',

    initComponent: function () {

        this.columns = [
            {text: '准考证ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '准考证号', width: 100, dataIndex: 'admbh'},
            {text: '题本编号', width: 100, dataIndex: 'qtbh',hidden:true},
            {text: '考生ID', width: 400, dataIndex: 'examid',hidden:true},
            {text: '姓名', width: 100, dataIndex: 'name'},
            {text: '身份证', width: 150, dataIndex: 'card'},
            {text: '性别', width: 100, dataIndex: 'sex'},
            {text: '考场', width: 100, dataIndex: 'examroom'},
            {text: '座位号', width: 100, dataIndex: 'examsite'},
            {text: '考试时间', width: 100, dataIndex: 'examdt'},
            {text: '成绩', width: 100, dataIndex: 'scores',hidden:true},
            {text: '考点', width: 100, dataIndex: 'sites'},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_admissions',
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