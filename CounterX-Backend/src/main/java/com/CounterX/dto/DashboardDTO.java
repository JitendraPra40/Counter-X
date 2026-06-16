package com.CounterX.dto;

import java.time.LocalDate;

public class DashboardDTO {

    private LocalDate revenueDate;

    private Integer totalOrders;

    private Double totalRevenue;

    public DashboardDTO() {
    }

    public DashboardDTO(LocalDate revenueDate,
                        Integer totalOrders,
                        Double totalRevenue) {

        this.revenueDate = revenueDate;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
    }

    public LocalDate getRevenueDate() {
        return revenueDate;
    }

    public void setRevenueDate(LocalDate revenueDate) {
        this.revenueDate = revenueDate;
    }

    public Integer getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Integer totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}