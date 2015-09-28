package com.springapp.mvc;

import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/print_score_n")
public class PrintScore_N {
	@RequestMapping(method = RequestMethod.GET)
	public String printWelcome(ModelMap model
//                               @RequestParam(value = "card", required = true)String card

    ) {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;



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



            String sql = "select name, sex, education, card, address, workunit, drvschool, \n" +
                    "            lictype, licdt, applytp, qulfnum, licmd, checklist1, promise, \n" +
                    "            photo, status, remark,  \n" +
                    "            scores, qtbh, licmd_goods, pxnum, ks_stat from work.trainer" +
                    "            where status='同意考试' and  scores>=0     ";

            rs = stmt.executeQuery(sql);
//            List<Map<String,String>> list = new ArrayList<Map<String,String>>();

            while(rs.next()) {
                Map map = new HashMap();
//                map.put("name",rs.getString( "name" ));
//                map.put("sex",rs.getString( "sex" ));
//                map.put("card",rs.getString( "card" ));
//                map.put("address",rs.getString( "address" ));
//                map.put("drvschool",rs.getString( "drvschool" ));
//                map.put("lictype",rs.getString( "lictype" ));
//                map.put("licdt",rs.getString( "licdt" ));
//                map.put("scores",rs.getString( "scores" ));
//                map.put("photo",rs.getString( "photo" ));
//                map.put("licmd",rs.getString( "licmd" ));

                model.addAttribute("name", rs.getString( "name" ));
                model.addAttribute("sex", rs.getString( "sex" ));
                model.addAttribute("card", rs.getString( "card" ));
                model.addAttribute("address", rs.getString( "address" ));
                model.addAttribute("drvschool", rs.getString( "drvschool" ));
                model.addAttribute("lictype", rs.getString( "lictype" ));
                model.addAttribute("licdt", rs.getString( "licdt" ));
                model.addAttribute("scores", rs.getString( "scores" ));
                model.addAttribute("photo", rs.getString( "photo" ));
                model.addAttribute("licmd", rs.getString( "licmd" ));
            }

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

		return "print_score_n";
	}
}