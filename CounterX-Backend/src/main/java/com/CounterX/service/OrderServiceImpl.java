package com.CounterX.service;

import com.CounterX.dto.OrderDto;
import com.CounterX.entity.Order;
import com.CounterX.entity.OrderStatus;
import com.CounterX.entity.OrderType;
import com.CounterX.entity.PaymentStatus;
import com.CounterX.exception.ResourceNotFoundException;
import com.CounterX.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order placeOrder(OrderDto orderDTO) {

        Order order = new Order();

        // Order Date
        order.setOrderDate(LocalDate.now());

        // Order Time
        order.setOrderDateTime(LocalDateTime.now());

        // Total Amount
        order.setTotalAmount(orderDTO.getTotalAmount());

        // Order Type
        order.setOrderType(orderDTO.getOrderType());

        // Payment Status
        order.setPaymentStatus(PaymentStatus.PENDING);

        // Order Status
        order.setOrderStatus(OrderStatus.PENDING_PAYMENT);

        // Token will be generated after payment
        order.setDailyOrderNumber(0);

        return orderRepository.save(order);
    }

    @Override
    public Order getOrder(Long orderId) {

        return orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order Not Found"));
    }

    @Override
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    @Override
    public List<Order> getTodayOrders() {

        return orderRepository.findByOrderDate(LocalDate.now());
    }

    @Override
    public Order updateOrderStatus(Long orderId, String orderStatus) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order Not Found"));

        order.setOrderStatus(
                OrderStatus.valueOf(orderStatus.toUpperCase()));

        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderType(Long orderId, OrderType orderType) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order Not Found"));

        order.setOrderType(orderType);

        return orderRepository.save(order);
    }
}