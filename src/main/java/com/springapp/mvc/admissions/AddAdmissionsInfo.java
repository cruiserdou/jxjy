package com.springapp.mvc.admissions;

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
@RequestMapping("/add_admissions_info")
public class AddAdmissionsInfo {

    @RequestMapping( method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam("admbh") String admbh,
            @RequestParam("qtbh") String qtbh,
            @RequestParam("examid") Integer examid,
            @RequestParam("examdt") String examdt,
            @RequestParam("sites") String sites,
            @RequestParam("examroom") String examroom,
            @RequestParam("examsite") String examsite,
            @RequestParam("remark") String remark

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

            String sql = "insert into work.admissions" +
                    "(admbh, qtbh, examid, examdt,  sites, examroom, examsite, remark) " +
                    " values(?, ?, ?, ?, ?, ?, ?, ?)";
            pst = conn.prepareStatement(sql);
            pst.setString(1, admbh);
            pst.setString(2, qtbh);
            pst.setInt(3, examid);
            java.sql.Date sql_examdt = null;
            if (examdt!= null && examdt.length() > 2)
                sql_examdt = java.sql.Date.valueOf(examdt);
            pst.setDate(4, sql_examdt);
            pst.setString(5, sites);
            pst.setString(6, examroom);
            pst.setString(7, examsite);
            pst.setString(8, remark);
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