package com.CounterX.Controller;

import com.CounterX.entity.DailyRevenue;
import com.CounterX.service.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
public class RevenueController {

    @Autowired
    private RevenueService revenueService;

    // Today Sales
    @GetMapping("/today")
    public DailyRevenue getTodaySales() {
        return revenueService.getRevenueByDate(LocalDate.now());
    }

    // Week Sales
    @GetMapping("/week")
    public List<DailyRevenue> getWeekSales() {

        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(6);

        return revenueService.getRevenueByWeek(start, end);
    }

    // Month Sales
    @GetMapping("/month")
    public List<DailyRevenue> getMonthSales() {

        LocalDate today = LocalDate.now();

        return revenueService.getRevenueByMonth(
                today.getMonthValue(),
                today.getYear()
        );
    }
}