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

@Controller
@RequestMapping("/update_trainer_qtbh_info")
public class UpdateTrainerQtbhInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(


//            @RequestParam("id") Integer id,
            @RequestParam("promisedt") String promisedt,
            @RequestParam("name") String name,
            @RequestParam("sex") String sex,
            @RequestParam("education") String education,
            @RequestParam("card") String card,
            @RequestParam("address") String address,
            @RequestParam("workunit") String workunit,
            @RequestParam("lictype") String lictype,
//            @RequestParam("licdt") String licdt,
            @RequestParam("applytp") String applytp,
//            @RequestParam("qulfnum") String qulfnum,
            @RequestParam("licmd") String licmd,
            @RequestParam("checklist1") String checklist1,
            @RequestParam("checklist2") String checklist2,
            @RequestParam("checklist3") String checklist3,
            @RequestParam("checklist4") String checklist4,
            @RequestParam("checklist5") String checklist5,
            @RequestParam("promise") String promise,
            @RequestParam("status") String status,
            @RequestParam("remark") String remark,
            @RequestParam("licmd_goods") String licmd_goods,
            @RequestParam("pxnum") Integer pxnum,
            @RequestParam("st_tk_dt") String st_tk_dt,
            @RequestParam("end_tk_dt") String end_tk_dt,
            @RequestParam("zq_st_tk_dt") String zq_st_tk_dt,
            @RequestParam("zq_end_tk_dt") String zq_end_tk_dt

            ) throws Exception{
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);
        Connection conn = null;
        PreparedStatement pst = null;
        try {
            Class.forName("org.postgresql.Driver").newInstance();
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }

        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();
        String s_qtbh="";
        try {
            conn = DriverManager.getConnection(url, user, password);

            String sql = "UPDATE work.trainer SET name=?, sex=?, education=?, address=?, workunit=?, " +
                    "       lictype=?, licdt=?, applytp=?, qulfnum=?, licmd=?, " +
                    "       checklist1=?, checklist2=?, checklist3=?, checklist4=?," +
                    "       checklist5=?, promise=?,  status=?, remark=?,promisedt=? ," +
                    "       licmd_goods=?,pxnum=? ," +
                    "   qtbh=(select  qtbh  from work.qt_cont WHERE   lictype=?),st_tk_dt=?, " +
                    "       end_tk_dt=?, zq_st_tk_dt=?, zq_end_tk_dt=? " +
                    " where  card=?";
            pst = conn.prepareStatement(sql);
            pst.setString(1, name);
            pst.setString(2, sex);
            pst.setString(3, education);
            pst.setString(4, address);
            pst.setString(5, workunit);
            pst.setString(6, lictype);
            Date sql_licdt = null;
            pst.setDate(7, sql_licdt);
            pst.setString(8, applytp);
            pst.setString(9, "");
            pst.setString(10, licmd);
            pst.setString(11, checklist1);
            pst.setString(12, checklist2);
            pst.setString(13, checklist3);
            pst.setString(14, checklist4);
            pst.setString(15, checklist5);
            pst.setString(16, promise);
            pst.setString(17, status);
            pst.setString(18, remark);
            Date sql_promisedt = null;
            if (promisedt!= null && promisedt.length() > 2)
                sql_promisedt = Date.valueOf(promisedt);
            pst.setDate(19, sql_promisedt);
            pst.setString(20, remark);
                pst.setString(20, licmd_goods);
            pst.setInt(21, pxnum);
            if(licmd.equals("true")  && licmd_goods.equals("false") &&  checklist1.equals("false") && checklist2.equals("false") ){
                pst.setString(22, "客运");
            }
            if(licmd.equals("false")  && licmd_goods.equals("true") &&  checklist1.equals("false") && checklist2.equals("false") ){
                pst.setString(22, "货运");
            }
            if(licmd.equals("true")  && licmd_goods.equals("true") &&  checklist1.equals("false") && checklist2.equals("false") ){
                pst.setString(22, "客货");
            }
            if(licmd.equals("true")  && licmd_goods.equals("true") &&  checklist1.equals("true") && checklist2.equals("false") ){
                pst.setString(22, "危险品");
            }
            if(licmd.equals("true")  && licmd_goods.equals("false") &&  checklist1.equals("false") && checklist2.equals("true")){
                pst.setString(22, "出租车");
            }

            java.sql.Date sql_st_tk_dt = null;
            if (st_tk_dt!= null && st_tk_dt.length() > 2)
                sql_st_tk_dt = java.sql.Date.valueOf(st_tk_dt);
            pst.setDate(23, sql_st_tk_dt);
            java.sql.Date sql_end_tk_dt = null;
            if (end_tk_dt!= null && end_tk_dt.length() > 2)
                sql_end_tk_dt = java.sql.Date.valueOf(end_tk_dt);
            pst.setDate(24, sql_end_tk_dt);
            java.sql.Date sql_zq_st_tk_dt = null;
            if (zq_st_tk_dt!= null && zq_st_tk_dt.length() > 2)
                sql_zq_st_tk_dt = java.sql.Date.valueOf(zq_st_tk_dt);
            pst.setDate(25, sql_zq_st_tk_dt);
            java.sql.Date sql_zq_end_tk_dt = null;
            if (zq_end_tk_dt!= null && zq_end_tk_dt.length() > 2)
                sql_zq_end_tk_dt = java.sql.Date.valueOf(zq_end_tk_dt);
            pst.setDate(26, sql_zq_end_tk_dt);
            pst.setString(27, card);
            pst.executeUpdate();



            dataShop.setSuccess(true);

        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            try {
                if (pst != null) pst.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                System.out.print(e.getMessage());
            }
        }

        return dataShop;
    }
}