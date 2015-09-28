package com.springapp.mvc.question_list.controller;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.*;

@Controller
@RequestMapping("/obtain_questions_choice_info")
public class ObtainQuestionChoiceInfo {

    @RequestMapping( method = RequestMethod.POST)
    public
    @ResponseBody
    String getShopInJSON(
            @RequestParam(value = "qtbh", required = false) String qtbh,
            @RequestParam(value = "qtnum", required = false) Integer qtnum

    ) throws Exception{


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

        String emaildata = "";
        try {
            conn = DriverManager.getConnection(url, user, password);
            String  question=null;
            String sql = "select question,qt_a,qt_b, qt_c, qt_d from work.questions WHERE qtbh='"+qtbh+"' and qtnum = "+qtnum;

            pst = conn.prepareStatement(sql);
            rs = pst.executeQuery();
            while (rs.next()) {
                question = rs.getString(1);
            }
            if(question == null || question.length()==0){

                return "fail";
            }else {

                return question;
            }
        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                System.out.print(e.getMessage());
            }
        }
        return "fail";
    }

}