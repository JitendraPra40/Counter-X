
package com.CounterX.service;

import com.CounterX.dto.MenuDto;
import com.CounterX.entity.Category;
import com.CounterX.entity.Menu;
import com.CounterX.exception.ResourceNotFoundException;
import com.CounterX.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuRepository repository;

    // Add Menu
    @Override
    public Menu addMenu(MenuDto dto) {

        Menu menu = new Menu();

        menu.setItemName(dto.getItemName());
        menu.setDescription(dto.getDescription());
        menu.setPrice(dto.getPrice());
        menu.setCategory(dto.getCategory());

        menu.setAvailable(
                dto.getAvailable() != null
                        ? dto.getAvailable()
                        : true
        );

        menu.setImagePath(dto.getImagePath());

        return repository.save(menu);
    }

    // Update Menu
    @Override
    public Menu updateMenu(Long id, MenuDto dto) {

        Menu menu = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Menu Not Found"));

        menu.setItemName(dto.getItemName());
        menu.setDescription(dto.getDescription());
        menu.setPrice(dto.getPrice());
        menu.setCategory(dto.getCategory());
        menu.setAvailable(dto.getAvailable());
        menu.setImagePath(dto.getImagePath());

        return repository.save(menu);
    }

    // Delete Menu
    @Override
    public void deleteMenu(Long id) {

        Menu menu = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Menu Not Found"));

        repository.delete(menu);
    }

    // Get Menu By ID
    @Override
    public Menu getMenu(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Menu Not Found"));
    }

    // Get All Menus (Admin)
    @Override
    public List<Menu> getAllMenus() {

        return repository.findAll();
    }

    // Get Menus By Category
    @Override
    public List<Menu> getCategoryMenus(Category category) {

        return repository.findByCategory(category);
    }

    // Search Menu By Name
    @Override
    public List<Menu> getMenuByName(String itemName) {

        return repository.findByItemNameContainingIgnoreCase(itemName);
    }

    // Update Availability
    @Override
    public Menu updateAvailability(
            String itemName,
            Boolean available) {

        Menu menu = repository
                .findByItemNameIgnoreCase(itemName)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Menu Not Found"));

        menu.setAvailable(available);

        return repository.save(menu);
    }

    // Customer Menu
    // Return ALL items so frontend can show
    // Available / Not Available UI
    @Override
    public List<Menu> getAvailableMenus() {

        return repository.findAll();
    }

    // Customer Menu By Category
    @Override
    public List<Menu> getAvailableMenusByCategory(
            Category category) {

        return repository.findByCategory(category);
    }

}
