
package com.CounterX.Controller;

import com.CounterX.dto.MenuDto;
import com.CounterX.entity.Category;
import com.CounterX.entity.Menu;
import com.CounterX.service.MenuService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/menu")
@CrossOrigin("*")
public class MenuController {

    @Autowired
    private MenuService service;

    // Add Menu
    @PostMapping
    public Menu save(
            @Valid @RequestBody MenuDto dto) {

        return service.addMenu(dto);
    }

    // Update Menu
    @PutMapping("/{id}")
    public Menu update(
            @PathVariable Long id,
            @Valid @RequestBody MenuDto dto) {

        return service.updateMenu(id, dto);
    }

    // Delete Menu
    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id) {

        service.deleteMenu(id);

        return "Menu Deleted Successfully";
    }

    // Get Menu By ID
    @GetMapping("/{id}")
    public Menu get(
            @PathVariable Long id) {

        return service.getMenu(id);
    }

    // Get All Menus (Admin)
    @GetMapping
    public List<Menu> getAll() {

        return service.getAllMenus();
    }

    // Get Menus By Category
    @GetMapping("/category/{category}")
    public List<Menu> getCategory(
            @PathVariable Category category) {

        return service.getCategoryMenus(category);
    }

    // Search Menu By Name
    @GetMapping("/search/{itemName}")
    public List<Menu> getByName(
            @PathVariable String itemName) {

        return service.getMenuByName(itemName);
    }

    // Update Availability
    @PutMapping("/availability/{itemName}/{available}")
    public Menu updateAvailability(
            @PathVariable String itemName,
            @PathVariable Boolean available) {

        return service.updateAvailability(
                itemName,
                available);
    }

    // Customer Menu (Only Available Items)
    @GetMapping("/available")
    public List<Menu> getAvailableMenus() {

        return service.getAvailableMenus();
    }

    // Customer Menu By Category
    @GetMapping("/available/category/{category}")
    public List<Menu> getAvailableMenusByCategory(
            @PathVariable Category category) {

        return service.getAvailableMenusByCategory(
                category);
    }

}
