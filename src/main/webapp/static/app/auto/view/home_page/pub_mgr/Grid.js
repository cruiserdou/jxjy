var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.home_page.pub_mgr.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pubmgr_grid',
    store: 'Pubinfo',
    selModel: sm,
    id :'grid_pubmgr',

    initComponent: function () {
        this.columns = [
            {text: '公告编号', width: 70, dataIndex: 'id', hidden: true},
            {text: '公告状态', width: 70, dataIndex: 'stat'},
            {text: '公告标题', width: 100, dataIndex: 'title'},
            {text: '公告内容', width: 250, dataIndex: 'content'},
            {text: '发布人', width: 60, dataIndex: 'pub_user', hidden: true },
            {text: '接收组', width: 80, dataIndex: 'rec_group', hidden: true },
            {text: '发布日期', width: 90, dataIndex: 'pub_date'},
            {text: '接收人', width: 90, dataIndex: 'rec_user',
                renderer: function(val){
                    if(val ==null || val =="" ){
                        return "公有";

                    }else{
                        return val;
                    }
                }
            },
            {text: '附件', width: 140, dataIndex: 'file_url'},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'Pubinfo',
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

