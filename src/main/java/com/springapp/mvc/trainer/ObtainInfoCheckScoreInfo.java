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
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.sql.*;
import java.util.*;

@Controller
@RequestMapping("/obtain_infocheck_score")
public class ObtainInfoCheckScoreInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
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

        try{
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();
            ResultSet rs_tj = null;
            int i_wrong=0;
            int i_right=0;
            int i_no=50;
            String sql_tj = "select coalesce(sum(case when result=0 then 1 else 0 end),0) as wrong  , coalesce(sum(case when result=2 then 1 else 0 end),0) as right\n" +
                    " from work.answers answers,work.trainer trainer " +
                    " where  admbh=trainer.card  and answers.qtbh=trainer.qtbh and  trainer.id ="+session.getAttribute("id").toString();

            rs_tj = stmt.executeQuery(sql_tj);
            while (rs_tj.next()) {
                i_wrong = rs_tj.getInt(1);
                i_right = rs_tj.getInt(2);
                i_no=i_no-i_wrong-i_right;
            }

            String sql = "select id,qtbh, name, sex, education, card, address, workunit, drvschool, \n" +
                    "       lictype, licdt, applytp, qulfnum," +
                    " case when (licmd!='' and licmd_goods='')   then licmd when (licmd='' and licmd_goods!='') then licmd_goods else licmd||licmd_goods  end as  licmd" +
                    " , checklist1, promise, photo, status,  case  when ks_stat in  (0,1)   then '初试'  else '补考' end  as ks_status," +
                    "   remark,scores, case when scores>60 then '及格' when scores>=0 and scores<60 then '不及格' else '缺考' end as result" +
                    "  ,"+i_right+" as right ,"+i_wrong+" as wrong, "+i_no+" as no " +
                    " from work.trainer trainer where   trainer.id ="+session.getAttribute("id").toString();

            rs = stmt.executeQuery(sql);

            list = new ConvertToList().convertList(rs);


        }
        catch (SQLException e){
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