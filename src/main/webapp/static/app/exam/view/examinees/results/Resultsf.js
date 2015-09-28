Ext.define('App.view.examinees.results.Resultsf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.resultsf',
    "iconCls": "icon_doc",
    layout: 'fit',
    border: false,
    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'resultsf_query',
                        region: 'north'
                    },
                    {
                        xtype: 'resultsf_grid',
                        region: 'center',
                        flex: 3
                    }
                ]
            }
        ]
        this.callParent(arguments);
    }
});