Ext.define('App.view.examinees.refer.Referf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.referf',
    "iconCls": "icon_doc",
    border: false,
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            region: 'center'
        }
    ],
    listeners: {
        activate: function () {
            Ext.getCmp('grid_trainer_refer').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_trainer_refer').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_trainer_refer').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_trainer_refer').getStore().getAt(i).getData();
                            }
                            var trainer_referf_panel = Ext.getCmp('trainer_refer_info');
                            trainer_referf_panel.tpl = Ext.create('Ext.XTemplate', trainer_refer_tpl);
                            trainer_referf_panel.tpl.overwrite(trainer_referf_panel.body, myarray[0]);
                        }
                    }
                }
            );
        }
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'referf_query',
                region: 'north'
            },{
                xtype: 'referf_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'trainer_refer_info',
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
                tpl: Ext.create('Ext.XTemplate', trainer_refer_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var trainer_refer_tpl = [
    '<div id="main_trainer_refer" style="padding: 2em;">' +
    '<h2 style="margin-top: 0; color: #666666; text-align: left">考生信息<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="scores_trainer_content" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #9999cc; margin-bottom: 1em;">{type}</h3>' +
    '<h3 style="color: #996666;">姓名:</h3>{name}<br/>' +
    '<h3 style="color: #cc6666;">性别:</h3>{sex}<br/>' +
    '<h3 style="color: #66cccc;">身份证号:</h3>{card}' +
    '<div style="color: grey; margin: 16px 0 0 0;">驾校：{drvschool}' +
        //'<a style="margin:0 10px"> | 培训状态：{status}</a>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>'
]