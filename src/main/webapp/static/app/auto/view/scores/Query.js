

Ext.define('App.view.scores.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.scoresf_query',
    split: true,
    bodyPadding: 20,
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    layout: 'column',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [
//                {
//                    text: '阅卷',
//                    id: 'answers_mark',
//                    iconCls: 'icon_edit',
//                    handler: function(){
//                        var sm = Ext.getCmp('grid_scores_trainer').getSelectionModel();
//                        var record = sm.getSelection()[0];
//
//                        if(!record){
//                            Ext.Msg.alert('信息','请选择要编辑的数据');
//                            return;
//                        }
//                        var record = sm.getSelection()[0];
//
//                        var editForm = null;
//                        var editWindow = null;
//                        editForm = new Ext.form.FormPanel({
////                            id :'answers_from',
//                            frame: true,
//                            fieldDefaults: {
//                                labelAlign: 'right',
//                                labelWidth: 70
//                            },
//                            defaults: {
//                                xtype: 'textfield'
//                            },
////                            items: [
////                                {
////                                    hidden: 'true',
////                                    fieldLabel: '准考证ID',
////                                    name: 'id'
////                                }
////                            ],
//                            buttonAlign : "center",
//                            buttons: [
//                                {
//                                    text: '阅卷',
//                                    iconCls: 'icon_save',
//                                    handler: function () {
//                                        var card = record.get('card');
////                                        var answers_tpl= [
//                                        var answers_tpl = new Ext.XTemplate(
//                                                '<h3>准考证：{card}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
//                                                '姓名：{name} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
//                                                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
//                                                '成绩：{scores}</h3>',
//                                            '<table id="admissions_table">',
//                                            '<tr valign="top">',
//                                            '<td>',
//                                            '<table class="base_table" cellpadding=0 cellspacing=0 border=1  style="text-align:center">',
//                                                '<tr><td width="75">序号</td>' +
//                                                '<td width="75">答案</td>' +
//                                                '<td width="75">阅卷</td>' +
//                                                '<td width="75">序号</td>' +
//                                                '<td width="75">答案</td>' +
//                                                '<td width="75">阅卷</td>' +
//                                                '<td width="75">序号</td>' +
//                                                '<td width="75">答案</td>' +
//                                                '<td width="75">阅卷</td>' +
//                                                '<td width="75">序号</td>' +
//                                                '<td width="75">答案</td>' +
//                                                '<td width="75">阅卷</td>' +
//                                                '</tr>',
//                                            '<tpl for="list">',
//                                                '<tr><td width="75">{qtnuma}</td>' +
//                                                '<td width="75">{answera}</td>' +
//                                                '<td width="75">{resulta}</td>' +
//                                                '<td width="75">{qtnumc}</td>' +
//                                                '<td width="75">{answerb}</td>' +
//                                                '<td width="75">{resultb}</td>' +
//                                                '<td width="75">{qtnumc}</td>' +
//                                                '<td width="75">{answerc}</td>' +
//                                                '<td width="75">{resultc}</td>' +
//                                                '<td width="75">{qtnumd}</td>' +
//                                                '<td width="75">{answerd}</td>' +
//                                                '<td width="75">{resultd}</td>' +
//                                                '</tr>',
//                                            '</tpl>',
//                                            '</table>',
//
//                                            '</td>',
//                                            '</tr>',
//                                            '</table>'
//                                        );
//
//                                        answers_tpl.overwrite(Ext.getCmp("answers_wind").body,record.data);
//                              }
//                                }
//                            ]
//                        });
//                        editWindow = new Ext.Window({
//                            layout: 'fit',
//                            width: 600,
//                            height: 620,
//                            modal: true,
//                            id :'answers_wind',
//                            title: '考试结果',
//                            bodyStyle : 'overflow-x:hidden; overflow-y:scroll',
//                            items: [editForm]
//                        });
//                        editWindow.show(Ext.get('answers_mark'));
//                        editForm.getForm().loadRecord(record);
//                    }
//                },
                {
                    text: '刷新',
                    glyph: 0xf021,
                    listeners: {
                        click: function(_this){
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_scores_trainer').getStore().load();
                        }
                    }
                },
                {
                    text: '批量打印',
                    iconCls: 'icon_edit',
                    handler: function () {

                        Ext.Msg.confirm('信息', '确定要打印？', function (btn) {
                            if (btn == 'yes') {

                                window.location.target="_blank";

                                window.open("print_score_n", "_blank")
                            }
                        });
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'panel',
            columnWidth: .4,
            border: false,
            defaultType: 'textfield',
            layout: {
                type: 'vbox',
                align: 'strech',
                pack: 'start'
            },
            items: [
                {
                    allowBlank: true,
                    fieldLabel: '身份证号',
                    id: 'query_scores_card',
                    name: 'card',
                    emptyText: '身份证号'
                }
            ]
        },
        {
            xtype: 'panel',
            border: false,
            columnWidth: .5,
            items: [
                {
                    xtype: 'button',
                    iconCls: 'icon_search',
                    text: '查找',
                    listeners: {
                        click: function(){
                            var store = Ext.getCmp('grid_scores_trainer').getStore();
                            store.load({
                                params: {
                                    card: Ext.getCmp('query_scores_card').getValue()
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'panel',
                    height: 10,
                    border: false
                },
                {
                    xtype: 'button',
                    iconCls: 'icon_reset',
                    text: '重置',
                    listeners: {
                        click: function(_this){
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_scores_trainer').getStore().load();
                        }
                    }
                }
            ]
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});


function scores_print_export(id) {
    Ext.Ajax.request({
        url: 'print_trsptxls_info',
        params: {
            "id": id,
            "fileName": 'scores.xls'

        },
        waitMsg: '正在导出数据...',
        success: function (form, action) {
            Ext.Msg.alert("成功", "导出成功!");
        },
        failure: function (form, action) {
            Ext.Msg.alert("失败", "导出失败!");
        }
    });

};
