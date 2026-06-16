package com.CounterX.Controller;

import com.CounterX.entity.Bill;
import com.CounterX.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin("*")
public class BillController {

    @Autowired
    private BillService billService;

    // Get Bill By Bill ID (Admin)
    @GetMapping("/{billId}")
    public Bill getBill(@PathVariable Long billId) {

        return billService.getBill(billId);
    }

    // Customer Bill Download (Order Receipt)
    @GetMapping("/order/{orderId}")
    public Bill getBillByOrder(@PathVariable Long orderId) {

        return billService.getBillByOrder(orderId);
    }

    // Get Bill By Token Number (Admin)
    @GetMapping("/token/{dailyOrderNumber}")
    public List<Bill> getBillsByDailyOrderNumber(
            @PathVariable Integer dailyOrderNumber) {

        return billService.getBillsByDailyOrderNumber(dailyOrderNumber);
    }

    // Get All Bills (Admin)
    @GetMapping
    public List<Bill> getAllBills() {

        return billService.getAllBills();
    }
}