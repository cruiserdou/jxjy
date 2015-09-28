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
@RequestMapping("/obtain_trainers_drvschool_info")
public class ObtainDrvschoolTrainerInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "card", required = false) String card,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "drvschool", required = false) String drvschool,
            HttpSession session

  ) throws Exception{
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;



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



            String sql = "select * from work.trainer WHERE status in ('报名') and   pxnum=0 and drvschool='"+s_drvschool+"'  ";
            if (name != null && name.length() != 0)
                sql += " and name like '%" + name + "%'";
            if (card != null && card.length() != 0)
                sql += " and card like '%" + card + "%'";
            if (status != null && status.length() != 0)
                sql += " and status like '%" + status + "%'";
            if (drvschool != null && drvschool.length() != 0)
                sql += " and drvschool like '%" + drvschool + "%'";

            rs = stmt.executeQuery(sql);

            list = new ConvertToList().convertList(rs);

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

        dataShop.setSuccess(true);
        dataShop.setList(list);

        return dataShop;
    }
}