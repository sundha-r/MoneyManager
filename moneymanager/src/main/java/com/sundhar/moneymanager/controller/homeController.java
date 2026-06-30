package com.sundhar.moneymanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/status","/health"})

public class homeController {


    @GetMapping()
    public String hello(){
        return "application is running...";
    }


}
