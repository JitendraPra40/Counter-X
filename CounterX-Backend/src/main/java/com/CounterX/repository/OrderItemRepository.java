package com.CounterX.repository;

import com.CounterX.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // Get all items by Order ID
    List<OrderItem> findByOrderId(Long orderId);

    // Get all items by Item Name
    List<OrderItem> findByItemName(String itemName);

    // Delete all items of an Order
    void deleteByOrderId(Long orderId);

    // Get all Order Items (for Top Items API)
    @Override
    List<OrderItem> findAll();
}