

Ext.define('App.store.syj_drvschool', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_drvschool',
    proxy: {
        type: 'ajax',
        url: 'obtain_drvschool_info',
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





