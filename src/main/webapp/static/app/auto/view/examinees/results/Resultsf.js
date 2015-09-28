Ext.define('App.view.examinees.results.Resultsf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.resultsf',
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
            Ext.getCmp('grid_results_trainer').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_results_trainer').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_results_trainer').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_results_trainer').getStore().getAt(i).getData();
                            }
                            var results_trainerf_panel = Ext.getCmp('results_trainer_info');
                            results_trainerf_panel.tpl = Ext.create('Ext.XTemplate', results_trainer_tpl);
                            results_trainerf_panel.tpl.overwrite(results_trainerf_panel.body, myarray[0]);
                        }
                    }
                }
            );
        }
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'resultsf_query',
                region: 'north'
            },{
                xtype: 'resultsf_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'results_trainer_info',
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
                tpl: Ext.create('Ext.XTemplate', results_trainer_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var results_trainer_tpl = [
    '<div id="main_results_trainer" style="padding: 2em;">' +
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