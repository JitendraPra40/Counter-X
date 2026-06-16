package com.CounterX.repository;

import com.CounterX.entity.Bill;
import com.CounterX.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Long> {

    // Get Bill By Order ID
    Optional<Bill> findByOrderId(Long orderId);

    // Get Bill By Token Number
    List<Bill> findByDailyOrderNumber(Integer dailyOrderNumber);

    // Get Bills Between Dates
    List<Bill> findByBillDateTimeBetween(
            LocalDateTime startDate,
            LocalDateTime endDate);

    // Get Bills By Payment Status
    List<Bill> findByPaymentStatus(PaymentStatus paymentStatus);

    // Get Today's Bills
    List<Bill> findByBillDateTimeAfter(LocalDateTime startOfDay);
}