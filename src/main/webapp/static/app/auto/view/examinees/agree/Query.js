Ext.define('App.view.examinees.agree.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.agreef_query',
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
                    text: '同意',
                    id: 'agrees_edit',
                    iconCls: 'icon_edit',
                    handler: function () {

                        Ext.Msg.confirm('信息', '确定要同意考试？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_trainer_agree').getSelectionModel();
                                var rows = sm.getSelection();

                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        var id = row.get('id');
                                        Ext.Ajax.request({
                                            url: 'update_trainer_info',
                                            params: {
                                                "id": id,
                                                "status": '同意考试',
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
                                            waitMsg: '正在同意考试数据...',
                                            success: function (form, action) {
                                                Ext.Msg.alert("成功", "数据同意考试成功!");
                                                Ext.getCmp('grid_trainer_agree').getStore().reload();
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert("失败", "数据同意考试失败!");
                                            }
                                        });
                                    }
                                } else {
                                    Ext.Msg.alert('提示', '请选择要同意考试的记录');
                                }
                            }
                        });
                    }
                },
                {
                    text: '不同意',
                    id: 'agrees_no_edit',
                    iconCls: 'icon_delete',
                    handler: function () {

                        Ext.Msg.confirm('信息', '确定要撤销同意考试？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_trainer_agree').getSelectionModel();
                                var rows = sm.getSelection();

                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        var id = row.get('id');
                                        Ext.Ajax.request({
                                            url: 'update_trainer_info',
                                            params: {
                                                "id": id,
                                                "status": '不同意考试',
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
                                            waitMsg: '正在撤销同意考试数据...',
                                            success: function (form, action) {
                                                Ext.Msg.alert("成功", "数据撤销同意考试成功!");
                                                Ext.getCmp('grid_trainer_agree').getStore().reload();
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert("失败", "数据同意考试失败!");
                                            }
                                        });
                                    }
                                } else {
                                    Ext.Msg.alert('提示', '请选择要撤销同意考试的记录');
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
                            Ext.getCmp('grid_trainer_agree').getStore().load();
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
                  id: 'agreef_query_name',
                  name: 'name',
                  emptyText: '考生姓名'
                },
              {
                  allowBlank: true,
                  fieldLabel: '状态',
                  id: 'agreef_query_status',
                  name: 'status',
                  emptyText: '状态'
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
                            var store = Ext.getCmp('grid_trainer_agree').getStore();
                            store.load({
                                params: {
                                    name: Ext.getCmp('agreef_query_name').getValue(),
                                    status: Ext.getCmp('agreef_query_status').getValue()
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
                            Ext.getCmp('grid_trainer_agree').getStore().load();
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