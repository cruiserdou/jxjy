
Ext.define('App.view.report.LineChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.lineChartf',
    store: 'syj_report',
    title: '折线图',
    iconCls: 'icon-chart',
    axes: [
        {
            title: '人数',
            type: 'Numeric',
            position: 'left',
            fields: ['num'],
            minimum: 0,
            maximum: 10
        },
        {
            title: '成绩',
            type: 'Category',
            position: 'bottom',
            fields: ['result']
        }
    ],
    series: [
        {
            type: 'line',
            xField: 'result',
            yField: 'num'
        }
    ]
});


