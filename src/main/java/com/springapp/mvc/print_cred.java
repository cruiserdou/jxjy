package com.springapp.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/print_cred")
public class print_cred {
    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(
//                               @RequestParam(value = "card", required = true)String card

    ) {


        return "print_cred";
    }
}