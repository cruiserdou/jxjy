Ext.define('App.view.examinees.final.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.finals_query',
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
                    text: '终审',
                    iconCls: 'icon_edit',
                    handler: function () {

                        Ext.Msg.confirm('信息', '确定要终审？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_finals_trainer').getSelectionModel();
                                var rows = sm.getSelection();

                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        var id = row.get('id');
                                        Ext.Ajax.request({
                                            url: 'update_trainer_info',
                                            params: {
                                                "id": id,
                                                "status": '终审',
                                                "name": row.get('name'),
                                                "sex": row.get('sex'),
                                                "education": row.get('education'),
                                                "card": row.get('card'),
                                                "address": row.get('address'),
                                                "workunit": row.get('workunit'),
                                                "drvschool": row.get('drvschool'),
                                                "lictype": row.get('lictype'),
                                                "licdt": row.get('licdt'),
                                                "applytp": row.get('applytp'),
                                                "qulfnum": row.get('qulfnum'),
                                                "licmd": row.get('licmd'),
                                                "checklist1": row.get('checklist1'),
                                                "checklist2": row.get('checklist2'),
                                                "checklist3": row.get('checklist3'),
                                                "checklist4": row.get('checklist4'),
                                                "checklist5": row.get('checklist5'),
                                                "promise": row.get('promise'),
                                                "remark": row.get('remark'),
                                                "licmd_goods": row.get('licmd_goods'),
                                                "promisedt": row.get('promisedt')
                                            },
                                            waitMsg: '正在终审数据...',
                                            success: function (form, action) {
                                                Ext.Msg.alert("成功", "数据终审成功!");
                                                Ext.getCmp('grid_finals_trainer').getStore().reload();
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert("失败", "数据终审失败!");
                                            }
                                        });
                                    }
                                } else {
                                    Ext.Msg.alert('提示', '请选择要终审的记录');
                                }
                            }
                        });
                    }
                },
                {
                    text: '刷新',
                    iconCls: 'icon_table_refresh',
                    listeners: {
                        click: function(_this){
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_finals_trainer').getStore().load();
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
                    id: 'finalf_query_name',
                    name: 'name',
                    emptyText: '考生姓名'
                },
                {
                    allowBlank: true,
                    fieldLabel: '终审状态',
                    id: 'finalf_query_status',
                    name: 'status',
                    emptyText: '终审状态'
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
                            var store = Ext.getCmp('grid_finals_trainer').getStore();
                            store.load({
                                params: {
                                    name: Ext.getCmp('finalf_query_name').getValue(),
                                    status: Ext.getCmp('finalf_query_status').getValue()
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
                            Ext.getCmp('grid_finals_trainer').getStore().load();
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