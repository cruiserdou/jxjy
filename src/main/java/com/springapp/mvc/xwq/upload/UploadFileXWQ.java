package com.springapp.mvc.xwq.upload;

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
import java.sql.*;

@Controller
@RequestMapping("/upload_file_xwq")
public class UploadFileXWQ {
    private static final int BUFFER_SIZE = 16 * 1024;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(HttpServletRequest request,
                           @RequestParam("file") MultipartFile file,
                           @RequestParam("card_id") String cust_id
    ) throws Exception {
        DataShop dataShop = new DataShop();

        String projectPath = request.getSession().getServletContext().getRealPath("/static/upload/");

        dataShop.setMessage(file.getOriginalFilename());

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
            String sql_photo = "select photo from work.trainer where card = '" + cust_id + "'";
            pst = conn.prepareStatement(sql_photo);
            ResultSet rs = pst.executeQuery();
            String photo_name = "";
            while (rs.next()) {

                photo_name = rs.getString(1);
            }
            if (photo_name != null && (photo_name.length() > 0)) {


                File annexfile = new File(projectPath + "/" + cust_id + ".jpg");
                if (annexfile.exists()) {
                    annexfile.delete();
                }

                if (!file.isEmpty()) {

                    file.transferTo(new File(projectPath + "/" + cust_id + ".jpg"));
                }
            } else {
                if (!file.isEmpty()) {

                    file.transferTo(new File(projectPath + "/" + cust_id + ".jpg"));
                }
                String sql = "INSERT INTO work.trainer_img (card_id, img, remark) VALUES(?, ?, ?)";

                pst = conn.prepareStatement(sql);
                pst.setString(1, cust_id);
                pst.setString(2, cust_id + ".jpg");
                pst.setString(3, "报名照片");
                pst.executeUpdate();
            }
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
