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
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/obtain_countf_info")
public class ObtainCountfInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
//            @RequestParam(value = "name", required = false) String name
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

            String sql = "select school.name ,\n" +
                    "                    CAST ( (select count(*) from  work.trainer \n" +
                    "                             where school.name= work.trainer.drvschool  )as decimal ( 10, 2))  as num_count,\n" +
                    "                    CAST ( (select count(*) from  work.trainer \n" +
                    "                    where school.name= work.trainer.drvschool and scores>0 )as decimal ( 10, 2))  as num_qual,\n" +
                    "                    CAST ( (select count(*) from  work.trainer \n" +
                    "                    where school.name= work.trainer.drvschool and scores=0 )as decimal ( 10, 2))  as num_unqual,\n" +
                    "                    CAST ( \n" +
                    "                           CAST ( (select count(*) from  work.trainer \n" +
                    "                    where school.name= work.trainer.drvschool  and \n" +
                    "                    scores>0)as decimal ( 10, 2)) \n" +
                    "                    / " +
                    "                    case when  CAST ((select count(*)   from  work.trainer \n" +
                    "                                       where school.name= work.trainer.drvschool )as decimal ( 10, 2)) >0 then \n" +
                    "                                        CAST ((select count(*)   from  work.trainer \n" +
                    "                                       where school.name= work.trainer.drvschool )as decimal ( 10, 2))  else\n" +
                    "                                       1 end " +
                    "                    as decimal ( 10, 2))  as num_percent,\n" +
                    "                     CAST ( (select count(*) from  work.trainer \n" +
                    "                             where school.name= work.trainer.drvschool  and ks_stat='1')as decimal ( 10, 2))  as num_makeup\n" +
                    "                    from   work.drvschool school  \n" +
                    "                    group by school.name";
//            if (name != null && name.length() != 0)
//                sql += " and name like '%" + name + "%'";

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