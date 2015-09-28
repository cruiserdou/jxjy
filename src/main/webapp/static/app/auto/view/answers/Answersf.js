Ext.define('App.view.answers.Answersf', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.answersf',
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
                xtype: 'answersf_query',
                region: 'north'
            },
            {
                xtype: 'examanswers_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});