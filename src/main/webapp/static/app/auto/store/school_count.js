Ext.define('App.store.school_count', {
    extend: 'Ext.data.Store',
    model: 'App.model.school_count',
    proxy: {
        type: 'ajax',
        url: 'obtain_school_count_info',
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


