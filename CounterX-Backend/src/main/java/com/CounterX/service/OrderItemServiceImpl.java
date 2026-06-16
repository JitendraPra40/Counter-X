
package com.CounterX.service;

import com.CounterX.dto.OrderItemDTO;
import com.CounterX.entity.OrderItem;
import com.CounterX.exception.ResourceNotFoundException;
import com.CounterX.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public OrderItem addOrderItem(OrderItemDTO orderItemDTO) {

        OrderItem orderItem = new OrderItem();

        orderItem.setOrderId(orderItemDTO.getOrderId());
        orderItem.setItemName(orderItemDTO.getItemName());
        orderItem.setQuantity(orderItemDTO.getQuantity());
        orderItem.setPrice(orderItemDTO.getPrice());

        // Calculate Total Price
        orderItem.setTotalPrice(
                orderItemDTO.getQuantity()
                        * orderItemDTO.getPrice()
        );

        return orderItemRepository.save(orderItem);
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(
            Long orderId) {

        return orderItemRepository.findByOrderId(orderId);
    }

    @Override
    public OrderItem getOrderItem(
            Long orderItemId) {

        return orderItemRepository.findById(orderItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order Item Not Found"));
    }

    @Override
    public List<OrderItem> getAllOrderItems() {

        return orderItemRepository.findAll();
    }

    @Override
    public OrderItem updateOrderItem(
            Long orderItemId,
            OrderItemDTO orderItemDTO) {

        OrderItem orderItem =
                orderItemRepository.findById(orderItemId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order Item Not Found"));

        orderItem.setOrderId(orderItemDTO.getOrderId());
        orderItem.setItemName(orderItemDTO.getItemName());
        orderItem.setQuantity(orderItemDTO.getQuantity());
        orderItem.setPrice(orderItemDTO.getPrice());

        orderItem.setTotalPrice(
                orderItemDTO.getQuantity()
                        * orderItemDTO.getPrice()
        );

        return orderItemRepository.save(orderItem);
    }

    @Override
    public void deleteOrderItem(
            Long orderItemId) {

        OrderItem orderItem =
                orderItemRepository.findById(orderItemId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order Item Not Found"));

        orderItemRepository.delete(orderItem);
    }

    @Override
    public void deleteByOrderId(
            Long orderId) {

        orderItemRepository.deleteByOrderId(orderId);
    }
}

