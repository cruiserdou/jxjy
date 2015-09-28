//package com.springapp.mvc.admissions;
//
///**
//* Created by xwq on 14-4-15.
//*/
//
//import com.xwq.common.model.DataShop;
//import com.xwq.common.util.DBInfo;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.sql.*;
//import java.util.*;
//
//@Controller
//@RequestMapping("/obtain_admissions_info")
//public class ObtainAdmissionsInfo {
//
//    @RequestMapping(method = RequestMethod.POST)
//    public
//    @ResponseBody
//    DataShop getShopInJSON(
//            @RequestParam(value = "admbh", required = false) String admbh
//    ) throws Exception{
//        Connection conn = null;
//        Statement stmt = null;
//        ResultSet rs = null;
//
//        DataShop dataShop = new DataShop();
//        List list = new ArrayList();
//        List listX = new ArrayList();
//
//        try{
//            Class.forName("org.postgresql.Driver").newInstance();
//        }catch (Exception e){
//            System.out.print(e.getMessage());
//        }
//        DBInfo connstr = new DBInfo();
//        String url = connstr.getUrl();
//        String user = connstr.getUser();
//        String password = connstr.getPassword();
//        try{
//            conn = DriverManager.getConnection(url, user, password);
//            stmt = conn.createStatement();
//
//            String sql = "select adm.id,adm.admbh,adm.qtbh,adm.examid,adm.examdt,adm.scores,adm.sites," +
//                    " adm.examroom,adm.examsite,adm.remark, " +
//                    " exam.name,exam.card,exam.sex,exam.licmd " +
//                    " from work.admissions as adm ,work.examinees  exam" +
//                    "   WHERE adm.examid=exam.id and adm.id = 10000 ";
//            if (admbh != null && admbh.length() != 0)
//            sql += " and admbh like '%" + admbh + "%'";
//
//            rs = stmt.executeQuery(sql);
//
////            list = new ConvertToList().convertList(rs);
//
//            ResultSetMetaData md = rs.getMetaData();
//            int columnCount = md.getColumnCount();
//
//            while (rs.next()){
//                Map rowData = new HashMap<String, Objects>();
//                String admid=rs.getString( 1 );
//                for (int i = 1; i <= columnCount+1; i++){
//                    if(i==columnCount+1){
//                        String sql_list =   " select  qtA.qtnum as qtnumA, \n" +
//                                " case when ansA.answer='false' then '×' when  ansA.answer='true' then '√'  else   ansA.answer end as answerA ,\n" +
//                                " case when ansA.result=0 then '×' when ansA.result>0 then  '√' else  '' end   as resultA , \n" +
//                                " qtB.qtnum as qtnumB, \n" +
//                                " case when ansB.answer='false' then '×' when  ansB.answer='true' then '√'  else   ansB.answer end as answerB,\n" +
//                                " case when ansB.result=0 then '×' when ansB.result>0 then  '√' else  '' end   as resultB, \n" +
//                                " qtC.qtnum as qtnumC,\n" +
//                                " case when ansC.answer='false' then '×' when  ansC.answer='true' then '√'  else   ansC.answer end as answerC,\n" +
//                                " case when ansC.result=0 then '×' when ansC.result>0 then  '√' else  '' end   as resultC, \n" +
//                                " qtD.qtnum  as qtnumD,\n" +
//                                " case when ansD.answer='false' then '×' when  ansD.answer='true' then '√'  else   ansD.answer end as answerD,\n" +
//                                " case when ansD.result=0 then '×' when ansD.result>0 then  '√' else  '' end   as resultD  \n" +
//                                " from work.questions qtA  join work.admissions  adm  ON qtA.qtbh=adm.qtbh AND adm.id ="+admid+
//                                " left join work.answers ansA on ansA.qtnum=qtA.qtnum and ansA.qtbh=qtA.qtbh AND ansA.admbh=adm.admbh\n" +
//                                " join work.questions qtB on qtA.qtbh=qtB.qtbh \n" +
//                                " left join work.answers ansB on ansB.qtnum=qtB.qtnum and ansB.qtbh=qtB.qtbh AND ansB.admbh=adm.admbh\n" +
//                                " join work.questions qtC on qtA.qtbh=qtC.qtbh  \n" +
//                                " left join work.answers ansC on ansC.qtnum=qtC.qtnum and ansC.qtbh=qtC.qtbh AND ansC.admbh=adm.admbh\n" +
//                                " join work.questions qtD on qtA.qtbh=qtD.qtbh\n" +
//                                " left join work.answers ansD on ansD.qtnum=qtD.qtnum and ansD.qtbh=qtD.qtbh AND ansD.admbh=adm.admbh\n" +
//                                " group by qtA.qtnum ,qtB.qtnum,qtC.qtnum ,qtD.qtnum,ansA.answer,ansA.result,ansB.answer,ansB.result,ansC.answer,ansC.result,ansD.answer,ansD.result\n" +
//                                " having  qtA.qtnum%4=1 and qtB.qtnum%4=2 and qtC.qtnum%4=3 and qtD.qtnum%4=0 AND qtA.qtnum+1=qtB.qtnum and  qtB.qtnum+1=qtC.qtnum and qtC.qtnum+1=qtD.qtnum \n" +
//                                " order by qtA.qtnum";
//                        ResultSet rslist = stmt.executeQuery(sql_list);
//                        ResultSetMetaData md_list = rslist.getMetaData();
//                        int columnCount_list = md_list.getColumnCount();
//
//                        while (rslist.next()) {
//                            Map rowDataList = new HashMap<String, String>();
//                            for (int j = 1; j <= columnCount_list; j++) {
//                                    rowDataList.put(md_list.getColumnName(j), rslist.getString(j));
//                            }
//                            listX.add(rowDataList);
//                        }
//                        rowData.put("list", listX);
//
//                        try {
//                            if (rslist != null) rslist.close();
//                        }catch (SQLException e) {
//                            System.out.print(e.getMessage());
//                        }
//
//                    }else{
//                        rowData.put(md.getColumnName(i), rs.getObject(i));
//                    }
//                }
//                list.add(rowData);
//            }
//
//        }catch (SQLException e){
//            System.out.print(e.getMessage());
//        }finally {
//            try{
//                if (rs != null) rs.close();
//                if (stmt != null) stmt.close();
//                if (conn != null) conn.close();
//            }catch (SQLException e){
//                System.out.print(e.getMessage());
//            }
//        }
//
//        dataShop.setSuccess(true);
//        dataShop.setList(list);
//
//        return dataShop;
//    }
//}