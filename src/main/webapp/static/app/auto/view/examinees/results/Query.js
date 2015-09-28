Ext.define('App.view.examinees.results.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.resultsf_query',
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
                {
                    text: '维护',
                    id: 'results_edit',
                    iconCls: 'icon_edit',
                    handler: function(){
                        var sm = Ext.getCmp('grid_results_trainer').getSelectionModel();
                        var record = sm.getSelection()[0];

                        if(!record){
                            Ext.Msg.alert('信息','请选择要编辑的数据');
                            return;
                        }
                        var record = sm.getSelection()[0];

                        var editForm = null;
                        var editWindow = null;
                        editForm = new Ext.form.FormPanel({
                            frame: true,
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 90
                            },
                            defaults: {
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    hidden: 'true',
                                    fieldLabel: '考生ID',
                                    name: 'id'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '学历',
                                    name: 'education'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '工作单位',
                                    name: 'workunit'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '培训单位',
                                    name: 'drvschool'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '原从业资格证件号',
                                    name: 'qulfnum'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '申请种类',
                                    name: 'applytp'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '承诺',
                                    name: 'promise'
                                },
                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '承诺日期',
                                    name: 'promisedt',
                                    format: 'Y-m-d'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '身份证明原件',
                                    name: 'checklist1'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '身份证明复印件',
                                    name: 'checklist2'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '驾驶证原件',
                                    name: 'checklist3'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '驾驶证复印件',
                                    name: 'checklist4'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '无重大以上责任事故记录证明',
                                    name: 'checklist5'
                                },
                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名',
                                    name: 'name'
                                },
                                {

                                    xtype: "panel",
                                    anchor: '100%',
                                    layout: "column",
                                    fieldLabel: '性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别',
                                    xtype: 'radiogroup', anchor: '220%', columns: 20, items: [

                                    {readOnly: 'true',boxLabel: "男", name: 'sex', inputValue: '男',checked: true},

                                    {readOnly: 'true',boxLabel: "女", name: 'sex', inputValue: '女'}
                                ]
                                },
                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '身&nbsp&nbsp&nbsp份&nbsp&nbsp证&nbsp&nbsp&nbsp号',
                                    name: 'card'
                                },

                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '考生联系地址',
                                    name: 'address'
                                },
                                {
                                    readOnly: 'true',
                                    allowBlank: false,
                                    fieldLabel: '准&nbsp&nbsp&nbsp驾&nbsp&nbsp车&nbsp&nbsp&nbsp型',
                                    name: 'lictype',
                                    anchor: '100%'
                                },

                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '驾照初领日期',
                                    name: 'licdt',
                                    format: 'Y-m-d'
                                },
                                {
                                    hidden: 'true',
                                    fieldLabel: '资&nbsp&nbsp&nbsp格&nbsp&nbsp类&nbsp&nbsp&nbsp别',
                                    name: 'licmd',
                                    anchor: '100%'
                                },
                                {
//                                    hidden: 'true',
                                    anchor: '100%',
                                    fieldLabel: '考&nbsp&nbsp&nbsp生&nbsp&nbsp状&nbsp&nbsp&nbsp态',
                                    name: 'status',
                                    xtype: 'combobox',
                                    autoRender: true,
                                    autoShow: true,
                                    store:'discip_dict_store',
                                    triggerAction: 'all',
                                    valueField: 'fieldvaldis',
                                    displayField: 'fieldvaldis'
                                },
                                {
                                    anchor: '100%',
                                    xtype: 'textarea',
                                    fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
                                    name: 'remark'
                                }

//
                            ],
                            buttonAlign : "center",
                            buttons: [
                                {
                                    text: '保存',
                                    iconCls: 'icon_save',
                                    handler: function(){
                                        var form = this.up('form').getForm();
                                        if (form.isValid()){
                                            form.submit({
                                                url: 'update_trainer_info',
                                                waitMsg: '正在保存数据...',
                                                success: function(form, action){
                                                    Ext.Msg.alert("成功", "数据保存成功!");
                                                    Ext.getCmp('grid_results_trainer').getStore().reload();
                                                },
                                                failure: function(form, action){
                                                    Ext.Msg.alert("失败", "数据保存失败!");
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
                        });
                        editWindow = new Ext.Window({
                            layout: 'fit',
                            width: 400,
                            height: 500,
                            modal: true,
                            title: '考场纪律',
                            items: [editForm]
                        });
                        editWindow.show(Ext.get('results_edit'));
                        editForm.getForm().loadRecord(record);
                    }
                },
                {
                    text: '刷新',
                    iconCls: 'icon_table_refresh',
                    listeners: {
                        click: function(_this){
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_results_trainer').getStore().load();
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
                  id: 'resultsf_query_name',
                  name: 'name',
                  emptyText: '考生姓名'
                },
              {
                  allowBlank: true,
                  fieldLabel: '状态',
                  id: 'resultsf_query_status',
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
                            var store = Ext.getCmp('grid_results_trainer').getStore();
                            store.load({
                                params: {
                                    name: Ext.getCmp('resultsf_query_name').getValue(),
                                    status: Ext.getCmp('resultsf_query_status').getValue()
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
                            Ext.getCmp('grid_results_trainer').getStore().load();
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