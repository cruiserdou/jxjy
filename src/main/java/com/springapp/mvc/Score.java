package com.springapp.mvc;

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
@RequestMapping("/score")
public class Score {
    @RequestMapping(method = RequestMethod.GET)
//    public
//    @ResponseBody
//    DataShop getShopInJSON(
//            @RequestParam("admbh") String admbh,
//            @RequestParam("qtbh") String qtbh,
//            @RequestParam("qtnum") Integer qtnum,
//            @RequestParam("answer") String answer
//
//    ) throws Exception {
//        DataShop dataShop = new DataShop();
//        dataShop.setSuccess(true);
//        Connection conn = null;
//        PreparedStatement pst = null;
//        try {
//            Class.forName("org.postgresql.Driver").newInstance();
//        } catch (Exception e) {
//            System.out.print(e.getMessage());
//        }
//
//        DBInfo connstr = new DBInfo();
//        String url = connstr.getUrl();
//        String user = connstr.getUser();
//        String password = connstr.getPassword();
//
//        try {
//            conn = DriverManager.getConnection(url, user, password);
//
//            String sql = "insert into work.answers" +
//                    "(admbh, qtbh, qtnum, answer) " +
//                    " values(?, ?, ?,  ?)";
//            pst = conn.prepareStatement(sql);
//            pst.setString(1, admbh);
//            pst.setString(2, qtbh);
//            pst.setInt(3, qtnum);
//            pst.setString(4, answer);
//            pst.executeUpdate();
//            dataShop.setSuccess(true);
//
//        } catch (SQLException e) {
//            System.out.print(e.getMessage());
//        } finally {
//            try {
//                if (pst != null) pst.close();
//                if (conn != null) conn.close();
//            } catch (SQLException e) {
//                System.out.print(e.getMessage());
//            }
//        }
//        return dataShop;
//    }
    public String printWelcome() {
        return "main_exam_score";
    }
}