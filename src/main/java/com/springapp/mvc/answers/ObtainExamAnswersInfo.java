package com.springapp.mvc.answers;

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

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/obtain_examanswers_info")
public class ObtainExamAnswersInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam(value = "admbh", required = false) String admbh
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
        try{
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();

            String sql = "select tra.name ,tra.card ,qtnum,   \n" +
                    "  case when ans.answer='false' then '×' when ans.answer='true' then '√'  else   ans.answer end as answer ,   \n" +
                    "  case when ans.result=0 then '×' else '√' end   as result    \n" +
                    "  from work.answers  ans, work.trainer tra    \n" +
                    "  WHERE ans.admbh=tra.card  and ans.qtbh=tra.qtbh  \n" +
                    "   and 1 = 1 ";
            if (admbh != null && admbh.length() != 0)
                sql += " and ans.admbh like '%" + admbh + "%'";

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