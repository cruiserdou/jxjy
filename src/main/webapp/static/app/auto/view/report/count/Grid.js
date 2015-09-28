
Ext.define('App.view.report.count.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.countf_grid',
    store: 'syj_countf',
    features: [{
        ftype: 'summary'
    }],



    id :'grid_count_trainer',
    initComponent: function () {

        this.columns = [
            {text: '驾校名称', width: 185, dataIndex: 'name',
                summaryType: 'count', summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('驾校个数:{0} ', value, value !== 1 ? 's' : '');
            }},
            {text: '驾校报名人数', width: 185, dataIndex: 'num_count',
                summaryType: 'sum', summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('总培训人数:{0} ', value, value !== 1 ? 's' : '');
            }},
            {text: '合格人数', width: 185, dataIndex: 'num_qual',
                summaryType: 'sum', summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('总合格人数:{0} ', value, value !== 1 ? 's' : '');
            }},
            {text: '合格不人数', width: 185, dataIndex: 'num_unqual',
                summaryType: 'sum', summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('总合格不人数:{0} ', value, value !== 1 ? 's' : '');
            }},
            {text: '补考人数', width: 185, dataIndex: 'num_makeup',
                summaryType: 'sum', summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('总补考人数:{0} ', value, value !== 1 ? 's' : '');
            }},
            {text: '合格率', width: 185, dataIndex: 'num_percent',renderer:render_percent,
                summaryType: 'average', summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('平均合格率:{0}', value*100+"<span>%</span>", value !== 1 ? 's' : '');
            }}

        ];

        function render_percent(value) {

                return value*100+"<span>%</span>";

        }

        this.viewConfig = {
            forceFit: true

        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_countf',
                displayInfo: true,
                displayMsg: '第 {0} 到 {1} 条数据, 共{2}条',
                emptyMsg: '无数据'
            }),
            columnLines: true,
            enableLocking: true
        });

        this.callParent(arguments);
        columns: [
            {
            dataIndex: 'name',
            text: '驾校',
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('{0} name{1}', value, value !== 1 ? 's' : '');
            }
        }, {
            dataIndex: 'num_count',
            text: '合计',
            summaryType: 'average'
        }]
    }

});





