package com.springapp.mvc.examinees;

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
@RequestMapping("/update_examinees_info")
public class UpdateExamineesInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam("id") Integer id,
            @RequestParam("name") String name,
            @RequestParam("sex") String sex,
            @RequestParam("card") String card,
            @RequestParam("address") String address,
            @RequestParam("lictype") String lictype,
            @RequestParam("licdt") String licdt,
            @RequestParam("licmd") String licmd,
            @RequestParam("status") String status,
            @RequestParam("auditdt") String auditdt,
            @RequestParam("auditps") String auditps,
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
            String sql = "update work.examinees set " +
                    "name=?, sex=?, card=?, address=?, lictype=?, licdt=?, licmd=?,status=?, " +
                    "  auditdt=?,auditps=?,  remark=?" +
                    "where id = ?";
            pst = conn.prepareStatement(sql);
            pst.setString(1, name);
            pst.setString(2, sex);
            pst.setString(3, card);
            pst.setString(4, address);
            pst.setString(5, lictype);
            java.sql.Date sql_licdt = null;
            if (licdt!= null && licdt.length() > 2)
                sql_licdt = java.sql.Date.valueOf(licdt);
            pst.setDate(6, sql_licdt);
            pst.setString(7, licmd);
            pst.setString(8, status);
            java.sql.Date sql_auditdt = null;
            if (auditdt!= null && auditdt.length() > 2)
                sql_auditdt = java.sql.Date.valueOf(auditdt);
            pst.setDate(9, sql_auditdt);
            pst.setString(10, auditps);
            pst.setString(11, remark);
            pst.setInt(12, id);
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