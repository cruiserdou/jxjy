package com.springapp.mvc.upload;

/**
 * Created by xwq on 14-4-15.
 */

import com.springapp.mvc.upload.pojo.ExamingImg;
import com.springapp.mvc.upload.service.ExamingImgService;
import com.xwq.common.model.DataShop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;

@Controller
@RequestMapping("/upload_phote")
public class UploadPhote {
    private static final int BUFFER_SIZE = 16 * 1024;
    @Autowired
    private ExamingImgService examingImgService;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
            @RequestParam(value = "id_card", required = true) String id_card,
            @RequestParam(value = "num", required = true) String num,
            @ModelAttribute ExamingImg examingImg
    ) throws Exception {
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);
        String imgData = request.getParameter("img");
        imgData = imgData.substring(30);
        imgData = URLDecoder.decode(imgData, "UTF-8");
        //保存的图片的名称
        java.util.Date date = new java.util.Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHH");

        //文件名由身份证号码 + 事件 + 编号组成
        String fileName = new StringBuilder().append(id_card).append(simpleDateFormat.format(date).toString()).append(num).append(".png").toString();

        String projectPath = request.getSession().getServletContext().getRealPath("/static/upload/");

        BASE64Decoder decoder = new BASE64Decoder();

        try {
            byte[] bytes1 = decoder.decodeBuffer(imgData);
            String path = projectPath + '/' + fileName;
            FileOutputStream fos = new FileOutputStream(path);
            fos.write(bytes1);
            fos.close();

            //数据写入数据库

            if (num.equals("1")){
                examingImg.setImg1(fileName);
                examingImgService.insertExamingImg(examingImg);
            }
            else if (num.equals("2")) {
                examingImg.setImg2(fileName);
                examingImgService.updateExamingImg2(examingImg);
            }
            else if (num.equals("3")){
                examingImg.setImg3(fileName);
                examingImgService.updateExamingImg3(examingImg);
            }
        } catch (IOException e) {
            e.printStackTrace();
            dataShop.setSuccess(false);
        }
        return dataShop;
    }
}