package com.springapp.mvc.orders;

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

import java.sql.*;

@Controller
@RequestMapping("/add_orders_info")
public class AddOrdersInfo {

    @RequestMapping( method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam(value = "id", required = false)String id,
            @RequestParam(value ="examks" , required = false) String examks,
            @RequestParam(value ="examjs" , required = false) String examjs


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

            String sql_order_old = "delete from  work.orders";
            pst = conn.prepareStatement(sql_order_old);
            pst.executeUpdate();

            String sql = "insert into work.orders (examks,examjs)  values(?,?)";
            pst = conn.prepareStatement(sql);
            Timestamp t_examks = Timestamp.valueOf(examks);
            Timestamp t_examjs = Timestamp.valueOf(examjs);
            pst.setTimestamp(1, t_examks);
            pst.setTimestamp(2, t_examjs);
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