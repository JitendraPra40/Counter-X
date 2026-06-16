
package com.CounterX.Controller;

import com.CounterX.dto.AdminOrderDTO;
import com.CounterX.dto.CategoryRevenueDTO;
import com.CounterX.dto.TopItemDTO;
import com.CounterX.entity.Order;
import com.CounterX.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService adminDashboardService;

    // Get All Orders
    @GetMapping("/orders")
    public List<AdminOrderDTO> getAllOrders() {

        return adminDashboardService.getAllOrders();
    }

    // Get Top Selling Items
    @GetMapping("/top-items")
    public List<TopItemDTO> getTopSellingItems() {

        return adminDashboardService.getTopSellingItems();
    }

    // Get Category Revenue
    @GetMapping("/category-revenue")
    public List<CategoryRevenueDTO> getCategoryRevenue() {

        return adminDashboardService.getCategoryRevenue();
    }

    // Update Order Status
    @PutMapping("/orders/{id}/status")
    public Order updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return adminDashboardService.updateOrderStatus(
                id,
                status
        );
    }

}
