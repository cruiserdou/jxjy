Ext.define('App.view.qtcont.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.qtcontf_query',
    split: true,
    height: 120,
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
                    id: 'grid_qt_cont_add',
                    text: '添加',
                    iconCls: 'icon_add',
                    listeners: {
                        click: function () {
                            Ext.create('widget.window', {
                                title: '添加',
                                modal: true,
                                iconCls: 'icon_add',
                                width: 350,
                                height: 500,
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
                                        bodyPadding: 5,
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
//                                            {
//                                                anchor: '100%',
//                                                name: 'lictype',
//                                                fieldLabel: '报考类型',
//                                                xtype: 'combobox',
//                                                autoRender: true,
//                                                autoShow: true,
//                                                store:'type_dict_store',
//                                                triggerAction: 'all',
//                                                valueField: 'fieldvaldis',
//                                                displayField: 'fieldvaldis',
//                                                id:'lictype',
//                                                listeners: {
//                                                    "blur": function(field){
////                                                        alert(field.getValue());
//                                                        Ext.Ajax.request({
//                                                            method: "POST",
//                                                            params: {
//                                                                lictype: field.getValue()
//                                                            },
//                                                            url: 'checked_lictype_info',
//                                                            success: function (response,opts) {
//                                                                var obj=Ext.decode(response.responseText);
//                                                                if(!obj.success)
//                                                                {
//                                                                    Ext.Msg.alert("提示", "报考类型题本已存在，请更换报考类型！");
//                                                                    Ext.getCmp('lictype').setValue("");
//                                                                }
//                                                            },
//                                                            failure: function(form, action){
//                                                                Ext.Msg.alert("失败", "报考类型检验失败!");
//                                                            }
//                                                        });
//                                                    }
//                                                },
//                                                allowBlank:false
//
//                                            },
                                            {
                                                allowBlank:false,
                                                name: 'lictype',
                                                fieldLabel: '报考类型',
                                                width : 500,
                                                xtype: 'combo',
                                                autoRender: true,
                                                autoShow: true,
                                                store:Ext.create('Ext.data.Store',
                                                    {
                                                        fields:['type'],
                                                        data:
                                                            [
                                                                {'type':'客运'},
                                                                {'type':'货运'},
                                                                {'type':'客货'}
                                                            ]
                                                    }
                                                ),
                                                displayField:'type',
                                                valueField:'type',
                                                listeners: {
                                                    "blur": function(field){
//                                                        alert(field.getValue());
                                                        Ext.Ajax.request({
                                                            method: "POST",
                                                            params: {
                                                                lictype: field.getValue()
                                                            },
                                                            url: 'checked_lictype_info',
                                                            success: function (response,opts) {
                                                                var obj=Ext.decode(response.responseText);
                                                                if(!obj.success)
                                                                {
                                                                    Ext.Msg.alert("提示", "报考类型题本已存在，请更换报考类型！");
                                                                    Ext.getCmp('lictype').setValue("");
                                                                }
                                                            },
                                                            failure: function(form, action){
                                                                Ext.Msg.alert("失败", "报考类型检验失败!");
                                                            }
                                                        });
                                                    }
                                                }
                                            },
                                            {
                                                anchor: '100%',
                                                name: 'qtbh',
                                                fieldLabel: '题本编号',
                                                xtype: 'combobox',
                                                autoRender: true,
                                                autoShow: true,
                                                store:'question_dict_store',
                                                triggerAction: 'all',
                                                valueField: 'qtbh',
                                                displayField: 'qtbh',
                                                allowBlank:false

                                            },

                                            {
                                                anchor: '100%',
                                                xtype: 'textarea',
                                                fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
                                                name: 'remark'
                                            }
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
                                                            url: 'add_qt_cont_info',
                                                            waitMsg: '正在保存数据...',
                                                            success: function(form, action){
                                                                Ext.Msg.alert("成功", "数据保存成功!");
                                                                //重新载入渠道信息
                                                                Ext.getCmp('grid_qt_cont').getStore().reload();
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
                                    }

                                ]
                            }).show(Ext.get('grid_qt_cont_add'));
                        }
                    }
                },
                {
                    text: '编辑',
                    id: 'grid_qt_cont_edit',
                    iconCls: 'icon_edit',
                    handler: function(){
                        var sm = Ext.getCmp('grid_qt_cont').getSelectionModel();
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
                                labelWidth: 70
                            },
                            defaults: {
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    hidden: 'true',
                                    fieldLabel: 'ID',
                                    name: 'id'
                                },
                                {
                                    readOnly:true,
                                    anchor: '100%',
                                    name: 'lictype',
                                    fieldLabel: '报考类型',
                                    allowBlank:false
                                },

                                {
                                    anchor: '100%',
                                    name: 'qtbh',
                                    fieldLabel: '题本编号',
                                    xtype: 'combobox',
                                    autoRender: true,
                                    autoShow: true,
                                    store:'question_dict_store',
                                    triggerAction: 'all',
                                    valueField: 'qtbh',
                                    displayField: 'qtbh',
                                    allowBlank:false

                                },
                                {
                                    anchor: '100%',
                                    xtype: 'textarea',
                                    fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
                                    name: 'remark'
                                }
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
                                                url: 'update_qt_cont_info',
                                                waitMsg: '正在保存数据...',
                                                success: function(form, action){
                                                    Ext.Msg.alert("成功", "数据保存成功!");
                                                    Ext.getCmp('grid_qt_cont').getStore().reload();
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
                            width: 350,
                            height: 500,
                            modal: true,
                            title: '修改',
                            items: [editForm]
                        });
                        editWindow.show(Ext.get('grid_qt_cont_edit'));
                        editForm.getForm().loadRecord(record);
                    }
                },
                {
                    text: '刷新',
                    glyph: 0xf021,
                    listeners: {
                        click: function(_this){
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_qt_cont').getStore().load();
                        }
                    }
                }


                //{
                //    text: '删除',
                //    iconCls: 'icon_delete',
                //    handler: function () {
                //        Ext.Msg.confirm('信息', '确定要删除？', function (btn) {
                //            if (btn == 'yes') {
                //                var sm = Ext.getCmp('grid_qt_cont').getSelectionModel();
                //                var rows = sm.getSelection();
                //
                //                if (rows.length > 0) {
                //                    for (var i = 0; i < rows.length; i++) {
                //                        var row = rows[i];
                //                        var id = row.get('id');
                //                        Ext.Ajax.request({
                //                            url: 'delete_qt_cont_info',
                //                            params: {
                //                                "id": id
                //                            },
                //                            waitMsg: '正在删除数据...',
                //                            success: function (form, action) {
                //                                Ext.Msg.alert("成功", "数据删除成功!");
                //                                Ext.getCmp('grid_qt_cont').getStore().reload();
                //                            },
                //                            failure: function (form, action) {
                //                                Ext.Msg.alert("失败", "数据删除失败!");
                //                            }
                //                        });
                //                    }
                //                } else {
                //                    Ext.Msg.alert('提示', '请选择要删除的记录');
                //                }
                //            }
                //        });
                //    }
                //}
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
                    fieldLabel: '题本编号',
                    id: 'query_qt_cont_qtbh',
                    name: 'qtbh',
                    emptyText: '题本编号'
                },
                {
                    allowBlank: true,
                    fieldLabel: '考试类型',
                    id: 'query_qt_cont_lictype',
                    name: 'lictype',
                    emptyText: '考试类型'
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
                            var store = Ext.getCmp('grid_qt_cont').getStore();
                            store.load({
                                params: {
                                    qtbh: Ext.getCmp('query_qt_cont_qtbh').getValue(),
                                    lictype: Ext.getCmp('query_qt_cont_lictype').getValue()
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
                            Ext.getCmp('grid_qt_cont').getStore().load();
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
