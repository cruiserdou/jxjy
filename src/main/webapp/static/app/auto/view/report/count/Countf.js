Ext.define('App.view.report.count.Countf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.countf',
    "iconCls": "icon_paper_doc",
    border: false,
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
                xtype: 'countf_query',
                region: 'north'
            },
          {
                xtype: 'countf_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});


