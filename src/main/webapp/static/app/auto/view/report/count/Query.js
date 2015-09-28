var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
Ext.define('App.view.report.count.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.countf_query',
    split: true,
//    height: 100,
//    bodyPadding: 20,
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
//    layout: 'column',

//    dockedItems: [
//        {
//            xtype: 'toolbar',
//            dock: 'top',
//            border: true,
//            items: [
//
//            ]
//        }
//    ],

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
//          items: [
//                {
//                  allowBlank: true,
//                  fieldLabel: '驾校名称',
//                  id: 'countf_drvschool',
//                  name: 'name',
//                  emptyText: '驾校名称'
//                }
//           ]
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
//                            var store = Ext.getCmp('grid_count_trainer').getStore();
//                            store.load({
//                                params: {
//                                    drvschool: Ext.getCmp('countf_drvschool').getValue()
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
//                            Ext.getCmp('grid_count_trainer').getStore().load();
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