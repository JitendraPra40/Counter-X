
package com.CounterX.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PaymentDTO {

    // Related Order ID
    @NotNull(message = "Order ID is required")
    private Long orderId;

    // Payment Method
    // GPAY / PHONEPE / PAYTM / UPI
    @NotBlank(message = "Payment Method is required")
    private String paymentMethod;

    public PaymentDTO() {
    }

    public PaymentDTO(Long orderId, String paymentMethod) {
        this.orderId = orderId;
        this.paymentMethod = paymentMethod;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}

