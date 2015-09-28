Ext.define('App.view.schoolcount.SchoolCount', {
    extend: 'Ext.panel.Panel',
    frame: true,
    alias: 'widget.schoolcount',
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            region: 'center'
        }
    ],
    initComponent: function () {
        this.items = [
//            {
//                xtype: 'cust_digestf_query',
//                region: 'north'
//            },
            {
                xtype: 'school_count_grid',
                region: 'center'
            },
            {
                xtype: 'school_gridschool',
                title: '考生列表',
                autoScroll: true,
                margin: '5 0 0 0',
                region: 'south',
                height: 400
            }
        ]
        this.callParent(arguments);
    }
});