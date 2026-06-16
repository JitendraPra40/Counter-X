package com.CounterX.service;

import com.CounterX.dto.CartDTO;
import com.CounterX.entity.Cart;

import java.util.List;

public interface CartService {

    Cart addCart(CartDTO dto);

    Cart getCart(Long cartId);

    List<Cart> getAllCarts();

    void deleteCart(Long cartId);

}