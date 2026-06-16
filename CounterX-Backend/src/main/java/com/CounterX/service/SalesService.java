package com.CounterX.service;

import com.CounterX.dto.CategoryRevenueDTO;
import com.CounterX.dto.TopItemDTO;

import java.util.List;

public interface SalesService {

    // Top Selling Items
    List<TopItemDTO> getTopSellingItems();

    // Category Wise Revenue
    List<CategoryRevenueDTO> getCategoryRevenue();

}




