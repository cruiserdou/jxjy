package com.springapp.mvc.trainer;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.sql.*;
import java.util.*;

@Controller
@RequestMapping("/obtain_infocheck")
public class ObtainInfoCheckInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpSession session
    ) throws Exception{
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        DataShop dataShop = new DataShop();
        List list = new ArrayList();
        List listX = new ArrayList();
        try{
            Class.forName("org.postgresql.Driver").newInstance();
        }catch (Exception e){
            System.out.print(e.getMessage());
        }
        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();

        try{
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();

            Map rowData = new HashMap<String, Objects>();
            String s_qtbh="";
            String s_status="";

            String sql_qtbh =  "select qtbh,status FROM work.trainer   WHERE id ="+session.getAttribute("id").toString();
            ResultSet rsqtbh = stmt.executeQuery(sql_qtbh);

            while (rsqtbh.next()) {
                s_qtbh = rsqtbh.getString(1);
                s_status = rsqtbh.getString("status");
            }

            try {
                if (rsqtbh != null) rsqtbh.close();
            }catch (SQLException e) {
                System.out.print(e.getMessage());
            }
            String sql="";

            String sql_list =  "select qtnum,question,qt_a,qt_b,qt_c,qt_d FROM work.questions   WHERE qtbh='"+s_qtbh+"' order by qtnum";
            ResultSet rslist = stmt.executeQuery(sql_list);
            ResultSetMetaData md_list = rslist.getMetaData();
            int columnCount_list = md_list.getColumnCount();

            while (rslist.next()) {
                Map rowDataList = new HashMap<String, String>();
                for (int j = 1; j <= columnCount_list; j++) {
                    rowDataList.put(md_list.getColumnName(j), rslist.getString(j));
                }
                listX.add(rowDataList);
            }
            rowData.put("list", listX);

            try {
                if (rslist != null) rslist.close();
            }catch (SQLException e) {
                System.out.print(e.getMessage());
            }

           if(s_status.equals("违纪")){
                sql = "select id,qtbh, name, sex, education, card, address, workunit, drvschool, \n" +
                       "       lictype, licdt, applytp, qulfnum," +
                       " case when (licmd!='' and licmd_goods='')   then licmd when (licmd='' and licmd_goods!='') then licmd_goods else licmd||licmd_goods  end as  licmd" +
                       " , checklist1, promise, \n" +
                       "       photo, status,  case  when ks_stat in  (0,1)   then '初试'  else '补考' end  as ks_status," +
                       "       remark, 0 as scores,   '违纪' as result ,0 as right ,0 as wrong,0 as no " +
                       " from work.trainer trainer where   trainer.id ="+session.getAttribute("id").toString();
           }else {
                sql = "select id,qtbh, name, sex, education, card, address, workunit, drvschool, \n" +
                       "       lictype, licdt, applytp, qulfnum," +
                       " case when (licmd!='' and licmd_goods='')   then licmd when (licmd='' and licmd_goods!='') then licmd_goods else licmd||licmd_goods  end as  licmd" +
                       " , checklist1, promise, \n" +
                       "       photo, status,  case  when ks_stat in  (0,1)   then '初试'  else '补考' end  as ks_status," +
                       "       remark,scores, \n" +
                       "       case when scores>60 then '及格' when scores>=0 and scores<60 then '不及格' else '缺考' end as result ," +
                       "      (select count(result) from    work.answers  WHERE admbh=trainer.card  and qtbh=trainer.qtbh and result>0) as right , \n" +
                       "        (select count(result) from    work.answers  WHERE admbh=trainer.card  and qtbh=trainer.qtbh and result=0) as wrong,\n" +
                       "       (select 100-count(result) from    work.answers  WHERE admbh=trainer.card  and qtbh=trainer.qtbh and result>=0)as no " +
                       " from work.trainer trainer where   trainer.id =" + session.getAttribute("id").toString();

           }
            rs = stmt.executeQuery(sql);

            ResultSetMetaData md = rs.getMetaData();
            int columnCount = md.getColumnCount();

            while (rs.next()){
                for (int i = 1; i <= columnCount+1; i++){
                    if(i!=columnCount+1) {
                        rowData.put(md.getColumnName(i), rs.getObject(i));
                    }
                }
            }
            list.add(rowData);
        }
        catch (SQLException e){
            System.out.print(e.getMessage());
        }finally {
            try{
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            }catch (SQLException e){
                System.out.print(e.getMessage());
            }
        }

        dataShop.setSuccess(true);
        dataShop.setList(list);

        return dataShop;
    }
}