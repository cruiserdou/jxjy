

Ext.define('App.view.orders.Orders', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.ordersf',
       "iconCls": "icon_upload",
    layout: 'border',
    border: false,
    id:'image-upload',

    initComponent: function () {
        this.items = [
            {
//                xtype: 'form',
                region: 'center',
                flex: 2,
                layout: 'fit',
                border: false,
                items: [
                    {
//                        title: '开考指令',
                        modal: true,
                        iconCls: 'icon_user',
                        bodyPadding: 1,
                        border: false,
                        layout: 'fit',
                        defaults: {
                            allowBlank: false
                        },
                        xtype: 'form',
                        id:'image-upload-form',
                        items: [
                            {
                                bodyPadding: 10,
                                fieldDefaults: {
                                    labelAlign: 'right',
                                    labelWidth: 90
                                },
                                layout: 'column',
                                items: [
                                    {
                                        xtype: 'panel',
                                        border: false,
                                        columnWidth: 1,
                                        defaults: {
                                            xtype: 'textfield'
                                        },
                                        items: [
                                            {
                                                id:'time',
                                                xtype:'datetimefield',
                                                format:'H:i'
                                             },
                                            {
                                                xtype: 'panel',
                                                border: false,
                                                flex: 1,
                                                html: '<h2 align="center">经营性道路客货运输驾驶员从业资格考试</h2>'
                                            },
                                            {
                                                xtype: 'panel',
                                                border: false,
                                                flex: 1,
                                                html: '<a onclick="examinees_start();"  href="#">开始考试</a><br/>'
//            <img style="height: 32px; margin-left: 50px;" src="static/css/images/doc.png" />
                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    }
                ]
            }
        ]

        this.callParent(arguments);
    }
});

function examinees_start() {
    Ext.Ajax.request({
        url: 'print_cred_roster_info',
        waitMsg: '正在导出数据...',
        success: function (form, action) {
            Ext.Msg.alert("成功", "考试开始!");
        },
        failure: function (form, action) {
            Ext.Msg.alert("失败", "失败,请联系管理员!");
        }
    });

};


