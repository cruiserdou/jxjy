package com.springapp.mvc;

import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.sql.*;

@Controller
@RequestMapping("/ks")
public class Ks {
    @RequestMapping(method = RequestMethod.POST)
    public ModelAndView toMainpage(
            HttpSession session,
            @RequestParam(value = "account", required = false) String account
    ) {
        ModelAndView modelAndView = new ModelAndView();

        String session_user = "";
        String session_pass = "";
        if (session.getAttribute("account") != null)
            session_user = session.getAttribute("account").toString();
        else
            session_user = null;


        //数据库取出用户信息比对获取浏览器发送的信息
        Connection conn = null;
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
        try {
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();

            String sql = "select card,name,id from work.trainer where " +
                    " status = '同意考试' and card = '" + account + "'";

            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                if (rs.getString(1).equals(account)) {
                    session.setAttribute("card", rs.getString(1));
                    session.setAttribute("user", rs.getString(2));
                    session.setAttribute("id", rs.getString(3));
                    modelAndView.setViewName("main_examinee");
                    return modelAndView;
                }
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

        modelAndView.setViewName("index");
        return modelAndView;
    }
}