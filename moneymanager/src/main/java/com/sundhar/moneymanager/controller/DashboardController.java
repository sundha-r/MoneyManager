package com.sundhar.moneymanager.controller;

import com.sundhar.moneymanager.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<Map<String,Object>> getDashboardData(){
       Map<String,Object> data= dashboardService.getDashboard();
       return ResponseEntity.ok(data);
    }
}
