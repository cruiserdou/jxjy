Ext.require('Ext.chart.*');
Ext.require(['Ext.layout.container.Fit', 'Ext.window.MessageBox']);
var donut = false;


Ext.define('App.view.report.PieChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.pieChartf',
    title: '饼状图',
    store: 'syj_report',

//    style: 'background:#fff',
//    iconCls: 'chart',
//    xtype: 'chart',
//    animate: true,
//    shadow: true,
//    legend: {
//        position: 'right'
//    },
//    insetPadding: 60,
//    theme: 'Base:gradients',

    xtype: 'chart',
    animate: true,
    shadow: true,
    legend: {
        position: 'right'
    },
    insetPadding: 60,
    theme: 'Base:gradients',

    series: [{
        type: 'pie',
        field: 'num',
        showInLegend: true,
        donut: donut,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
                //calculate percentage.
                var total = 0;
                store1.each(function(rec) {
                    total += rec.get('num');
                });
                this.setTitle(storeItem.get('num') + ': ' + Math.round(storeItem.get('num') / total * 100) + '%');
            }
        },
        highlight: {
            segment: {
                margin: 20
            }
        },
        label: {
            field: 'result',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }]
});


