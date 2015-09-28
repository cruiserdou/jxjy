/**
 * Created by jj on 14-5-10.
 */
Ext.define('App.store.syj_trainer_drvschool', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_trainer',
    proxy: {
        type: 'ajax',
        url: 'obtain_trainers_drvschool_info',
        extraParams:{
            status: '报名'
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




