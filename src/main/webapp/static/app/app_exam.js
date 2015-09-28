Ext.Loader.setConfig({enabled: true});

Ext.require('Ext.container.Viewport');
Ext.require([
//    'Ext.chart.*',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.form.*',
    'Ext.selection.CheckboxModel'
]);

function login_exam() {
    var main_panel = Ext.getCmp('exam_main_panel');
    main_panel.tpl = Ext.create('Ext.XTemplate', login_exam_Tpl);
    main_panel.tpl.overwrite(main_panel.body, {});
}

Ext.application({
    name: 'App',
    appFolder: 'static/app/exam',
    controllers: ['Tabitem', 'Frame'],
    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    border: false,
                    xtype: 'panel',
                    region: 'north',
                    bodyStyle: 'background-color: blue;',
                    html: '<img style="height: 120px; width: 100%;" src="static/css/images/ww.png"/>',
//                    bodyStyle: {
//                        background: 'url(static/css/images/ww.png) no-repeat center fixed'
//                        padding: '10px'
//                    },
                    height: 120

                },
                {
                    id: 'exam_main_panel',
                    border: false,
                    autoScroll: true,
                    xtype: 'panel',
                    region: 'center',
                    tpl: Ext.create('Ext.XTemplate', sel_exam_Tpl),
                    listeners: {
                        afterrender: function () {
                            sdata.load(
                                {
                                    callback: function (records, operation, success) {
                                        if (success) {
                                            var myarray = new Array();
                                            for (var i = 0; i < sdata.getCount(); i++) {
                                                myarray[i] = sdata.getAt(i).getData();
                                            }
                                            var main_panel = Ext.getCmp('exam_main_panel');
                                            main_panel.tpl = Ext.create('Ext.XTemplate', sel_exam_Tpl);
                                            main_panel.tpl.overwrite(main_panel.body, myarray[0]);
                                        }
                                    }
                                }
                            );
                        }
                    }
                }
            ]
        });
    }
});



