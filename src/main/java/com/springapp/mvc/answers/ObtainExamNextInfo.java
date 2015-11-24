package com.springapp.mvc.answers;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.sql.*;
import java.util.Random;

@Controller
@RequestMapping("/obtain_exam_next_info")
public class ObtainExamNextInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpSession session

    ) throws Exception{
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        ResultSet rs_kt = null;
        PreparedStatement pst = null;

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
            int i_kt_sum=0;
            int i_begin=0;

            String sql_kt_sum = "select count(*) as num  from   work.questions where qtbh= (select qtbh from work.trainer where card= '"+session.getAttribute("card").toString()+"')";
            rs_kt = stmt.executeQuery(sql_kt_sum);
            while (rs_kt.next()) {
                i_kt_sum = rs_kt.getInt(1);
            }

            String sql = "select ks_stat,begin  from   work.trainer where card= '"+session.getAttribute("card").toString()+"'";
            rs = stmt.executeQuery(sql);
            int number=1;
            while (rs.next()) {
                i_num_tj = rs.getInt(1);
                i_begin= rs.getInt(2);
            }
            if (rs != null) rs.close();

            if(i_num_tj==0 || i_num_tj==2){

                if(i_begin==0) {
                    String sql_delete_kt = "update work.tb_exam_random_kt set  status=0  where admbh = ? and  id =(select max(id) from work.tb_exam_random_kt where admbh  =? )";
                    pst = conn.prepareStatement(sql_delete_kt);
                    pst.setString(1, session.getAttribute("card").toString());
                    pst.setString(2, session.getAttribute("card").toString());
                    pst.executeUpdate();

                    String sql_delete_an = "delete from work.answers where admbh = ?";
                    pst = conn.prepareStatement(sql_delete_an);
                    pst.setString(1, session.getAttribute("card").toString());
                    pst.executeUpdate();

                    for (int i = 1; i <= 50; i++) {
                        if (i == 1) {
                            number = new Random().nextInt(i_kt_sum) + 1;   //这是产生1-150的随机数
                            String sql_insert = "INSERT INTO work.tb_exam_random_kt(  admbh,  qtdt,   qt_num) values(?,?,array[" + number + "])";
                            pst = conn.prepareStatement(sql_insert);
                            pst.setString(1, session.getAttribute("card").toString());
                            java.sql.Date sql_date = new java.sql.Date(new java.util.Date().getTime());
                            pst.setDate(2, sql_date);
                            pst.executeUpdate();
                        } else {

                            boolean isflag = false;

                            for (int g = -1; g < 0; ) {
                                number = new Random().nextInt(i_kt_sum) + 1;   //这是产生1-150的随机数
                                ResultSet rs_check = null;
                                String sql_check = "SELECT  " + number + " = ANY(qt_num) FROM work.tb_exam_random_kt where  status=1 and admbh = '" + session.getAttribute("card").toString() + "'";

                                rs_check = stmt.executeQuery(sql_check);
                                while (rs_check.next()) {
                                    isflag = rs_check.getBoolean(1);
                                }
                                if (rs_check != null) rs_check.close();

                                if (isflag != false) {
                                    g = -1;
                                } else {
                                    g = 1;
                                }
                            }
                            String sql_update = "update work.tb_exam_random_kt set  qt_num = qt_num||" + number + "  where status=1 and  admbh = ? ";
                            pst = conn.prepareStatement(sql_update);
                            pst.setString(1, session.getAttribute("card").toString());
                            pst.executeUpdate();
                        }
                    }
                    String sql_update_begin = "update work.trainer set  begin=1  where card=? ";
                    pst = conn.prepareStatement(sql_update_begin);
                    pst.setString(1, session.getAttribute("card").toString());
                    pst.executeUpdate();
                }
                dataShop.setSuccess(true);
            }else
            {
                dataShop.setSuccess(false);
            }


        }catch (SQLException e){
            System.out.print(e.getMessage());
        }finally {
            try{

                if (stmt != null) stmt.close();
                if (conn != null) conn.close();

            }catch (SQLException e){
                System.out.print(e.getMessage());
            }
        }


        return dataShop;
    }
}