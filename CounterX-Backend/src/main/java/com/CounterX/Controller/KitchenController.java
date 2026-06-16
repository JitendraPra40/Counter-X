
package com.CounterX.Controller;

import com.CounterX.dto.KitchenOrderDTO;
import com.CounterX.entity.Order;
import com.CounterX.service.KitchenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kitchen")
@CrossOrigin("*")
public class KitchenController {

    @Autowired
    private KitchenService kitchenService;

    @GetMapping("/orders")
    public List<KitchenOrderDTO> getKitchenOrders() {

        return kitchenService.getKitchenOrders();
    }

    @PutMapping("/orders/{id}/status")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return kitchenService.updateKitchenStatus(
                id,
                status);
    }
}
