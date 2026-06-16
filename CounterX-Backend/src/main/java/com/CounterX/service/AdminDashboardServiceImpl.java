
package com.CounterX.service;

import com.CounterX.dto.AdminOrderDTO;
import com.CounterX.dto.CategoryRevenueDTO;
import com.CounterX.dto.TopItemDTO;
import com.CounterX.entity.Menu;
import com.CounterX.entity.Order;
import com.CounterX.entity.OrderItem;
import com.CounterX.entity.OrderStatus;
import com.CounterX.exception.ResourceNotFoundException;
import com.CounterX.repository.MenuRepository;
import com.CounterX.repository.OrderItemRepository;
import com.CounterX.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminDashboardServiceImpl
        implements AdminDashboardService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private MenuRepository menuRepository;

    // Get All Orders
    @Override
    public List<AdminOrderDTO> getAllOrders() {

        List<AdminOrderDTO> result = new ArrayList<>();

        for (Order order : orderRepository.findAll()) {

            result.add(
                    new AdminOrderDTO(
                            order.getOrderId(),
                            order.getDailyOrderNumber(),
                            order.getOrderType(),
                            order.getOrderStatus(),
                            order.getTotalAmount()
                    )
            );
        }

        return result;
    }

    // Top Selling Items
    @Override
    public List<TopItemDTO> getTopSellingItems() {

        Map<String, Integer> map = new HashMap<>();

        for (OrderItem item : orderItemRepository.findAll()) {

            map.put(
                    item.getItemName(),
                    map.getOrDefault(
                            item.getItemName(),
                            0
                    ) + item.getQuantity()
            );
        }

        List<TopItemDTO> result =
                new ArrayList<>();

        map.entrySet()
                .stream()
                .sorted((a, b) ->
                        b.getValue()
                                .compareTo(a.getValue()))
                .forEach(e ->
                        result.add(
                                new TopItemDTO(
                                        e.getKey(),
                                        e.getValue()
                                )
                        ));

        return result;
    }

    // Category Revenue
    @Override
    public List<CategoryRevenueDTO> getCategoryRevenue() {

        Map<String, Double> map =
                new HashMap<>();

        for (OrderItem item :
                orderItemRepository.findAll()) {

            Menu menu =
                    menuRepository
                            .findByItemNameIgnoreCase(
                                    item.getItemName())
                            .orElse(null);

            if (menu != null) {

                String category =
                        menu.getCategory().name();

                map.put(
                        category,
                        map.getOrDefault(
                                category,
                                0.0
                        ) + item.getTotalPrice()
                );
            }
        }

        List<CategoryRevenueDTO> result =
                new ArrayList<>();

        map.forEach(
                (k, v) ->
                        result.add(
                                new CategoryRevenueDTO(
                                        k,
                                        v
                                )
                        )
        );

        return result;
    }

    // Update Order Status
    @Override
    public Order updateOrderStatus(
            Long orderId,
            String status) {

        Order order =
                orderRepository.findById(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order Not Found"));

        order.setOrderStatus(
                OrderStatus.valueOf(
                        status.toUpperCase()
                )
        );

        return orderRepository.save(order);
    }

}
