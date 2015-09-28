Ext.define('App.store.qt_cont', {
    extend: 'Ext.data.Store',
    model: 'App.model.qt_cont',
    proxy: {
        type: 'ajax',
        url: 'obtain_qt_cont_info',
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



