
Ext.define('App.store.school_trainer', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_trainer',
//    sortInfo: {field: 'id', direction: "ASC"},
//    groupField:'drvschool',
    proxy: {
        type: 'ajax',
        url: 'obtain_school_trainers_info',

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


