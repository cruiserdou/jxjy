/**
 * Created by jj on 14-5-10.
 */
Ext.define('App.store.syj_trainer_maint', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_trainer',
    proxy: {
        type: 'ajax',
        url: 'obtain_maints_info',
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




