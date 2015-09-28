
Ext.define('App.store.syj_trainer_nextexam', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_trainer_all',
    proxy: {
        type: 'ajax',
        url: 'obtain_trainer_nextexam_info',
//        extraParams:{
//            status: '初审'
//        },
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


