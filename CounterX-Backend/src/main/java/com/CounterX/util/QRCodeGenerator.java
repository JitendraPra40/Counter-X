
package com.CounterX.util;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class QRCodeGenerator {

    private QRCodeGenerator() {
    }

    /**
     * Generate Unique UPI QR Code
     */
    public static String generateUPIQRCode(
            String upiId,
            String merchantName,
            Double amount,
            String transactionId) {

        return "upi://pay?pa="
                + encode(upiId)
                + "&pn="
                + encode(merchantName)
                + "&am="
                + amount
                + "&cu=INR"
                + "&tr="
                + encode(transactionId);
    }

    private static String encode(String value) {

        return URLEncoder.encode(
                value,
                StandardCharsets.UTF_8
        );
    }
}

