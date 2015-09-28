package com.springapp.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;


@Controller
@RequestMapping("/examing")
public class Examing{
    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView toMainpage(
            HttpSession session,
            @RequestParam(value = "user", required = false) String account,
            @RequestParam(value = "password", required = false) String login_password
    ) {
        ModelAndView modelAndView = new ModelAndView();
        if (session.getAttribute("user") == null)
            modelAndView.setViewName("manager_login");
        else
            modelAndView.setViewName("main_examing");
        return modelAndView;
    }
}