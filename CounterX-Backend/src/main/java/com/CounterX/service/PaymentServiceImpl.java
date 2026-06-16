
package com.CounterX.service;

import com.CounterX.dto.BillDTO;
import com.CounterX.dto.PaymentDTO;
import com.CounterX.entity.Order;
import com.CounterX.entity.OrderStatus;
import com.CounterX.entity.Payment;
import com.CounterX.entity.PaymentStatus;
import java.time.LocalDate;
import java.util.List;
import java.io.ByteArrayOutputStream;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

import com.CounterX.util.QRCodeGenerator;
import com.CounterX.exception.ResourceNotFoundException;
import com.CounterX.repository.OrderRepository;
import com.CounterX.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RevenueService revenueService;

    @Autowired
    private BillService billService;

    
    @Override
    public Payment processPayment(PaymentDTO dto) {

        // Get Order
        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order Not Found"));

        // Check Payment Already Exists
        paymentRepository.findFirstByOrderId(dto.getOrderId())
                .ifPresent(payment -> {
                    throw new RuntimeException(
                            "Payment Already Completed");
                });

        // Create Payment
        Payment payment = new Payment();

        payment.setOrderId(order.getOrderId());
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());

        payment.setTransactionId(
                "TXN-" + UUID.randomUUID()
                        .toString()
                        .substring(0, 8));

        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setPaymentTime(LocalDateTime.now());

        // Save Payment
        Payment savedPayment = paymentRepository.save(payment);

        // Update Order Payment Status
        order.setPaymentStatus(PaymentStatus.SUCCESS);

        // Generate Next Token Number
        Order lastOrder =
                orderRepository.findTopByOrderDateOrderByDailyOrderNumberDesc(
                        LocalDate.now());

        int nextToken = 1;

        if (lastOrder != null &&
                lastOrder.getDailyOrderNumber() != null) {

            nextToken =
                    lastOrder.getDailyOrderNumber() + 1;
        }

        order.setDailyOrderNumber(nextToken);

        // Update Order Status
        order.setOrderStatus(OrderStatus.PLACED);

        // Save Order
        orderRepository.save(order);

        // Update Revenue
        revenueService.updateDailyRevenue(
                savedPayment.getAmount());

        // Generate Bill
        BillDTO billDTO = new BillDTO();

        billDTO.setOrderId(order.getOrderId());
        billDTO.setDailyOrderNumber(order.getDailyOrderNumber());
        billDTO.setOrderType(order.getOrderType());
        billDTO.setTotalAmount(order.getTotalAmount());

        billService.generateBill(billDTO);

        return savedPayment;
    }
   
        @Override
        public Payment getPayment(Long paymentId) {

            return paymentRepository.findById(paymentId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Payment Not Found"));
        }

        @Override
        public List<Payment> getAllPayments() {

            return paymentRepository.findAll();
        }

        @Override
        public List<Payment> getPaymentsByOrder(Long orderId) {

            return paymentRepository.findByOrderId(orderId);
        }

        @Override
        public Payment getPaymentByTransactionId(
                String transactionId) {

            return paymentRepository
                    .findByTransactionId(transactionId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Transaction Not Found"));
        }

        @Override
        public byte[] generateQr(Long orderId) {

            Order order =
                    orderRepository.findById(orderId)
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Order Not Found"));

            // Unique Transaction ID
            String transactionId =
                    "TXN-" +
                            UUID.randomUUID()
                                    .toString();

            // Generate UPI URL
            String upiUrl =
                    QRCodeGenerator.generateUPIQRCode(
                            "counterx@paytm",
                            "CounterX",
                            order.getTotalAmount(),
                            transactionId
                    );

            try {

                BitMatrix bitMatrix =
                        new MultiFormatWriter().encode(
                                upiUrl,
                                BarcodeFormat.QR_CODE,
                                300,
                                300
                        );

                ByteArrayOutputStream outputStream =
                        new ByteArrayOutputStream();

                MatrixToImageWriter.writeToStream(
                        bitMatrix,
                        "PNG",
                        outputStream
                );

                return outputStream.toByteArray();

            } catch (Exception e) {

                throw new RuntimeException(
                        "QR Code Generation Failed");
            }
        }
        
    }

