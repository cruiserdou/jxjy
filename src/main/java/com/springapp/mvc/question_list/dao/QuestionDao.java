package com.springapp.mvc.question_list.dao;

import com.springapp.mvc.question_list.pojo.Question;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDao {
    String sql=" SELECT id, qtbh, qtnum, question, type, answer, score, remark, qt_a, \n" +
            "       qt_b, qt_c, qt_d\n" +
            "  FROM work.questions where qtnum=#{qtnum})";
    @Select(sql)
    List<Question> listQuestion(@Param(value = "qtnum") Integer qtnum);
}
