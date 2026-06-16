
package com.CounterX.util;

import com.CounterX.entity.Bill;
import com.CounterX.entity.OrderItem;

import java.time.format.DateTimeFormatter;
import java.util.List;

public class BillGenerator {

    private BillGenerator() {
    }

    /**
     * Generate Invoice String
     */
    public static String generateInvoice(
            Bill bill,
            List<OrderItem> orderItems) {

        StringBuilder invoice = new StringBuilder();

        invoice.append("\n");
        invoice.append("=================================\n");
        invoice.append("         CounterX Cafe\n");
        invoice.append("=================================\n");

        invoice.append("Bill No      : ")
                .append(bill.getBillId())
                .append("\n");

        invoice.append("Order Id     : ")
                .append(bill.getOrderId())
                .append("\n");

        invoice.append("Token No     : ")
                .append(bill.getDailyOrderNumber())
                .append("\n");

        invoice.append("Order Type   : ")
                .append(bill.getOrderType())
                .append("\n");

        invoice.append("Date         : ")
                .append(
                        bill.getBillDateTime()
                                .format(
                                        DateTimeFormatter.ofPattern(
                                                "dd-MM-yyyy HH:mm:ss"
                                        )
                                )
                )
                .append("\n");

        invoice.append("---------------------------------\n");

        invoice.append(
                String.format(
                        "%-18s %-5s %-8s\n",
                        "Item",
                        "Qty",
                        "Amount"
                )
        );

        invoice.append("---------------------------------\n");

        for (OrderItem item : orderItems) {

            invoice.append(
                    String.format(
                            "%-18s %-5d %-8.2f\n",
                            item.getItemName(),
                            item.getQuantity(),
                            item.getTotalPrice()
                    )
            );
        }

        invoice.append("---------------------------------\n");

        invoice.append("TOTAL AMOUNT : ₹")
                .append(bill.getTotalAmount())
                .append("\n");

        invoice.append("---------------------------------\n");

        invoice.append("Thank You!\n");
        invoice.append("Visit Again\n");
        invoice.append("=================================\n");

        return invoice.toString();
    }
}
