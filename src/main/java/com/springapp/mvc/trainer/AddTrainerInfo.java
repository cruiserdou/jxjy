package com.springapp.mvc.trainer;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.sql.*;

@Controller
@RequestMapping("/add_trainers_info")
public class AddTrainerInfo {

    @RequestMapping( method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam("name") String name,
            @RequestParam("sex") String sex,
            @RequestParam("education") String education,
            @RequestParam("card") String card,
            @RequestParam("address") String address,
            @RequestParam("workunit") String workunit,
//            @RequestParam("drvschool") String drvschool,
            @RequestParam("lictype") String lictype,
//            @RequestParam("licdt") String licdt,
            @RequestParam("applytp") String applytp,
//            @RequestParam("qulfnum") String qulfnum,
            @RequestParam("licmd") String licmd,
            @RequestParam("checklist1") String checklist1,
            @RequestParam("checklist2") String checklist2,
            @RequestParam("checklist3") String checklist3,
            @RequestParam("checklist4") String checklist4,
            @RequestParam("checklist5") String checklist5,
            @RequestParam("promise") String promise,
            @RequestParam("photo") String photo,
            @RequestParam("promisedt") String promisedt,
            @RequestParam("remark") String remark,
            @RequestParam("licmd_goods") String licmd_goods,
            @RequestParam("st_tk_dt") String st_tk_dt,
            @RequestParam("end_tk_dt") String end_tk_dt,
            @RequestParam("zq_st_tk_dt") String zq_st_tk_dt,
            @RequestParam("zq_end_tk_dt") String zq_end_tk_dt,
                    HttpSession session

    ) throws Exception{
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);
        Connection conn = null;
        PreparedStatement pst = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            Class.forName("org.postgresql.Driver").newInstance();
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }

        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();
        String drvschool = session.getAttribute("user").toString();


        try {
            conn = DriverManager.getConnection(url, user, password);

            Integer pxnum=0;
            String sql = "insert into work.trainer" +
                    "(name, sex, education, card, address, workunit, drvschool, lictype, licdt, applytp," +
                    " qulfnum, licmd, checklist1, checklist2,checklist3,checklist4,checklist5," +
                    " promise,photo, status, remark,licmd_goods,qtbh,pxnum,promisedt,st_tk_dt,end_tk_dt,zq_st_tk_dt,zq_end_tk_dt) " +
                    " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?, ?, (select  qtbh  from work.qt_cont WHERE   lictype=?), ?, ? , ?, ?, ?, ?)";


            pst = conn.prepareStatement(sql);
            pst.setString(1, name);
            pst.setString(2, sex);
            pst.setString(3, education);
            pst.setString(4, card);
            pst.setString(5, address);
            pst.setString(6, workunit);
            pst.setString(7, drvschool);
            pst.setString(8, lictype);
            java.sql.Date sql_licdt = null;
            pst.setDate(9, sql_licdt);
            pst.setString(10, applytp);
            pst.setString(11, "");
            pst.setString(12, licmd);
            pst.setString(13, checklist1);
            pst.setString(14, checklist2);
            pst.setString(15, checklist3);
            pst.setString(16, checklist4);
            pst.setString(17, checklist5);
            pst.setString(18, promise);
            pst.setString(19, card+".jpg");
            pst.setString(20, "报名");
            pst.setString(21, remark);
            pst.setString(22, licmd_goods);

            if(licmd.equals("true")  && licmd_goods.equals("false") &&  checklist1.equals("false") && checklist2.equals("false") ){
                pst.setString(23, "客运");
            }
            if(licmd.equals("false")  && licmd_goods.equals("true") &&  checklist1.equals("false") && checklist2.equals("false") ){
                pst.setString(23, "货运");
            }
            if(licmd.equals("true")  && licmd_goods.equals("true") &&  checklist1.equals("false") && checklist2.equals("false") ){
                pst.setString(23, "客货");
            }
            if(licmd.equals("true")  && licmd_goods.equals("true") &&  checklist1.equals("true") && checklist2.equals("false") ){
                pst.setString(23, "危险品");
            }
            if(licmd.equals("true")  && licmd_goods.equals("false") &&  checklist1.equals("false") && checklist2.equals("true")){
                pst.setString(23, "出租车");
            }
            pst.setInt(24,pxnum);
            java.sql.Date sql_promisedt = null;
            if (promisedt!= null && promisedt.length() > 2)
                sql_promisedt = java.sql.Date.valueOf(promisedt);
            pst.setDate(25, sql_promisedt);
            java.sql.Date sql_st_tk_dt = null;
            if (st_tk_dt!= null && st_tk_dt.length() > 2)
                sql_st_tk_dt = java.sql.Date.valueOf(st_tk_dt);
            pst.setDate(26, sql_st_tk_dt);
            java.sql.Date sql_end_tk_dt = null;
            if (end_tk_dt!= null && end_tk_dt.length() > 2)
                sql_end_tk_dt = java.sql.Date.valueOf(end_tk_dt);
            pst.setDate(27, sql_end_tk_dt);
            java.sql.Date sql_zq_st_tk_dt = null;
            if (zq_st_tk_dt!= null && zq_st_tk_dt.length() > 2)
                sql_zq_st_tk_dt = java.sql.Date.valueOf(zq_st_tk_dt);
            pst.setDate(28, sql_zq_st_tk_dt);
            java.sql.Date sql_zq_end_tk_dt = null;
            if (zq_end_tk_dt!= null && zq_end_tk_dt.length() > 2)
                sql_zq_end_tk_dt = java.sql.Date.valueOf(zq_end_tk_dt);
            pst.setDate(29, sql_zq_end_tk_dt);
            pst.executeUpdate();

            dataShop.setSuccess(true);

        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            try {
                if (pst != null) pst.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                System.out.print(e.getMessage());
            }
        }

        return dataShop;
    }
}