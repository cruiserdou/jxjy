
Ext.define('App.store.syj_trainer', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_trainer',
    pageSize:30,
    proxy: {
        type: 'ajax',
        url: 'obtain_trainers_info',

        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'list'
        }
    },
    autoLoad: true

});


