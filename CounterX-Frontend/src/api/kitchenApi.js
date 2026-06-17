import api from "../services/api";

/**
 * Fetch kitchen orders.
 * Backend endpoint: GET /api/kitchen/orders
 * Returns KitchenOrderDTO: { orderId, dailyOrderNumber, orderType, orderStatus, totalAmount }
 *
 * Maps to the shape Kitchen.jsx expects:
 *   { id, status, type, table, items, createdAt }
 */
export const getKitchenOrders = async () => {
  const { data } = await api.get("/api/kitchen/orders");

  return data.map((o) => ({
    id: `#${String(o.dailyOrderNumber ?? o.orderId).padStart(3, "0")}`,
    orderId: o.orderId,
    status: (o.orderStatus ?? "PENDING").toLowerCase(),
    type: o.orderType === "DINE_IN" ? "Dine In" : "Take Away",
    table: o.orderType === "DINE_IN" ? "Dine In" : "Counter",
    totalAmount: o.totalAmount ?? 0,
    // items not in DTO — show total as summary row
    items: [{ name: `Order Total`, qty: 1, price: o.totalAmount ?? 0 }],
    createdAt: new Date().toISOString(), // createdAt not in DTO
  }));
};

/**
 * Update order status via kitchen endpoint.
 * Backend: PUT /api/kitchen/orders/{id}/status?status=PREPARING
 */
export const updateKitchenOrderStatus = async (orderId, status) => {
  const backendStatus = status.toUpperCase();
  const { data } = await api.put(
    `/api/kitchen/orders/${orderId}/status`,
    null,
    { params: { status: backendStatus } }
  );

  // Normalize the returned Order entity to kitchen display shape
  return {
    id: `#${String(data.dailyOrderNumber ?? data.orderId).padStart(3, "0")}`,
    orderId: data.orderId,
    status: (data.orderStatus ?? backendStatus).toLowerCase(),
    type: data.orderType === "DINE_IN" ? "Dine In" : "Take Away",
    table: data.orderType === "DINE_IN" ? "Dine In" : "Counter",
    totalAmount: data.totalAmount ?? 0,
    items: [{ name: `Order Total`, qty: 1, price: data.totalAmount ?? 0 }],
    createdAt: new Date().toISOString(),
  };
};
