//上传图片类型
var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;

var win_uploadImage = new Ext.Window({
    layout:'fit',
    width:380,
    closeAction:'hide',
    height:380,
    resizable:false,
    shadow:false,
    modal:true,
    closable:true,
    bodyStyle:'padding: 5 5 5 5',
    animCollapse:true,
    imageIndexName:'',
    items:[{
        xtype:'form',
        id:'image-upload-form',
        frame:true,
        border:false,
        isAdd:false,
        enctype: 'multipart/form-data',
        fileUpload : true,
        layout : 'form',
        items:[{
            id : 'file-idx',
            name : 'file',
            inputType : "file",
            fieldLabel : '上传图片',
            xtype : 'textfield',
            blankText:'上传图片不能为空',
            anchor : '100%'
        },{
            xtype : 'box',
            id : 'browseImage',
            fieldLabel : "预览图片",
            autoEl : {
                width : 300,
                height : 300,
                tag : 'img',
                // type : 'image',
                src : Ext.BLANK_IMAGE_URL,
                style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',
                complete : 'off',
                id : 'imageBrowse'
            }
        }
        ],
        listeners : {
            'render' : function(f) {
                //
                this.form.findField('file-idx').on('render', function() {
                    //通過change事件,图片也动态跟踪选择的图片变化
                    Ext.get('file-idx').on('change',
                        function(field, newValue, oldValue) {
                            //得到选择的图片路径
                            var url = 'file://'+ Ext.get('file-idx').dom.value;
                            //alert("url = " + url);
                            //是否是规定的图片类型
                            if (img_reg.test(url)) {
                                if (Ext.isIE) {
                                    var image = Ext.get('imageBrowse').dom;
                                    image.src = Ext.BLANK_IMAGE_URL;// 覆盖原来的图片
                                    image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
                                }// 支持FF
                                else {
                                    Ext.get('imageBrowse').dom.src = Ext.get('file-idx').dom.files.item(0).getAsDataURL();
                                }
                            }
                        }, this);
                }, this);
            }
        },
        buttons:[{
            text:'关闭',
            handler:function(){
                win_uploadImage.hide();
            }
        },{
            text:'上传',
            handler:function() {
                var furl="";
                furl = Ext.getCmp('image-upload-form').form.findField('file').getValue();
                var type = furl.substring(furl.length - 3).toLowerCase();
                if (furl == "" || furl == null) {
                    return;
                }
                if (type != 'jpg' && type != 'bmp' && type != 'gif' && type != 'png') {
                    alert('仅支持jpg、bmp、gif、png格式的图片');
                    return;
                }

                Ext.getCmp('image-upload-form').form.submit({
                    clienValidation:true,
                    waitMsg:'正在上传请稍候',
                    waitTitle:'提示',
                    url:'upload_file',
                    method:'POST',
                    success:function(form,action){
                        var picName = action.result.data;
                        if(win_uploadImage.imageIndexName!=''){
                            Ext.getCmp(win_uploadImage.imageIndexName).setValue(picName);
                        }
                        //reset form
                        Ext.getCmp('image-upload-form').form.el.dom.reset();
                        if (Ext.isIE) {
                            var i_image = Ext.get('imageBrowse').dom;
                            i_image.src = Ext.BLANK_IMAGE_URL;
                            i_image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = Ext.BLANK_IMAGE_URL;
                        }else{
                            Ext.get('imageBrowse').dom.src = Ext.BLANK_IMAGE_URL;
                        }

                        win_uploadImage.hide();
                    },
                    failure:function(form,action){
                        Ext.MessageBox.show({title: '失败',msg: '上传失败!',buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.ERROR});
                    }
                })
            }
        }
        ]
    }]
});
