Ext.define('App.view.roster.cred_roster.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cred_rosterf_query',
    split: true,
    height: 120,
    bodyPadding: 20,
    id: 'cred_roster_query',
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [

                {
                    id: 'cred_roster_print',
                    text: '导出花名册',
                    iconCls: 'icon_add',
                    listeners: {
                        click: function () {

                            Ext.create('widget.window', {
                                xtype: 'form',
                                frame: true,
                                modal: true,
                                width: 200,
                                height: 200,
                                title: '导出花名册',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                    pack: 'start'
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        bodyPadding: '20',
                                        flex: 1,
                                        html: '<a onclick="cred_roster_export();"  href="#"><img style="height: 32px; margin-left: 50px;" src="static/css/images/doc.png" />导出</a><br/>'
                                    },
                                    {
                                        xtype: 'panel',
                                        flex: 1,
                                        bodyPadding: '20',
                                        html: '<a href="static/upload/ZhiZheng_roster.xls"><img style="width: 32px; margin-left: 50px;" src="static/css/images/cloud-download.png" />下载</a>'
                                    }
                                ]

                            }).show(Ext.get('cred_roster_print'));
                        }
                    }
                },
                {
                    text: '打印',
                    iconCls: 'icon_edit',
                    handler: function () {

                        Ext.Msg.confirm('信息', '确定要打印？', function (btn) {
                            if (btn == 'yes') {

                                window.location.target="_blank";

                                window.open("print_cred", "_blank")
                            }
                        });
                    }
                },
                {
                    text: '刷新',
                    glyph: 0xf021,
                    listeners: {
                        click: function(_this){
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_cred_roster').getStore().load();
                        }
                    }
                }
         
            ]
        }
    ],
    defaults: {
    },
    layout: 'column',
    items: [
        {
            xtype: 'panel',
//            id: 'datacir_query_panel1',
            columnWidth: .4,
            border: false,
            defaultType: 'textfield',
            layout: {
                type: 'vbox',
                align: 'strech',
                pack: 'start'
            },
            items: [
                {
                    allowBlank: true,
                    fieldLabel: '姓名',
                    id: 'cred_roster_query_name',
                    name: 'name',
                    emptyText: '姓名'
                },
                {
                    allowBlank: true,
                    fieldLabel: '身份证',
                    id: 'cred_roster_query_card',
                    name: 'card',
                    emptyText: '身份证'
                }
            ]
        },
        {
            xtype: 'panel',
            border: false,
            columnWidth: .5,
            items: [
                {
                    xtype: 'button',
                    iconCls: 'icon_search',
                    text: '查找',
                    listeners: {
                        click: function(){
                            var store = Ext.getCmp('grid_cred_roster').getStore();
                            store.load({
                                params: {
                                    name: Ext.getCmp('cred_roster_query_name').getValue(),
                                    card: Ext.getCmp('cred_roster_query_card').getValue()
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'panel',
                    height: 10,
                    border: false
                },
                {
                    xtype: 'button',
                    iconCls: 'icon_reset',
                    text: '重置',
                    listeners: {
                        click: function(_this){
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_cred_roster').getStore().load();
                        }
                    }
                }
            ]
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});

function cred_roster_export() {
    Ext.Ajax.request({
        url: 'import_cred_roster_info',
        params: {
            "fileName": 'ZhiZheng_roster.xls'
        },
        waitMsg: '正在导出数据...',
        success: function (form, action) {
            Ext.Msg.alert("成功", "导出成功!");
        },
        failure: function (form, action) {
            Ext.Msg.alert("失败", "导出失败!");
        }
    });

};
