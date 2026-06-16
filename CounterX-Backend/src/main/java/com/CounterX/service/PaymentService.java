
package com.CounterX.service;

import com.CounterX.dto.PaymentDTO;
import com.CounterX.entity.Payment;

import java.util.List;

public interface PaymentService {

    // Process Payment
    Payment processPayment(PaymentDTO dto);

    // Get Payment By ID
    Payment getPayment(Long paymentId);

    // Get All Payments
    List<Payment> getAllPayments();

    // Get Payments By Order ID
    List<Payment> getPaymentsByOrder(Long orderId);

    // Get Payment By Transaction ID
    Payment getPaymentByTransactionId(
            String transactionId);

    // Generate QR Image For Order
    byte[] generateQr(Long orderId);
}

