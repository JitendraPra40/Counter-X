
package com.CounterX.repository;

import com.CounterX.entity.Payment;
import com.CounterX.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    // Get Payments By Order ID
    List<Payment> findByOrderId(Long orderId);

    // Get Payments By Payment Status
    List<Payment> findByPaymentStatus(
            PaymentStatus paymentStatus);

    // Get Payment By Transaction ID
    Optional<Payment> findByTransactionId(
            String transactionId);

    // Check Payment Already Exists For Order
    Optional<Payment> findFirstByOrderId(
            Long orderId);
}

