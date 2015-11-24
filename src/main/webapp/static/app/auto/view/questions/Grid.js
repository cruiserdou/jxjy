var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.questions.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.questionsf_grid',
    store: 'syj_questions',
    selModel: sm,
    id :'grid_questions',
    listeners: {
        itemclick: function (this_, record_) {
            var questions_panel = Ext.getCmp('questions_info');
            questions_panel.tpl.overwrite(questions_panel.body, record_.data);
        }
    },
    initComponent: function () {

        this.columns = [
            {text: '考题ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '题本编号', width: 80, dataIndex: 'qtbh'},
            {text: '题号', width: 60, dataIndex: 'qtnum'},
            {text: '题目', width: 300, dataIndex: 'question'},
            {text: '题型', width: 60, dataIndex: 'type'},
            {text: '答案A', width: 100, dataIndex: 'qt_a'},
            {text: '答案B', width: 100, dataIndex: 'qt_b'},
            {text: '答案C', width: 100, dataIndex: 'qt_c'},
            {text: '答案D', width: 100, dataIndex: 'qt_d'},
            {text: '答案', width: 100, dataIndex: 'answer'},
            {text: '分值', width: 100, dataIndex: 'score'},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_questions',
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