package com.springapp.mvc.questions;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import com.xwq.common.util.DBInfo;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Controller
@RequestMapping("/import_questions_info")
public class ImportQuestionInfo {
    private static final int BUFFER_SIZE = 16 * 1024;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
                           @RequestParam(value = "file", required = false) MultipartFile file,
                           @RequestParam(value = "qtbh" , required = false) String qtbh
    ) throws Exception {
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);

        Connection conn = null;
        PreparedStatement pst = null;
        String projectPath = request.getSession().getServletContext().getRealPath("/static/upload/");
        String src_file = null;
        if (!file.isEmpty()) {

            file.transferTo(new File(projectPath + "/" + file.getOriginalFilename()));
        }
       src_file=projectPath+'/'+file.getOriginalFilename();
        try {
            Class.forName("org.postgresql.Driver").newInstance();
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }

        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();

        try{
            FileInputStream fin=new FileInputStream(src_file);
            HSSFWorkbook workbook=new HSSFWorkbook(fin);
            HSSFSheet sheet=workbook.getSheetAt(0);
            HSSFRow row=null;
            HSSFCell cell=null;

            int totalRow=sheet.getLastRowNum();

            String qtnum = "";
            String question = "";
            String type = "";
            String answer = "";
            double score = 0.0d;
            String remark = "";
            String qt_a = "";
            String qt_b = "";
            String qt_c = "";
            String qt_d = "";

            conn = DriverManager.getConnection(url, user, password);
            String sql = "INSERT INTO work.questions( qtbh, qtnum, question, type,  qt_a,  qt_b, qt_c, qt_d,answer, score, remark)"+
                    " values(?,?,?,?,?,?,?,?,?,?,?)";
            for(int i=1;i<=totalRow;i++){
                row = sheet.getRow(i);
                cell = row.getCell(2);
                qtnum=cell.getRichStringCellValue().toString();
                cell = row.getCell(3);
                question = cell.getRichStringCellValue().toString();
                cell = row.getCell(2);
                type = cell.getRichStringCellValue().toString();
                cell = row.getCell(5);
                qt_a = cell.getRichStringCellValue().toString();
                cell = row.getCell(6);
                qt_b = cell.getRichStringCellValue().toString();
                cell = row.getCell(7);
                qt_c = cell.getRichStringCellValue().toString();
                cell = row.getCell(8);
                qt_d = cell.getRichStringCellValue().toString();
                cell = row.getCell(9);
                answer = cell.getRichStringCellValue().toString();
                cell = row.getCell(10);
                score = cell.getNumericCellValue();
                cell = row.getCell(11);
                remark = cell.getRichStringCellValue().toString();

                pst=conn.prepareStatement(sql);
                pst.setString(1,qtbh);
                pst.setInt(2,Integer.parseInt(qtnum));
                pst.setString(3,question);
                pst.setInt(4,Integer.parseInt(type));
                pst.setString(5,qt_a);
                pst.setString(6,qt_b);
                pst.setString(7,qt_c);
                pst.setString(8,qt_d);
                pst.setString(9,answer);
                pst.setDouble(10,score);
                pst.setString(11,remark);
                pst.executeUpdate();
           }

        } catch (FileNotFoundException e) {

            e.printStackTrace();
        } catch(IOException ex){
            ex.printStackTrace();
        } catch(SQLException exx){
            exx.printStackTrace();
        } finally{
            try {
                if (pst != null) pst.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return dataShop;
    }
}
