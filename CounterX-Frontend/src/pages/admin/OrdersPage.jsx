import { useState, useEffect } from 'react';
import { Menu, RefreshCw } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { getAllOrders, updateOrderStatus } from '../../api/orders';
import './AdminPages.css';

const STATUSES = ['PLACED', 'PREPARING', 'READY', 'SERVED', 'CANCELLED'];

const STATUS_BADGE = {
  PENDING_PAYMENT: 'status-pending',
  PLACED:          'status-placed',
  PREPARING:       'status-preparing',
  READY:           'status-ready',
  SERVED:          'status-served',
  CANCELLED:       'status-cancelled',
};

export default function OrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('ALL');

  const fetchOrders = () => {
    setLoading(true);
    getAllOrders().then(r => setOrders(r.data || [])).catch(() => setOrders([])).finally(() => setLoading(false));
  };
  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId, status) => {
    try { await updateOrderStatus(orderId, status); fetchOrders(); } catch {}
  };

  const filtered = filter === 'ALL' ? orders : orders.filter(o => o.orderStatus === filter);

  return (
    <div className="admin-layout">
      <AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <div className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setSidebarOpen(true)} id="orders-sidebar-btn"><Menu size={20} /></button>
          <div>
            <h1 className="admin-topbar__title">Orders</h1>
            <p className="admin-topbar__sub">{orders.length} total orders</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={fetchOrders} id="orders-refresh-btn">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {/* Filter pills */}
        <div className="category-pills" style={{ marginBottom: '1.5rem' }}>
          {['ALL', ...STATUSES, 'PENDING_PAYMENT'].map(s => (
            <button
              key={s}
              className={`category-pill${filter === s ? ' active' : ''}`}
              onClick={() => setFilter(s)}
              id={`order-filter-${s.toLowerCase()}`}
            >
              {s === 'ALL' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No orders found</h3>
            <p>Orders will appear here once placed</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="cx-table">
              <thead>
                <tr>
                  <th>Order ID</th><th>Token</th><th>Type</th><th>Amount</th><th>Payment</th><th>Status</th><th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 700, color: 'var(--color-text)' }}>#{order.id}</td>
                    <td>
                      {order.dailyOrderNumber
                        ? <span className="badge badge-purple">#{order.dailyOrderNumber}</span>
                        : <span style={{ color: 'var(--color-text-3)' }}>—</span>
                      }
                    </td>
                    <td><span className="badge badge-info">{order.orderType?.replace('_', ' ') || '—'}</span></td>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₹{order.totalAmount?.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${order.paymentStatus === 'SUCCESS' ? 'badge-success' : 'badge-warning'}`}>
                        {order.paymentStatus || 'PENDING'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-chip ${STATUS_BADGE[order.orderStatus] || 'status-pending'}`}>
                        {order.orderStatus?.replace('_', ' ') || '—'}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-control"
                        style={{ padding: '0.35rem 0.7rem', fontSize: '0.8rem', width: 'auto' }}
                        value={order.orderStatus || ''}
                        onChange={e => handleStatusChange(order.id, e.target.value)}
                        id={`order-status-${order.id}`}
                      >
                        <option value="" disabled>Change…</option>
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
