package com.CounterX.dto;

import com.CounterX.entity.OrderType;
import com.CounterX.entity.PaymentStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class BillDTO {

    @NotNull(message = "Order Id is required")
    private Long orderId;

    // Daily Order Number (Token)
    @NotNull(message = "Daily Order Number is required")
    private Integer dailyOrderNumber;

    // DINE_IN / TAKE_AWAY
    @NotNull(message = "Order Type is required")
    private OrderType orderType;

    // Sub Total
    @NotNull(message = "Sub Total is required")
    @Positive(message = "Sub Total must be greater than 0")
    private Double subTotal;

    // GST Amount
    @NotNull(message = "GST Amount is required")
    private Double gstAmount;

    // Grand Total
    @NotNull(message = "Total Amount is required")
    @Positive(message = "Total Amount must be greater than 0")
    private Double totalAmount;

    // Payment Status
    private PaymentStatus paymentStatus;

    public BillDTO() {
        this.paymentStatus = PaymentStatus.SUCCESS;
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

    public Double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }

    public Double getGstAmount() {
        return gstAmount;
    }

    public void setGstAmount(Double gstAmount) {
        this.gstAmount = gstAmount;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}