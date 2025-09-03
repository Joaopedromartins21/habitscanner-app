package com.habitscanner.habitscanner.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

    @GetMapping("/")
    public String home() {
        return "redirect:http://localhost:3000";
    }

    @GetMapping("/login")
    public String login() {
        return "redirect:/oauth2/authorization/google";
    }
}

