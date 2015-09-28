Ext.define('App.store.period', {
    extend: 'Ext.data.Store',
    model: 'App.model.period',
    proxy: {
        type: 'ajax',
        url: 'obtain_period_info',
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


