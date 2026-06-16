package com.CounterX.service;

import com.CounterX.dto.DashboardDTO;

import java.util.List;

public interface DashboardService {

    // Today's Dashboard
    DashboardDTO getTodayDashboard();

    // Weekly Dashboard
    List<DashboardDTO> getWeekDashboard();

    // Monthly Dashboard
    List<DashboardDTO> getMonthDashboard();
}