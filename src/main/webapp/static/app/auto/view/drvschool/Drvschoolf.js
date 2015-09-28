Ext.define('App.view.drvschool.Drvschoolf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.drvschoolf',
    "iconCls": "icon_truck",
    layout: 'border',
    border: false,
    listeners: {
        activate: function () {
            Ext.getCmp('grid_drvschool').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_drvschool').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_drvschool').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_drvschool').getStore().getAt(i).getData();
                            }
                            var drvschoolf_panel = Ext.getCmp('drvschool_info');
                            drvschoolf_panel.tpl = Ext.create('Ext.XTemplate', drvschool_tpl);
                            drvschoolf_panel.tpl.overwrite(drvschoolf_panel.body, myarray[0]);
                        }
                    }
                }
            );
        }
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'drvschoolf_query',
                region: 'north'
            },
            {
                xtype: 'drvschoolf_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'drvschool_info',
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
                tpl: Ext.create('Ext.XTemplate', drvschool_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var drvschool_tpl = [
    '<div id="main_drvschool" style="padding: 2em;">' +
    '<h2 style="margin-top: 0; color: #666666; text-align: left">驾校信息<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="drvschool_content" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #666666; margin-bottom: 1em;">{type}</h3>' +
    '<h3 style="color: #666666;">驾校名称:</h3>{name}<br/>' +
    '<h3 style="color: #666666;">驾校等级:</h3>{grade}<br/>' +
    '<h3 style="color: #666666;">联系电话:</h3>{cont}' +
    '<h3 style="color: #666666;">驾校法人:</h3>{legal}' +
    '<div style="color: grey; margin: 16px 0 0 0;">驾校地址：{addr}' +
        //'<a style="margin:0 10px"> | 培训状态：{status}</a>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>'
]