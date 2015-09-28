Ext.define('App.view.examinees.refer.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.referf_query',
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
                    text: '关联期数',
                    id: 'trainer_period_id',
                    glyph: 0xf003,
                    handler: function () {



                        Ext.Msg.confirm('信息', '确定要关联？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_trainer_refer').getSelectionModel();
                                var rows = sm.getSelection();
                                var id_list="";
                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        id_list =id_list+','+ row.get('id');
                                    }
                                    Ext.create('widget.window', {
                                        title: '关联期数',
                                        modal: true,
                                        iconCls: 'icon_add',
                                        width: 300,
                                        height: 300,
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
                                                        xtype: 'combobox',
                                                       name:'maxperiod' ,
                                                        fieldLabel: '期数',
                                                        store: 'myperiod',
                                                        displayField: 'maxperiod',
                                                        valueField: 'maxperiod',
                                                        emptyText: '期数'
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
                                                                    url: 'add_many_period_info',
                                                                    params: {
                                                                        "id_list": id_list
                                                                    },
                                                                    waitMsg: '正在保存数据...',
                                                                    success: function(form, action){
                                                                        Ext.Msg.alert("成功", "关联成功!");
                                                                        Ext.getCmp('grid_trainer_refer').getStore().reload();
                                                                    },
                                                                    failure: function(form, action){
                                                                        Ext.Msg.alert("失败", "关联失败!");
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
                                    }).show(Ext.get('trainer_period_id'));


                                } else {
                                    Ext.Msg.alert('提示', '请选择要关联的客户');
                                }
                            }
                        });
                    }
                },
                {
                    text: '提交',
                    iconCls: 'icon_edit',
                    handler: function () {


                        Ext.Msg.confirm('信息', '确定要提交？', function (btn) {
                            if (btn == 'yes') {

                                var sm = Ext.getCmp('grid_trainer_refer').getSelectionModel();
                                var rows = sm.getSelection();
                                if (rows.length > 0) {

                                    var s_id="";
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        s_id =s_id+','+row.get('id');
                                    }
                                    Ext.Ajax.request({
                                        method: "POST",
                                        url: 'check_refer_trainer_info',
                                        params: {
                                            s_id: s_id
                                        },
                                        success: function (response,opts) {
                                            var obj = Ext.decode(response.responseText);

                                            if (obj.success == false) {
                                                Ext.Msg.alert("提示", "提交失败，最新期数已开班！");
                                                return;
                                            } else {
                                                fun_tj(s_id);
                                            } ;
                                        },
                                        failure: function (response,opts){
                                            Ext.Msg.alert("提示", "请联系管理员！");
                                            return;
                                        }
                                    });



                                } else {
                                    Ext.Msg.alert('提示', '请选择要提交的记录');
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
                            Ext.getCmp('grid_trainer_refer').getStore().load();
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
                  id: 'referf_query_name',
                  name: 'name',
                  emptyText: '考生姓名'
                },
              {
                  allowBlank: true,
                  fieldLabel: '状态',
                  id: 'referf_query_status',
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
                            var store = Ext.getCmp('grid_trainer_refer').getStore();
                            store.load({
                                params: {
                                    name: Ext.getCmp('referf_query_name').getValue(),
                                    status: Ext.getCmp('referf_query_status').getValue()
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
                            Ext.getCmp('grid_trainer_refer').getStore().load();
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

function fun_tj(s_id) {
    Ext.Ajax.request({
        url: 'update_trainer_tj_info',
        params: {
            "s_id": s_id
        },
        waitMsg: '正在提交数据...',
        success: function (form, action) {
            Ext.Msg.alert("成功", "数据提交成功!");

            Ext.getCmp('grid_trainer_refer').getStore().reload();
        },
        failure: function (form, action) {
            Ext.Msg.alert("失败", "数据提交失败!");
        }
    });
}