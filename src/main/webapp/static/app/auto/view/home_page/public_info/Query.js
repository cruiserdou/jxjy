Ext.define('App.view.home_page.public_info.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pubinfo_query',
    split: true,
    bodyPadding: 10,
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    id: 'pubinfo_query_id',
    layout: 'column',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [
                {
                    text: '刷新',
                    glyph: 0xf021,
                    listeners: {
                        click: function (_this) {
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_public_info').getStore().load();
                        }
                    }
                }


            ]
        }
    ],
    items: [
        {
            xtype: 'panel',
            columnWidth: .4,
            border: false,
            defaultType: 'textfield',
            layout: {
                type: 'vbox',
                align: 'strech',
                pack: 'start'
            },
            defaults: {
                labelWidth: 60,
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'combobox',
                    id: 'pub_info_user_id',
                    fieldLabel: '发布人',
                    emptyText: '发布人'
                },
                {
                    xtype: 'datefield',
                    id: 'pub_info_pub_date',
                    format: 'Y-m-d',
                    fieldLabel: '发布日期',
                    emptyText: '发布日期'
                }
            ]
        },
        {

            xtype: 'panel',
            columnWidth: .4,
            border: false,
            defaultType: 'textfield',
            layout: {
                type: 'vbox',
                align: 'strech',
                pack: 'start'
            },
            defaults: {
                labelWidth: 60,
                labelAlign: 'right'
            },
            items: [
//                {
//                    xtype: 'combobox',
//                    allowBlank: true,
//                    fieldLabel: '接收人',
//                    id: 'pub_info_rec_user',
//                    store: 'User',
//                    displayField: 'name',
//                    valueField: 'user_nm',
//                    emptyText: '接收人'
//                },
                {
                    allowBlank: true,
                    fieldLabel: '公告名称',
                    id: 'pub_info_content',
                    emptyText: '公告名称'
                }
            ]
        },
        {
            xtype: 'panel',
            columnWidth: .2,
            border: false,
            layout: {
                type: 'vbox',
                align: 'strech',
                pack: 'start'
            },

            items: [
                {
                    xtype: 'button',
                    glyph: 0xf002,
                    text: '查找',
                    listeners: {

                        click: function () {
                            var store = Ext.getCmp('grid_public_info').getStore();
                            store.load({
                                params: {
                                    pubmgr_user_id: Ext.getCmp('pub_info_user_id').getValue(),
                                    pubmgr_pub_date: Ext.getCmp('pub_info_pub_date').getValue(),
                                    //pubmgr_rec_user: Ext.getCmp('pub_info_rec_user').getValue(),
                                    pubmgr_name: Ext.getCmp('pub_info_content').getValue()
                                }
                            });
                        }
                    }

                },
                {
                    xtype: 'panel',
                    height: 6,
                    border: false
                },
                {
                    xtype: 'button',
                    glyph: 0xf021,
                    text: '重置',
                    listeners: {
                        click: function (_this) {
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_public_info').getStore().load();
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
