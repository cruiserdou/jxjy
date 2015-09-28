Ext.define('App.controller.Tabitem', {
    extend: 'Ext.app.Controller',

    stores: [
        'syj_depts'
//        , 'syj_users', 'syj_upload', 'syj_menu',
//        'Dept_store'
//        ,
//        'syj_roles', 'syj_userroles', 'syj_rolepermissions', 'syj_examinees'
    ],

    models: [
        'syj_depts'
//        , 'syj_users', 'syj_upload', 'syj_menu', 'Dept_store'
//        , 'syj_roles', 'syj_userroles', 'syj_rolepermissions', 'syj_examinees'
    ],

    views: [
//        'depts.Deptf', 'depts.Grid', 'depts.Query',
//        'roles.Rolesf', 'roles.Query', 'roles.Grid',
//
//        'users.Usersf','users.Query', 'users.Grid',
//
//        'userroles.Userrolesf', 'userroles.Query', 'userroles.Grid',
//
//        'menu.Policef', 'menu.Grid', 'menu.Query',
//        'rolepermissions.Truckoutf', 'rolepermissions.Grid', 'rolepermissions.Query',
//        'annex.upload.Upload', 'annex.upload.Grid',
//        'annex.baseinfo.Baseinfo', 'annex.baseinfo.Grid',
//        'annex.download.Download', 'annex.download.Grid',
//        'examinees.info.Examineesf', 'examinees.info.Grid', 'examinees.info.Query',
//        'examinees.apply.Applyf'
//        'examinees.results.Resultsf', 'examinees.results.Grid','examinees.results.Query',
//        'examinees.audits.Auditsf', 'examinees.audits.Grid','examinees.audits.Query',
//        'examinees.accred.Accredf','examinees.accred.Grid','examinees.accred.Query',
//        'examinees.print.Printf','examinees.print.Grid','examinees.print.Query'
    ],

    refs: [
        {
            ref: 'panel',
            selector: 'detailPanel'
        },
        {
            ref: 'paneldata',
            selector: 'datacir_detailPanel'
        }
    ]
});
