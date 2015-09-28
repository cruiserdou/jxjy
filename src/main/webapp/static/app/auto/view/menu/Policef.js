Ext.define('App.view.menu.Policef', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.policef',
    layout: 'border',
    iconCls: 'icon_paper_doc',
    listeners: {
        activate: function () {
            Ext.getCmp('grid_menu').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_menu').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_menu').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_menu').getStore().getAt(i).getData();
                            }
                            var menu_panel = Ext.getCmp('menu_info');
                            menu_panel.tpl = Ext.create('Ext.XTemplate', menu_tpl);
                            menu_panel.tpl.overwrite(menu_panel.body, myarray[0]);
                        }
                    }
                }
            );
        }
    },
    initComponent: function () {

        this.items = [
            {
                xtype: 'police_query',
                region: 'north'
            },
            {
                xtype: 'police_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'menu_info',
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
                tpl: Ext.create('Ext.XTemplate', menu_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var menu_tpl = [
    '<div id="main_menu" style="padding: 2em;">' +
    '<h2 style="margin-top: 0; color: #666666; text-align: left">菜单信息<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="scores_menu" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #9999cc; margin-bottom: 1em;">{type}</h3>' +
    '<h3 style="color: #996666;">菜单标题:</h3>{text}<br/>' +
    '<h3 style="color: #cc6666;">是否叶子:</h3>{leaf}<br/>' +
    '<h3 style="color: #66cccc;">菜单父ID:</h3>{parent_id}' +
    '<h3 style="color: #66cccc;">菜单链接地址:</h3>{itype}' +
    '<h3 style="color: #66cccc;">图标:</h3>{iconcls}' +
    '<h3 style="color: #66cccc;">根（元）:</h3>{root}' +
        //'<div style="color: grey; margin: 16px 0 0 0;">驾校：{drvschool}' +
        //'<a style="margin:0 10px"> | 培训状态：{status}</a>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>'
]
 