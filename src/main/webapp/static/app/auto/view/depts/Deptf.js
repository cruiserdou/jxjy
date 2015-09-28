Ext.define('App.view.depts.Deptf', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.deptf',
    id :'deptf_id',
    "iconCls": "icon_edit_find_replace",
    layout: 'border',
    listeners: {
        activate: function () {
            Ext.getCmp('grid_depts').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_depts').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_depts').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_depts').getStore().getAt(i).getData();
                            }
                            var depts_panel = Ext.getCmp('depts_info');
                            depts_panel.tpl = Ext.create('Ext.XTemplate', depts_tpl);
                            depts_panel.tpl.overwrite(depts_panel.body, myarray[0]);
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
                xtype: 'deptf_query',
                region: 'north'
            },
            {
                xtype: 'deptf_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'depts_info',
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
                tpl: Ext.create('Ext.XTemplate', depts_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var depts_tpl = [
    '<div id="main_depts" style="padding: 2em;">' +
    '<h2 style="margin-top: 0; color: #666666; text-align: left">部门信息<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="scores_depts" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #9999cc; margin-bottom: 1em;">{type}</h3>' +
    '<h3 style="color: #996666;">部门名称:</h3>{deptname}<br/>' +
    '<h3 style="color: #cc6666;">部门描述:</h3>{deptdesc}<br/>' +
    //'<h3 style="color: #66cccc;">身份证号:</h3>{card}' +
    //'<div style="color: grey; margin: 16px 0 0 0;">驾校：{drvschool}' +
        //'<a style="margin:0 10px"> | 培训状态：{status}</a>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>'
]
 