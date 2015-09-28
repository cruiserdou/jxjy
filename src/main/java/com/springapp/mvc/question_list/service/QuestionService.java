package com.springapp.mvc.question_list.service;


import com.springapp.mvc.question_list.dao.QuestionDao;
import com.springapp.mvc.question_list.pojo.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("QuestionService")
public class QuestionService {
    @Autowired
    private QuestionDao questionDao;
    public List<Question> listQuestion(Integer qtnum) {
        return questionDao.listQuestion(qtnum);
    }
}
