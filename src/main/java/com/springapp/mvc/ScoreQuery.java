package com.springapp.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/score_query")
public class ScoreQuery {
	@RequestMapping(method = RequestMethod.GET)
	public String printWelcome(){
		return "main_exam_score_query";
	}
}