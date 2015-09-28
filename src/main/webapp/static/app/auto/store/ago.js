Ext.define('App.store.ago', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_trainer',
    proxy: {
        type: 'ajax',
        url: 'obtain_ago_trainer_info',
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


