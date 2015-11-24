Ext.define('App.view.questions.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.questionsf_query',
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
                    id: 'questions_import',
                    text: '导入',
                    iconCls: 'icon_import',

                    listeners: {
                        click: function () {
                            Ext.create('widget.window', {
                                title: '导入考题',
                                modal: true,
                                iconCls: 'icon_import',
                                width: 350,
                                height: 200,
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
                                            //{
                                            //    anchor: '100%',
                                            //    fieldLabel: '题本编号',
                                            //    name: 'qtbh',
                                            //    id:'qtbh',
                                            //    listeners: {
//                                                    "blur": function(field){
////                                                        alert(field.getValue());
//                                                        Ext.Ajax.request({
//                                                            method: "POST",
//                                                            params: {
//                                                                qtbh: field.getValue()
//                                                            },
//                                                            url: 'checked_qtbh_info',
//                                                            success: function (response,opts) {
//                                                                var obj=Ext.decode(response.responseText);
//                                                                if(!obj.success)
//                                                                {
//                                                                    Ext.Msg.alert("提示", "题本编号已存在，请更换题本编号！");
//                                                                    Ext.getCmp('qtbh').setValue("");
//                                                                }
//
//                                                            },
//                                                            failure: function(form, action){
//                                                                Ext.Msg.alert("失败", "题本编号检验失败!");
//                                                            }
//                                                        });
//                                                    }
//                                                }
                                                //allowBlank:false
                                            //},
                                            {
                                                anchor: '100%',
                                                xtype: 'filefield',
                                                name: 'file',
                                                fieldLabel: '导入考题',
                                                buttonText: '选择文件',
                                                allowBlank:false
                                            }
                                        ],
                                        buttonAlign : "center",
                                        buttons: [
                                            {
                                                text: '导入',
                                                iconCls: 'icon_save',
                                                handler: function(){
                                                    var form = this.up('form').getForm();
                                                    if (form.isValid()){
                                                        form.submit({
                                                            url: 'import_questions_info',
                                                            waitMsg: '正在保存数据...',
                                                            success: function(form, action){
                                                                Ext.Msg.alert("成功", "考题导入成功!");
                                                                //重新载入渠道信息
                                                                Ext.getCmp('grid_questions').getStore().reload();
                                                            },
                                                            failure: function(form, action){
                                                                Ext.Msg.alert("失败", "考题导入失败!");
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
                            }).show(Ext.get('questions_import'));
                        }
                    }
                },
                {
                    id: 'questions_add',
                    text: '添加',
                    iconCls: 'icon_add',
                    listeners: {
                        click: function () {
                            Ext.create('widget.window', {
                                title: '添加考题',
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
                                                fieldLabel: '考题ID',
                                                name: 'id'
                                            },
                                            {
                                                allowBlank: false,
                                                anchor: '100%',
                                                fieldLabel: '题本编号',
                                                name: 'qtbh'
                                            },
                                            {
                                                allowBlank: false,
                                                anchor: '100%',
                                                fieldLabel: '题&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp号',
                                                name: 'qtnum'
                                            },
                                            {
                                                allowBlank: false,
                                                anchor: '100%',
                                                xtype: 'textarea',
                                                fieldLabel: '题&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp目',
                                                name: 'question'
                                            },
                                            {
                                                allowBlank: false,
                                                anchor: '100%',
                                                name: 'type',
                                                fieldLabel: '题&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp型',
                                                xtype: 'combobox',
                                                autoRender: true,
                                                autoShow: true,
                                                store:'qtype_store',
                                                triggerAction: 'all',
                                                valueField: 'fieldval',
                                                displayField: 'fieldvaldis'
                                            }, {
                                                allowBlank: false,
                                                anchor: '100%',
                                                fieldLabel: '答&nbsp&nbsp&nbsp案&nbsp&nbsp&nbspA',
                                                name: 'qt_a'
                                            },
                                            {
                                                allowBlank: false,
                                                anchor: '100%',
                                                fieldLabel: '答&nbsp&nbsp&nbsp案&nbsp&nbsp&nbspB',
                                                name: 'qt_b'
                                            },
                                            {
                                                allowBlank: false,
                                                anchor: '100%',
                                                fieldLabel: '答&nbsp&nbsp&nbsp案&nbsp&nbsp&nbspC',
                                                name: 'qt_c'
                                            },
                                            {
                                                allowBlank: false,
                                                anchor: '100%',
                                                fieldLabel: '答&nbsp&nbsp&nbsp案&nbsp&nbsp&nbspD',
                                                name: 'qt_d'
                                            },
                                            {
                                                allowBlank: false,
                                                anchor: '100%',
                                                fieldLabel: '答&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp案',
                                                name: 'answer'
                                            },
                                            {
                                                allowBlank: false,
                                                anchor: '100%',
                                                fieldLabel: '分&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp值',
                                                xtype: 'numberfield',
                                                name: 'score'
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
                                                            url: 'add_questions_info',
                                                            waitMsg: '正在保存数据...',
                                                            success: function(form, action){
                                                                Ext.Msg.alert("成功", "数据保存成功!");
                                                                //重新载入渠道信息
                                                                Ext.getCmp('grid_questions').getStore().reload();
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
                            }).show(Ext.get('questions_add'));
                        }
                    }
                },
                {
                    text: '编辑',
                    id: 'questions_edit',
                    iconCls: 'icon_edit',
                    handler: function(){
                        var sm = Ext.getCmp('grid_questions').getSelectionModel();
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
                                    fieldLabel: '考题ID',
                                    name: 'id'
                                },
                                {
                                    allowBlank: false,
                                    anchor: '100%',
                                    fieldLabel: '题本编号',
                                    name: 'qtbh'
                                },
                                {
                                    allowBlank: false,
                                    anchor: '100%',
                                    fieldLabel: '题&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp号',
                                    name: 'qtnum'
                                },
                                {  allowBlank: false,
                                    anchor: '100%',
                                    xtype: 'textarea',
                                    fieldLabel: '题&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp目',
                                    name: 'question'
                                },

                                {  allowBlank: false,
                                    anchor: '100%',
                                    name: 'type',
                                    fieldLabel: '题&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp型',
                                    xtype: 'combobox',
                                    autoRender: true,
                                    autoShow: true,
                                    store:'qtype_store',
                                    triggerAction: 'all',
                                    valueField: 'fieldval',
                                    displayField: 'fieldvaldis'
                                },
                                {  allowBlank: false,
                                    anchor: '100%',
                                    fieldLabel: '答&nbsp&nbsp&nbsp案&nbsp&nbsp&nbspA',
                                    name: 'qt_a'
                                },
                                {  allowBlank: false,
                                    anchor: '100%',
                                    fieldLabel: '答&nbsp&nbsp&nbsp案&nbsp&nbsp&nbspB',
                                    name: 'qt_b'
                                },
                                {  allowBlank: false,
                                    anchor: '100%',
                                    fieldLabel: '答&nbsp&nbsp&nbsp案&nbsp&nbsp&nbspC',
                                    name: 'qt_c'
                                },
                                {  allowBlank: false,
                                    anchor: '100%',
                                    fieldLabel: '答&nbsp&nbsp&nbsp案&nbsp&nbsp&nbspD',
                                    name: 'qt_d'
                                },
                                {  allowBlank: false,
                                    anchor: '100%',
                                    fieldLabel: '答&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp案',
                                    name: 'answer'
                                },
                                {  allowBlank: false,
                                    anchor: '100%',
                                    fieldLabel: '分&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp值',
                                    xtype: 'numberfield',
                                    name: 'score'
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
                                                url: 'update_questions_info',
                                                waitMsg: '正在保存数据...',
                                                success: function(form, action){
                                                    Ext.Msg.alert("成功", "数据保存成功!");
                                                    Ext.getCmp('grid_questions').getStore().reload();
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
                            title: '修改考题',
                            items: [editForm]
                        });
                        editWindow.show(Ext.get('questions_edit'));
                        editForm.getForm().loadRecord(record);
                    }
                },
                {
                    text: '删除',
                    iconCls: 'icon_delete',
                    handler: function () {
                        Ext.Msg.confirm('信息', '确定要删除？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_questions').getSelectionModel();
                                var rows = sm.getSelection();

                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        var id = row.get('id');
                                        Ext.Ajax.request({
                                            url: 'delete_questions_info',
                                            params: {
                                                "id": id
                                            },
                                            waitMsg: '正在删除数据...',
                                            success: function (form, action) {
                                                Ext.Msg.alert("成功", "数据删除成功!");
                                                Ext.getCmp('grid_questions').getStore().reload();
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
                    glyph: 0xf021,
                    listeners: {
                        click: function(_this){
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_questions').getStore().load();
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
                    fieldLabel: '题本编号',
                    id: 'questions_query_qtbh',
                    name: 'qtbh',
                    emptyText: '题本编号'
                },
                {
                    allowBlank: true,
                    fieldLabel: '题号',
                    id: 'questions_query_qtnum',
                    name: 'qtnum',
                    emptyText: '题号'
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
                            var store = Ext.getCmp('grid_questions').getStore();
                            store.load({
                                params: {
                                    qtbh: Ext.getCmp('questions_query_qtbh').getValue(),
                                    qtnum: Ext.getCmp('questions_query_qtnum').getValue()
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
                            Ext.getCmp('grid_questions').getStore().load();
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
