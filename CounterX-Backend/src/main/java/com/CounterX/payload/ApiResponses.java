package com.CounterX.payload;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponses<T> {

    private boolean success;

    private String message;

    private T data;

    private LocalDateTime timestamp;
}