Ext.define('App.store.syj_countf', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_countf',
    proxy: {
        type: 'ajax',
        url: 'obtain_countf_info',
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




