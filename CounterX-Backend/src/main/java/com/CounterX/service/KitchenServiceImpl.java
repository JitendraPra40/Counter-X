package com.CounterX.service;

import com.CounterX.dto.KitchenOrderDTO;
import com.CounterX.entity.Order;
import com.CounterX.entity.OrderStatus;
import com.CounterX.exception.ResourceNotFoundException;
import com.CounterX.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KitchenServiceImpl implements KitchenService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<KitchenOrderDTO> getKitchenOrders() {

        List<KitchenOrderDTO> result = new ArrayList<>();

        for (Order order : orderRepository.findAll()) {

            result.add(new KitchenOrderDTO(
                    order.getOrderId(),
                    order.getDailyOrderNumber(),
                    order.getOrderType(),
                    order.getOrderStatus(),
                    order.getTotalAmount()
            ));
        }

        return result;
    }

    @Override
    public Order updateKitchenStatus(
            Long orderId,
            String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order Not Found"));

        order.setOrderStatus(
                OrderStatus.valueOf(status.toUpperCase()));

        return orderRepository.save(order);
    }
}