package com.CounterX.repository;

import com.CounterX.entity.DailyRevenue;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DailyRevenueRepository
        extends JpaRepository<DailyRevenue, Long> {

    // Get Revenue by Date
    DailyRevenue findByRevenueDate(LocalDate revenueDate);

    // Get Revenue Between Dates
    List<DailyRevenue> findByRevenueDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );
}