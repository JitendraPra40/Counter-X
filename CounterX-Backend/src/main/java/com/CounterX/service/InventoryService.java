package com.CounterX.service;

import com.CounterX.dto.*;
import com.CounterX.entity.Inventory;
import com.CounterX.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryResponseDto createInventory(
            InventoryRequestDto dto) {

        Inventory inventory = Inventory.builder()
                .itemName(dto.getItemName())
                .category(dto.getCategory())
                .unitType(dto.getUnitType())
                .availableStock(dto.getAvailableStock())
                .pricePerUnit(dto.getPricePerUnit())
                .receivedDate(dto.getReceivedDate())
                .createdBy(dto.getCreatedBy())
                .updatedBy(dto.getUpdatedBy())
                .build();

        Inventory saved =
                inventoryRepository.save(inventory);

        return mapToResponse(saved);
    }

    public InventoryResponseDto updateInventory(
            Long inventoryId,
            InventoryRequestDto dto) {

        Inventory inventory =
                inventoryRepository
                        .findByInventoryIdAndDeletedFalse(
                                inventoryId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory not found"));

        inventory.setItemName(dto.getItemName());
        inventory.setCategory(dto.getCategory());
        inventory.setUnitType(dto.getUnitType());
        inventory.setAvailableStock(dto.getAvailableStock());
        inventory.setPricePerUnit(dto.getPricePerUnit());
        inventory.setReceivedDate(dto.getReceivedDate());
        inventory.setUpdatedBy(dto.getUpdatedBy());

        Inventory saved =
                inventoryRepository.save(inventory);

        return mapToResponse(saved);
    }

    public void deleteInventory(
            Long inventoryId) {

        Inventory inventory =
                inventoryRepository
                        .findByInventoryIdAndDeletedFalse(
                                inventoryId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory not found"));

        inventory.setDeleted(true);

        inventoryRepository.save(inventory);

    }

    public InventoryResponseDto getInventoryById(
            Long inventoryId) {

        Inventory inventory =
                inventoryRepository
                        .findByInventoryIdAndDeletedFalse(
                                inventoryId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory not found"));

        return mapToResponse(inventory);
    }

    public List<InventoryResponseDto> getAllInventory() {

        return inventoryRepository
                .findByDeletedFalse()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private InventoryResponseDto mapToResponse(
            Inventory inventory) {

        return InventoryResponseDto.builder()
                .inventoryId(inventory.getInventoryId())
                .itemName(inventory.getItemName())
                .category(inventory.getCategory())
                .unitType(inventory.getUnitType())
                .availableStock(inventory.getAvailableStock())
                .pricePerUnit(inventory.getPricePerUnit())
                .receivedDate(inventory.getReceivedDate())
                .deleted(inventory.getDeleted())
                .createdAt(inventory.getCreatedAt())
                .createdBy(inventory.getCreatedBy())
                .updatedAt(inventory.getUpdatedAt())
                .updatedBy(inventory.getUpdatedBy())
                .build();
    }

}