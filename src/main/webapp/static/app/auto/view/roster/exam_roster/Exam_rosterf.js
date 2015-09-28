Ext.define('App.view.roster.exam_roster.Exam_rosterf', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.exam_rosterf',
    "iconCls": "icon_edit_find_replace",
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            region: 'center'
        }
    ],
    listeners: {
        activate: function () {
            Ext.getCmp('grid_exam_roster').getStore().load();
        },
        afterrender: function () {
            Ext.getCmp('grid_exam_roster').getStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var myarray = new Array();
                            for (var i = 0; i < Ext.getCmp('grid_exam_roster').getStore().getCount(); i++) {
                                myarray[i] = Ext.getCmp('grid_exam_roster').getStore().getAt(i).getData();
                            }
                            var exam_rosterf_panel = Ext.getCmp('exam_roster_info');
                            exam_rosterf_panel.tpl = Ext.create('Ext.XTemplate', exam_roster_tpl);
                            exam_rosterf_panel.tpl.overwrite(exam_rosterf_panel.body, myarray[0]);
                        }
                    }
                }
            );
        }
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'exam_rosterf_query',
                region: 'north'
            },
            {
                xtype: 'exam_rosterf_grid',
                region: 'center'
            },
            {
                xtype: 'panel',
                id: 'exam_roster_info',
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
                tpl: Ext.create('Ext.XTemplate', exam_roster_tpl),
                updateDetail: function (data) {
                    this.tpl.overwrite(this.body, data);
                }
            }
        ]
        this.callParent(arguments);
    }
});

var exam_roster_tpl = [
    '<div id="main_exam_roster" style="padding: 2em;">' +
    '<h2 style="margin-top: 0; color: #666666; text-align: left">考生信息<hr /></h2>' +
    "<tpl for='.'>" +
    '<div class="exam_roster_content" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
    '<h3 style="color: #9999cc; margin-bottom: 1em;">{type}</h3>' +
    '<h3 style="color: #996666;">姓名:</h3>{name}<br/>' +
    '<h3 style="color: #cc6666;">性别:</h3>{sex}<br/>' +
    '<h3 style="color: #66cccc;">身份证号:</h3>{card}' +
    '<div style="color: grey; margin: 16px 0 0 0;">驾校：{drvschool}' +
    '<a style="margin:0 10px"> | 培训状态：{status}</a>' +
    '</div>' +
    '</div>' +
    "</tpl>" +
    '</div>'
]