
Ext.define('App.store.syj_questions', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_questions',
    proxy: {
        type: 'ajax',
        url: 'obtain_questions_info',
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


