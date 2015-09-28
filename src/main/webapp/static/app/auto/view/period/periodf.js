Ext.define('App.view.period.periodf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.periodf',
    "iconCls": "icon_person",
    layout: 'border',
    border: false,
    listeners: {
        activate: function () {
            Ext.getCmp('grid_period').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_period').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_period').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_period').getStore().getAt(i).getData();
                            }
                            var period_panel = Ext.getCmp('period_info');
                            period_panel.tpl = Ext.create('Ext.XTemplate', period_tpl);
                            period_panel.tpl.overwrite(period_panel.body, myarray[0]);
                        }
                    }
                }
            );
        }
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'periodf_query',
                region: 'north'
            },
            {
                xtype: 'periodf_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'period_info',
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
                tpl: Ext.create('Ext.XTemplate', period_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var period_tpl = [
    '<div id="main_period" style="padding: 2em;">' +
    '<h2 style="margin-top: 0; color: #666666; text-align: left">培训信息<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="scores_period" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #9999cc; margin-bottom: 1em;">{type}</h3>' +
    '<h3 style="color: #996666;">培训期数:</h3>{period_count}<br/>' +
    '<h3 style="color: #cc6666;">开班状态:</h3>{status}<br/>' +
        //'<h3 style="color: #66cccc;">身份证号:</h3>{card}' +
        //'<div style="color: grey; margin: 16px 0 0 0;">驾校：{drvschool}' +
        //'<a style="margin:0 10px"> | 培训状态：{status}</a>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>'
]

