package com.springapp.mvc.drvschool;

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
@RequestMapping("/obtain_drvschool_info")
public class ObtainDrvschoolInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpSession session,
            @RequestParam(value = "name", required = false) String name
    ) throws Exception{
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        ResultSet rs_drvschool = null;

        DataShop dataShop = new DataShop();
        List list = new ArrayList();
        String s_drvschool = session.getAttribute("user").toString();
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
            String sql_drvschool = "select  count(1) as num_tj " +
                    " from work.drvschool WHERE  name='"+s_drvschool+"'";

            rs_drvschool = stmt.executeQuery(sql_drvschool);
            String sql ="";
            while (rs_drvschool.next()) {
                i_num_tj = rs_drvschool.getInt(1);
                if(i_num_tj==0 || rs_drvschool.getString(1) == null){
                    sql = "select * from work.drvschool WHERE 1 = 1   ";
                }else
                {
                    sql = "select * from work.drvschool WHERE  name='"+s_drvschool+"'";
                }
            }

            if (name != null && name.length() != 0)
                sql += " and name like '%" + name + "%'";
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