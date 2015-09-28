/**
 * Created by dou on 14-1-19.
 */
Ext.define('App.store.PersonalPubinfo', {
    extend: 'Ext.data.Store',
    model: 'App.model.Pubinfo',
    sortInfo: {field: 'id', direction: "ASC"},
    groupField:'state',
    proxy: {
        type: 'ajax',
        url: 'obtain_pub_info',
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