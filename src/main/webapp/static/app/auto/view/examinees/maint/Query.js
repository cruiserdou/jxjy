Ext.define('App.view.examinees.maint.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.maintf_query',
    split: true,
    height: 100,
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
//                {
//                    text: '编辑',
//                    id: 'maint_edit',
//                    iconCls: 'icon_edit',
//                    handler: function(){
//                        var sm = Ext.getCmp('grid_trainer_maint').getSelectionModel();
//                        var record = sm.getSelection()[0];
//
//                        if(!record){
//                            Ext.Msg.alert('信息','请选择要编辑的数据');
//                            return;
//                        }
//                        var record = sm.getSelection()[0];
//
//                        var editForm = null;
//                        var editWindow = null;
//                        editForm = new Ext.form.FormPanel({
//                            frame: true,
//                            fieldDefaults: {
//                                labelAlign: 'right',
//                                labelWidth: 90
//                            },
//                            defaults: {
//                                xtype: 'textfield'
//                            },
//                            items: [
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '考生ID',
//                                    name: 'id'
//                                },
//                                {
//                                    fieldLabel: '姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名',
//                                     anchor: '100%',
//                                    name: 'name'
//                                },
//
//                                {
//                                    fieldLabel: '性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别',
//                                    width: 500,
//                                    xtype: "panel",
//                                    layout: "column",
//                                    xtype: 'radiogroup', anchor: '220%', columns: 20, items: [
//                                    {boxLabel: "男", name: 'sex', inputValue: '男', checked: true},
//
//                                    {boxLabel: "女", name: 'sex', inputValue: '女'}
//                                ]
//                                },
//                                {
//                                    fieldLabel: '学&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp历',
//                                    name: 'education',
//                                     anchor: '100%'
//                                },
//                                {
//                                    fieldLabel: '工&nbsp&nbsp&nbsp作&nbsp&nbsp单&nbsp&nbsp&nbsp位',
//                                    name: 'workunit',
//                                     anchor: '100%'
//                                },
//                                {
//                                    fieldLabel: '培&nbsp&nbsp&nbsp训&nbsp&nbsp单&nbsp&nbsp&nbsp位',
//                                    name: 'drvschool',
//                                     anchor: '100%'
//                                },
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '原从业资格证件号',
//                                    name: 'qulfnum',
//                                     anchor: '100%'
//                                },
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '申请种类',
//                                    name: 'applytp',
//                                     anchor: '100%'
//                                },
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '承诺',
//                                    name: 'promise',
//                                     anchor: '100%'
//                                },
//                                {
//                                    readOnly: 'true',
//                                    anchor: '100%',
//                                    fieldLabel: '承诺日期',
//                                    name: 'promisedt',
//                                    format: 'Y-m-d'
//                                },
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '身份证明原件',
//                                    name: 'checklist1',
//                                     anchor: '100%'
//                                },
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '身份证明复印件',
//                                    name: 'checklist2',
//                                     anchor: '100%'
//                                },
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '驾驶证原件',
//                                    name: 'checklist3',
//                                     anchor: '100%'
//                                },
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '驾驶证复印件',
//                                    name: 'checklist4',
//                                     anchor: '100%'
//                                },
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '无重大以上责任事故记录证明',
//                                    name: 'checklist5',
//                                     anchor: '100%'
//                                },
//
//                                {
//                                                fieldLabel: '身&nbsp&nbsp&nbsp份&nbsp&nbsp证&nbsp&nbsp&nbsp号',
//                                                width : 500,
//                                                name: 'card',
//                                                 regex : /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/,
//                                                regexText : '输入正确的身份号码'
//                                            },
//                                {
//                                     anchor: '100%',
//                                    fieldLabel: '考生联系地址',
//                                    name: 'address'
//                                },
//                                {
//                                                fieldLabel: '准&nbsp&nbsp&nbsp驾&nbsp&nbsp车&nbsp&nbsp&nbsp型',
//                                                name: 'lictype',
//                                                anchor: '100%',
//                                                xtype: 'combo',
//                                                autoRender: true,
//                                                autoShow: true,
//                                                store:Ext.create('Ext.data.Store',
//                                                    {
//                                                        fields:['type'],
//                                                        data:
//                                                            [
//                                                                {'type':'A3'},
//                                                                {'type':'B1'},
//                                                                {'type':'B2'},
//                                                                {'type':'C1'},
//                                                                {'type':'C2'},
//                                                                {'type':'C3'},
//                                                                {'type':'C4'},
//                                                                {'type':'M'}
//                                                            ]
//                                                    }
//                                                ),
//                                                displayField:'type',
//                                                valueField:'type'
//                                            },
//                                {
//                                     anchor: '100%',
//                                    xtype: 'datefield',
//                                    fieldLabel: '驾照初领日期',
//                                    name: 'licdt',
//                                    format: 'Y-m-d'
//                                },
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '资&nbsp&nbsp&nbsp格&nbsp&nbsp类&nbsp&nbsp&nbsp别',
//                                    name: 'licmd',
//                                     anchor: '100%'
//                                },
//                                {
//                                     anchor: '100%',
//                                    fieldLabel: '考&nbsp&nbsp&nbsp生&nbsp&nbsp状&nbsp&nbsp&nbsp态',
//                                    name: 'status',
//                                    xtype: 'combobox',
//                                    autoRender: true,
//                                    autoShow: true,
//                                    store:'regist_dict_store',
//                                    triggerAction: 'all',
//                                    valueField: 'fieldvaldis',
//                                    displayField: 'fieldvaldis'
//                                },
//
//                                {
//                                     anchor: '100%',
//                                    xtype: 'textarea',
//                                    fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
//                                    name: 'remark'
//                                }
//                            ],
//                            buttonAlign : "center",
//                            buttons: [
//                                {
//                                    text: '保存',
//                                    iconCls: 'icon_save',
//                                    handler: function(){
//                                        var form = this.up('form').getForm();
//                                        if (form.isValid()){
//                                            form.submit({
//                                                url: 'update_trainer_info',
//                                                waitMsg: '正在保存数据...',
//                                                success: function(form, action){
//                                                    Ext.Msg.alert("成功", "数据保存成功!");
//                                                    Ext.getCmp('grid_trainer_maint').getStore().reload();
//                                                },
//                                                failure: function(form, action){
//                                                    Ext.Msg.alert("失败", "数据保存失败!");
//                                                }
//                                            });
//                                        }
//                                    }
//                                },
//                                {
//                                    text: '重置',
//                                    iconCls: 'icon_reset',
//                                    handler: function () {
//                                        this.up('form').getForm().reset();
//                                    }
//                                }
//                            ]
//                        });
//                        editWindow = new Ext.Window({
//                            layout: 'fit',
//                            width: 450,
//                            height: 500,
//                            modal: true,
//                            title: '修改考生',
//                            items: [editForm]
//                        });
//                        editWindow.show(Ext.get('maint_edit'));
//                        editForm.getForm().loadRecord(record);
//                    }
//                },
                {
                    text: '删除',
                    iconCls: 'icon_delete',
                    handler: function () {
                        Ext.Msg.confirm('信息', '确定要删除？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_trainer_maint').getSelectionModel();
                                var rows = sm.getSelection();

                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        var id = row.get('id');
                                        Ext.Ajax.request({
                                            url: 'delete_trainers_info',
                                            params: {
                                                "id": id
                                            },
                                            waitMsg: '正在删除数据...',
                                            success: function (form, action) {
                                                Ext.Msg.alert("成功", "数据删除成功!");
                                                Ext.getCmp('grid_trainer_maint').getStore().reload();
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert("失败", "数据删除失败!");
                                            }
                                        });
                                    }
                                } else {
                                    Ext.Msg.alert('提示', '请选择要删除的记录');
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
                            Ext.getCmp('grid_trainer_maint').getStore().load();
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
                  id: 'printf_query_name',
                  name: 'name',
                  emptyText: '考生姓名'
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
                            var store = Ext.getCmp('grid_trainer_maint').getStore();
                            store.load({
                                params: {
                                    name: Ext.getCmp('printf_query_name').getValue()
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
                            Ext.getCmp('grid_trainer_maint').getStore().load();
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