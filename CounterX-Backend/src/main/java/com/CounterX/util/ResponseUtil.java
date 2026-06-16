package com.CounterX.util;

import com.CounterX.payload.ApiResponse;

import java.time.LocalDateTime;

public class ResponseUtil {

    public static <T> ApiResponse<T> success(
            String message,
            T data) {

        ApiResponse<T> response =
                new ApiResponse<>();

        response.setSuccess(true);
        response.setMessage(message);
        response.setData(data);
        response.setTimestamp(LocalDateTime.now());

        return response;
    }

    public static <T> ApiResponse<T> error(
            String message) {

        ApiResponse<T> response =
                new ApiResponse<>();

        response.setSuccess(false);
        response.setMessage(message);
        response.setData(null);
        response.setTimestamp(LocalDateTime.now());

        return response;
    }

}