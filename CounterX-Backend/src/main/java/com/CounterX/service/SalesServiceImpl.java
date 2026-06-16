package com.CounterX.service;

import com.CounterX.dto.CategoryRevenueDTO;
import com.CounterX.dto.TopItemDTO;
import com.CounterX.entity.Menu;
import com.CounterX.entity.OrderItem;
import com.CounterX.repository.MenuRepository;
import com.CounterX.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SalesServiceImpl implements SalesService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Override
    public List<TopItemDTO> getTopSellingItems() {

        Map<String, Integer> itemMap = new HashMap<>();

        for (OrderItem item : orderItemRepository.findAll()) {

            itemMap.put(
                    item.getItemName(),
                    itemMap.getOrDefault(item.getItemName(), 0)
                            + item.getQuantity()
            );
        }

        List<TopItemDTO> result = new ArrayList<>();

        itemMap.entrySet()
                .stream()
                .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
                .forEach(e ->
                        result.add(
                                new TopItemDTO(
                                        e.getKey(),
                                        e.getValue()
                                )
                        ));

        return result;
    }

    @Override
    public List<CategoryRevenueDTO> getCategoryRevenue() {

        Map<String, Double> categoryMap = new HashMap<>();

        for (OrderItem item : orderItemRepository.findAll()) {

            Menu menu = menuRepository
                    .findByItemNameIgnoreCase(item.getItemName())
                    .orElse(null);

            if (menu != null) {

                String category = menu.getCategory().name();

                categoryMap.put(
                        category,
                        categoryMap.getOrDefault(category, 0.0)
                                + item.getTotalPrice()
                );
            }
        }

        List<CategoryRevenueDTO> result = new ArrayList<>();

        categoryMap.entrySet()
                .stream()
                .sorted((a, b) -> Double.compare(b.getValue(), a.getValue()))
                .forEach(e ->
                        result.add(
                                new CategoryRevenueDTO(
                                        e.getKey(),
                                        e.getValue()
                                )
                        ));

        return result;
    }
}