package com.springapp.mvc.examinees;


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
@RequestMapping("/add_exam_info")
public class AddExamInfo {

    private static final int BUFFER_SIZE = 768 * 1024;
    @RequestMapping( method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
            @RequestParam("name") String name,
            @RequestParam("sex") String sex,
            @RequestParam("card") String card,
            @RequestParam("address") String address,
            @RequestParam("lictype") String lictype,
            @RequestParam("licdt") String licdt,
            @RequestParam("licmd") String licmd,
            @RequestParam("remark") String remark,

            @RequestParam(value = "file", required = false) MultipartFile file

    ) throws Exception{
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
                    "(name, sex, card, address, lictype, licdt, licmd,photo, remark) " +
                    " values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
            pst.setString(8, file.getName());
            pst.setString(9, remark);
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