package com.CounterX.service;

import com.CounterX.dto.BillDTO;
import com.CounterX.entity.Bill;
import com.CounterX.entity.PaymentStatus;
import com.CounterX.exception.ResourceNotFoundException;
import com.CounterX.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Override
    public Bill generateBill(BillDTO dto) {

        // Prevent Duplicate Bill
        billRepository.findByOrderId(dto.getOrderId())
                .ifPresent(b -> {
                    throw new RuntimeException("Bill Already Generated");
                });

        Bill bill = new Bill();

        // Order Details
        bill.setOrderId(dto.getOrderId());
        bill.setDailyOrderNumber(dto.getDailyOrderNumber());
        bill.setOrderType(dto.getOrderType());

        // GST Calculation
        double subTotal = dto.getSubTotal();

        double gstAmount = subTotal * 0.05;

        double grandTotal = subTotal + gstAmount;

        bill.setSubTotal(subTotal);
        bill.setGstAmount(gstAmount);
        bill.setTotalAmount(grandTotal);

        // Payment Status
        bill.setPaymentStatus(PaymentStatus.SUCCESS);

        // Bill Time
        bill.setBillDateTime(LocalDateTime.now());

        return billRepository.save(bill);
    }

    @Override
    public Bill getBill(Long billId) {

        return billRepository.findById(billId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill Not Found"));
    }

    @Override
    public Bill getBillByOrder(Long orderId) {

        return billRepository.findByOrderId(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill Not Found"));
    }

    @Override
    public List<Bill> getAllBills() {

        return billRepository.findAll();
    }

    @Override
    public List<Bill> getBillsByDailyOrderNumber(Integer dailyOrderNumber) {

        return billRepository.findByDailyOrderNumber(dailyOrderNumber);
    }

    @Override
    public List<Bill> getBillsBetweenDates(
            LocalDateTime startDate,
            LocalDateTime endDate) {

        return billRepository.findByBillDateTimeBetween(
                startDate,
                endDate);
    }

    @Override
    public Double calculateGST(Double subTotal) {
        return subTotal * 0.05;
    }

    @Override
    public Double calculateGrandTotal(Double subTotal) {
        return subTotal + calculateGST(subTotal);
    }
}