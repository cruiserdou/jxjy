package com.springapp.mvc.questions;

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
@RequestMapping("/update_questions_info")
public class UpdateQuestionsInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam("qtbh") String qtbh,
            @RequestParam("qtnum") Integer qtnum,
            @RequestParam("question") String question,
            @RequestParam("type") Integer type,
            @RequestParam("answer") String answer,
            @RequestParam("qt_a") String qt_a,
            @RequestParam("qt_b") String qt_b,
            @RequestParam("qt_c") String qt_c,
            @RequestParam("qt_d") String qt_d,
            @RequestParam("score") float score,
            @RequestParam("remark") String remark,
            @RequestParam("id") Integer id

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

            String sql = "update work.questions set " +
                    "qtbh=?, qtnum=?, question=?, type=?, answer=?, score=?, " +
                    " qt_a=?, qt_b=?, qt_c=?, qt_d=?,remark=?" +
                    "where id = ? ";
            pst = conn.prepareStatement(sql);
            pst.setString(1, qtbh);
            pst.setInt(2, qtnum);
            pst.setString(3, question);
            pst.setInt(4, type);
            pst.setString(5, answer);
            pst.setFloat(6, score);
            pst.setString(7, qt_a);
            pst.setString(8, qt_b);
            pst.setString(9, qt_c);
            pst.setString(10, qt_d);
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