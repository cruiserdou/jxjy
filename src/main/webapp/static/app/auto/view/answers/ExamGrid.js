
Ext.define('App.view.answers.ExamGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.examanswers_grid',
    store: 'syj_examanswers',
    id :'grid_examanswers',

    initComponent: function () {

        this.columns = [
            {text: '姓名', width: 100, dataIndex: 'name'},
            {text: '身份证号', width: 100, dataIndex: 'card'},
            {text: '考题编号', width: 100, dataIndex: 'qtnum'},
            {text: '答案', width: 100, dataIndex: 'answer'},
            {text: '结果', width: 100, dataIndex: 'result'}
        ];




        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_examanswers',
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