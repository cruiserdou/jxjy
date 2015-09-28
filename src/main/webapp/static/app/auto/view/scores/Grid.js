var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.scores.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.scoresf_grid',
    store: 'syj_tra_scr',
    selModel: sm,
    id :'grid_scores_trainer',
    listeners: {
        itemclick: function (this_, record_) {
            var scores_trainer_panel = Ext.getCmp('scores_trainer_info');
            scores_trainer_panel.tpl.overwrite(scores_trainer_panel.body, record_.data);
        }
    },
    initComponent: function () {
        this.columns = [
            {text: '培训ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '姓名', width: 60, dataIndex: 'name'},
            {text: '性别', width: 40, dataIndex: 'sex'},
            //{text: '学历', width: 100, dataIndex: 'education',hidden:true},
            {text: '身份证号', width: 160, dataIndex: 'card'},
            {text: '照片', width: 100, dataIndex: 'photo',hidden:true},
            {text: '住址', flex: 1, dataIndex: 'address'},
            {text: '工作单位', width: 120, dataIndex: 'workunit',hidden:true},
            {text: '培训单位', width: 120, dataIndex: 'drvschool',hidden:true},
            {text: '准驾车型', width: 70, dataIndex: 'lictype'},
            {text: '驾照初领日期', width: 100, dataIndex: 'licdt'},
            {text: '申请种类', width: 120, dataIndex: 'applytp',hidden:true},
            {text: '原从业资格证件号', width: 100, dataIndex: 'qulfnum',hidden:true},
            {text: '申请类别', width: 160, dataIndex: 'licmd'},
            //{text: '材料清单', width: 120, dataIndex: 'checklist',hidden:true},
            //{text: '承诺', width: 120, dataIndex: 'promise',hidden:true },
            {text: '培训状态', width: 80, dataIndex: 'status'},
            {text: '成绩', width: 40, dataIndex: 'scores', renderer: function(value){
                if(value < 60){
                    return '<span style="color: red;">' + value + '</span>'
                } else if (value >= 60){
                    return '<span style="color: green;">' + value + '</span>'
                }
            }},
            //{text: '成绩', width: 100, dataIndex: 'list',hidden:true},
            {text: '打印成绩', width: 80, dataIndex: 'card', renderer: function(value){
                return '<a style="color: gray;text-decoration: none;" href="print_score?card=' + value + '" target="_blank"><i class="fa fa-print"></i>' + ' &nbsp;打印</a>'
            }}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_tra_scr',
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

var admissionsf_tpl= [
        '<h2 align="center">经营性道从业资格路考试成绩单</h2>',
    '<table id="scores_table">',
    '<tr valign="top">',
    '<td>',
    '<table class="base_table" cellpadding=0 cellspacing=0 border=1  style="text-align:center">',
        '<tr><td colspan="2">姓名：</td><td colspan="3">{name}</td>' +
        '<td colspan="2">性别：</td><td colspan="3">{sex}</td>' +
        '<td style="text-align:left" colspan="2" rowspan="5"><img src="static/css/images/test.jpg" /></td></tr>',
        '<tr><td colspan="2">准考证号：</td><td colspan="3">{admbh}</td>' +
        '<td colspan="2">考试类别：</td><td colspan="3">{licmd}</td></tr>',
        '<tr><td colspan="2">身份证号：</td><td colspan="8">{card}</td>' +
        '</tr>',
        '<tr><td colspan="2">考试时间：</td><td colspan="3">{examdt}</td>' +
        '<td colspan="2">考试机号：</td><td colspan="3">{examsite}</td></tr>',
        '<tr><td colspan="2">考生题库：</td><td colspan="3">{qtbh}</td>' +
        '<td colspan="2">成绩：</td><td colspan="3">{scores}</td></tr>',
        '<tr><td width="75">序号</td>' +
        '<td width="75">答案</td>' +
        '<td width="75">阅卷</td>' +
        '<td width="75">序号</td>' +
        '<td width="75">答案</td>' +
        '<td width="75">阅卷</td>' +
        '<td width="75">序号</td>' +
        '<td width="75">答案</td>' +
        '<td width="75">阅卷</td>' +
        '<td width="75">序号</td>' +
        '<td width="75">答案</td>' +
        '<td width="75">阅卷</td>' +
        '</tr>',
    '<tpl for="list">',
      '<tr><td width="75">{qtnuma}</td>' +
        '<td width="75">{answera}</td>' +
        '<td width="75">{resulta}</td>' +
        '<td width="75">{qtnumc}</td>' +
        '<td width="75">{answerb}</td>' +
        '<td width="75">{resultb}</td>' +
        '<td width="75">{qtnumc}</td>' +
        '<td width="75">{answerc}</td>' +
        '<td width="75">{resultc}</td>' +
        '<td width="75">{qtnumd}</td>' +
        '<td width="75">{answerd}</td>' +
        '<td width="75">{resultd}</td>' +
      '</tr>',
    '</tpl>',
    '<tr>',
        '<td colspan="4" rowspan="5"><img src="static/css/images/test.jpg" /></td>' +
        '<td colspan="4" rowspan="5"><img src="static/css/images/test.jpg" /></td>'+
        '<td colspan="4" rowspan="5"><img src="static/css/images/test.jpg" /></td>' +
        '</tr>',

    '</table>',

    '</td>',
    '</tr>',
    '</table>'

];