Ext.define('App.view.annex.baseinfo.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contract_baseinfo_grid',
    store: 'syj_upload',

    initComponent: function () {

        this.columns = [
            {text: '附件编号', width: 120, dataIndex: 'id'},
            {text: '附件名称', width: 130, dataIndex: 'file', sortable: true},
            {text: '上传日期', width: 100, dataIndex: 'dt',
                renderer: Ext.util.Format.dateRenderer('Y-m-d')
            },
            {text: '备注',  flex: 1, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };

        this.callParent(arguments);
    }
});