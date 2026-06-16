package com.CounterX.service;

import com.CounterX.dto.DashboardDTO;
import com.CounterX.entity.DailyRevenue;
import com.CounterX.repository.DailyRevenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private DailyRevenueRepository dailyRevenueRepository;

    // Today's Dashboard
    @Override
    public DashboardDTO getTodayDashboard() {

        DailyRevenue revenue =
                dailyRevenueRepository.findByRevenueDate(LocalDate.now());

        if (revenue == null) {
            return new DashboardDTO(
                    LocalDate.now(),
                    0,
                    0.0
            );
        }

        return new DashboardDTO(
                revenue.getRevenueDate(),
                revenue.getTotalOrders(),
                revenue.getTotalRevenue()
        );
    }

    // Weekly Dashboard
    @Override
    public List<DashboardDTO> getWeekDashboard() {

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);

        List<DailyRevenue> revenueList =
                dailyRevenueRepository.findByRevenueDateBetween(
                        startDate,
                        endDate
                );

        List<DashboardDTO> result = new ArrayList<>();

        for (DailyRevenue revenue : revenueList) {

            result.add(
                    new DashboardDTO(
                            revenue.getRevenueDate(),
                            revenue.getTotalOrders(),
                            revenue.getTotalRevenue()
                    )
            );
        }

        return result;
    }

    // Monthly Dashboard
    @Override
    public List<DashboardDTO> getMonthDashboard() {

        LocalDate today = LocalDate.now();

        List<DashboardDTO> result = new ArrayList<>();

        for (DailyRevenue revenue : dailyRevenueRepository.findAll()) {

            if (revenue.getRevenueDate().getMonthValue() == today.getMonthValue()
                    && revenue.getRevenueDate().getYear() == today.getYear()) {

                result.add(
                        new DashboardDTO(
                                revenue.getRevenueDate(),
                                revenue.getTotalOrders(),
                                revenue.getTotalRevenue()
                        )
                );
            }
        }

        return result;
    }
}