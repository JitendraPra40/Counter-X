package com.CounterX.entity;

import jakarta.persistence.*;


import java.time.LocalDate;

@Entity
@Table(name = "daily_revenue")
public class DailyRevenue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate revenueDate;

    private Integer totalOrders;

    private Double totalRevenue;

    // Default Constructor
    public DailyRevenue() {
    }

    // Parameterized Constructor
    public DailyRevenue(Long id, LocalDate revenueDate, Integer totalOrders, Double totalRevenue) {
        this.id = id;
        this.revenueDate = revenueDate;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
    }

    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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