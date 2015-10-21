
Ext.define('App.store.syj_trainer', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_trainer',
    groupField:'drvschool',
    proxy: {
        type: 'ajax',
        url: 'obtain_trainers_info',

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


