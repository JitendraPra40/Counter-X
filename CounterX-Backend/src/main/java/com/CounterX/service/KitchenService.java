
package com.CounterX.service;

import com.CounterX.dto.KitchenOrderDTO;
import com.CounterX.entity.Order;

import java.util.List;

public interface KitchenService {

    List<KitchenOrderDTO> getKitchenOrders();

    Order updateKitchenStatus(
            Long orderId,
            String status
    );

}
