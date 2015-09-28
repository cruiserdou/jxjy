package com.springapp.mvc.upload.service;

import com.springapp.mvc.upload.dao.ExamingImgDao;
import com.springapp.mvc.upload.pojo.ExamingImg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by dou on 15-8-17.
 */
@Service
public class ExamingImgService {
    @Autowired
    private ExamingImgDao examingImgDao;

    public ExamingImg getExamingImg(){
        return examingImgDao.getExamingImg();
    }

    public void insertExamingImg(ExamingImg examingImg){
        examingImgDao.insertExamingImg1(examingImg);
    }

    public void updateExamingImg2(ExamingImg examingImg){
        examingImgDao.updateExamingImg2(examingImg);
    }

    public void updateExamingImg3(ExamingImg examingImg){
        examingImgDao.updateExamingImg3(examingImg);
    }
}
