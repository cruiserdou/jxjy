Ext.define('App.view.examinees.apply.Applyf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.applyf',
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
                        title: '考生报名',
                        bodyPadding: 100,
                        frame: true,
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 80
                        },
                        items: [
                            {
                                allowBlank: false,
                                fieldLabel: '考生ID',
                                name: 'id'
                            },
                            {
                                allowBlank: false,
                                fieldLabel: '姓          名',
                                anchor: '100%',
                                name: 'name'
                            },
                            {
                                allowBlank: false,
                                fieldLabel: '性          别',
                                anchor: '100%',
                                xtype: "panel",
                                layout: "column",
                                xtype: 'radiogroup', anchor: '220%', columns: 20, items: [
                                {boxLabel: "男", name: 'sex', inputValue: '男',checked: true},

                                {boxLabel: "女", name: 'sex', inputValue: '女'}
                            ]
                            },
                            {
                                allowBlank: false,
                                anchor: '100%',
                                fieldLabel: '身  份   证   号',
                                name: 'card'
                            },
                            {
                                allowBlank: false,
                                anchor: '100%',
                                fieldLabel: '考生联系地址',
                                name: 'address'
                            },
                            {
                                allowBlank: false,
                                fieldLabel: '准  驾   车   型',
                                name: 'lictype',
                                anchor: '100%',
                                xtype: 'combo',
                                autoRender: true,
                                autoShow: true,
                                store:Ext.create('Ext.data.Store',
                                    {
                                        fields:['type'],
                                        data:
                                            [
                                                {'type':'A3'},
                                                {'type':'B1'},
                                                {'type':'B2'},
                                                {'type':'C1'},
                                                {'type':'C2'},
                                                {'type':'C3'},
                                                {'type':'C4'},
                                                {'type':'M'}
                                            ]
                                     }
                            ),
                                displayField:'type',
                                valueField:'type'
                            },
                            {
                                allowBlank: false,
                                xtype: 'datefield',
                                fieldLabel: '驾照初领日期',
                                anchor: '100%',
                                name: 'licdt',
                                format: 'Y-m-d'
                            },
                            {
                                allowBlank: false,
                                fieldLabel: '资  格   类   别',
                                anchor: '100%',
                                name: 'licmd',
                                xtype: 'combo',
                                autoRender: true,
                                autoShow: true,
                                store:Ext.create('Ext.data.Store',
                                    {
                                        fields:['mode'],
                                        data:
                                            [
                                                {'mode':'客货'},
                                                {'mode':'货运'},
                                                {'mode':'教练员'},
                                                {'mode':'危险品'}
                                            ]
                                    }),
                                displayField:'mode',
                                valueField:'mode'
                            },
                            {
                                xtype: 'box', //或者xtype: 'component',
                                width: 200, //图片宽度
                                height: 300, //图片高度
                                autoEl: {
                                    tag: 'img',    //指定为img标签
                                    src: 'images/2.png'    //指定url路径
                                }
                            },
                            {
                                xtype: 'filefield',
                                name: 'file',
                                fieldLabel: '照  片   上   传',
                                msgTarget: 'side',
                                allowBlank: false,
                                anchor: '100%',
                                buttonText: '选择文件'
                            },
                            {
                                xtype: 'textarea',
                                anchor: '100%',
                                fieldLabel: '备          注',
                                name: 'remark'
                            }
                        ],
                        buttonAlign : "center",
                        buttons: [
                            {
                                text: '保存',
                                iconCls: 'icon_save',
                                handler: function(){
                                    var form = this.up('form').getForm();
                                    if (form.isValid()){
                                        form.submit({
                                            url: 'add_examinees_info',
                                            waitMsg: '正在保存数据...',
                                            success: function(form, action){
                                                Ext.Msg.alert("成功", "数据保存成功!");
                                                //重新载入渠道信息
                                                Ext.getCmp('grid_examinees').getStore().reload();
                                            },
                                            failure: function(form, action){
                                                Ext.Msg.alert("失败", "数据保存失败!");
                                            }
                                        });
                                    }
                                }
                            },
                            {
                                text: '重置',
                                iconCls: 'icon_reset',
                                handler: function () {
                                    this.up('form').getForm().reset();
                                }
                            }
                        ]
                    }
                ]
            }
//            {
//                xtype: 'panel',
//                layout: 'border',
//                border: false,
//                margin: '0 0 0 5',
//                region: 'east',
//                 flex: 3,
//                items: [
//                    {
//                        xtype: 'apply_grid',
//                        region: 'center'
////                        flex: 3
//                    }
//                ]
//            }
        ]
        this.callParent(arguments);
    }
});