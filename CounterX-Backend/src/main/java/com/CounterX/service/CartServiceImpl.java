package com.CounterX.service;

import com.CounterX.dto.CartDTO;
import com.CounterX.entity.Cart;
import com.CounterX.exception.ResourceNotFoundException;
import com.CounterX.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CartServiceImpl
        implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart addCart(CartDTO dto) {

        Cart cart = new Cart();

        cart.setTotalAmount(dto.getTotalAmount());
        cart.setCreatedTime(LocalDateTime.now());

        return cartRepository.save(cart);
    }

    @Override
    public Cart getCart(Long cartId) {

        return cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cart Not Found"));
    }

    @Override
    public List<Cart> getAllCarts() {

        return cartRepository.findAll();
    }

    @Override
    public void deleteCart(Long cartId) {

        cartRepository.deleteById(cartId);
    }
}