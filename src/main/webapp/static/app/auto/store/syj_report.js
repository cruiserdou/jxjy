
Ext.define('App.store.syj_report', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_report',
    proxy: {
        type: 'ajax',
        url: 'obtain_report_info',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    autoLoad: true
});




