package com.CounterX.dto;

public class OrderItemDTO {

    // Order ID
    private Long orderId;

    // Food Item Name
    private String itemName;

    // Quantity
    private Integer quantity;

    // Price Per Item
    private Double price;

    public OrderItemDTO() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    // Calculate Total Price
    public Double getTotalPrice() {
        if (quantity == null || price == null) {
            return 0.0;
        }
        return quantity * price;
    }
}