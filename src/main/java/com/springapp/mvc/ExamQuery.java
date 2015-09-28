package com.springapp.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/exam_query")
public class ExamQuery {
	@RequestMapping(method = RequestMethod.GET)
	public String printWelcome() {
		return "main_exam_query";
	}
}