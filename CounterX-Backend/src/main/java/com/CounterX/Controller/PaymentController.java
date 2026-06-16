
package com.CounterX.Controller;

import com.CounterX.dto.PaymentDTO;
import com.CounterX.entity.Payment;
import com.CounterX.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Process Payment
    @PostMapping
    public Payment processPayment(
            @Valid @RequestBody PaymentDTO dto) {

        return paymentService.processPayment(dto);
    }

    // Get Payment By ID
    @GetMapping("/{paymentId}")
    public Payment getPayment(
            @PathVariable Long paymentId) {

        return paymentService.getPayment(paymentId);
    }

    // Get All Payments
    @GetMapping
    public List<Payment> getAllPayments() {

        return paymentService.getAllPayments();
    }

    // Get Payments By Order ID
    @GetMapping("/order/{orderId}")
    public List<Payment> getPaymentsByOrder(
            @PathVariable Long orderId) {

        return paymentService.getPaymentsByOrder(orderId);
    }

    // Get Payment By Transaction ID
    @GetMapping("/transaction/{transactionId}")
    public Payment getPaymentByTransactionId(
            @PathVariable String transactionId) {

        return paymentService.getPaymentByTransactionId(
                transactionId);
    }

    // Generate QR Code
    @GetMapping(
            value = "/qr/{orderId}",
            produces = MediaType.IMAGE_PNG_VALUE
    )
    public byte[] generateQr(
            @PathVariable Long orderId) {

        return paymentService.generateQr(orderId);
    }
}
