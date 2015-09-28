var sm = new Ext.selection.CheckboxModel({checkOnly: false});


Ext.define('App.view.answers.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.answersf_grid',
    store: 'syj_answers',
    selModel: sm,
    id :'grid_answers',

    initComponent: function () {

        this.columns = [
            {text: '答案ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '姓名', width: 100, dataIndex: 'name'},
            {text: '身份证号', width: 100, dataIndex: 'card'},
            {text: '准考证号', width: 100, dataIndex: 'admbh'},
            {text: '考试时间', width: 100, dataIndex: 'examdt'},
            {text: '题本编号', width: 100, dataIndex: 'qtbh'},
            {text: '考题编号', width: 100, dataIndex: 'qtnum'},
            {text: '答案', width: 100, dataIndex: 'answer'},
            {text: '结果', width: 100, dataIndex: 'result'}
        ];




        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_answers',
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