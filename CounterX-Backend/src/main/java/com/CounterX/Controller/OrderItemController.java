
package com.CounterX.Controller;

import com.CounterX.dto.OrderItemDTO;
import com.CounterX.entity.OrderItem;
import com.CounterX.service.OrderItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-items")
@CrossOrigin("*")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    // Add Order Item
    @PostMapping
    public OrderItem addOrderItem(
            @Valid @RequestBody OrderItemDTO orderItemDTO) {

        return orderItemService.addOrderItem(orderItemDTO);
    }

    // Get All Order Items
    @GetMapping
    public List<OrderItem> getAllOrderItems() {

        return orderItemService.getAllOrderItems();
    }

    // Get Order Item By ID
    @GetMapping("/{orderItemId}")
    public OrderItem getOrderItem(
            @PathVariable Long orderItemId) {

        return orderItemService.getOrderItem(orderItemId);
    }

    // Get Items By Order ID
    @GetMapping("/order/{orderId}")
    public List<OrderItem> getOrderItemsByOrderId(
            @PathVariable Long orderId) {

        return orderItemService.getOrderItemsByOrderId(orderId);
    }

    // Update Order Item
    @PutMapping("/{orderItemId}")
    public OrderItem updateOrderItem(
            @PathVariable Long orderItemId,
            @Valid @RequestBody OrderItemDTO orderItemDTO) {

        return orderItemService.updateOrderItem(
                orderItemId,
                orderItemDTO);
    }

    // Delete Single Order Item
    @DeleteMapping("/{orderItemId}")
    public String deleteOrderItem(
            @PathVariable Long orderItemId) {

        orderItemService.deleteOrderItem(orderItemId);

        return "Order Item Deleted Successfully";
    }

    // Delete All Items Of An Order
    @DeleteMapping("/order/{orderId}")
    public String deleteByOrderId(
            @PathVariable Long orderId) {

        orderItemService.deleteByOrderId(orderId);

        return "All Order Items Deleted Successfully";
    }
}
