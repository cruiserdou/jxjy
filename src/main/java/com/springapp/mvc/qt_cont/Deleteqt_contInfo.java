package com.springapp.mvc.qt_cont;

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
@RequestMapping("/delete_qt_cont_info")
public class Deleteqt_contInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
//            @PathVariable String user_id,
            @RequestParam("id") Integer id
            ) throws Exception{
        DataShop dataShop = new DataShop();
        Connection conn = null;
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

        try {
            conn = DriverManager.getConnection(url, user, password);
            String sql = "select count(*) recordNum from work.qt_cont where id = '"+id+"'";
            pst = conn.prepareStatement(sql);
            rs = pst.executeQuery();
            while(rs.next()){
                int rownum = rs.getInt("recordNum");
                if(rownum != 1){
                    sql = "delete from work.qt_cont where id = '"+id+"'";
                    pst = conn.prepareStatement(sql);
                    pst.executeUpdate();
                    dataShop.setSuccess(true);
                }
                else{
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
//        dataShop.setName(user_id);

        return dataShop;
    }
}