package com.CounterX.Controller;

import com.CounterX.dto.*;
import com.CounterX.payload.ApiResponses;
import com.CounterX.service.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@Tag(name = "Inventory", description = "Inventory, stock, history, and alert APIs")
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    @Operation(summary = "Create inventory item")
    public ResponseEntity<ApiResponses<InventoryResponseDto>>
    createInventory(
            @Valid
            @RequestBody
            InventoryRequestDto request) {

        return ResponseEntity.ok(
                ApiResponses.<InventoryResponseDto>builder()
                        .success(true)
                        .message("Inventory created successfully")
                        .data(
                                inventoryService.createInventory(
                                        request))
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping
    @Operation(summary = "Get all active inventory items")
    public ResponseEntity<ApiResponses<List<InventoryResponseDto>>>
    getAllInventory() {

        return ResponseEntity.ok(
                ApiResponses.<List<InventoryResponseDto>>builder()
                        .success(true)
                        .message("Inventory fetched successfully")
                        .data(
                                inventoryService.getAllInventory())
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get inventory item by ID")
    public ResponseEntity<ApiResponses<InventoryResponseDto>>
    getInventoryById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponses.<InventoryResponseDto>builder()
                        .success(true)
                        .message("Inventory fetched successfully")
                        .data(
                                inventoryService.getInventoryById(id))
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update inventory item")
    public ResponseEntity<ApiResponses<InventoryResponseDto>>
    updateInventory(
            @PathVariable Long id,
            @Valid
            @RequestBody
            InventoryRequestDto request) {

        return ResponseEntity.ok(
                ApiResponses.<InventoryResponseDto>builder()
                        .success(true)
                        .message("Inventory updated successfully")
                        .data(
                                inventoryService.updateInventory(
                                        id,
                                        request))
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete inventory item")
    public ResponseEntity<ApiResponses<String>>
    deleteInventory(
            @PathVariable Long id) {

        inventoryService.deleteInventory(id);

        return ResponseEntity.ok(
                ApiResponses.<String>builder()
                        .success(true)
                        .message("Inventory deleted successfully")
                        .data("Deleted")
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

}
