
package com.CounterX.Controller;

import com.CounterX.dto.CartItemDTO;
import com.CounterX.entity.CartItem;
import com.CounterX.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart-items")
@CrossOrigin("*")
public class CartItemController {

    @Autowired
    private CartItemService service;

    @PostMapping
    public CartItem addCartItem(
            @RequestBody CartItemDTO dto) {

        return service.addCartItem(dto);
    }

    @GetMapping("/{cartId}")
    public List<CartItem> getCartItems(
            @PathVariable Long cartId) {

        return service.getCartItems(cartId);
    }

    @GetMapping
    public List<CartItem> getAllCartItems() {

        return service.getAllCartItems();
    }

    @DeleteMapping("/{cartItemId}")
    public String deleteCartItem(
            @PathVariable Long cartItemId) {

        service.deleteCartItem(cartItemId);

        return "Cart Item Deleted Successfully";
    }

    @DeleteMapping("/clear/{cartId}")
    public String clearCart(
            @PathVariable Long cartId) {

        service.clearCart(cartId);

        return "Cart Cleared Successfully";
    }
}

