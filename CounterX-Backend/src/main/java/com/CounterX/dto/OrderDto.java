package com.CounterX.dto;

import com.CounterX.entity.OrderType;

public class OrderDto {

    // Total Bill Amount
    private Double totalAmount;

    // DINE_IN / TAKE_AWAY
    private OrderType orderType;

    public OrderDto() {
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public OrderType getOrderType() {
        return orderType;
    }

    public void setOrderType(OrderType orderType) {
        this.orderType = orderType;
    }
}