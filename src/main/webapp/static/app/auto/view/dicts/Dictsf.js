Ext.define('App.view.dicts.Dictsf', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.dictsf',
    "iconCls": "icon_edit_find_replace",
    layout: 'border',
    listeners: {
        activate: function () {
            Ext.getCmp('grid_dicts').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_dicts').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_dicts').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_dicts').getStore().getAt(i).getData();
                            }
                            var dicts_panel = Ext.getCmp('dicts_info');
                            dicts_panel.tpl = Ext.create('Ext.XTemplate', dicts_tpl);
                            dicts_panel.tpl.overwrite(dicts_panel.body, myarray[0]);
                        }
                    }
                }
            );
        }
    },
    items: [
        {
            xtype: 'panel',
            region: 'center'
        }
    ],
    initComponent: function () {
        this.items = [
            {
                xtype: 'dictsf_query',
                region: 'north'
            },
            {
                xtype: 'dictsf_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'dicts_info',
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
                tpl: Ext.create('Ext.XTemplate', dicts_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var dicts_tpl = [
    '<div id="main_dicts" style="padding: 2em;">' +
    '<h2 style="margin-top: 0; color: #666666; text-align: left">字典信息<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="scores_dicts" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #9999cc; margin-bottom: 1em;">{type}</h3>' +
    '<h3 style="color: #996666;">字段:</h3>{field}<br/>' +
    '<h3 style="color: #996666;">字段名称:</h3>{fieldnm}<br/>' +
    '<h3 style="color: #cc6666;">字段值:</h3>{fieldval}<br/>' +
        '<h3 style="color: #66cccc;">字段显示名称:</h3>{fieldvaldis}' +
        //'<div style="color: grey; margin: 16px 0 0 0;">驾校：{drvschool}' +
        //'<a style="margin:0 10px"> | 培训状态：{status}</a>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>'
]
