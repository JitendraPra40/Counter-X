package com.CounterX.dto;

public class CategoryRevenueDTO {

    private String category;
    private Double revenue;

    public CategoryRevenueDTO() {
    }

    public CategoryRevenueDTO(String category, Double revenue) {
        this.category = category;
        this.revenue = revenue;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }
}