package com.CounterX.service;

import com.CounterX.dto.AdminOrderDTO;
import com.CounterX.dto.CategoryRevenueDTO;
import com.CounterX.dto.TopItemDTO;
import com.CounterX.entity.Order;

import java.util.List;

public interface AdminDashboardService {

    /**
     * Get All Orders for Admin Dashboard
     */
    List<AdminOrderDTO> getAllOrders();

    /**
     * Get Top Selling Items
     */
    List<TopItemDTO> getTopSellingItems();

    /**
     * Get Category Wise Revenue
     */
    List<CategoryRevenueDTO> getCategoryRevenue();

    /**
     * Update Order Status
     */
    Order updateOrderStatus(
            Long orderId,
            String status
    );

}