Ext.define('App.view.questions.Questionsf', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.questionsf',
    "iconCls": "icon_edit_find_replace",
    layout: 'border',
    listeners: {
        activate: function () {
            Ext.getCmp('grid_questions').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_questions').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_questions').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_questions').getStore().getAt(i).getData();
                            }
                            var questions_panel = Ext.getCmp('questions_info');
                            questions_panel.tpl = Ext.create('Ext.XTemplate', questions_tpl);
                            questions_panel.tpl.overwrite(questions_panel.body, myarray[0]);
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
                xtype: 'questionsf_query',
                region: 'north'
            },
            {
                xtype: 'questionsf_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'questions_info',
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
                tpl: Ext.create('Ext.XTemplate', questions_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var questions_tpl = [
    '<div id="main_questions" style="padding: 2em;">' +
    '<h2 style="margin-top: 0; color: #666666; text-align: left">考题信息<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="scores_questions" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #9999cc; margin-bottom: 1em;">{type}</h3>' +
    '<h3 style="color: #996666;">题本编号:</h3>{qtnum}<br/>' +
    '<h3 style="color: #cc6666;">题号:</h3>{status}<br/>' +
    '<h3 style="color: #66cccc;">题目:</h3>{question_xwq}' +
    '<h3 style="color: #22ccc7;">分值:</h3>{score}' +
        //'<div style="color: grey; margin: 16px 0 0 0;">驾校：{drvschool}' +
        //'<a style="margin:0 10px"> | 培训状态：{status}</a>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>'
]
