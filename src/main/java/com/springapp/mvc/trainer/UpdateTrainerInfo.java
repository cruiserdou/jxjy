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

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Controller
@RequestMapping("/update_trainer_info")
public class UpdateTrainerInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
//            @RequestParam("id") Integer id,
            @RequestParam("promisedt") String promisedt,
            @RequestParam("name") String name,
            @RequestParam("sex") String sex,
            @RequestParam("education") String education,
            @RequestParam("card") String card,
            @RequestParam("address") String address,
            @RequestParam("workunit") String workunit,
//            @RequestParam("drvschool") String drvschool,
            @RequestParam("lictype") String lictype,
            @RequestParam("licdt") String licdt,
            @RequestParam("applytp") String applytp,
            @RequestParam("qulfnum") String qulfnum,
            @RequestParam("licmd") String licmd,
            @RequestParam("checklist1") String checklist1,
            @RequestParam("checklist2") String checklist2,
            @RequestParam("checklist3") String checklist3,
            @RequestParam("checklist4") String checklist4,
            @RequestParam("checklist5") String checklist5,
            @RequestParam("promise") String promise,
            @RequestParam("status") String status,
            @RequestParam("remark") String remark,
            @RequestParam("st_tk_dt") String st_tk_dt,
            @RequestParam("end_tk_dt") String end_tk_dt,
            @RequestParam("zq_st_tk_dt") String zq_st_tk_dt,
            @RequestParam("zq_end_tk_dt") String zq_end_tk_dt

            ) throws Exception{
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);
        Connection conn = null;
        PreparedStatement pst = null;
        try {
            Class.forName("org.postgresql.Driver").newInstance();
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }

        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();

        try {
            conn = DriverManager.getConnection(url, user, password);

//            String sql1=


            String sql = "UPDATE work.trainer SET name=?, sex=?, education=?, address=?, workunit=?, " +
                    "       lictype=?, licdt=?, applytp=?, qulfnum=?, licmd=?, " +
                    "       checklist1=?, checklist2=?, checklist3=?, checklist4=?," +
                    "       checklist5=?, promise=?,  status=?, remark=?,promisedt=? " +
                    " where  card=?";
            pst = conn.prepareStatement(sql);
            pst.setString(1, name);
            pst.setString(2, sex);
            pst.setString(3, education);
            pst.setString(4, address);
            pst.setString(5, workunit);
            pst.setString(6, lictype);
            java.sql.Date sql_licdt = null;
            if (licdt!= null && licdt.length() > 2)
                sql_licdt = java.sql.Date.valueOf(licdt);
            pst.setDate(7, sql_licdt);
            pst.setString(8, applytp);
            pst.setString(9, qulfnum);
            pst.setString(10, licmd);
            pst.setString(11, checklist1);
            pst.setString(12, checklist2);
            pst.setString(13, checklist3);
            pst.setString(14, checklist4);
            pst.setString(15, checklist5);
            pst.setString(16, promise);
            pst.setString(17, status);
            pst.setString(18, remark);
            java.sql.Date sql_promisedt = null;
            if (promisedt!= null && promisedt.length() > 2)
                sql_promisedt = java.sql.Date.valueOf(promisedt);
            pst.setDate(19, sql_promisedt);
            pst.setString(20, card);
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