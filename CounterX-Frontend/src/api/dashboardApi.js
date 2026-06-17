import api from "../services/api";

/**
 * Get today's dashboard stats.
 * Backend DashboardDTO: { revenueDate, totalOrders, totalRevenue }
 * Frontend expects: { totalOrders, ordersGrowth, revenue, revenueGrowth,
 *                     customers, customersGrowth, pendingOrders, pendingChange }
 */
export const getDashboardStats = async () => {
  try {
    const { data } = await api.get("/api/dashboard/today");
    return {
      totalOrders: data.totalOrders ?? 0,
      ordersGrowth: 0,
      revenue: data.totalRevenue ?? 0,
      revenueGrowth: 0,
      customers: data.totalOrders ?? 0,   // approximate customers from orders
      customersGrowth: 0,
      pendingOrders: 0,
      pendingChange: "—",
    };
  } catch {
    return {
      totalOrders: 0, ordersGrowth: 0,
      revenue: 0,     revenueGrowth: 0,
      customers: 0,   customersGrowth: 0,
      pendingOrders: 0, pendingChange: "—",
    };
  }
};

/**
 * Get recent orders for Admin dashboard.
 * Backend AdminOrderDTO: { orderId, dailyOrderNumber, orderType, orderStatus, totalAmount }
 * Frontend expects: { id, customer, items, total, status, time }
 */
export const getRecentOrders = async () => {
  try {
    const { data } = await api.get("/api/admin/orders");
    return data.map((o) => ({
      id: o.orderId,                                // numeric id for API calls
      displayId: `#${String(o.dailyOrderNumber ?? o.orderId).padStart(3, "0")}`,
      customer: o.orderType === "DINE_IN" ? "Dine In" : "Take Away",
      items: 1,                                    // items count not in DTO
      total: o.totalAmount ?? 0,
      status: (o.orderStatus ?? "PENDING").toLowerCase(),
      time: "—",
    }));
  } catch {
    return [];
  }
};

/**
 * Get top-selling items.
 * Backend TopItemDTO: { itemName, quantity }
 * Frontend expects: { name, orders, revenue }
 */
export const getTopItems = async () => {
  try {
    const { data } = await api.get("/api/admin/top-items");
    return data.map((item) => ({
      name: item.itemName,
      orders: item.quantity ?? 0,
      revenue: 0,        // revenue not in DTO; set 0 as placeholder
    }));
  } catch {
    return [];
  }
};

/**
 * Get hourly order volume for chart.
 * Backend does not expose this endpoint — return mock data.
 */
export const getHourlyOrders = async () => {
  return [
    { hour: "9 AM",  orders: 4  },
    { hour: "10 AM", orders: 8  },
    { hour: "11 AM", orders: 12 },
    { hour: "12 PM", orders: 20 },
    { hour: "1 PM",  orders: 28 },
    { hour: "2 PM",  orders: 18 },
    { hour: "3 PM",  orders: 10 },
    { hour: "4 PM",  orders: 6  },
    { hour: "5 PM",  orders: 9  },
    { hour: "6 PM",  orders: 15 },
    { hour: "7 PM",  orders: 22 },
    { hour: "8 PM",  orders: 14 },
  ];
};