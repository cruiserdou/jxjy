

Ext.define('App.view.answers.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.answersf_query',
    split: true,
    height: 120,
    bodyPadding: 20,
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    layout: 'column',


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
                    fieldLabel: '题号',
                    id: 'query_qtnum',
                    name: 'qtnum',
                    emptyText: '题号'
                },
                {
                    fieldLabel: '题本',
                    id: 'answers_query_qtbh',
                    name: 'qtbh',
                    emptyText: '题本'
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
                            var store = Ext.getCmp('grid_answers').getStore();
                            store.load({
                                params: {
                                    qtbh: Ext.getCmp('answers_query_qtbh').getValue(),
                                    qtnum: Ext.getCmp('query_qtnum').getValue()
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
                            Ext.getCmp('grid_answers').getStore().load();
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
