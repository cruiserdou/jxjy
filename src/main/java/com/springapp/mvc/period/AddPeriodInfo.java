package com.springapp.mvc.period;

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
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;

@Controller
@RequestMapping("/add_period_info")
public class AddPeriodInfo {

    @RequestMapping( method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam("period_count") Integer period_count,
            @RequestParam("status") String status,
            @RequestParam(value = "period_remark",required = false) String period_remark,
            HttpSession session

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


            Timestamp period_time=new Timestamp(System.currentTimeMillis());
            String period_person=(String)session.getAttribute("user");
//            System.out.println(period_time+" "+period_person);
            String sql = "insert into work.period\n" +
                    "     ( period_count, period_person, period_time,  period_remark, status)\n" +
                    "     values(?, ?,?,?,?)";
            pst = conn.prepareStatement(sql);
            pst.setInt(1, period_count);
            pst.setString(2, period_person);
            pst.setTimestamp(3, period_time);
            pst.setString(4, period_remark);
            pst.setString(5,status);
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