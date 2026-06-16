
package com.CounterX.dto;

import com.CounterX.entity.OrderStatus;
import com.CounterX.entity.OrderType;

public class KitchenOrderDTO {

    private Long orderId;
    private Integer dailyOrderNumber;
    private OrderType orderType;
    private OrderStatus orderStatus;
    private Double totalAmount;

    public KitchenOrderDTO() {
    }

    public KitchenOrderDTO(Long orderId,
                           Integer dailyOrderNumber,
                           OrderType orderType,
                           OrderStatus orderStatus,
                           Double totalAmount) {

        this.orderId = orderId;
        this.dailyOrderNumber = dailyOrderNumber;
        this.orderType = orderType;
        this.orderStatus = orderStatus;
        this.totalAmount = totalAmount;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Integer getDailyOrderNumber() {
        return dailyOrderNumber;
    }

    public void setDailyOrderNumber(Integer dailyOrderNumber) {
        this.dailyOrderNumber = dailyOrderNumber;
    }

    public OrderType getOrderType() {
        return orderType;
    }

    public void setOrderType(OrderType orderType) {
        this.orderType = orderType;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
