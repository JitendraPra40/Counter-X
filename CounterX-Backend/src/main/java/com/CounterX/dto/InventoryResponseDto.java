package com.CounterX.dto;

import com.CounterX.enums.Category;
import com.CounterX.enums.UnitType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryResponseDto {

    private Long inventoryId;

    private String itemName;

    private Category category;

    private UnitType unitType;

    private BigDecimal availableStock;

    private BigDecimal pricePerUnit;

    private LocalDate receivedDate;

    private Boolean deleted;

    private LocalDateTime createdAt;

    private String createdBy;

    private LocalDateTime updatedAt;

    private String updatedBy;
}