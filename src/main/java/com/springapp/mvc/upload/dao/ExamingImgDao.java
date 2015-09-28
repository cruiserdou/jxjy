package com.springapp.mvc.upload.dao;

import com.springapp.mvc.upload.pojo.ExamingImg;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

/**
 * Created by dou on 15-8-17.
 */
@Repository
public interface ExamingImgDao {
    @Select(" SELECT id, id_card, img1, img2, img3, status " +
            " FROM work.tb_examing_img ")
    ExamingImg getExamingImg();

    @Insert(" INSERT INTO work.tb_examing_img( " +
            " id_card, img1, img2, img3, status) " +
            " VALUES (#{examingImg.id_card}, #{examingImg.img1}, #{examingImg.img2}, #{examingImg.img3}, #{examingImg.status})")
    void insertExamingImg1(@Param(value = "examingImg") ExamingImg examingImg);

    @Update(" UPDATE work.tb_examing_img " +
            " SET img2=#{examingImg.img2} " +
            " WHERE id_card=#{examingImg.id_card};")
    void updateExamingImg2(@Param(value = "examingImg")ExamingImg examingImg);

    @Update(" UPDATE work.tb_examing_img " +
            " SET img3=#{examingImg.img3} " +
            " WHERE id_card=#{examingImg.id_card};")
    void updateExamingImg3(@Param(value = "examingImg")ExamingImg examingImg);
}
