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
                  text: '刷新',
                  xtype: 'combobox',
                  labelWidth: 70,
                  labelAlign: 'right',
                  fieldLabel: '选择驾校',
                  name: 'name',
                  id: 'drvschool_info_id',
                  autoRender: true,
                  autoShow: true,
                  store: Ext.create('Ext.data.Store',
                      {
                          extend: 'Ext.data.Store',
                          model: 'App.model.syj_drvschool',
                          proxy: {
                              type: 'ajax',
                              url: 'obtain_drvschool_info',
                              actionMethods: {
                                  read: 'POST'
                              },
                              reader: {
                                  type: 'json',
                                  root: 'list'
                              }
                          }
                      }),
                  displayField: 'name',
                  valueField: 'name',
                  listeners: {
                      afterrender: function (_this) {
                          Ext.Ajax.request({
                              method: 'POST',
                              url: 'check_login_drvschool_info',
                              success: function (response, opts) {
                                  var obj = Ext.decode(response.responseText);
                                  if (!obj.success) {
                                      Ext.getCmp('drvschool_info_id').setDisabled(true);
                                      Ext.getCmp("drvschool_info_id").hide();
                                      return;
                                  } else {
                                      var store = Ext.getCmp('grid_info_trainer').getStore();
                                      store.load({
                                          params: {
                                              drvschool: Ext.getCmp('drvschool_info_id').getValue()
                                          }
                                      });
                                  }
                              },
                              failure: function (response, opts) {
                                  Ext.Msg.alert("提示", "请联系管理员！");
                                  return;
                              }
                          });

                      }
                  }
                },
                {
                    text: '刷新',
                    iconCls: 'icon_table_refresh',
                    listeners: {
                        click: function (_this) {
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_info_trainer').getStore().load();
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
                                    card: Ext.getCmp('examsf_query_card').getValue(),
                                    drvschool: Ext.getCmp('drvschool_info_id').getValue()
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