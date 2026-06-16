
package com.CounterX.dto;

public class CartItemDTO {

    private Long cartId;

    private String itemName;

    private Integer quantity;

    private Double price;

    public CartItemDTO() {
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
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

    public Double getTotalPrice() {

        if (quantity != null && price != null) {
            return quantity * price;
        }

        return 0.0;
    }
}
