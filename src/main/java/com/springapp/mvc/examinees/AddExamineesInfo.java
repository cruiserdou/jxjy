package com.springapp.mvc.examinees;

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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Controller
@RequestMapping("/add_examinees_info")
public class AddExamineesInfo {
    private static final int BUFFER_SIZE = 16 * 1024;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value ="name", required = false) String name,
            @RequestParam(value ="sex", required = false) String sex,
            @RequestParam(value ="card" , required = false) String card,
            @RequestParam(value ="address" , required = false) String address,
            @RequestParam(value ="lictype" , required = false) String lictype,
            @RequestParam(value ="licdt" , required = false) String licdt,
            @RequestParam(value ="licmd" , required = false) String licmd,
//            @RequestParam(value ="status" , required = false) String status,
            @RequestParam(value ="remark", required = false) String remark
    ) throws Exception {
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);

        if (!file.isEmpty()) {
            String projectPath = request.getSession().getServletContext().getRealPath("/static/upload/");
            file.transferTo(new File(projectPath + "/" + file.getOriginalFilename()));
        }

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

        try {
            conn = DriverManager.getConnection(url, user, password);


            String sql = "insert into work.examinees" +
                    "(name, sex, card, address, lictype, licdt, licmd,photo,status, remark) " +
                    " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            pst = conn.prepareStatement(sql);
            pst.setString(1, name);
            pst.setString(2, sex);
            pst.setString(3, card);
            pst.setString(4, address);
            pst.setString(5, lictype);
            java.sql.Date sql_licdt = null;
            if (licdt!= null && licdt.length() > 2)
                sql_licdt = java.sql.Date.valueOf(licdt);
            pst.setDate(6, sql_licdt);
            pst.setString(7, licmd);
            pst.setString(8, file.getOriginalFilename());
            pst.setString(9, "培训");
            pst.setString(10, remark);


            pst.executeUpdate();

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
