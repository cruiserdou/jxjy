package com.springapp.mvc.trainer;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import com.xwq.common.util.ConvertToList;
import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/obtain_trainers_info")
public class ObtainTrainerInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "card", required = false) String card,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "drvschool", required = false) String drvschool,
            HttpSession session

  ) throws Exception{
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        ResultSet rs_drvschool = null;



        DataShop dataShop = new DataShop();
        List list = new ArrayList();

        try{
            Class.forName("org.postgresql.Driver").newInstance();
        }catch (Exception e){
            System.out.print(e.getMessage());
        }
        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();
        String s_drvschool = session.getAttribute("user").toString();
        try{
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();
            String sql_d = "";
            String sql_s = "";
            String sql_c = "";
            Boolean b_check=false;

            int i_num_tj=0;
            String sql_drvschool = "select  count(1) as num_tj " +
                    " from work.drvschool WHERE  name='"+s_drvschool+"'";

            rs_drvschool = stmt.executeQuery(sql_drvschool);

            while (rs_drvschool.next()) {
                i_num_tj = rs_drvschool.getInt(1);
                if(i_num_tj==0 || rs_drvschool.getString(1) == null){
                    sql_d = "select * from work.trainer WHERE  1 = 1 and pxnum=0  ";
                    sql_c = "select count(*) from work.trainer WHERE  1 = 1 and pxnum=0  ";
                }else
                {
                    sql_d = "select * from work.trainer WHERE drvschool='"+s_drvschool+"' and pxnum=0  ";
                    sql_c = "select count(*) from work.trainer   WHERE drvschool='"+s_drvschool+"' and pxnum=0  ";
                }
            }

            if (name != null && name.length() != 0){
                sql_s += " and name like '%" + name + "%'";
                b_check=true;
            }
            if (status != null && status.length() != 0){
                sql_s += " and status like '%" + status + "%'";
                b_check=true;
            }
            if (card != null && card.length() != 0){
                sql_s += " and card like '%" + card + "%'";
                b_check=true;
            }
            if (drvschool != null && drvschool.length() != 0){
                sql_s += " and drvschool like '%" + drvschool + "%'";
                b_check=true;
            }
            sql_c += sql_s;

            sql_d += sql_s;
            if( !b_check==true)
                sql_d += " limit " + limit + " offset " + start;

            rs = stmt.executeQuery(sql_d);
            list = new ConvertToList().convertList(rs);

            rs = stmt.executeQuery(sql_c);
            while (rs.next())
                dataShop.setTotal(rs.getInt(1));

        }catch (SQLException e){
            System.out.print(e.getMessage());
        }finally {
            try{
                if (rs_drvschool != null) rs_drvschool.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            }catch (SQLException e){
                System.out.print(e.getMessage());
            }
        }

        dataShop.setSuccess(true);
        dataShop.setList(list);

        return dataShop;
    }
}