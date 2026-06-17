import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import StatusBadge from '../components/StatusBadge';
import Spinner from '../components/Spinner';
import { getDashboardStats, getRecentOrders, getTopItems } from '../api/dashboardApi';
import { updateOrderStatus } from '../api/orderApi';
import { useToast } from '../context/ToastContext';
import styles from '../styles/AdminDashboard.module.css';

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const { addToast } = useToast();

  useEffect(() => {
    Promise.all([getDashboardStats(), getRecentOrders(10), getTopItems()]).then(
      ([s, o, t]) => { setStats(s); setOrders(o); setTopItems(t); setLoading(false); }
    );
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    addToast(`Order ${id} updated to ${status}`, 'success');
  };

  const fmt = (n) => n >= 1000 ? `₹${(n/1000).toFixed(1)}k` : `₹${n}`;

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <p className={styles.pageDate}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className={styles.topbarRight}>
            <div className={styles.onlineIndicator}>
              <span className={styles.dot} />
              Live
            </div>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        {loading ? (
          <div className={styles.loadingWrap}><Spinner size="lg" /></div>
        ) : (
          <>
            {/* Stats row */}
            <div className={styles.statsGrid}>
              <StatsCard
                icon="📋"
                label="Total Orders Today"
                value={stats.totalOrders}
                change={`+${stats.ordersGrowth}%`}
                up
                color="primary"
              />
              <StatsCard
                icon="💰"
                label="Revenue Today"
                value={fmt(stats.revenue)}
                change={`+${stats.revenueGrowth}%`}
                up
                color="secondary"
              />
              <StatsCard
                icon="👥"
                label="Customers Today"
                value={stats.customers}
                change={`+${stats.customersGrowth}%`}
                up
                color="secondary"
              />
              <StatsCard
                icon="⏳"
                label="Pending Orders"
                value={stats.pendingOrders}
                change={`${stats.pendingChange}`}
                up={false}
                color="primary"
              />
            </div>

            {/* Tab nav */}
            <div className={styles.tabNav}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Order Management
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'menu' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('menu')}
              >
                Top Menu Items
              </button>
            </div>

            {/* Orders table */}
            {activeTab === 'orders' && (
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <h2 className={styles.tableTitle}>Recent Orders</h2>
                  <span className={styles.tableCount}>{orders.length} orders</span>
                </div>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td className={styles.orderId}>{order.displayId ?? order.id}</td>
                          <td>{order.customer}</td>
                          <td>{order.items} items</td>
                          <td className={styles.total}>₹{order.total.toFixed(2)}</td>
                          <td><StatusBadge status={order.status} /></td>
                          <td className={styles.time}>{order.time}</td>
                          <td>
                            <select
                              className={styles.statusSelect}
                              value={order.status}
                              onChange={e => handleStatusChange(order.id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Menu items table */}
            {activeTab === 'menu' && (
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <h2 className={styles.tableTitle}>Top Selling Items</h2>
                  <span className={styles.tableCount}>Today</span>
                </div>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Orders</th>
                        <th>Revenue</th>
                        <th>Popularity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topItems.map((item, i) => (
                        <tr key={i}>
                          <td className={styles.rank}>{i + 1}</td>
                          <td className={styles.itemName}>{item.name}</td>
                          <td>{item.orders}</td>
                          <td className={styles.total}>₹{item.revenue.toLocaleString()}</td>
                          <td>
                            <div className={styles.barWrap}>
                              <div
                                className={styles.bar}
                                style={{ width: `${(item.orders / topItems[0].orders) * 100}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
