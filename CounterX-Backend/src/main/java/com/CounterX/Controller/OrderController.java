
package com.CounterX.Controller;

import com.CounterX.dto.OrderDto;
import com.CounterX.entity.Order;
import com.CounterX.entity.OrderType;
import com.CounterX.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Place New Order
    @PostMapping
    public Order placeOrder(
            @RequestBody OrderDto orderDTO) {

        return orderService.placeOrder(orderDTO);
    }

    // Get All Orders
    @GetMapping
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }

    // Get Order By ID
    @GetMapping("/{id}")
    public Order getOrder(
            @PathVariable Long id) {

        return orderService.getOrder(id);
    }

    // Get Today's Orders
    @GetMapping("/today")
    public List<Order> getTodayOrders() {

        return orderService.getTodayOrders();
    }

    // Update Order Status
    @PutMapping("/{orderId}/status/{status}")
    public Order updateOrderStatus(
            @PathVariable Long orderId,
            @PathVariable String status) {

        return orderService.updateOrderStatus(
                orderId,
                status
        );
    }

    // Update Order Type
    @PutMapping("/{orderId}/type/{orderType}")
    public Order updateOrderType(
            @PathVariable Long orderId,
            @PathVariable OrderType orderType) {

        return orderService.updateOrderType(
                orderId,
                orderType
        );
    }

}

