/**
 * Created by jj on 14-5-10.
 */
Ext.define('App.store.question_dict_store', {
    extend: 'Ext.data.Store',
    model: 'App.model.question_dict_store',
    proxy: {
        type: 'ajax',
        url: 'qquestion_dicts_info',
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




