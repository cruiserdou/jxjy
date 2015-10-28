Ext.define('App.view.nextexam.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.nextexam_query',
    split: true,
    bodyPadding: 20,
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    layout: 'column',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [
                {
                    xtype: 'combobox',
                    labelWidth: 70,
                    labelAlign: 'right',
                    fieldLabel: '选择驾校',
                    name: 'name',
                    id:'drvschool_nextexam_id',
                    autoRender: true,
                    autoShow: true,
                    store: Ext.create('Ext.data.Store',
                        {
                            extend: 'Ext.data.Store',
                            model: 'App.model.syj_drvschool',
                            proxy: {
                                type: 'ajax',
                                url: 'obtain_drvschool_info',
                                actionMethods: {
                                    read: 'POST'
                                },
                                reader: {
                                    type: 'json',
                                    root: 'list'
                                }
                            }
                        }),
                    displayField: 'name',
                    valueField: 'name',
                    //value: '基本信息',
                    listeners: {
                        change: function (_this, newValue) {
                            //alert(Ext.getCmp('drvschool_id').getValue());
                            var store = Ext.getCmp('grid_nextexam_trainer').getStore();
                            store.load({
                                params: {
                                    drvschool: Ext.getCmp('drvschool_nextexam_id').getValue()
                                }
                            });
                        }
                    }
                },
                {
                    text: '同意补考',
                    iconCls: 'icon_edit',
                    handler: function () {

                        Ext.Msg.confirm('信息', '确定要同意补考吗？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_nextexam_trainer').getSelectionModel();
                                var rows = sm.getSelection();

                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        var id = row.get('id');
                                        Ext.Ajax.request({
                                            url: 'update_trainer_nexteaxm_info',
                                            params: {
                                                "card": row.get('card')
                                            },
                                            waitMsg: '正在终审数据...',
                                            success: function (form, action) {
                                                Ext.Msg.alert("成功", "同意补考成功!");
                                                Ext.getCmp('grid_nextexam_trainer').getStore().reload();
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert("失败", "同意补考失败!");
                                            }
                                        });
                                    }
                                } else {
                                    Ext.Msg.alert('提示', '请选择要同意补考的记录');
                                }
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
                            Ext.getCmp('grid_nextexam_trainer').getStore().load();
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
            items: [
                {
                    allowBlank: true,
                    fieldLabel: '考生姓名',
                    id: 'nextexam_trainer_name',
                    emptyText: '考生姓名'
                },
                {
                    allowBlank: true,
                    fieldLabel: '身份证',
                    id: 'nextexam_trainer_card',
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
                        click: function () {
                            var store = Ext.getCmp('grid_nextexam_trainer').getStore();
                            store.load({
                                params: {
                                    name: Ext.getCmp('nextexam_trainer_name').getValue(),
                                    card: Ext.getCmp('nextexam_trainer_card').getValue(),
                                    drvschool: Ext.getCmp('drvschool_id').getValue()
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
                        click: function (_this) {
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_nextexam_trainer').getStore().load();
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