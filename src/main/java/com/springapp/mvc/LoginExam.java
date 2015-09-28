package com.springapp.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/login_exam")
public class LoginExam {
	@RequestMapping(method = RequestMethod.GET)
	public String printWelcome() {
		return "login_exam";
	}
}