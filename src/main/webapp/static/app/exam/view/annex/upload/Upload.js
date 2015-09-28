Ext.define('App.view.annex.upload.Upload', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contract_upload',
    "iconCls": "icon_upload",
    layout: 'border',
    border: false,
    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                region: 'center',
                flex: 2,
                layout: 'fit',
                border: false,
                items: [
                    {
                        xtype: 'form',
                        title: '上传附件',
                        bodyPadding: 30,
                        frame: true,
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60
                        },
                        items: [
                            {
                                name: 'id',
                                anchor: '100%',
                                fieldLabel: '附件编号'
                            },
                            {
                                xtype: 'datefield',
                                anchor: '100%',
                                format: 'Y-m-d',
                                name: 'dt',
                                fieldLabel: '上传日期',
                                value:new Date()
                            },{
                                xtype: 'filefield',
                                name: 'file',
                                fieldLabel: '文件上传',
                                msgTarget: 'side',
                                allowBlank: false,
                                anchor: '100%',
                                buttonText: '选择文件'
                            },{
                                xtype: 'textareafield',
                                name: 'remark',
                                anchor: '100%',
                                fieldLabel: '备注'
                            }
                        ],
                        buttons: [
                            {
                                text: '保存',
                                iconCls: 'icon_save',
                                handler: function(){
                                    var form = this.up('form').getForm();
                                    if (form.isValid()){
                                        form.submit(
                                            {
                                                url: 'upload_file',
                                                waitMsg: 'file uploading',
                                                success: function(){
                                                    Ext.Msg.show({
                                                        title: '信息提示',
                                                        msg: '保存成功!',
                                                        buttons: Ext.Msg.OK
                                                    })
                                                    Ext.getCmp('grid_custs').getStore().reload();
                                                }
                                            }
                                        )
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'border',
                border: false,
                margin: '0 0 0 5',
                region: 'east',
                flex: 3,
                items: [
                    {
                        xtype: 'contract_upload_grid',
                        region: 'center',
                        flex: 3
                    }
                ]
            }
        ]
        this.callParent(arguments);
    }
});