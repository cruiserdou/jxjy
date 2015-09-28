Ext.define('App.view.home_page.public_info.Pubinfof', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.public_info',
    layout: 'border',
    iconCls: 'icon_public_info',
    listeners: {
        activate: function () {
            Ext.getCmp('grid_public_info').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_public_info').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_public_info').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_public_info').getStore().getAt(i).getData();
                            }
                            var pub_info_panel = Ext.getCmp('pub_info');
                            pub_info_panel.tpl = Ext.create('Ext.XTemplate', pub_info_tpl);
                            pub_info_panel.tpl.overwrite(pub_info_panel.body, myarray[0]);
                        }
                    }
                }
            );
        }
    },
    initComponent: function () {

        this.items = [
            {
                xtype: 'pubinfo_query',
                region: 'north'
            },
            {
                xtype: 'public_info_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'pub_info',
                autoScroll: true,
                region: 'east',
                width: 600,
                split: true,
                collapseMode: 'mini',
                html: '<div>数据丢失，联系管理员！</div>',
                listeners: {
                    afterrender: function (_this) {
                        var data = {};
                        _this.updateDetail(data);
                    }
                },
                tpl: Ext.create('Ext.XTemplate', pub_info_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var pub_info_tpl = [
    '<div class="pubinfo_wrap">' +
    '<div id="main_pubinfo">' +
    '<h2 style="margin-top: 0; color: #C43926;">公告信息<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="pubinfo_content" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #C43926;">{title}</h3><br/>{content}<div style="color: grey; margin: 16px 0 0 0;">发布日期：{pub_date}' +
    '<a style="margin:0 10px"> | 发布人：{name}</a>' +
    '<tpl if="this.check_file(file_url)">附件：<a style="" target="_blank" href="static/upload/{file_url}"><img src="static/css/images/down.png" style="height: 12px; cursor: hand;" /></a></tpl>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>' +
    '</div>',
    {
        check_file: function (file_url) {

            return file_url

        }
    }
]
