var card="";
var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
Ext.define('App.view.examinees.info.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.examinees_query',
    split: true,
    bodyPadding: 20,
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    layout: 'column',
    id:'examinees_query_id',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [
                {
                    text: '批量打印',
                    iconCls: 'icon_edit',
                    handler: function () {

                        Ext.Msg.confirm('信息', '确定要打印？', function (btn) {
                            if (btn == 'yes') {
//                                window.location.target="_blank";

                                window.open("print_apply_n", "_blank")
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
                            Ext.getCmp('grid_info_trainer').getStore().load();
                        }
                    }
                }

//                {
//                    text: '打印成绩单',
//                    id: 'scores_edit',
//                    iconCls: 'icon_edit',
//                    handler: function(){
//                        var sm = Ext.getCmp('grid_info_trainer').getSelectionModel();
//                        var record = sm.getSelection()[0];
//                        card=record.get('card');
//
//                        if(!record){
//                            Ext.Msg.alert('信息','请选择要打印的数据');
//                            return;
//                        }
//
//                        var editForm = null;
//                        var editWindow = null;
//                        editForm = new Ext.form.FormPanel({
//                            frame: true,
//                            fieldDefaults: {
//                                labelAlign: 'right',
//                                labelWidth: 70
//                            },
//                            defaults: {
//                                xtype: 'textfield'
//                            },
//                            items: [
//                                {
//                                    hidden: 'true',
//                                    fieldLabel: '身份证',
//                                    name: 'card'
//                                },
//                                {
//                                    xtype: 'panel',
//                                    bodyPadding: '20',
//                                    flex: 1,
//                                    html: '<a onclick="trainer_export(card);"  href="#"><img style="height: 32px; margin-left: 50px;" src="static/css/images/doc.png" />导出</a><br/>'
//                                },
//                                {
//                                    xtype: 'panel',
//                                    flex: 1,
//                                    bodyPadding: '20',
//                                    html: '<a href="static/upload/'+card+'.docx"><img style="width: 32px; margin-left: 50px;" src="static/css/images/cloud-download.png" />下载</a>'
//                                }
//                            ]
//                        });
//                        editWindow = new Ext.Window({
//                            layout: 'fit',
//                            width: 200,
//                            height: 200,
//                            modal: true,
//                            title: '打印成绩单',
//                            items: [editForm]
//                        });
//                        editWindow.show(Ext.get('scores_edit'));
//                        editForm.getForm().loadRecord(record);
//                    }
//                }
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
                  id: 'examsf_query_name',
                  name: 'name',
                  emptyText: '考生姓名'
                },
              {
                  allowBlank: true,
                  fieldLabel: '身份证号',
                  id: 'examsf_query_card',
                  name: 'card',
                  emptyText: '身份证号'
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
                            var store = Ext.getCmp('grid_info_trainer').getStore();
                            store.load({
                                params: {
                                    name: Ext.getCmp('examsf_query_name').getValue(),
                                    card: Ext.getCmp('examsf_query_card').getValue()
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
                            Ext.getCmp('grid_info_trainer').getStore().load();
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


function trainer_export(card) {
    Ext.Ajax.request({
        url: 'print_examdoc_info',
        params: {
            card: card
        },
        waitMsg: '正在导出数据...',
        success: function (form, action) {
            Ext.Msg.alert("成功", "导出成功!");
        },
        failure: function (form, action) {
            Ext.Msg.alert("失败", "导出失败!");
        }
    });
};