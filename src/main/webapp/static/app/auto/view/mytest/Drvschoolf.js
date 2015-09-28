Ext.define('App.view.mytest.Drvschoolf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.test',
    "iconCls": "icon_truck",
    layout: 'border',
    border: false,
    initComponent: function () {
        this.items = [
            {
                xtype: 'mytest_query',
                region: 'north'
            },
            {
                xtype: 'mytest_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});