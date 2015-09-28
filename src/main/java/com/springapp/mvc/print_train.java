package com.springapp.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/print_train")
public class print_train {
    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome() {
        return "print_train";
    }
}