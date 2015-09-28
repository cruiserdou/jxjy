Ext.define('App.view.schoolcount.GridSchool', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.school_gridschool',
    id: 'school_gridschool',
    store: 'school_trainer',
    columnLines: true,
    enableLocking: true,

    initComponent: function () {

            this.columns = [
                {text: '考生ID', width: 80, dataIndex: 'id',hidden:true},
                {text: '考生状态', width: 80, dataIndex: 'status'},
                {text: '姓名', width: 90, dataIndex: 'name'},
                {text: '性别', width: 60, dataIndex: 'sex'},
                {text: '身份证号', width: 180, dataIndex: 'card'},
                {text: '驾校名称', width: 130, dataIndex: 'drvschool',hidden:true},
                {text: '申请种类', width: 80, dataIndex: 'applytp'},
                {text: '照片', width: 160, dataIndex: 'photo',hidden:true},
                {text: '考生联系地址', width: 150, dataIndex: 'address'},
                {text: '准驾车型', width: 80, dataIndex: 'lictype'},
                {text: '驾照初领日期', width: 120, dataIndex: 'licdt'},
                {text: '资格类别', width: 160,
                    renderer:function(v,m,record){
                        var s_licmd= record.get('licmd');
                        var s_licmd_goods= record.get('licmd_goods');
                        if(s_licmd!=null && s_licmd_goods!=null)
                            return s_licmd + s_licmd_goods;
                        else if(s_licmd=="")
                            return s_licmd_goods;
                        else return s_licmd;
                    }},

                {text: '备注', flex: 1, dataIndex: 'remark',hidden:true}


        ];

        this.viewConfig = {
            forceFit: true
        };
        this.callParent(arguments);
    }
});
