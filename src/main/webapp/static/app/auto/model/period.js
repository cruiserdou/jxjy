/**
 * Created by jj on 14-6-19.
 */
Ext.define('App.model.period', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'period_count'},
        {name: 'period_person'},
        {name: 'period_time'},
        {name: 'period_remark'},
        {name: 'status'},
        {name: 'maxperiod'}

    ]
});

