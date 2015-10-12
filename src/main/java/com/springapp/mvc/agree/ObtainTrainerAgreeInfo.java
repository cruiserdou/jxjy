package com.springapp.mvc.agree;

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
@RequestMapping("/obtain_trainers_agree_info")
public class ObtainTrainerAgreeInfo {

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


//            int i_num_tj=0;
//            String sql_drvschool = "select  count(1) as num_tj " +
//                    " from work.drvschool WHERE  name='"+s_drvschool+"'";
//
//            rs = stmt.executeQuery(sql_drvschool);
//
//            String sql_trainer="";
//            while (rs.next()) {
//                i_num_tj = rs.getInt(1);
//                if(i_num_tj==0 || rs.getString(1) == null){
//                    sql_trainer = "select * from work.trainer WHERE  1 != 1  ";
//                }else
//                {
//                    sql_trainer = "select * from work.trainer WHERE  scores<60 and drvschool='"+s_drvschool+"'";
//                }
//
//            }
            String   sql_trainer = "select * from work.trainer WHERE  scores<60 ";
            if (name != null && name.length() != 0)
                sql_trainer += " and name like '%" + name + "%'";
            if (card != null && card.length() != 0)
                sql_trainer += " and card like '%" + card + "%'";
            if (status != null && status.length() != 0)
                sql_trainer += " and status like '%" + status + "%'";
            if (drvschool != null && drvschool.length() != 0)
                sql_trainer += " and drvschool like '%" + drvschool + "%'";

            rs = stmt.executeQuery(sql_trainer);

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