package com.CounterX.service;

import com.CounterX.dto.OrderDto;
import com.CounterX.entity.Order;
import com.CounterX.entity.OrderType;

import java.util.List;

public interface OrderService {

    // Place New Order
    Order placeOrder(OrderDto orderDTO);

    // Get Order By ID
    Order getOrder(Long orderId);

    // Get All Orders
    List<Order> getAllOrders();

    // Get Today's Orders
    List<Order> getTodayOrders();

    // Update Order Status
    Order updateOrderStatus(
            Long orderId,
            String orderStatus
    );

    // Update Order Type (DINE_IN / TAKE_AWAY)
    Order updateOrderType(
            Long orderId,
            OrderType orderType
    );

}