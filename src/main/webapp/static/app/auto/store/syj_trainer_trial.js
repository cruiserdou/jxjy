
Ext.define('App.store.syj_trainer_trial', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_trainer',
    proxy: {
        type: 'ajax',
        url: 'obtain_trainers_info',
        extraParams:{
            status: '提交'
        },
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


