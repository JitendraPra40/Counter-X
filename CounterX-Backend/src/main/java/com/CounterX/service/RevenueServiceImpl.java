package com.CounterX.service;

import com.CounterX.entity.DailyRevenue;
import com.CounterX.repository.DailyRevenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RevenueServiceImpl implements RevenueService {

    @Autowired
    private DailyRevenueRepository revenueRepository;

    // Get All Revenue Reports
    @Override
    public List<DailyRevenue> getAllRevenueReports() {
        return revenueRepository.findAll();
    }

    // Date Wise Revenue
    @Override
    public DailyRevenue getRevenueByDate(LocalDate date) {
        return revenueRepository.findByRevenueDate(date);
    }

    // Week Wise Revenue
    @Override
    public List<DailyRevenue> getRevenueByWeek(
            LocalDate startDate,
            LocalDate endDate) {

        return revenueRepository.findByRevenueDateBetween(
                startDate,
                endDate
        );
    }

    // Month Wise Revenue
    @Override
    public List<DailyRevenue> getRevenueByMonth(
            int month,
            int year) {

        return revenueRepository.findAll()
                .stream()
                .filter(r ->
                        r.getRevenueDate() != null &&
                        r.getRevenueDate().getMonthValue() == month &&
                        r.getRevenueDate().getYear() == year)
                .collect(Collectors.toList());
    }

    // Year Wise Revenue
    @Override
    public List<DailyRevenue> getRevenueByYear(
            int year) {

        return revenueRepository.findAll()
                .stream()
                .filter(r ->
                        r.getRevenueDate() != null &&
                        r.getRevenueDate().getYear() == year)
                .collect(Collectors.toList());
    }

    // Update Revenue After Payment
    @Override
    public void updateDailyRevenue(Double amount) {

        LocalDate today = LocalDate.now();

        DailyRevenue revenue =
                revenueRepository.findByRevenueDate(today);

        if (revenue == null) {

            revenue = new DailyRevenue();
            revenue.setRevenueDate(today);
            revenue.setTotalOrders(1);
            revenue.setTotalRevenue(amount);

        } else {

            revenue.setTotalOrders(
                    revenue.getTotalOrders() + 1);

            revenue.setTotalRevenue(
                    revenue.getTotalRevenue() + amount);
        }

        revenueRepository.save(revenue);
    }
}