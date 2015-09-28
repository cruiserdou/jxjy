Ext.define('App.store.syj_upload', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_upload',
    proxy: {
        type: 'ajax',
        url: 'obtain_upload_info',
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



