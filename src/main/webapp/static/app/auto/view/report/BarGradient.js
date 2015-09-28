

Ext.define('App.view.report.BarGradient', {
    extend: 'Ext.chart.Chart',
    style: 'background:#fff',
    alias: 'widget.barGradientf',
    shadow: true,
    store: 'syj_report',
    title: '梯度图',
    iconCls: 'chart',
    animate: false,
    insetPadding: 30,
    gradients: [{
        angle: 90,
        id: 'bar-gradient',
        stops: {
            0: {
                color: '#99BBE8'
            },
            70: {
                color: '#77AECE'
            },
            100: {
                color: '#77AECE'
            }
        }
    }],
    axes: [{
        type: 'Numeric',
        minimum: 0,
        maximum: 10,
        position: 'left',
        fields: ['num'],
        title: false,
        grid: true,
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0'),
            font: '10px Arial'
        }
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['result'],
        title: false,
        grid: true,
        label: {
            font: '11px Arial',
            renderer: function(result) {
                return result.substr(0, 3);
            }
        }
    }],
    series: [{
        type: 'column',
        axis: 'left',
        xField: 'result',
        yField: 'num',
        style: {
            fill: 'url(#bar-gradient)',
            'stroke-width': 3
        },
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0,
            fill: '#38B8BF',
            stroke: '#38B8BF'
        }
    }, {
        type: 'line',
        axis: 'left',
        xField: 'result',
        yField: 'num',
        tips: {
            trackMouse: true,
            width: 110,
            height: 25,
            renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('num') + ' 人 ' + storeItem.get('result').substr(0, 3));
            }
        },
        style: {
            fill: '#18428E',
            stroke: '#18428E',
            'stroke-width': 3
        },
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0,
            fill: '#18428E',
            stroke: '#18428E'
        }
    }]
});


