package com.CounterX.service;

import com.CounterX.dto.CartItemDTO;
import com.CounterX.entity.CartItem;

import java.util.List;

public interface CartItemService {

    CartItem addCartItem(CartItemDTO dto);

    List<CartItem> getCartItems(Long cartId);

    List<CartItem> getAllCartItems();

    void deleteCartItem(Long cartItemId);

    void clearCart(Long cartId);

}