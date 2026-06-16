
package com.CounterX.service;

import com.CounterX.dto.MenuDto;
import com.CounterX.entity.Category;
import com.CounterX.entity.Menu;

import java.util.List;

public interface MenuService {

    // Add Menu
    Menu addMenu(MenuDto dto);

    // Update Menu
    Menu updateMenu(Long id, MenuDto dto);

    // Delete Menu
    void deleteMenu(Long id);

    // Get Menu By ID
    Menu getMenu(Long id);

    // Get All Menus (Admin)
    List<Menu> getAllMenus();

    // Get Menu By Category
    List<Menu> getCategoryMenus(Category category);

    // Search Menu By Name
    List<Menu> getMenuByName(String itemName);

    // Update Availability
    Menu updateAvailability(
            String itemName,
            Boolean available);

    // Get Only Available Menu Items
    List<Menu> getAvailableMenus();

    // Get Available Menu Items By Category
    List<Menu> getAvailableMenusByCategory(
            Category category);

}
