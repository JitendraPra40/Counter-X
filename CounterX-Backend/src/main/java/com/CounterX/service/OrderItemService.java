
package com.CounterX.service;

import com.CounterX.dto.OrderItemDTO;
import com.CounterX.entity.OrderItem;

import java.util.List;

public interface OrderItemService {

    /**
     * Add a food item to an order
     */
    OrderItem addOrderItem(OrderItemDTO orderItemDTO);

    /**
     * Get all items for a particular order
     */
    List<OrderItem> getOrderItemsByOrderId(Long orderId);

    /**
     * Get a single order item
     */
    OrderItem getOrderItem(Long orderItemId);

    /**
     * Get all order items
     */
    List<OrderItem> getAllOrderItems();

    /**
     * Update an order item
     */
    OrderItem updateOrderItem(
            Long orderItemId,
            OrderItemDTO orderItemDTO
    );

    /**
     * Delete a single order item
     */
    void deleteOrderItem(Long orderItemId);

    /**
     * Delete all items of an order
     */
    void deleteByOrderId(Long orderId);

}
