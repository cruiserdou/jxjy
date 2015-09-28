package com.springapp.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/print_exam")
public class print_exam {
    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(
//                               @RequestParam(value = "card", required = true)String card

    ) {


        return "print_exam";
    }
}