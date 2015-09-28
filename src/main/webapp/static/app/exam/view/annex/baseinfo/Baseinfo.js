Ext.define('App.view.annex.baseinfo.Baseinfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contract_baseinfo',
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
                        xtype: 'contract_baseinfo_grid',
                        region: 'center',
                        flex: 3
                    }
                ]
            }
        ]
        this.callParent(arguments);
    }
});