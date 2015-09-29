package com.springapp.mvc.answers;

/**
 * Created by xwq on 14-4-15.
 */

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import com.xwq.common.model.DataShop;
import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.*;

@Controller
@RequestMapping("/add_answers_info")
public class AddAnswersInfo {

    @RequestMapping( method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpSession session,
            HttpServletRequest request,
            @RequestParam("admbh") String admbh,
            @RequestParam("qtbh") String qtbh,
            @RequestParam("qtnum") Integer qtnum,
            @RequestParam("answer") String answer

    ) throws Exception{
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);
        Connection conn = null;
        PreparedStatement pst = null;
        Statement stmt = null;
        ResultSet rs_answer = null;

        ResultSet rs = null;
        ResultSet rs_jb = null;
        ResultSet rs_phone = null;
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
            java.util.Date date = new java.util.Date();
            Timestamp timestamp = new Timestamp(date.getTime());

            stmt = conn.createStatement();
            int i_ks_stat_num=0;
            String sql_ks_stat = " select ks_stat  from   work.trainer  WHERE card ='"+admbh+"'";
            rs_answer = stmt.executeQuery(sql_ks_stat);
            while (rs_answer.next()) {
                i_ks_stat_num = rs_answer.getInt(1);
                if(i_ks_stat_num==0 ){
                    String sql_ks = "UPDATE work.trainer SET ks_stat=1 , examtm='"+timestamp+"' where card ='"+admbh+"'";
                    pst = conn.prepareStatement(sql_ks);
                    pst.executeUpdate();
                }
                if(i_ks_stat_num==2 ){
                    String sql_ks = "UPDATE work.trainer SET  ks_stat=3 , examtm='"+timestamp+"' where card ='"+admbh+"'";
                    pst = conn.prepareStatement(sql_ks);
                    pst.executeUpdate();
                }
            }
            if(answer.length()==0){
                String sql = "update work.trainer set   scores=0   where card = ? ";
                pst = conn.prepareStatement(sql);
                pst.setString(1, admbh);
                pst.executeUpdate();
            }else{
                String[] answer_i = answer.split(",");
                int n=answer_i.length/2;
                for(int i=0; i<n; i++) {

                    String sql_answers_new = "insert into work.answers" +
                            "(admbh, qtbh, qtnum, answer,xh) " +
                            " values(?, ?,  ( select qt_num["+Integer.parseInt(answer_i[2*i+qtnum-1])+"]  from  work.tb_exam_random_kt where  status=1 and admbh= ?), ?,?)";
                    pst = conn.prepareStatement(sql_answers_new);
                    pst.setString(1, admbh);
                    pst.setString(2, qtbh);
//                    pst.setInt(3, Integer.parseInt(answer_i[2*i+qtnum-1]));
                    pst.setString(3, session.getAttribute("card").toString());
                    pst.setString(4, answer_i[2*i+1]);
                    pst.setInt(5, Integer.parseInt(answer_i[2 * i + qtnum - 1]));
                    pst.executeUpdate();
                }
            }

            String sql_update_begin = "update work.trainer set  begin=0  where card=? ";
            pst = conn.prepareStatement(sql_update_begin);
            pst.setString(1, session.getAttribute("card").toString());
            pst.executeUpdate();


            String projectPath = request.getSession().getServletContext().getRealPath("/static/upload/");
            String card ="";
            String name = "";
            String lictype = "";
            String drvschool = "";
            String photo = "";
            Integer scores = 0;
            String sql = "select id,qtbh, name, sex,   card, address, workunit, drvschool, \n" +
                    "       lictype, licdt, applytp, qulfnum," +
                    " case when (licmd!='' and licmd_goods='')   then licmd when (licmd='' and licmd_goods!='') then licmd_goods else licmd||licmd_goods  end as  licmd" +
                    " , checklist1, promise, photo, status,  case  when ks_stat in  (0,1)   then '初试'  else '补考' end  as ks_status," +
                    "   remark,scores, case when scores>60 then '及格' when scores>=0 and scores<60 then '不及格' else '缺考' end as result" +
                    " from work.trainer trainer where   trainer.id =" + session.getAttribute("id").toString();

            rs_jb = stmt.executeQuery(sql);
            while (rs_jb.next()) {
                name = rs_jb.getString("name");
                card = rs_jb.getString("card");
                lictype = rs_jb.getString("lictype");
                drvschool = rs_jb.getString("drvschool");
                photo = card + ".jpg";
                scores = rs_jb.getInt("scores");
            }

            java.util.Date date_new = new java.util.Date();
            String pattern = "yyyy-MM-dd";
            java.text.DateFormat df = new java.text.SimpleDateFormat(pattern);
            String now_dt = df.format(date_new);

            BufferedImage image = null;


            //实际数据行数+标题+备注
            int totalrow = 30;
            int totalcol = 12;
            int imageWidth = 1024;
            int imageHeight = totalrow * 30 + 90;
            int imageHeight_A4=imageHeight+400;
            int startWidth = 20;
            int startHeight = 160;

            int colwidth = (int) ((imageWidth - 20) / totalcol);
            int rowheight = 30;

            image = new BufferedImage(imageWidth, imageHeight_A4, BufferedImage.TYPE_INT_RGB);
            Graphics graphics = image.getGraphics();

            graphics.setColor(Color.WHITE);
            graphics.fillRect(0, 0, imageWidth, imageHeight_A4);
            graphics.setColor(new Color(220, 240, 240));

            //画横线
            for (int j = 0; j <= totalrow - 4; j++) {
                graphics.setColor(Color.black);
                graphics.drawLine(startWidth, startHeight + (j + 1) * rowheight, imageWidth - 10, startHeight + (j + 1) * rowheight);
            }
            //画竖线
            for (int k = 0; k <= totalcol; k++) {
                graphics.setColor(Color.black);
                graphics.drawLine(startWidth + k * colwidth, startHeight + rowheight, startWidth + k * colwidth, imageHeight - 20);
            }

            //设置字体
            Font font = new Font("华文楷体", Font.BOLD, 20);
            graphics.setFont(font);

            //写标题
            String title = "经营性道路继续教育考试成绩单";
            graphics.drawString(title, imageWidth / 3 + startWidth, 30);

            font = new Font("WenQuanYi Bitmap Song", Font.BOLD, 18);
            graphics.setFont(font);
            int colwidth_con = 50;

            graphics.setColor(Color.black);
            graphics.drawLine(startWidth, 40, imageWidth - 10, 40);
            graphics.drawLine(startWidth, 70, colwidth * 9 + 20, 70);
            graphics.drawLine(startWidth, 100, colwidth * 9 + 20, 100);
            graphics.drawLine(startWidth, 130, colwidth * 9 + 20, 130);
            graphics.drawLine(startWidth, 160, colwidth * 9 + 20, 160);
            graphics.drawLine(startWidth, 40, startWidth, startHeight + rowheight);

            graphics.drawLine(startWidth + 2 * colwidth, 40, startWidth + 2 * colwidth, startHeight + rowheight);
            graphics.drawLine(startWidth + 9 * colwidth, 40, startWidth + 9 * colwidth, startHeight + rowheight);
            graphics.drawLine(startWidth + 12 * colwidth, 40, startWidth + 12 * colwidth, startHeight + rowheight);

            graphics.drawString("姓       名", colwidth_con, 60);
            graphics.drawString(name, colwidth_con * 4 + 20, 60);
            graphics.drawString("身  份 证", colwidth_con, 90);
            graphics.drawString(card, colwidth_con * 4 + 20, 90);
            graphics.drawString("从业资格证", colwidth_con, 120);
            graphics.drawString(lictype, colwidth_con * 4 + 20, 120);
            graphics.drawString("驾校名称", colwidth_con, 150);
            graphics.drawString(drvschool, colwidth_con * 4 + 20, 150);
            graphics.drawString("考试成绩", colwidth_con, 180);
            graphics.drawString(String.valueOf(scores) + "分", colwidth_con * 4 + 20, 180);


            Image image1=null;

            if(photo.length()>0){
                File annexfile1 = new File(projectPath + "/" + photo);
                if (annexfile1.exists()) {
                    image1 = new ImageIcon(projectPath + "/" + photo).getImage();

                }else{
                    image1 = new ImageIcon(projectPath + "/" + "per.png").getImage();
                }
            }else{
                image1 = new ImageIcon(projectPath + "/" + "per.png").getImage();
            }
            graphics.drawImage(image1, colwidth_con * 15 + 20, 40, 245, 150, null);

//            Image image1 = new ImageIcon(projectPath +"/"+ photo).getImage();
//            graphics.drawImage(image1, colwidth_con * 15 + 20, 40, 245, 150, null);
            //写入表头
            String[] headCells = {"序号1", "答案", "阅卷", "序号2", "答案", "阅卷", "序号3", "答案", "阅卷", "序号4", "答案", "阅卷"};
            for (int m = 0; m < headCells.length; m++) {
                graphics.drawString(headCells[m].toString(), startWidth + colwidth * m + 20, startHeight + rowheight * 2 - 10);
            }
            String sql_answers = "select xh, qtnum,\n" +
                    "                  case when ans.answer='false' then '×' when ans.answer='true' then '√'  else   ans.answer end as answer , \n" +
                    "                  case when ans.result=0 then '×' else '√' end   as result  \n" +
                    "                  from work.answers  ans, work.trainer tra  \n" +
                    "                  WHERE ans.admbh=tra.card  and ans.qtbh=tra.qtbh\n" +
                    "                   and tra.id=" + Integer.parseInt(session.getAttribute("id").toString()) + "order by xh";
            rs = stmt.executeQuery(sql_answers);

            ResultSetMetaData smdata = rs.getMetaData();
            int nColum = smdata.getColumnCount();
            int h = 0;
            int w = 0;
            int s = 1;
            int l = 1;
            int tj = 100;
            if (nColum > 0) {
                while (rs.next()) {
                    int  num = rs.getInt(1);
                    int dd=rs.getInt(1)-l;
                    if( dd>0) {
                        for (int ddd = 1; ddd <= dd; ddd++) {
                            if (l % 4 == 1 && l != 1) {
                                h++;
                                w = 0;
                                graphics.drawString(String.valueOf(l), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                                w++;
                                graphics.drawString(" ", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                                w++;
                                graphics.drawString("囗", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                                w++;
                                l++;
                                tj--;
                            }else{
                                graphics.drawString(String.valueOf(l), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                                w++;
                                graphics.drawString(" ", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                                w++;
                                graphics.drawString("囗", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                                w++;
                                l++;
                                tj--;
                            }
                        }
                        if (num % 4 == 1 && num != 1) {
                            h++;
                            w = 0;
                            graphics.drawString(String.valueOf(l), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString(rs.getString(3), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString(rs.getString(4), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            l++;
                            tj--;
                        }else{
                            graphics.drawString(String.valueOf(l), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString(rs.getString(3), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString(rs.getString(4), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            l++;
                            tj--;
                        }
                    }else{
                        if (num % 4 == 1 && num != 1) {
                            h++;
                            w = 0;
                            graphics.drawString(String.valueOf(l), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString(rs.getString(3), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString(rs.getString(4), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            l++;
                            tj--;
                        }else{
                            graphics.drawString(String.valueOf(l), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString(rs.getString(3), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString(rs.getString(4), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            l++;
                            tj--;
                        }
                    }


                }
                if (tj > 0) {
                    for (int m = 101 - tj; m <= 100; m++) {
                        if (m % 4 == 1 && m != 1) {
                            h++;
                            w = 0;
                            graphics.drawString(String.valueOf(m), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString(" ", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString("囗", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;

                        } else {
                            graphics.drawString(String.valueOf(m), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString(" ", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                            graphics.drawString("囗", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                            w++;
                        }
                    }
                }
            } else {
                for (int m = 1; m <= 100; m++) {
                    if (m % 4 == 1 && m != 1) {
                        h++;
                        w = 0;
                        graphics.drawString(String.valueOf(m), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                        w++;
                        graphics.drawString(" ", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                        w++;
                        graphics.drawString("囗", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                        w++;

                    } else {
                        graphics.drawString(String.valueOf(m), startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                        w++;
                        graphics.drawString(" ", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                        w++;
                        graphics.drawString("囗", startWidth + colwidth * w + 20, startHeight + rowheight * (h + 3) - 10);
                        w++;
                    }

                }
            }
            //设置字体
            font = new Font("华文楷体", Font.PLAIN, 16);
            graphics.setFont(font);
            String phone1="";
            String phone2="";
            String phone3="";

            String sql_phone = "select COALESCE(img1, '') as img1, COALESCE(img2, '') as img2,COALESCE(img3, '') as  img3 from work.tb_examing_img img where    \n" +
                    " img.id in (select max(img.id) from work.tb_examing_img    img , work.trainer trainer  " +
                    " where   img.id_card= trainer.card  and   trainer.id =" +Integer.parseInt(session.getAttribute("id").toString()) +")";

            rs_phone = stmt.executeQuery(sql_phone);

            while (rs_phone.next()) {
                phone1 = rs_phone.getString("img1");
                phone2 = rs_phone.getString("img2");
                phone3 = rs_phone.getString("img3");
            }

            //设置字体
            font = new Font("华文楷体",Font.PLAIN,16);
            graphics.setFont(font);
            Image image2=null;
            Image image3=null;
            Image image4=null;

            if(phone1.length()>0  && phone1!=null){
                File annexfile2 = new File(projectPath + "/" + phone1);
                if (annexfile2.exists()) {
                    image2 = new ImageIcon(projectPath + "/" + phone1).getImage();

                }else{
                    image2 = new ImageIcon(projectPath + "/" + "per.png").getImage();
                }

            }else{
                image2 = new ImageIcon(projectPath + "/" + "per.png").getImage();
            }
            graphics.drawImage(image2, startWidth + colwidth * 0, 970, 330, 250, null);


            if(phone2.length()>0 && phone2 != null){
                File annexfile3 = new File(projectPath + "/" + phone2);
                if (annexfile3.exists()) {
                    image3 = new ImageIcon(projectPath + "/" + phone2).getImage();

                }else {
                    image3 = new ImageIcon(projectPath + "/" + "per.png").getImage();
                }

            }else{
                image3 = new ImageIcon(projectPath + "/" + "per.png").getImage();
            }
            graphics.drawImage(image3, startWidth + colwidth * 4 , 970,330,250, null);


            if(phone3.length()>0  && phone3!=null){
                File annexfile4 = new File(projectPath + "/" + phone3);
                if (annexfile4.exists()) {
                    image4 = new ImageIcon(projectPath + "/" + phone3).getImage();

                } else {
                    image4 = new ImageIcon(projectPath + "/" + "per.png").getImage();
                }

            }else{
                image4 = new ImageIcon(projectPath + "/" + "per.png").getImage();
            }
            graphics.drawImage(image4, startWidth + colwidth * 8, 970, 330, 250, null);



            graphics.drawString("考试签字:", colwidth * 0 + 40, 1250);
            graphics.drawString("        ", colwidth * 2, 1250);
            graphics.drawLine(colwidth + 30, 1260, colwidth * 3 + 50, 1260);
            graphics.drawString("监考签字:", colwidth * 4 + 40, 1250);
            graphics.drawString("        ", colwidth * 6, 1250);
            graphics.drawLine(colwidth * 5 + 30, 1260, colwidth * 7 + 50, 1260);
            graphics.drawString("考试时间:", colwidth * 8 + 50, 1250);
            graphics.drawString(now_dt, colwidth * 10, 1250);
            graphics.drawLine(colwidth * 9 + 40, 1260, colwidth * 11 + 50, 1260);

            File annexfile5 = new File(projectPath + "/" + card + "_s.jpg");
            if (annexfile5.exists()) {
                annexfile5.delete();
            }

            try {
                FileOutputStream fos = new FileOutputStream(projectPath + "/" + card + "_s.jpg");
                BufferedOutputStream bos = new BufferedOutputStream(fos);
                JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(bos);
                encoder.encode(image);
//                    fos.flush();
//                    fos.close();
//                    bos.flush();
                bos.close();
            } catch (Exception e) {
                e.printStackTrace();
            }



            dataShop.setSuccess(true);
        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (pst != null) pst.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                System.out.print(e.getMessage());
            }
        }

        return dataShop;
    }
}
