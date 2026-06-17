import api from "../services/api";

// Map frontend display values → backend enum values
const toBackendOrderType = (type) => {
  if (type === "Dine In") return "DINE_IN";
  if (type === "Take Away") return "TAKE_AWAY";
  return type; // pass through if already correct
};

// Map backend enum → frontend display
const toDisplayOrderType = (type) => {
  if (type === "DINE_IN") return "Dine In";
  if (type === "TAKE_AWAY") return "Take Away";
  return type;
};

// Map backend OrderStatus → frontend status key used in Kitchen
const toDisplayStatus = (status) => {
  if (!status) return "pending";
  return status.toLowerCase(); // PENDING→pending, PREPARING→preparing, etc.
};

/** Get all today's orders */
export const getOrders = async () => {
  const { data } = await api.get("/api/orders/today");
  return data;
};

/** Get a single order by id */
export const getOrderById = async (id) => {
  const { data } = await api.get(`/api/orders/${id}`);
  return data;
};

/**
 * Update order status.
 * Backend: PUT /api/orders/{orderId}/status/{status}
 * Frontend status values: "pending" | "preparing" | "ready" | "completed"
 * Backend OrderStatus enum: PENDING | PREPARING | READY | COMPLETED
 */
export const updateOrderStatus = async (id, status) => {
  const backendStatus = status.toUpperCase();
  const { data } = await api.put(`/api/orders/${id}/status/${backendStatus}`);
  return data;
};

/**
 * Create a new order.
 * Sends { totalAmount, orderType } to backend.
 * Returns a merged receipt-friendly object combining backend response + cart data.
 *
 * @param {object} orderData - { type, items, subtotal, tax, total, paymentMethod, table }
 */
export const createOrder = async (orderData) => {
  const { type, items, subtotal, tax, total, paymentMethod } = orderData;

  // POST to backend with required fields only
  const { data: backendOrder } = await api.post("/api/orders", {
    totalAmount: total,
    orderType: toBackendOrderType(type),
  });

  // Merge backend response with cart data for the receipt
  return {
    id: backendOrder.orderId ?? backendOrder.id ?? `ORD-${Date.now()}`,
    createdAt: backendOrder.orderDateTime ?? new Date().toISOString(),
    type: toDisplayOrderType(backendOrder.orderType) ?? type,
    items,
    subtotal,
    tax,
    total,
    paymentMethod,
  };
};