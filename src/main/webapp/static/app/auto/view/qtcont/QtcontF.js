Ext.define('App.view.qtcont.QtcontF', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.qtcontf',
    "iconCls": "icon_edit_find_replace",
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            region: 'center'
        }
    ],
    initComponent: function () {
        this.items = [
            {
                xtype: 'qtcontf_query',
                region: 'north'
            },
            {
                xtype: 'qtcontf_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});