
package com.CounterX.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;

    // Food Name
    @Column(nullable = false)
    private String itemName;

    // Food Description
    @Column(length = 500)
    private String description;

    // Price
    @Column(nullable = false)
    private Double price;

    // BREAKFAST / MEALS / SNACKS / DRINKS / DESSERT
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    // Available or Not
    @Column(nullable = false)
    private Boolean available = true;

    // Food Image URL or Path
    @Column(length = 1000)
    private String imagePath;

    public Menu() {
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}

