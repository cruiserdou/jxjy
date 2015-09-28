Ext.define('App.view.roster.exam_roster.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.exam_rosterf_grid',
    store: 'syj_trainer_results',
    id :'grid_exam_roster',
    listeners: {
        itemclick: function (this_, record_) {
            var exam_rosterf_panel = Ext.getCmp('exam_roster_info');
            exam_rosterf_panel.tpl.overwrite(exam_rosterf_panel.body, record_.data);
        }
    },
    initComponent: function () {

        this.columns = [
            {text: '培训ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '姓名', width: 80, dataIndex: 'name'},
            {text: '性别', width: 60, dataIndex: 'sex'},
            {text: '学历', width: 100, dataIndex: 'education',hidden:true},
            {text: '身份证号', width: 140, dataIndex: 'card'},
            {text: '照片', width: 100, dataIndex: 'photo',hidden:true},
            {text: '住址', width: 150, dataIndex: 'address'},
            {text: '工作单位', width: 120, dataIndex: 'workunit',hidden:true},
            {text: '驾校名称', width: 120, dataIndex: 'drvschool'},
            {text: '准驾车型', width: 70, dataIndex: 'lictype'},
            {text: '驾照初领日期', width: 110, dataIndex: 'licdt'},
            {text: '申请种类', width: 70, dataIndex: 'applytp'},
            {text: '原从业资格证件号', width: 100, dataIndex: 'qulfnum',hidden:true},
            {text: '申请类别', width: 140, dataIndex: 'licmd'},
            {text: '材料清单', width: 130, dataIndex: 'checklist',hidden:true},
            {text: '承诺', width: 120, dataIndex: 'promise' ,hidden:true},
            {text: '是否同意考试', width: 100, dataIndex: 'status'},
            {text: '成绩', width: 60, dataIndex: 'scores'},
            {text: '备注', flex: 1, dataIndex: 'remark',hidden:true}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_trainer_results',
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