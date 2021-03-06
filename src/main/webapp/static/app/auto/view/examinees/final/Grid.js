var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.examinees.final.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.finals_grid',
    store: 'syj_trainer_final',
    selModel: sm,
    id :'grid_finals_trainer',
    listeners: {
        itemclick: function (this_, record_) {
            var finals_trainer_panel = Ext.getCmp('finals_trainer_info');
            finals_trainer_panel.tpl.overwrite(finals_trainer_panel.body, record_.data);
        }
    },
    initComponent: function () {

        this.columns = [
            {text: '考生ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '考生状态', width: 80, dataIndex: 'status'},
            {text: '姓名', width: 120, dataIndex: 'name'},
            {text: '性别', width: 60, dataIndex: 'sex'},
            {text: '身份证号', width: 200, dataIndex: 'card'},
            {text: '驾校名称', width: 150, dataIndex: 'drvschool'},
            {text: '照片', width: 160, dataIndex: 'photo',hidden:true},
            {text: '考生联系地址', width: 200, dataIndex: 'address'},
            //{text: '准驾车型', width: 80, dataIndex: 'lictype'},
            //{text: '驾照初领日期', width: 100, dataIndex: 'licdt'},
            {text: '资格类别', width: 160, dataIndex: 'licmd',hidden:true},
            {text: '标记状态', width: 90, dataIndex: 'specific',
                renderer: function(val){
                    if(val ==0 ){
                        return  "<span style='color: red;'>未标记</span>";

                    }else{
                        return "<span style='color: green;'>已标记</span>";
                    }
                }
            },
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_trainer_final',
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



