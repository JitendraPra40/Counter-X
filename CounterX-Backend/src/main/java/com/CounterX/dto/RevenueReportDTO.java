package com.CounterX.dto;

import java.time.LocalDate;

public class RevenueReportDTO {

    private LocalDate revenueDate;

    private Integer totalOrders;

    private Double totalRevenue;

    // Default Constructor
    public RevenueReportDTO() {
    }

    // Parameterized Constructor
    public RevenueReportDTO(LocalDate revenueDate, Integer totalOrders, Double totalRevenue) {
        this.revenueDate = revenueDate;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
    }

    // Getter and Setter for revenueDate
    public LocalDate getRevenueDate() {
        return revenueDate;
    }

    public void setRevenueDate(LocalDate revenueDate) {
        this.revenueDate = revenueDate;
    }

    // Getter and Setter for totalOrders
    public Integer getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Integer totalOrders) {
        this.totalOrders = totalOrders;
    }

    // Getter and Setter for totalRevenue
    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}