/**
 * Created by jj on 14-6-19.
 */

    Ext.define('App.store.syj_orders', {
        extend: 'Ext.data.Store',
        model: 'App.model.syj_orders',
        proxy: {
            type: 'ajax',
            url: 'obtain_orders_list_info',
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


