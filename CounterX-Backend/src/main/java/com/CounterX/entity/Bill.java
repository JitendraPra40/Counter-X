package com.CounterX.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billId;

    // Related Order
    @Column(nullable = false, unique = true)
    private Long orderId;

    // Token Number
    @Column(nullable = false)
    private Integer dailyOrderNumber;

    // DINE_IN / TAKE_AWAY
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderType orderType;

    // Sub Total
    @Column(nullable = false)
    private Double subTotal;

    // GST Amount
    @Column(nullable = false)
    private Double gstAmount;

    // Grand Total
    @Column(nullable = false)
    private Double totalAmount;

    // Payment Status
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    // Bill Time
    @Column(nullable = false)
    private LocalDateTime billDateTime;

    public Bill() {
        this.billDateTime = LocalDateTime.now();
        this.paymentStatus = PaymentStatus.SUCCESS;
    }

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
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

    public LocalDateTime getBillDateTime() {
        return billDateTime;
    }

    public void setBillDateTime(LocalDateTime billDateTime) {
        this.billDateTime = billDateTime;
    }
}