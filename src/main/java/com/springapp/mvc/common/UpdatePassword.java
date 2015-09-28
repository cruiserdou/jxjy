package com.springapp.mvc.common;

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
@RequestMapping("/update_pass")
public class UpdatePassword {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpSession session,
            @RequestParam("old_pass") String old_pass,
            @RequestParam("new_pass1") String new_pass1,
            @RequestParam("new_pass2") String new_pass2
            ) throws Exception{
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
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
        dataShop.setSuccess(false);

        try {
            conn = DriverManager.getConnection(url, user, password);

            String sql_sure = "select password from work.users where username = '" +
                    session.getAttribute("user").toString() + "'";
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql_sure);

            while (rs.next()){
                if (old_pass.equals(rs.getString(1))){
                    String sql = "update work.users set " +
                            "password = ? " +
                            "where username = ?";
                    pst = conn.prepareStatement(sql);
                    pst.setString(1, new_pass1);
                    pst.setString(2, session.getAttribute("user").toString());

                    pst.executeUpdate();
                    dataShop.setSuccess(true);
                }else{
                    dataShop.setSuccess(false);
                }
            }
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