

Ext.define('App.store.syj_admissions', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_admissions',
    proxy: {
        type: 'ajax',
        url: 'obtain_admissions_info',
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





