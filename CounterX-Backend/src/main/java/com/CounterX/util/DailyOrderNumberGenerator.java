package com.CounterX.util;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

public class DailyOrderNumberGenerator {

    private static final Map<LocalDate, Integer> orderMap =
            new HashMap<>();

    private DailyOrderNumberGenerator() {

    }

    public static synchronized Integer generateOrderNumber() {

        LocalDate today = LocalDate.now();

        Integer current =
                orderMap.getOrDefault(today, 0);

        current++;

        orderMap.put(today, current);

        return current;

    }

}