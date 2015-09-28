Ext.define('App.view.users.Usersf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.usersf',
    "iconCls": "icon_person",
    layout: 'border',
    border: false,
    listeners: {
        activate: function () {
            Ext.getCmp('grid_users').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_users').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_users').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_users').getStore().getAt(i).getData();
                            }
                            var users_panel = Ext.getCmp('users_info');
                            users_panel.tpl = Ext.create('Ext.XTemplate', users_tpl);
                            users_panel.tpl.overwrite(users_panel.body, myarray[0]);
                        }
                    }
                }
            );
        }
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'usersf_query',
                region: 'north'
            },
            {
                xtype: 'usersf_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'users_info',
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
                tpl: Ext.create('Ext.XTemplate', users_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var users_tpl = [
    '<div id="main_users_tpl" style="padding: 2em;">' +
    '<h2 style="margin-top: 0; color: #666666; text-align: left">用户信息<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="users_tpl_content" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #9999cc; margin-bottom: 1em;">{type}</h3>' +
    '<h3 style="color: #996666;">用户名:</h3>{username}<br/>' +
    '<h3 style="color: #cc6666;">性别:</h3>{sex}<br/>' +
    '<h3 style="color: #66cccc;">用户手机号:</h3>{phone}' +
    '<h3 style="color: #66cccc;">联系地址:</h3>{address}' +
    '<div style="color: grey; margin: 16px 0 0 0;">部门名称：{deptname}' +
        //'<a style="margin:0 10px"> | 培训状态：{status}</a>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>'
]
