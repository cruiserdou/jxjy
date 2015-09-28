package com.springapp.mvc.examinees.ZKZ;

import com.xwq.common.model.DataShop;
import com.xwq.common.util.DBInfo;
import org.apache.poi.POIXMLDocument;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.sql.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/print_examdoc_info")
public class ExportDocExamcard_new {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
            @RequestParam(value = "card", required = false) String card
    ) throws Exception{
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        String ServerPath = request.getSession().getServletContext().getRealPath("/static/upload/");
        DataShop dataShop = new DataShop();
        String destFile="";
        String tempFile="";
        String srcPath=ServerPath+"/X1.docx";
        String fileName="";

        Map<String, String> map=new HashMap<String, String>();
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

            String sql = "SELECT id, name, sex, education, card, address, workunit, drvschool, \n" +
                    "       lictype, licdt, applytp, qulfnum, licmd, checklist1, promise, \n" +
                    "       photo, status, remark, checklist2, checklist3, checklist4, checklist5, \n" +
                    "       scores, qtbh, licmd_goods " +
                    "  FROM work.trainer where card='"+card+"'";

            rs = stmt.executeQuery(sql);
            Map<String, Object> param = new HashMap<String, Object>();

            ResultSetMetaData md = rs.getMetaData();
            int columnCount = rs.getMetaData().getColumnCount();
            while (rs.next())
            {
//                for (int i = 1; i < columnCount; i++) {
//                    map.put(md.getColumnName(i), rs.getString( i ));
//                }
                param.put("${name}", rs.getString( 2 ));
                param.put("${sex}", rs.getString( 3 ));
                param.put("${education}", rs.getString( 4 ));
                param.put("${card}", rs.getString( 5 ));
                fileName=rs.getString( 5 );
                param.put("${address}", rs.getString( 6 ));
                param.put("${workunit}", rs.getString( 7 ));
                param.put("${drvschool}", rs.getString( 8 ));
                param.put("${lictype}", rs.getString( 9 ));
//                param.put("${licdt}", rs.getString( 10 ));
            }

            tempFile=ServerPath+ "/" +fileName+"tmp.docx";
            destFile=ServerPath+ "/" +fileName+".docx";


            Map<String,Object> header = new HashMap<String, Object>();
            header.put("width", 100);
            header.put("height", 150);
            header.put("type", "jpg");
            header.put("content", WordUtil.inputStream2ByteArray(new FileInputStream("/home/jj/share/test.jpg"), true));
            param.put("${header}",header);


            CustomXWPFDocument doc = null;
            try {
                OPCPackage pack = POIXMLDocument.openPackage(srcPath);
                doc = new CustomXWPFDocument(pack);
                if (param != null && param.size() > 0) {
                    //处理表格
                    Iterator<XWPFTable> it = doc.getTablesIterator();
                    while (it.hasNext()) {
                        XWPFTable table = it.next();
                        List<XWPFTableRow> rows = table.getRows();
                        for (XWPFTableRow row : rows) {
                            List<XWPFTableCell> cells = row.getTableCells();
                            for (XWPFTableCell cell : cells) {
                                List<XWPFParagraph> paragraphListTable =  cell.getParagraphs();
                                if(paragraphListTable != null && paragraphListTable.size() > 0){
                                    for(XWPFParagraph paragraph:paragraphListTable){
                                        List<XWPFRun> runs = paragraph.getRuns();
                                        String text="";
                                        for (XWPFRun run : runs) {
                                            text = run.getText(0);
                                            if(text != null){
                                                boolean isSetText = false;
                                                for (Map.Entry<String, Object> entry : param.entrySet()) {
                                                    String key = entry.getKey();
                                                    if(text.indexOf(key) != -1){
                                                        isSetText = true;
                                                        Object value = entry.getValue();
                                                        if (value instanceof String) {//文本替换
                                                            text = text.replace(key, value.toString());
                                                        }
                                                    }
                                                }
                                                if(isSetText){
                                                    run.setText(text,0);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            FileOutputStream fopts = new FileOutputStream(tempFile);
            doc.write(fopts);
            fopts.close();

            try {
                OPCPackage pack = POIXMLDocument.openPackage(tempFile);
                doc = new CustomXWPFDocument(pack);
                if (param != null && param.size() > 0) {
                    //处理表格
                    Iterator<XWPFTable> it = doc.getTablesIterator();
                    while (it.hasNext()) {
                        XWPFTable table = it.next();
                        List<XWPFTableRow> rows = table.getRows();
                        for (XWPFTableRow row : rows) {
                            List<XWPFTableCell> cells = row.getTableCells();
                            for (XWPFTableCell cell : cells) {
                                List<XWPFParagraph> paragraphListTable =  cell.getParagraphs();
                                if(paragraphListTable != null && paragraphListTable.size() > 0){
                                    for(XWPFParagraph paragraph:paragraphListTable){
                                        List<XWPFRun> runs = paragraph.getRuns();
                                        String text="";
                                        for (XWPFRun run : runs) {
                                            text = run.getText(0);
                                            if(text != null){
                                                boolean isSetText = false;
                                                for (Map.Entry<String, Object> entry : param.entrySet()) {
                                                    String key = entry.getKey();
                                                    if(text.indexOf(key) != -1){
                                                        isSetText = true;
                                                        Object value = entry.getValue();
                                                        if  (value instanceof Map) {//图片替换
                                                            text = text.replace(key, "");
                                                            Map pic = (Map)value;
                                                            int width = Integer.parseInt(pic.get("width").toString());
                                                            int height = Integer.parseInt(pic.get("height").toString());
                                                            int picType = CustomXWPFDocument.PICTURE_TYPE_JPEG;
                                                            byte[] byteArray = (byte[]) pic.get("content");
                                                            ByteArrayInputStream byteInputStream = new ByteArrayInputStream(byteArray);
                                                            try {
                                                                String ind = doc.addPictureData(byteInputStream, picType);
                                                                doc.createPicture(doc.getAllPictures().size()-1,width  , height, paragraph);

                                                            } catch (Exception e) {
                                                                e.printStackTrace();
                                                            }
                                                        }
                                                    }
                                                }
                                                if(isSetText){
                                                    run.setText(text,0);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            FileOutputStream fopt = new FileOutputStream(destFile);
            doc.write(fopt);
            fopt.close();



            dataShop.setSuccess(true);

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
        return dataShop;
    }

}
