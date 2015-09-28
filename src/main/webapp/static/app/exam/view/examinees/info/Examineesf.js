Ext.define('App.view.examinees.info.Examineesf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.examineesf',
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
                xtype: 'examinees_query',
                region: 'north'
            },{
                xtype: 'examinees_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});


