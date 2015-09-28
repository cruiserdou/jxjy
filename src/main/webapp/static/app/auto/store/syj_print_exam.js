
Ext.define('App.store.syj_print_exam', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_examinees',
    proxy: {
        type: 'ajax',
        url: 'print_exam_info',
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





