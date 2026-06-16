package com.CounterX.Controller;

import com.CounterX.dto.DashboardDTO;
import com.CounterX.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Today's Dashboard
    @GetMapping("/today")
    public DashboardDTO getTodayDashboard() {

        return dashboardService.getTodayDashboard();
    }

    // Weekly Dashboard
    @GetMapping("/week")
    public List<DashboardDTO> getWeekDashboard() {

        return dashboardService.getWeekDashboard();
    }

    // Monthly Dashboard
    @GetMapping("/month")
    public List<DashboardDTO> getMonthDashboard() {

        return dashboardService.getMonthDashboard();
    }

}