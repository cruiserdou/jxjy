/**
 * Created by jj on 14-5-10.
 */
Ext.define('App.store.agree_dict_store', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_dicts',
    proxy: {
        type: 'ajax',
        url: 'agree_dict_info',
        extraParams:{
            fieldvaldis: '同意考试'
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




