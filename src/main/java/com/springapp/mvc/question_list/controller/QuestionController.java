package com.springapp.mvc.question_list.controller;


import com.springapp.mvc.question_list.pojo.Question;
import com.springapp.mvc.question_list.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/handle")
public class QuestionController {
	@Autowired
	private QuestionService questionService;
	@RequestMapping(method = RequestMethod.GET)
	public String showReceive(Model model,HttpSession session,  @RequestParam(value = "qtnum", required = false) Integer qtnum) {

		List<Question> questionList=questionService.listQuestion(qtnum);
		model.addAttribute("questionList",questionList);
		return "desktop/handle";
	}
}