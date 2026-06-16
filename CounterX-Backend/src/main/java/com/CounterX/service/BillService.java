package com.CounterX.service;

import com.CounterX.dto.BillDTO;
import com.CounterX.entity.Bill;

import java.time.LocalDateTime;
import java.util.List;

public interface BillService {

    // Generate Bill After Payment
    Bill generateBill(BillDTO dto);

    // Get Bill By Bill ID
    Bill getBill(Long billId);

    // Get Bill By Order ID
    Bill getBillByOrder(Long orderId);

    // Get All Bills
    List<Bill> getAllBills();

    // Get Bill By Daily Order Number (Token)
    List<Bill> getBillsByDailyOrderNumber(Integer dailyOrderNumber);

    // Get Bills Between Dates
    List<Bill> getBillsBetweenDates(
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    // Calculate GST (5%)
    Double calculateGST(Double subTotal);

    // Calculate Grand Total
    Double calculateGrandTotal(Double subTotal);
}