
//var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.examinees.agree.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.agreef_grid',
    store: 'syj_trainer_agree',
    //selModel: sm,
    selModel:new Ext.selection.CheckboxModel(
        {checkOnly: false,  width:300}
    ),
    //features:[{ftype:'grouping'}],
    id :'grid_trainer_agree',
    listeners: {
        itemclick: function (this_, record_) {
            var trainer_agree_panel = Ext.getCmp('trainer_agree_info');
            trainer_agree_panel.tpl.overwrite(trainer_agree_panel.body, record_.data);
        }
    },
    initComponent: function () {

        this.columns = [
            {text: '驾校名称', width: 150, dataIndex: 'drvschool'},
            {text: '考生ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '考生状态', width: 80, dataIndex: 'status',hidden:true},
            {text: '考试状态', width: 80, dataIndex: 'ks_stat',hidden:true},
            {text: '考试状态', width: 160,
                renderer:function(v,m,record){
                    var s_status= record.get('status');
                    var s_ks_stat= record.get('ks_stat');
                    var s_scores= record.get('scores');
                    if(s_status=="同意考试"){
                        if(s_scores>60){
                            return "合格"
                        }else if(s_ks_stat==0 || s_ks_stat==2){
                            return "同意考试";
                        }else
                            return "不及格";
                    }else{
                        return s_status;
                    }
                }},
            {text: '成绩', width: 80, dataIndex: 'scores'},
            {text: '姓名', width: 100, dataIndex: 'name'},
            {text: '性别', width: 60, dataIndex: 'sex'},
            {text: '身份证号', width: 200, dataIndex: 'card'},
            {text: '照片', width: 160, dataIndex: 'photo',hidden:true},
            {text: '考生联系地址', width: 200, dataIndex: 'address'},
            //{text: '准驾车型', width: 80, dataIndex: 'lictype'},
            //{text: '驾照初领日期', width: 120, dataIndex: 'licdt'},
            {text: '资格类别', width: 160, dataIndex: 'licmd',hidden:true},

            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_trainer_agree',
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

