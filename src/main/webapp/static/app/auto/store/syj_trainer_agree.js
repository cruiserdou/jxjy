
Ext.define('App.store.syj_trainer_agree', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_trainer',
    sortInfo: {field: 'id', direction: "ASC"},
    groupField:'drvschool',
    proxy: {
        type: 'ajax',
        url: 'obtain_trainers_agree_info',
        //extraParams:{
        //    scores: '终审'
        //},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    autoLoad: false
});



