/**
 * Created by jj on 14-6-19.
 */
Ext.define('App.model.syj_examinees', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'name'},
        {name: 'sex'},
        {name: 'card'},
        {name: 'address'},
        {name: 'lictype'},
        {name: 'licdt'},
        {name: 'licmd'},
        {name: 'photo'},
        {name: 'status'},
        {name: 'remark'}
    ]
});



