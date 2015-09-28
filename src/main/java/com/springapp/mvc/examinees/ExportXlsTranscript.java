package com.springapp.mvc.examinees;

import com.xwq.common.model.DataShop;
import com.xwq.common.util.DBInfo;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.Region;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.*;
import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping("/print_trsptxls_info")
public class ExportXlsTranscript {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
            @RequestParam(value = "id", required = false) Integer id,
            @RequestParam(value = "fileName", required = false) String fileName
    ) throws Exception{
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

            DataShop dataShop = new DataShop();

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
            String projectPath_target = request.getSession().getServletContext().getRealPath("/static/upload/");
//            String projectPath_target ="/home/jj/share/";

            String sql = "select distinct name ,name,card,qtbh," +
                    " case when ks_stat='0' then '初试' else '补考' end as  ks_stats,scores,sex," +
                    " lictype,drvschool,photo " +
                    " from work.trainer where id="+id;


            rs = stmt.executeQuery(sql);
            while(rs.next()) {
            HSSFWorkbook workbook=new HSSFWorkbook();
            HSSFSheet sheet=workbook.createSheet("成绩单");
             String s_photo_file =  rs.getString( 10);
            BufferedImage bufferImg = null;

            HSSFCellStyle style0 = workbook.createCellStyle();
            HSSFFont font0 = workbook.createFont();
            font0.setBoldweight((short) 16);
            font0.setFontHeightInPoints((short) 16);
//            font0.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            style0.setFont(font0);
            style0.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            style0.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);


            HSSFCellStyle style1 = workbook.createCellStyle();
            style1.setBorderBottom(HSSFCellStyle.BORDER_THIN);
            style1.setBorderLeft(HSSFCellStyle.BORDER_THIN);
            style1.setBorderRight(HSSFCellStyle.BORDER_THIN);
            style1.setBorderTop(HSSFCellStyle.BORDER_THIN);
            HSSFFont font1 = workbook.createFont();
            font1.setBoldweight((short) 11);
            font1.setFontHeightInPoints((short) 11);
            style1.setFont(font1);
            style1.setWrapText(true);
            style1.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            style1.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);


            HSSFCellStyle style2 = workbook.createCellStyle();
            style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
            style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
            style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
            style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
            HSSFFont font2 = workbook.createFont();
            font2.setBoldweight((short) 10);
            font2.setFontHeightInPoints((short) 10);
            style2.setFont(font2);
            style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);


                HSSFCellStyle style3 = workbook.createCellStyle();
                style3.setBorderBottom(HSSFCellStyle.BORDER_THIN);
                style3.setBorderLeft(HSSFCellStyle.BORDER_THIN);
                style3.setBorderRight(HSSFCellStyle.BORDER_THIN);
                style3.setBorderTop(HSSFCellStyle.BORDER_THIN);

                HSSFRow row1 = sheet.createRow((short) 0);
                row1.setHeight((short) 600);
                HSSFRow row2 = sheet.createRow((short) 1);
                row2.setHeight((short) 380);
                HSSFRow row3 = sheet.createRow((short) 2);
                row3.setHeight((short) 380);
                HSSFRow row4 = sheet.createRow((short) 3);
                row4.setHeight((short) 380);
                HSSFRow row5 = sheet.createRow((short) 4);
                row5.setHeight((short) 380);
                HSSFRow row6 = sheet.createRow((short) 5);
                row6.setHeight((short) 380);
                HSSFRow row_title = sheet.createRow((short) 6);

                HSSFRow row_pt = sheet.createRow((short) 33);
                row_pt.setHeight((short) 800);


            sheet.addMergedRegion(new Region(0, (short) 0, 0, (short) 11));
            HSSFCell ce = row1.createCell((short) 0);

            ce.setCellValue(new HSSFRichTextString("经营性道从业资格路考试成绩单"));
            ce.setCellStyle(style0);


                sheet.addMergedRegion(new Region(1, (short) (0), 1,
                        (short) (1)));
                HSSFCell cellA = row2.createCell((short) (0));

                cellA.setCellValue("姓名：");
                cellA.setCellStyle(style1);

                sheet.addMergedRegion(new Region(1, (short) (2), 1,
                        (short) (4)));
                HSSFCell cellB = row2.createCell((short) (2));

                cellB.setCellValue(rs.getString( 2));
                cellB.setCellStyle(style1);

                sheet.addMergedRegion(new Region(1, (short) (5), 1,
                        (short) (6)));
                HSSFCell cellC = row2.createCell((short) (5));

                cellC.setCellValue("性别");
                cellC.setCellStyle(style1);

                sheet.addMergedRegion(new Region(1, (short) (7), 1,
                        (short) (9)));
                HSSFCell cellD = row2.createCell((short) (7));

                cellD.setCellValue(rs.getString( 7));
                cellD.setCellStyle(style1);

                sheet.addMergedRegion(new Region(2, (short) (0), 2,
                        (short) (1)));
                HSSFCell cell_zkz = row3.createCell((short) (0));

                cell_zkz.setCellValue("准考证号：");
                cell_zkz.setCellStyle(style1);

                sheet.addMergedRegion(new Region(2, (short) (2), 2,
                        (short) (4)));
                HSSFCell cell_zkzval = row3.createCell((short) (2));

                cell_zkzval.setCellValue(rs.getString( 1 ));
                cell_zkzval.setCellStyle(style1);

                sheet.addMergedRegion(new Region(2, (short) (5), 2,
                        (short) (6)));
                HSSFCell cell_type = row3.createCell((short) (5));

                cell_type.setCellValue("考试科目：");
                cell_type.setCellStyle(style1);

                sheet.addMergedRegion(new Region(2, (short) (7), 2,
                        (short) (9)));
                HSSFCell cell_typeval = row3.createCell((short) (7));

                cell_typeval.setCellValue(rs.getString( 8 ));
                cell_typeval.setCellStyle(style1);

                sheet.addMergedRegion(new Region(3, (short) (0), 3,
                        (short) (1)));
                HSSFCell cell_card = row4.createCell((short) (0));

                cell_card.setCellValue("身份证号：");
                cell_card.setCellStyle(style1);

                sheet.addMergedRegion(new Region(3, (short) (2), 3,
                        (short) (9)));
                HSSFCell cell_cardval = row4.createCell((short) (2));

                cell_cardval.setCellValue(rs.getString( 3 ));
                cell_cardval.setCellStyle(style1);

                sheet.addMergedRegion(new Region(4, (short) (0), 4,
                        (short) (1)));
                HSSFCell cell_dt = row5.createCell((short) (0));

                cell_dt.setCellValue("考生状态：");
                cell_dt.setCellStyle(style1);

                sheet.addMergedRegion(new Region(4, (short) (2), 4,
                        (short) (4)));
                HSSFCell cell_dtval = row5.createCell((short) (2));

                cell_dtval.setCellValue(rs.getString(5));
                cell_dtval.setCellStyle(style1);

                sheet.addMergedRegion(new Region(4, (short) (5), 4,
                        (short) (6)));
                HSSFCell cell_adr = row5.createCell((short) (5));

                cell_adr.setCellValue("培训单位：");
                cell_adr.setCellStyle(style1);

                sheet.addMergedRegion(new Region(4, (short) (7), 4,
                        (short) (9)));
                HSSFCell cell_adrval = row5.createCell((short) (7));

                cell_adrval.setCellValue(rs.getString( 9));
                cell_adrval.setCellStyle(style1);

                sheet.addMergedRegion(new Region(5, (short) (0), 5,
                        (short) (1)));
                HSSFCell cell_qt = row6.createCell((short) (0));

                cell_qt.setCellValue("考试试题：");
                cell_qt.setCellStyle(style1);

                sheet.addMergedRegion(new Region(5, (short) (2), 5,
                        (short) (4)));
                HSSFCell cell_qtval = row6.createCell((short) (2));

                cell_qtval.setCellValue(rs.getString( 4));
                cell_qtval.setCellStyle(style1);

                sheet.addMergedRegion(new Region(5, (short) (5), 5,
                        (short) (6)));
                HSSFCell cell_scr = row6.createCell((short) (5));

                cell_scr.setCellValue("考试成绩：");
                cell_scr.setCellStyle(style1);
                sheet.addMergedRegion(new Region(5, (short) (7), 5,
                        (short) (9)));
                HSSFCell cell_scrval = row6.createCell((short) (7));

                cell_scrval.setCellValue(rs.getString( 6));
                cell_scrval.setCellStyle(style1);

                HSSFCell cell_title = row_title.createCell(0);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("序号"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(1);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("答案"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(2);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("阅卷"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(3);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("序号"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(4);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("答案"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(5);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("阅卷"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(6);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("序号"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(7);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("答案"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(8);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("阅卷"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(9);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("序号"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(10);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("答案"));
                cell_title.setCellStyle(style2);
                cell_title = row_title.createCell(11);
                cell_title.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell_title.setCellValue(new HSSFRichTextString("阅卷"));
                cell_title.setCellStyle(style2);


                String sql_answer =    "  select  qtA.qtnum as qtnumA, \n" +
                        "  case when ansA.answer='false' then '×' when  ansA.answer='true' then '√'  else   ansA.answer end as answerA ,\n" +
                        "  case when ansA.result=0 then '×' when ansA.result>0 then  '√' else  '' end   as resultA , \n" +
                        "  qtB.qtnum as qtnumB, \n" +
                        "  case when ansB.answer='false' then '×' when  ansB.answer='true' then '√'  else   ansB.answer end as answerB,\n" +
                        "  case when ansB.result=0 then '×' when ansB.result>0 then  '√' else  '' end   as resultB, \n" +
                        "  qtC.qtnum as qtnumC,\n" +
                        "  case when ansC.answer='false' then '×' when  ansC.answer='true' then '√'  else   ansC.answer end as answerC,\n" +
                        "  case when ansC.result=0 then '×' when ansC.result>0 then  '√' else  '' end   as resultC, \n" +
                        "  qtD.qtnum  as qtnumD,\n" +
                        "  case when ansD.answer='false' then '×' when  ansD.answer='true' then '√'  else   ansD.answer end as answerD,\n" +
                        "  case when ansD.result=0 then '×' when ansD.result>0 then  '√' else  '' end   as resultD  \n" +
                        "  from work.questions qtA  left join work.trainer  tra   ON qtA.qtbh=tra.qtbh \n"+
                        "  left join work.answers ansA on ansA.qtnum=qtA.qtnum and ansA.qtbh=qtA.qtbh AND ansA.admbh=tra.card\n" +
                        "  join work.questions qtB on qtA.qtbh=qtB.qtbh \n" +
                        "  left join work.answers ansB on ansB.qtnum=qtB.qtnum and ansB.qtbh=qtB.qtbh AND ansB.admbh=tra.card\n" +
                        "  join work.questions qtC on qtA.qtbh=qtC.qtbh  \n" +
                        "  left join work.answers ansC on ansC.qtnum=qtC.qtnum and ansC.qtbh=qtC.qtbh AND ansC.admbh=tra.card\n" +
                        "  join work.questions qtD on qtA.qtbh=qtD.qtbh\n" +
                        "  left join work.answers ansD on ansD.qtnum=qtD.qtnum and ansD.qtbh=qtD.qtbh AND ansD.admbh=tra.card" +
                        "  where tra.id ="+id+
                        "  group by qtA.qtnum ,qtB.qtnum,qtC.qtnum ,qtD.qtnum,ansA.answer,ansA.result,ansB.answer,ansB.result,ansC.answer,ansC.result,ansD.answer,ansD.result\n" +
                        "  having  qtA.qtnum%4=1 and qtB.qtnum%4=2 and qtC.qtnum%4=3 and qtD.qtnum%4=0 AND qtA.qtnum+1=qtB.qtnum and  qtB.qtnum+1=qtC.qtnum and qtC.qtnum+1=qtD.qtnum \n" +
                        "  order by qtA.qtnum";

                rs = stmt.executeQuery(sql_answer);
                ResultSetMetaData smdata=rs.getMetaData();
                int nColum=smdata.getColumnCount();
                int rowCount=7;
                    while(rs.next()) {
                            HSSFRow row = sheet.createRow(rowCount);
                        for(int j=1;j<=nColum;j++){
                            HSSFCell cell = row.createCell(j - 1);
                            cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                                if (j == 1) {
                                    cell.setCellValue(new HSSFRichTextString(rs.getString( j )));
                                }
                                if (j == 2) {
                                    String result2="";
                                    if(rs.getString( 2 )!=null ){
                                        result2=rs.getString( 2 );
                                    }
                                    cell.setCellValue(new HSSFRichTextString(result2));
                                }
                                if (j == 3) {
                                    String result3="";
                                    if(rs.getString( 3 )!=null ){
                                        result3=rs.getString( 3 );
                                    }
                                    cell.setCellValue(new HSSFRichTextString(result3));
                                }
                                if (j == 4) {
                                    cell.setCellValue(new HSSFRichTextString(rs.getString( j )));
                                }
                                if (j == 5) {
                                    String result5="";
                                    if(rs.getString( 5 )!=null ){
                                        result5=rs.getString( 5 );
                                    }
                                    cell.setCellValue(new HSSFRichTextString(result5));
                                }
                                if (j == 6) {
                                    String result6="";
                                    if(rs.getString( 6 )!=null ){
                                        result6=rs.getString( 6 );
                                    }
                                    cell.setCellValue(new HSSFRichTextString(result6));
                                }
                               if (j == 7) {
                                   cell.setCellValue(new HSSFRichTextString(rs.getString( j )));
                                }
                                if (j == 8) {
                                    String result8="";
                                    if(rs.getString( 8 )!=null ){
                                        result8=rs.getString( 8 );
                                    }
                                    cell.setCellValue(new HSSFRichTextString(result8));
                                }
                                if (j == 9) {
                                    String result9="";
                                    if(rs.getString( 9 )!=null ){
                                        result9=rs.getString( 9 );
                                    }
                                    cell.setCellValue(new HSSFRichTextString(result9));
                                }
                                if (j == 10) {
                                    cell.setCellValue(new HSSFRichTextString(rs.getString( j )));
                                }
                                if (j == 11) {
                                    String result11="";
                                    if(rs.getString( 11 )!=null ){
                                        result11=rs.getString( 11 );
                                    }
                                    cell.setCellValue(new HSSFRichTextString(result11));
                                }
                                if (j == 12) {
                                    String result12="";
                                    if(rs.getString( 12 )!=null ){
                                        result12=rs.getString( 12 );
                                    }
                                    cell.setCellValue(new HSSFRichTextString(result12));
                                }
                            cell.setCellStyle(style2);
                            }
                        rowCount++;
                }





                sheet.addMergedRegion(new Region(1, (short) (10), 5,
                        (short) (11)));
                HSSFCell cell_pt = row2.createCell((short) (10));

                cell_qt.setCellStyle(style3);

                sheet.addMergedRegion(new Region(32, (short) (0), 36,
                        (short) (3)));
                HSSFCell cell_pt1 = row2.createCell((short) (10));

                cell_pt1.setCellStyle(style3);

                sheet.addMergedRegion(new Region(32, (short) (4), 36,
                        (short) (7)));
                HSSFCell cell_pt2 = row2.createCell((short) (10));

                cell_pt2.setCellStyle(style3);

                sheet.addMergedRegion(new Region(32, (short) (8), 36,
                        (short) (11)));
                HSSFCell cell_pt3 = row2.createCell((short) (10));


                ByteArrayOutputStream byteArrayOut = new ByteArrayOutputStream();
                bufferImg = ImageIO.read(new File(projectPath_target+ "/" +s_photo_file));
                ImageIO.write(bufferImg, "jpg", byteArrayOut);

                HSSFPatriarch patriarch = sheet.createDrawingPatriarch();

                HSSFClientAnchor anchor = new HSSFClientAnchor(0, 0, 35, 220,
                        (short) 10, 1, (short) 12, 5);
                anchor.setAnchorType(3);

                HSSFClientAnchor anchor1 = new HSSFClientAnchor(0, 0, 80, 250,
                        (short) 0, 32, (short) 3, 36);
                anchor1.setAnchorType(3);

                HSSFClientAnchor anchor2 = new HSSFClientAnchor(0, 0, 80, 250,
                        (short) 4, 32, (short) 7, 36);
                anchor2.setAnchorType(3);

                HSSFClientAnchor anchor3 = new HSSFClientAnchor(0, 0, 80, 250,
                        (short) 8, 32, (short) 11, 36);
                anchor3.setAnchorType(3);

                patriarch.createPicture(anchor, workbook.addPicture(byteArrayOut
                        .toByteArray(), HSSFWorkbook.PICTURE_TYPE_JPEG));

                patriarch.createPicture(anchor1, workbook.addPicture(byteArrayOut
                        .toByteArray(), HSSFWorkbook.PICTURE_TYPE_JPEG));

                patriarch.createPicture(anchor2, workbook.addPicture(byteArrayOut
                        .toByteArray(), HSSFWorkbook.PICTURE_TYPE_JPEG));

                patriarch.createPicture(anchor3, workbook.addPicture(byteArrayOut
                        .toByteArray(), HSSFWorkbook.PICTURE_TYPE_JPEG));


                HSSFRow row_QZ = sheet.createRow((short) 37);

                sheet.addMergedRegion(new Region(37, (short) (0), 37,
                        (short) (5)));
                HSSFCell cell_qz = row_QZ.createCell((short) (0));

                cell_qz.setCellValue("监考人员签字：");
                cell_qz.setCellStyle(style2);

                sheet.addMergedRegion(new Region(37, (short) (6), 37,
                        (short) (11)));
                HSSFCell cell_qzval = row_QZ.createCell((short) (6));

                cell_qzval.setCellValue("                                   ");
                cell_qzval.setCellStyle(style1);


//            FileOutputStream fout=new FileOutputStream(xlsFile);
                FileOutputStream fout=new FileOutputStream(projectPath_target+ "/" +fileName);

            workbook.write(fout);
            fout.flush();
            fout.close();
            }
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
