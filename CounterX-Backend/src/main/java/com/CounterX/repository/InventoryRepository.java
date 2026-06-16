package com.CounterX.repository;

import com.CounterX.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    List<Inventory> findByDeletedFalse();

//    boolean existsByIdAndDeletedFalse(@NotBlank(message = "Item name is required")
//                                      @Size(min = 2, max = 255,
//                                              message = "Item name must be between 2 and 255 characters")
//                                      String itemName);

    Optional<Inventory> findByInventoryIdAndDeletedFalse(Long inventoryId);
}
