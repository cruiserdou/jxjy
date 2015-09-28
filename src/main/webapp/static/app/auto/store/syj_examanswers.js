
    Ext.define('App.store.syj_examanswers', {
        extend: 'Ext.data.Store',
        model: 'App.model.syj_examanswers',
        proxy: {
            type: 'ajax',
            url: 'obtain_examanswers_info',
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

