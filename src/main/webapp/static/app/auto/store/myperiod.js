Ext.define('App.store.myperiod', {
    extend: 'Ext.data.Store',
    model: 'App.model.period',
    proxy: {
        type: 'ajax',
        url: 'obtain_myperiod_info',
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


