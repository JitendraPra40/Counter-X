package com.CounterX.service;

import com.CounterX.entity.DailyRevenue;

import java.time.LocalDate;
import java.util.List;

public interface RevenueService {

    List<DailyRevenue> getAllRevenueReports();

    DailyRevenue getRevenueByDate(LocalDate date);

    List<DailyRevenue> getRevenueByWeek(
            LocalDate startDate,
            LocalDate endDate);

    List<DailyRevenue> getRevenueByMonth(
            int month,
            int year);

    List<DailyRevenue> getRevenueByYear(
            int year);

    void updateDailyRevenue(Double amount);
}