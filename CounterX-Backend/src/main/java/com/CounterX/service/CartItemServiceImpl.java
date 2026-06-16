package com.CounterX.service;

import com.CounterX.dto.CartItemDTO;
import com.CounterX.entity.CartItem;
import com.CounterX.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemServiceImpl
        implements CartItemService {

    @Autowired
    private CartItemRepository repository;

    @Override
    public CartItem addCartItem(CartItemDTO dto) {

        CartItem item = new CartItem();

        item.setCartId(dto.getCartId());
        item.setItemName(dto.getItemName());
        item.setQuantity(dto.getQuantity());
        item.setPrice(dto.getPrice());
        item.setTotalPrice(
                dto.getQuantity() * dto.getPrice());

        return repository.save(item);
    }

    @Override
    public List<CartItem> getCartItems(Long cartId) {

        return repository.findByCartId(cartId);
    }

    @Override
    public List<CartItem> getAllCartItems() {

        return repository.findAll();
    }

    @Override
    public void deleteCartItem(Long cartItemId) {

        repository.deleteById(cartItemId);
    }

    @Override
    public void clearCart(Long cartId) {

        repository.deleteByCartId(cartId);
    }
}