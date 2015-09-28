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

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Controller
@RequestMapping("/add_many_period_info")
public class AddManyPeriodInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam("id_list") String id_list,
            @RequestParam("maxperiod") Integer period_count

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

//            System.out.println("lllllllll");
            String[] BH_i = id_list.split(",");
            int n=BH_i.length;
//            System.out.println(n+"lllllllll");
            for(int i=1; i<n; i++) {
//                System.out.println(BH_i[i]+" "+period_count);
                String sql = "update work.trainer  set pxnum=? where id=?";
                pst = conn.prepareStatement(sql);
                pst.setInt(1, period_count);
                pst.setInt(2, Integer.parseInt(BH_i[i]));
            pst.executeUpdate();}



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