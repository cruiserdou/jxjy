package com.springapp.mvc.trainer;

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

@SuppressWarnings("unchecked")
@Controller
@RequestMapping("/check_refer_trainer_info")
public class CheckReferTrainerInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam(value = "s_id") String s_id
    ) throws Exception{
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        DataShop dataShop = new DataShop();

        try{
            Class.forName("org.postgresql.Driver").newInstance();
        }catch (Exception e){
            System.out.print(e.getMessage());
        }
        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();
        try{
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();
            int i_num_tj=0;
            s_id = s_id.substring(1,s_id.length());
            String[] KS_i = s_id.split(",");
            int n=KS_i.length;

                String sql = "select count(1) from work.trainer trainer ,  work.period period " +
                        "where period.period_count=trainer.pxnum and period.status='未开班' " +
                        "and trainer.id in (" + s_id+ ")";

            rs = stmt.executeQuery(sql);


            while (rs.next()) {
                i_num_tj = rs.getInt(1);
                if(i_num_tj!=n ||i_num_tj==0 || rs.getString(1) == null){
                    dataShop.setSuccess(false);

                }else
                {
                    dataShop.setSuccess(true);
                }
            }


        }catch (SQLException e){
            System.out.print(e.getMessage());
        }finally {
            try{
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            }catch (SQLException e){
                System.out.print(e.getMessage());
            }
        }



        return dataShop;
    }
}