package com.springapp.mvc.question_list.pojo;

import java.io.Serializable;


public class Question implements Serializable{


    private Integer id;
    private String qtbh;
    private Integer qtnum;
    private Integer type;
    private Integer score;
    private String question;
    private String qt_a;
    private String qt_b;
    private String qt_c;
    private String qt_d;
    private String answer;
    private String remark;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQtbh() {
        return qtbh;
    }

    public void setQtbh(String qtbh) {
        this.qtbh = qtbh;
    }

    public Integer getQtnum() {
        return qtnum;
    }

    public void setQtnum(Integer qtnum) {
        this.qtnum = qtnum;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQt_a() {
        return qt_a;
    }

    public void setQt_a(String qt_a) {
        this.qt_a = qt_a;
    }

    public String getQt_b() {
        return qt_b;
    }

    public void setQt_b(String qt_b) {
        this.qt_b = qt_b;
    }

    public String getQt_c() {
        return qt_c;
    }

    public void setQt_c(String qt_c) {
        this.qt_c = qt_c;
    }

    public String getQt_d() {
        return qt_d;
    }

    public void setQt_d(String qt_d) {
        this.qt_d = qt_d;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


}
