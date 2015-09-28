
Ext.define('App.store.syj_examinees', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_examinees',
    proxy: {
        type: 'ajax',
        url: 'obtain_examinees_info',
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


