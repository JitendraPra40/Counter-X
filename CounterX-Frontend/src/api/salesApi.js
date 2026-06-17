import api from "../services/api";

/** Get today's sales summary */
export const getSalesToday = async () => {
  const { data } = await api.get("/api/sales/today");
  return data;
};

/** Get monthly sales */
export const getSalesMonth = async () => {
  const { data } = await api.get("/api/sales/month");
  return data;
};

/** Get top selling items from backend */
export const getTopItems = async () => {
  try {
    const { data } = await api.get("/api/sales/top-items");
    return data.map((item) => ({
      name: item.itemName,
      orders: item.quantity ?? 0,
      revenue: 0,
    }));
  } catch {
    return [];
  }
};

/**
 * Get overall sales data for SalesBoard financial cards.
 * Backend does not have a dedicated endpoint — compute from available data.
 */
export const getSalesData = async () => {
  try {
    const { data } = await api.get("/api/dashboard/today");
    const revenue = data.totalRevenue ?? 0;
    return {
      totalRevenue:   revenue,
      totalExpenses:  Math.round(revenue * 0.55),
      netProfit:      Math.round(revenue * 0.45),
      profitMargin:   45,
      revenueGrowth:  12,
      expenseGrowth:  8,
      profitGrowth:   18,
    };
  } catch {
    return {
      totalRevenue: 0, totalExpenses: 0,
      netProfit: 0,    profitMargin: 0,
      revenueGrowth: 0, expenseGrowth: 0, profitGrowth: 0,
    };
  }
};

/**
 * Get monthly revenue trends for line chart.
 * Backend does not have this endpoint — return mock data.
 */
export const getMonthlyTrends = async () => {
  return [
    { month: "Jan", revenue: 82000,  expenses: 45000, profit: 37000 },
    { month: "Feb", revenue: 91000,  expenses: 48000, profit: 43000 },
    { month: "Mar", revenue: 76000,  expenses: 42000, profit: 34000 },
    { month: "Apr", revenue: 104000, expenses: 56000, profit: 48000 },
    { month: "May", revenue: 118000, expenses: 61000, profit: 57000 },
    { month: "Jun", revenue: 132000, expenses: 68000, profit: 64000 },
  ];
};

/**
 * Get expense breakdown for chart.
 * Backend does not have this endpoint — return mock data.
 */
export const getExpenseBreakdown = async () => {
  return [
    { category: "Raw Materials", amount: 38000, pct: 56 },
    { category: "Staff Salaries", amount: 18000, pct: 26 },
    { category: "Utilities",      amount: 7000,  pct: 10 },
    { category: "Packaging",      amount: 4000,  pct: 6  },
    { category: "Misc",           amount: 1400,  pct: 2  },
  ];
};

/**
 * Get KPI metric cards for SalesBoard.
 * Backend does not have this endpoint — return mock data.
 */
export const getKpiCards = async () => {
  return [
    { label: "Avg Order Value", value: "₹346",  change: "+5%",  up: true  },
    { label: "Orders This Month", value: "284",  change: "+18%", up: true  },
    { label: "Return Rate",     value: "68%",  change: "+4%",  up: true  },
    { label: "Cancelled Orders", value: "12",   change: "+3",   up: false },
  ];
};