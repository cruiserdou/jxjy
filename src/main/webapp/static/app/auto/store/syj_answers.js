
Ext.define('App.store.syj_answers', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_answers',
    proxy: {
        type: 'ajax',
        url: 'obtain_answers_info',
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


