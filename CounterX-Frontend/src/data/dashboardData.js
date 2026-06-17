export const dashboardStats = {
  totalOrders: 284,
  revenue: 98540,
  customers: 192,
  pendingOrders: 7,
  ordersGrowth: 12.4,
  revenueGrowth: 8.7,
  customersGrowth: 6.2,
  pendingChange: -2,
};

export const recentOrders = [
  { id: 'ORD-001', customer: 'Table 3', items: 4, total: 821.28, status: 'preparing', time: '10:24 AM' },
  { id: 'ORD-002', customer: 'Counter',  items: 3, total: 657.26, status: 'pending',   time: '10:31 AM' },
  { id: 'ORD-003', customer: 'Table 7',  items: 3, total: 444.86, status: 'ready',     time: '10:18 AM' },
  { id: 'ORD-004', customer: 'Table 1',  items: 4, total: 868.48, status: 'completed', time: '9:45 AM'  },
  { id: 'ORD-005', customer: 'Counter',  items: 2, total: 387.04, status: 'completed', time: '9:30 AM'  },
];

export const topItems = [
  { name: 'Crispy Chicken Wings', orders: 86, revenue: 23134 },
  { name: 'Signature Cold Brew',  orders: 74, revenue:  9546 },
  { name: 'Classic Eggs Benedict',orders: 61, revenue: 15189 },
  { name: 'Loaded Nachos',        orders: 58, revenue: 12702 },
  { name: 'Mango Lassi',          orders: 52, revenue:  5148 },
];

export const hourlyOrders = [
  { hour: '8 AM',  orders: 12 },
  { hour: '9 AM',  orders: 28 },
  { hour: '10 AM', orders: 45 },
  { hour: '11 AM', orders: 38 },
  { hour: '12 PM', orders: 62 },
  { hour: '1 PM',  orders: 74 },
  { hour: '2 PM',  orders: 55 },
  { hour: '3 PM',  orders: 30 },
  { hour: '4 PM',  orders: 18 },
  { hour: '5 PM',  orders: 24 },
  { hour: '6 PM',  orders: 42 },
  { hour: '7 PM',  orders: 58 },
];
