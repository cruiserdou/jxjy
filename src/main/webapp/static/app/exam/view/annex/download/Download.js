Ext.define('App.view.annex.download.Download', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contract_download',
    "iconCls": "icon_download",
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
                        xtype: 'contract_download_grid',
                        region: 'center',
                        flex: 3
                    }
                ]
            }
        ]
        this.callParent(arguments);
    }
});