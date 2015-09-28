//公告显示表格
Ext.define('App.view.home_page.public_info.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.public_info_grid',
    store: 'Pubinfo',
    id: 'grid_public_info',
    listeners: {
        itemclick: function (this_, record_) {
            var pub_info_panel = Ext.getCmp('pub_info');
            pub_info_panel.tpl.overwrite(pub_info_panel.body, record_.data);
        }

    },

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

function pub_read(id) {
    Ext.Msg.confirm('信息', '确定要已阅？', function (btn) {
        if (btn == 'yes') {
            var sm = Ext.getCmp('grid_public_info').getSelectionModel();
            var rows = sm.getSelection();

            if (rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    Ext.Ajax.request({
                        url: 'add_pub_permis_info',
                        params: {
                            id: id
                        },
                        waitMsg: '正在处理数据...',
                        success: function (form, action) {
                            Ext.Msg.alert("成功", "数据处理成功!");
                            Ext.getCmp('grid_public_info').getStore().reload();
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert("失败", "数据处理失败!");
                        }
                    });
                }
            } else {
                Ext.Msg.alert('提示', '请选择要处理的记录');
            }
        }
    });
};

