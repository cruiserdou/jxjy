Ext.define('App.view.admissions.Admissionsf', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.admissionsf',
    "iconCls": "icon_edit_find_replace",
    layout: 'border',
    id :'admissionsf_id',
    items: [
        {
            xtype: 'panel',
            region: 'center'
        }
    ],
    initComponent: function () {
        this.items = [
            {
                xtype: 'admissionsf_query',
                region: 'north'
            },
            {
                xtype: 'admissionsf_grid',
                region: 'center'
            }

        ]
        this.callParent(arguments);
    }
});