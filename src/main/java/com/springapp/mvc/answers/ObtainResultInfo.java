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
@RequestMapping("/obtain_result_list_info")
public class ObtainResultInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam(value = "admbh", required = false) String admbh,
            @RequestParam(value = "qtbh", required = false) String qtbh
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

            String sql = " select distinct admbh ,work.answers.qtbh,(select count(result) from    work.answers  WHERE admbh='"+admbh+"'  and qtbh='"+qtbh+"' and result>0)as right ,\n" +
                    " (select count(result) from    work.answers  WHERE admbh='"+admbh+"'  and qtbh='"+qtbh+"' and result=0)as wrong,\n" +
                    "  (select 100-count(result) from    work.answers  WHERE admbh='"+admbh+"'  and qtbh='"+qtbh+"')as no,\n" +
                    "  scores as score,case when scores>60 then '及格' else '不及格' end as result " +
                    " from  work.answers  ,work.trainer\n" +
                    " WHERE  work.answers.admbh= work.trainer.card and admbh='"+admbh+"'  and work.answers.qtbh='"+qtbh+"' ";

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