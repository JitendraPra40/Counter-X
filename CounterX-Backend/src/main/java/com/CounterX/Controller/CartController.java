
package com.CounterX.Controller;

import com.CounterX.dto.CartDTO;
import com.CounterX.entity.Cart;
import com.CounterX.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public Cart addCart(
            @RequestBody CartDTO dto) {

        return cartService.addCart(dto);
    }

    @GetMapping("/{cartId}")
    public Cart getCart(
            @PathVariable Long cartId) {

        return cartService.getCart(cartId);
    }

    @GetMapping
    public List<Cart> getAllCarts() {

        return cartService.getAllCarts();
    }

    @DeleteMapping("/{cartId}")
    public String deleteCart(
            @PathVariable Long cartId) {

        cartService.deleteCart(cartId);

        return "Cart Deleted Successfully";
    }
}

