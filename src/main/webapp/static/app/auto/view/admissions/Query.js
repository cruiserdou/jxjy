

Ext.define('App.view.admissions.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.admissionsf_query',
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
                    id: 'admissions_add',
                    text: '添加',
                    iconCls: 'icon_add',
                    listeners: {
                        click: function () {
                            Ext.create('widget.window', {
                                title: '添加准考证信息',
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
                                                fieldLabel: '准考证ID',
                                                name: 'id'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '准考证号',
                                                name: 'admbh'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '题本编号',
                                                name: 'qtbh'
                                            },
                                            {
                                                anchor: '100%',
                                                name: 'examid',
                                                fieldLabel: '考&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp生',
                                                xtype: 'combobox',
                                                autoRender: true,
                                                autoShow: true,
                                                store:'syj_examinees',
                                                triggerAction: 'all',
                                                valueField: 'id',
                                                displayField: 'name'
                                            },
                                            {
                                                xtype: 'datefield',
                                                anchor: '100%',
                                                fieldLabel: '考试时间',
                                                name: 'examdt',
                                                format: 'Y-m-d'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '考&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp点',
                                                name: 'sites'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '考&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp场',
                                                name: 'examroom'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '座&nbsp&nbsp位&nbsp&nbsp号',
                                                name: 'examsite'
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
                                                            url: 'add_admissions_info',
                                                            waitMsg: '正在保存数据...',
                                                            success: function(form, action){
                                                                Ext.Msg.alert("成功", "数据保存成功!");
                                                                //重新载入渠道信息
                                                                Ext.getCmp('grid_admissions').getStore().reload();
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
                            }).show(Ext.get('admissions_add'));
                        }
                    }
                },
                {
                    text: '编辑',
                    id: 'admissions_edit',
                    iconCls: 'icon_edit',
                    handler: function(){
                        var sm = Ext.getCmp('grid_admissions').getSelectionModel();
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
                                    fieldLabel: '准考证ID',
                                    name: 'id'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '准考证号',
                                    name: 'admbh'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '题本编号',
                                    name: 'qtbh'
                                },
                                {
                                    anchor: '100%',
                                    name: 'examid',
                                    fieldLabel: '考&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp生',
                                    xtype: 'combobox',
                                    autoRender: true,
                                    autoShow: true,
                                    store:'syj_examinees',
                                    triggerAction: 'all',
                                    valueField: 'id',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: '考试时间',
                                    name: 'examdt',
                                    format: 'Y-m-d'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '考&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp点',
                                    name: 'sites'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '考&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp场',
                                    name: 'examroom'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '座&nbsp&nbsp位&nbsp&nbsp号',
                                    name: 'examsite'
                                },
                                {
                                    hidden:'true',
                                    anchor: '100%',
                                    fieldLabel: '分&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp值',
                                    name: 'scores'
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
                                                url: 'update_admissions_info',
                                                waitMsg: '正在保存数据...',
                                                success: function(form, action){
                                                    Ext.Msg.alert("成功", "数据保存成功!");
                                                    Ext.getCmp('grid_admissions').getStore().reload();
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
                            height: 350,
                            modal: true,
                            items: [editForm]
                        });
                        editWindow.show(Ext.get('admissions_edit'));
                        editForm.getForm().loadRecord(record);
                    }
                },
                {
                    text: '制证',
                    id: 'admissions_print',
                    iconCls: 'icon_edit',
                    handler: function(){
                        var sm = Ext.getCmp('grid_admissions').getSelectionModel();
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
                                    fieldLabel: '准考证ID',
                                    name: 'id'
                                },
                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '准考证号',
                                    name: 'admbh'
                                },
                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '题本编号',
                                    name: 'qtbh'
                                },
                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    name: 'examid',
                                    fieldLabel: '考&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp生'

                                },
                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '考试时间',
                                    name: 'examdt'
                                },
                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '考&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp点',
                                    name: 'sites'
                                },
                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '考&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp场',
                                    name: 'examroom'
                                },
                                {
                                    readOnly: 'true',
                                    anchor: '100%',
                                    fieldLabel: '座&nbsp&nbsp位&nbsp&nbsp号',
                                    name: 'examsite'
                                },
                                {
                                    hidden:'true',
                                    anchor: '100%',
                                    fieldLabel: '分&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp值',
                                    name: 'scores'
                                },
                                {
                                    readOnly:'true',
                                    anchor: '100%',
                                    xtype: 'textarea',
                                    fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
                                    name: 'remark'
                                }
                              
                            ],
                            buttonAlign : "center",
                            buttons: [
                                {
                                    text: '制证',
                                    iconCls: 'icon_save',
                                    handler: function(){
                                        var form = this.up('form').getForm();
                                        if (form.isValid()){
                                            form.submit({
                                                url: 'print_examdoc_info',
                                                waitMsg: '正在制证...',
                                                success: function(form, action){
                                                    Ext.Msg.alert("成功", "该考生以制证成功!");
                                                    Ext.getCmp('grid_admissions').getStore().reload();
                                                },
                                                failure: function(form, action){
                                                    Ext.Msg.alert("失败", "制证失败!");
                                                }
                                            });
                                        }
                                    }
                                }
                            ]
                        });
                        editWindow = new Ext.Window({
                            layout: 'fit',
                            width: 300,
                            height: 400,
                            modal: true,
                            title: '制准考证',
                            items: [editForm]
                        });
                        editWindow.show(Ext.get('admissions_print'));
                        editForm.getForm().loadRecord(record);
                    }
                },

                {
                    text: '删除',
                    iconCls: 'icon_delete',
                    handler: function () {
                        Ext.Msg.confirm('信息', '确定要删除？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_admissions').getSelectionModel();
                                var rows = sm.getSelection();

                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        var id = row.get('id');
                                        Ext.Ajax.request({
                                            url: 'delete_admissions_info',
                                            params: {
                                                "id": id
                                            },
                                            waitMsg: '正在删除数据...',
                                            success: function (form, action) {
                                                Ext.Msg.alert("成功", "数据删除成功!");
                                                Ext.getCmp('grid_admissions').getStore().reload();
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
                            Ext.getCmp('grid_admissions').getStore().load();
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
                    fieldLabel: '准考证号',
                    id: 'query_admbh',
                    name: 'admbh',
                    emptyText: '准考证号'
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
                            var store = Ext.getCmp('grid_admissions').getStore();
                            store.load({
                                params: {
                                    admbh: Ext.getCmp('query_admbh').getValue()
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
                            Ext.getCmp('grid_admissions').getStore().load();
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
