


Ext.define('App.view.report.BarChart', {
    extend: 'Ext.chart.Chart',
    style: 'background:#fff',
    alias: 'widget.barChartf',
    animate: true,
    shadow: true,
    store: 'syj_report',
    title: '柱状图',
    iconCls: 'chart',
//    xtype : 'columnchart',
    axes: [
        {
            title: '人数',
            type: 'Numeric',
            position: 'left',
            fields: ['num'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            grid: true,
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
    series: [{
        type: 'column',
        axis: 'left',
        highlight: true,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('result') + ': ' + storeItem.get('num') + ' 人');
            }
        },
        label: {
            display: 'insideEnd',
            'text-anchor': 'middle',
            field: 'result',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333'
        },
        xField: 'result',
        yField: 'num'
    }]
});


