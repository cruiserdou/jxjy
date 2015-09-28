Ext.define('App.view.orders.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ordersf_query',
    split: true,
//    height: 120,
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [
                {
                    id: 'orders_add',
                    text: '开考指令',
                    iconCls: 'icon_add',
                    listeners: {
                        click: function () {
                            Ext.create('widget.window', {
                                title: '开考指令',
                                modal: true,
                                iconCls: 'icon_add',
                                width: 350,
                                height: 350,
                                border: false,
                                layout: 'fit',
                                defaults: {
                                    width: 200,
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        xtype: 'form',
                                        frame: true,
                                        bodyPadding: 10,
                                        fieldDefaults: {
                                            labelAlign: 'left',
                                            labelWidth: 70
                                        },
                                        defaults: {
                                            labelAlign: 'right',
                                            xtype: 'textfield'
                                        },
                                        items: [
                                            {
                                                hidden: 'true',
                                                fieldLabel: 'ID',
                                                name: 'id'
                                            },
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: '开始时间',
                                                anchor: '100%',
                                                name: 'examks',
                                                value: new Date(),
                                                format: 'Y-m-d H:i:s',
                                                allowBlank:false
                                             },
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: '结束时间',
                                                anchor: '100%',
                                                name: 'examjs',
                                                value: new Date(),
                                                format: 'Y-m-d H:i:s',
                                                allowBlank:false
                                            }
                                        ],
                                        buttonAlign : "center",
                                        buttons: [
                                            {
                                                text: '开始考试',
                                                iconCls: 'icon_save',
                                                handler: function(){
                                                    var form = this.up('form').getForm();
                                                    if (form.isValid()){
                                                        form.submit({
                                                            url: 'add_orders_info',
                                                            waitMsg: '正在启动数据...',
                                                            success: function(form, action){
                                                                Ext.Msg.alert("成功", "考试启动成功!");
                                                                //重新载入渠道信息
                                                                Ext.getCmp('grid_orders').getStore().reload();
                                                            },
                                                            failure: function(form, action){
                                                                Ext.Msg.alert("失败", "考试启动失败!");
                                                            }
                                                        });
                                                    }
                                                }
                                            },
                                            {
                                                text: '重置',
                                                iconCls: 'icon_reset',
                                                handler: function () {
                                                    this.up('form').getForm().reset();
                                                }
                                            }
                                        ]
                                    }

                                ]
                            }).show(Ext.get('orders_add'));
                        }
                    }
                }
        

            ]
        }
    ],
//    bodyPadding: 20,
//    frame: false,
//    collapseMode: 'mini',
//    collapsed: false,
//    useSplitTips: true,
//    defaultType: 'textfield',
//    layout: 'column',
//    items: [
//        {
//            xtype: 'panel',
//            columnWidth: .4,
//            border: false,
//            defaultType: 'textfield',
//            layout: {
//                type: 'vbox',
//                align: 'strech',
//                pack: 'start'
//            },
//            items: [
////                {
////                    allowBlank: true,
////                    fieldLabel: '角色名称',
////                    name: 'rolename',
////                    id: 'query_rolename',
////                    emptyText: '角色名称'
////                }
//            ]
//        },
//        {
//            xtype: 'panel',
//            border: false,
//            items: [
//                {
//                    xtype: 'button',
//                    iconCls: 'icon_search',
//                    text: '查找',
//                    listeners: {
//                        click: function(){
//                            var store = Ext.getCmp('grid_orders').getStore();
//                            store.load({
//                                params: {
//                                    rolename: Ext.getCmp('query_rolename').getValue()
//                                }
//                            });
//                        }
//                    }
//                },
//                {
//                    xtype: 'button',
//                    iconCls: 'icon_reset',
//                    text: '重置',
//                    listeners: {
//                        click: function(_this){
//                            _this.up('form').getForm().reset();
//                            Ext.getCmp('grid_orders').getStore().load();
//                        }
//                    }
//                }
//            ]
//        }
//    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});