package com.CounterX.Controller;

import com.CounterX.dto.CategoryRevenueDTO;
import com.CounterX.dto.TopItemDTO;
import com.CounterX.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
public class SalesController {

    @Autowired
    private SalesService salesService;

    // Top Selling Items
    @GetMapping("/top-items")
    public List<TopItemDTO> getTopItems() {
        return salesService.getTopSellingItems();
    }

    // Category Wise Revenue
    @GetMapping("/categories")
    public List<CategoryRevenueDTO> getCategoryRevenue() {
        return salesService.getCategoryRevenue();
    }
}