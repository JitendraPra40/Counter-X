package com.CounterX.repository;

import com.CounterX.entity.Category;
import com.CounterX.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MenuRepository
        extends JpaRepository<Menu, Long> {

    // Get Menu By Category
    List<Menu> findByCategory(Category category);

    // Search Menu By Item Name
    List<Menu> findByItemNameContainingIgnoreCase(String itemName);

    // Find Menu By Exact Item Name
    Optional<Menu> findByItemNameIgnoreCase(String itemName);

    // Available Menu Items
    List<Menu> findByAvailableTrue();

    // Available Menu By Category
    List<Menu> findByCategoryAndAvailableTrue(Category category);

    // ⭐ Required for Sales Dashboard
    Optional<Menu> findByItemName(String itemName);

}