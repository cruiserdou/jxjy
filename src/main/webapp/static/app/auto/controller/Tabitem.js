Ext.define('App.controller.Tabitem', {
    extend: 'Ext.app.Controller',

    stores: [
        'audit_store','qtype_store','syj_trainer','syj_trainer_trial','syj_trainer_final'
        ,'trial_dict_store','final_dict_store','regist_dict_store','agree_dict_store'
        ,'syj_depts','syj_users','syj_menu','Dept_store','syj_dicts','syj_tra_scr','syj_countf'
        ,'syj_trainer_cred_roster','discip_dict_store','syj_trainer_drvschool','syj_orders'
        ,'syj_trainer_maint','syj_trainer_refer','syj_trainer_agree','syj_trainer_results'
        ,'syj_roles','syj_userroles','syj_rolepermissions','syj_examinees','syj_print_exam','syj_answers'
        ,'syj_questions','syj_drvschool','syj_examanswers','syj_report', 'Pubinfo','period','ago','myperiod','school_count','school_trainer'
        ,'qt_cont','question_dict_store','type_dict_store','syj_trainer_nextexam'

    ]
    ,

    models: [
        'syj_depts','syj_users','syj_menu','Dept_store','syj_dicts','syj_trainer','syj_countf'
        ,'syj_roles','syj_userroles','syj_rolepermissions','syj_examinees','syj_answers'
        ,'syj_orders','qt_cont','question_dict_store','school_count','syj_trainer_all'
        ,'syj_questions','syj_admissions','syj_drvschool','syj_examanswers','syj_report', 'Pubinfo','period'],

    views: [

        'home_page.public_info.Pubinfof','home_page.public_info.Grid','home_page.public_info.Query',
        'home_page.pub_mgr.Pubmgr','home_page.pub_mgr.Grid','home_page.pub_mgr.Query',
        'orders.Ordersf',  'orders.Grid',  'orders.Query',
        'depts.Deptf', 'depts.Grid', 'depts.Query',
        'dicts.Dictsf', 'dicts.Grid', 'dicts.Query',
        'drvschool.Drvschoolf','drvschool.Grid', 'drvschool.Query',
        'questions.Questionsf','questions.Grid', 'questions.Query',
        'qtcont.QtcontF','qtcont.Grid','qtcont.Query',
        'answers.Answersf','answers.Grid', 'answers.Query','answers.ExamGrid',
        'admissions.Admissionsf','admissions.Grid', 'admissions.Query',
        'scores.Scoresf','scores.Grid', 'scores.Query',
        'roles.Rolesf', 'roles.Query', 'roles.Grid',
        'users.Usersf','users.Query', 'users.Grid',
        'ago.ago','ago.Grid','ago.Query',
        'schoolcount.Grid','schoolcount.GridSchool','schoolcount.SchoolCount',
        'period.periodf','period.Grid','period.Query',
        'userroles.Userrolesf', 'userroles.Query', 'userroles.Grid',
        'menu.Policef', 'menu.Grid', 'menu.Query',
        'rolepermissions.Truckoutf', 'rolepermissions.Grid', 'rolepermissions.Query',
        'roster.train_roster.Train_rosterf','roster.train_roster.Query','roster.train_roster.Grid',
        'roster.exam_roster.Exam_rosterf','roster.exam_roster.Query','roster.exam_roster.Grid',
        'roster.cred_roster.Cred_rosterf','roster.cred_roster.Query','roster.cred_roster.Grid',
        'examinees.info.Examineesf', 'examinees.info.Grid', 'examinees.info.Query',
        'examinees.apply.Applyf',
        'examinees.results.Resultsf', 'examinees.results.Grid','examinees.results.Query',
        'examinees.trial.Trialf', 'examinees.trial.Grid','examinees.trial.Query',
        'examinees.final.Finalf','examinees.final.Grid','examinees.final.Query',
        'examinees.agree.Agreef','examinees.agree.Grid','examinees.agree.Query',
        'examinees.maint.Maintf','examinees.maint.Grid','examinees.maint.Query',
        'examinees.refer.Referf','examinees.refer.Grid','examinees.refer.Query',
        'report.count.Countf','report.count.Grid','report.count.Query',
        'report.LineChart','report.BarChart','report.BarGradient','report.PieChart',
        'nextexam.Nextexamf','nextexam.Grid','nextexam.Query'

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
