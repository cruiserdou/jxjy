var str = "static/upload/";
Ext.define('App.view.examinees.apply.Applyf', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.applyf',
    iconCls: "icon_upload",
    layout: 'fit',
    approTpl: [
        '<div class="wrap_center" style="width: 650px;">',
        '<table id="appro_table">',
        '<tr>',
        ' <td>姓名</td><td><input style="width:60px;" type="text" /></td>',
        '<td>性别</td><td><input style="width:60px;" type="text" /></td>',
        '<td>学历</td><td><input style="width:60px;" type="text" /></td>',
        '<td style="width:120px;" rowspan="4"><img style="width: 120px;" src="static/css/images/man.png" alt="照片"/></td>',
        '</tr>',
        '<tr>',
        ' <td>住址</td><td colspan="5"><input placeholder="(电话)" style="width:90%;" type="text" /></td>',
        '</tr>',
        '<tr>',
        '<td>工作单位</td><td colspan="5"><input placeholder="(电话)" style="width:90%;" type="text" /></td>',
        '</tr>',
        '<tr>',
        '<td>身份证号</td><td colspan="2"><input type="text" /></td><td>培训单位</td><td colspan="2"><input type="text"/></td>',
        '</tr>',
        '<tr>',
        '<td>驾驶证准驾车型</td><td colspan="2"><input type="text" /></td><td>初领驾驶证日期</td><td colspan="3"><input type="date"/></td>',
        '</tr>',
        '<tr>',
        '<td>申请种类</td>',
        '<td colspan="3"><input type="radio" name="appro_type" value="ok" />初领',
        '<td style="border-left: none;" colspan="3"><input type="radio" name="appro_type" value="ok" />增驾',
        '</td>',
        '</tr>',
        '<tr>',
        ' <td>原从业资格证件号</td><td colspan="6"><input type="text" style="max-width: 98%;"></td>',
        '</tr>',
        '<td>申请类别</td>',
        '<td colspan="3"><input type="radio" name="appro_model" value="ok" />道路旅客运输',
        '<td style="border-left: none;" colspan="3"><input type="radio" name="appro_model" value="ok" />道路货物运输',
        '</td>',
        '</tr>',
        '<tr>',
        ' <td>材料清单</td><td colspan="6">',
        '<input type="checkbox" />身份证明原件',
        '<input type="checkbox" />身份证明复印件',
        '<input type="checkbox" />驾驶证原件',
        '<input type="checkbox" />驾驶证复印件',
        '<input type="checkbox" />无重大以上责任事故记录证明',
        '</td>',
        '</tr>',
        '<tr>',
        '<td>承诺</td><td colspan="6"><p>本人承诺上述所有内容真实、有效、并承担由此产生的法律责任</p>',
        '<input type="radio" name="appro_lic" value="ok" />同意',
        '<input type="radio" name="appro_lic" value="no" />拒绝',
        '</td>',
        '</tr>',
        '</table>',
        '</div>'
    ],
    border: false,
    id: 'image-upload',
    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                id: 'applyf_panel',
                tpl: Ext.create('Ext.XTemplate', this.approTpl),
                listeners: {
                    afterrender: function () {
                        var obtain_panel = Ext.getCmp('applyf_panel');
                        obtain_panel.tpl.overwrite(obtain_panel.body, {});
                    }
                }
            }
        ]
//        this.items = [
//            {
////                xtype: 'form',
//                region: 'center',
//                flex: 2,
//                layout: 'fit',
//                border: false,
//                items: [
//                    {
//                        title: '添加考生',
//                        modal: true,
//                        iconCls: 'icon_user',
//                        bodyPadding: 2,
//                        border: false,
//                        layout: 'fit',
//                        defaults: {
//                            allowBlank: false
//                        },
//                        xtype: 'form',
//                        id:'image-upload-form',
//                        items: [
//                            {
//                                bodyPadding: 10,
//                                fieldDefaults: {
//                                    labelAlign: 'right',
//                                    labelWidth: 90
//                                },
//                                layout: 'column',
//                                items: [
//                                    {
//                                        xtype: 'panel',
//                                        border: false,
//                                        columnWidth: .6,
//                                        defaults: {
//                                            xtype: 'textfield'
//                                        },
//                                        items: [
//                                            {
//                                                hidden:true,
//                                                fieldLabel: '考生ID',
//                                                name: 'id'
//                                            },
//                                            {
//                                                fieldLabel: '姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名',
//                                                width : 500,
//                                                name: 'name'
//                                            },
//                                            {
//                                                fieldLabel: '性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别',
//                                                width : 500,
//                                                xtype: "panel",
//                                                layout: "column",
//                                                xtype: 'radiogroup', anchor: '220%', columns: 20, items: [
//                                                {boxLabel: "男", name: 'sex', inputValue: '男',checked: true},
//
//                                                {boxLabel: "女", name: 'sex', inputValue: '女'}
//                                            ]
//                                            },
//                                            {
//                                                fieldLabel: '身&nbsp&nbsp&nbsp份&nbsp&nbsp证&nbsp&nbsp&nbsp号',
//                                                width : 500,
//                                                name: 'card',
////                                                regex : /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/,
////                                                regex : /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
//                                                regex : /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/,
//                                                regexText : '输入正确的身份号码'
////                                                validator: function (value) {
////
////                                                }
//                                            },
//                                            {
//                                                fieldLabel: '考生联系地址',
//                                                width: 500,
//                                                name: 'address'
//
//                                            },
//                                            {
//                                                fieldLabel: '准&nbsp&nbsp&nbsp驾&nbsp&nbsp车&nbsp&nbsp&nbsp型',
//                                                name: 'lictype',
//                                                width : 500,
//                                                xtype: 'combo',
//                                                autoRender: true,
//                                                autoShow: true,
//                                                store:Ext.create('Ext.data.Store',
//                                                    {
//                                                        fields:['type'],
//                                                        data:
//                                                            [
//                                                                {'type':'A3'},
//                                                                {'type':'B1'},
//                                                                {'type':'B2'},
//                                                                {'type':'C1'},
//                                                                {'type':'C2'},
//                                                                {'type':'C3'},
//                                                                {'type':'C4'},
//                                                                {'type':'M'}
//                                                            ]
//                                                    }
//                                                ),
//                                                displayField:'type',
//                                                valueField:'type'
//                                            },
//                                            {
//                                                xtype: 'datefield',
//                                                fieldLabel: '驾照初领日期',
//                                                width : 500,
//                                                name: 'licdt',
//                                                format: 'Y-m-d'
//                                            },
//                                            {
//                                                fieldLabel: '资&nbsp&nbsp&nbsp格&nbsp&nbsp类&nbsp&nbsp&nbsp别',
//                                                width : 500,
//                                                name: 'licmd',
//                                                xtype: 'combo',
//                                                autoRender: true,
//                                                autoShow: true,
//                                                store:Ext.create('Ext.data.Store',
//                                                    {
//                                                        fields:['mode'],
//                                                        data:
//                                                            [
//                                                                {'mode':'客货'},
//                                                                {'mode':'货运'},
//                                                                {'mode':'教练员'},
//                                                                {'mode':'危险品'}
//                                                            ]
//                                                    }),
//                                                displayField:'mode',
//                                                valueField:'mode'
//                                            },
//                                            {
//                                                xtype: 'textarea',
//                                                width : 500,
//                                                fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
//                                                name: 'remark'
//                                            }
//                                        ]
//                                    },
//                                    {
//                                        xtype: 'panel',
//                                        border: false,
//                                        columnWidth: .4,
//
//                                        items: [
//                                            {
//                                                layout:'column',
//                                                border:false,
////                                                anchor:'-20',
//                                                items:[
//                                                    {
//                                                        columnWidth:.25,
//                                                        layout:'form',
//                                                        border:false,
//                                                        items:[{
//                                                            xtype: 'panel',
//                                                            border:false
//                                                        }]
//                                                    },
//                                                    {
//                                                        columnWidth:.40,
////                                                    layout:'form',
//                                                        border:true,
//                                                        items:[{
//                                                            xtype : 'box',
//                                                            id : 'logoPic',
//                                                            x:320,
//                                                            y:320,
//                                                            autoEl : {
//                                                                id: 'show',
//                                                                tag: 'img',
//                                                                complete : 'off',
//                                                                width : 180,
//                                                                height : 220,
////                                                            src :"static/css/images/test.jpg",
//                                                                src: Ext.BLANK_IMAGE_URL,
//                                                                style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);'
//                                                            }
//                                                        }]
//                                                    }
//                                                ]},
//                                            {
//                                                xtype: 'filefield',
//                                                name: 'file',
//                                                fieldLabel: '照片',
////                                                msgTarget: 'side',
//                                                allowBlank: false,
//                                              width : 330,
//                                                labelAlign: 'right',
//                                                buttonText: '浏览...',
//                                                id: 'logoFile'
//
//                                            }
//                                        ]
//                                    }
//                                ],
//                                listeners : {
//                                    'render':function(){
//
//                                        var logoFileCmp = Ext.getCmp('logoFile');
//                                        logoFileCmp.on('change',function(field,newValue,oldValue){
//                                            var picPath = logoFileCmp.getValue();
//                                            var name = logoFileCmp.getName;
//                                            var url =  Ext.getCmp('logoFile').value;
//                                            var  url_name=url.split("\\");//这里要将 \ 转义一下
//                                            var filename=url_name[url_name.length-1];
//
//                                            str += filename;
////                                            Ext.get('logoPic').dom.src=str;
//                                        },this);
//                                    }
//                                },
//
//
//
//                                buttonAlign : "center",
//                                buttons: [
//                                    {
//                                        text: '保存',
//                                        iconCls: 'icon_save',
//                                        handler: function(){
//                                            var form = this.up('form').getForm();
//                                            if (form.isValid()){
//                                                form.submit({
//                                                    url: 'add_examinees_info',
//                                                    waitMsg: '正在保存数据...',
//                                                    success: function(form, action){
//                                                        Ext.getCmp('logoFile').reset();
//                                                        Ext.get('logoPic').dom.src=str;
//                                                    },
//                                                    failure: function(form, action){
//                                                        Ext.Msg.alert("失败", "数据保存失败!");
//                                                    }
//                                                });
//                                            }
//                                        }
//                                    },
//                                    {
//                                        text: '重置',
//                                        iconCls: 'icon_reset',
//                                        handler: function () {
//                                            this.up('form').getForm().reset();
//                                        }
//                                    }
//                                ]
//                            }
//
//                        ]
//                    }
//                ]
//            }
//        ]

        this.callParent(arguments);
    }
});