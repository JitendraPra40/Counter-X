package com.CounterX.Controller;

import com.CounterX.dto.*;
import com.CounterX.payload.ApiResponses;
import com.CounterX.service.InventoryDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard/inventory")
@RequiredArgsConstructor
@Tag(name = "Inventory Dashboard", description = "Inventory dashboard and consumption report APIs")
public class InventoryDashboardController {

    private final InventoryDashboardService dashboardService;

    @GetMapping("/summary")
    @Operation(summary = "Get inventory dashboard summary")
    public ApiResponses<List<DashboardSummaryDto>> summary() {

        return ApiResponses.<List<DashboardSummaryDto>>builder()
                .success(true)
                .message("Dashboard summary fetched")
                .data(
                        dashboardService
                                .getDashboardSummary())
                .timestamp(LocalDateTime.now())
                .build();
    }

}
