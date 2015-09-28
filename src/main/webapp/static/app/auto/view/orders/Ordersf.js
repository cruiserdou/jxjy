Ext.define('App.view.orders.Ordersf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ordersf',
    "iconCls": "icon_truck",
    layout: 'border',
    border: false,
    listeners: {
        activate: function () {
            Ext.getCmp('grid_orders').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_orders').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_orders').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_orders').getStore().getAt(i).getData();
                            }
                            var trainer_ordersf_panel = Ext.getCmp('trainer_orders_info');
                            trainer_ordersf_panel.tpl = Ext.create('Ext.XTemplate', trainer_orders_tpl);
                            trainer_ordersf_panel.tpl.overwrite(trainer_ordersf_panel.body, myarray[0]);
                        }
                    }
                }
            );
        }
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'ordersf_query',
                region: 'north'
            },
            {
                xtype: 'ordersf_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'trainer_orders_info',
                autoScroll: true,
                region: 'east',
                width: 500,
                split: true,
                collapseMode: 'mini',
                html: '<div>数据丢失，联系管理员！</div>',
                listeners: {
                    afterrender: function (_this) {
                        var data = {};
                        _this.updateDetail(data);
                    }
                },
                tpl: Ext.create('Ext.XTemplate', trainer_orders_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var trainer_orders_tpl = [
    '<div id="main_trainer_orders" style="padding: 2em;">' +
    '<h2 style="margin-top: 0; color: #666666; text-align: left">开考指令<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="scores_trainer_content" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #9999cc; margin-bottom: 1em;">{type}</h3>' +
    '<h3 style="color: #996666;">开始时间:</h3>{examks}<br/>' +
    '<h3 style="color: #cc6666;">结束时间:</h3>{examjs}<br/>' +
    //'<div style="color: grey; margin: 16px 0 0 0;">驾校：{drvschool}' +
        //'<a style="margin:0 10px"> | 培训状态：{status}</a>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>'
]