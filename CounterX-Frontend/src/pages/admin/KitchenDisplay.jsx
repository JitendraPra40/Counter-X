import { useState, useEffect } from 'react';
import { Menu, RefreshCw, Clock } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { getKitchenOrders, updateKitchenOrderStatus } from '../../api/orders';
import './AdminPages.css';

const STATUS_ORDER = ['PLACED', 'PREPARING', 'READY', 'SERVED', 'CANCELLED'];

const STATUS_COLOR = {
  PLACED:    'var(--color-info)',
  PREPARING: 'var(--color-warning)',
  READY:     'var(--color-success)',
  SERVED:    'var(--color-text-3)',
  CANCELLED: 'var(--color-danger)',
};

export default function KitchenDisplay() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    getKitchenOrders().then(r => setOrders(r.data || [])).catch(() => setOrders([])).finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const handleStatus = async (orderId, status) => {
    try { await updateKitchenOrderStatus(orderId, status); fetchOrders(); } catch {}
  };

  return (
    <div className="admin-layout">
      <AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <div className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setSidebarOpen(true)} id="kitchen-sidebar-btn"><Menu size={20} /></button>
          <div>
            <h1 className="admin-topbar__title">Kitchen Display</h1>
            <p className="admin-topbar__sub">Live order board · Auto-refreshes every 30s</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={fetchOrders} id="kitchen-refresh-btn">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner" /></div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <Clock size={52} color="var(--color-text-3)" />
            <h3>No active orders</h3>
            <p>New orders will appear here in real-time</p>
          </div>
        ) : (
          <div className="kitchen-board">
            {orders.map(order => (
              <div
                key={order.id}
                className="kitchen-card"
                style={{ borderTop: `3px solid ${STATUS_COLOR[order.orderStatus] || 'var(--color-border)'}` }}
              >
                <div className="kitchen-card__header">
                  <div>
                    <p className="kitchen-card__token">
                      {order.dailyOrderNumber ? `Token #${order.dailyOrderNumber}` : `Order #${order.id}`}
                    </p>
                    <p className="kitchen-card__type">{order.orderType?.replace('_', ' ')}</p>
                  </div>
                  <span className={`status-chip status-${order.orderStatus?.toLowerCase()}`}>
                    {order.orderStatus?.replace('_', ' ')}
                  </span>
                </div>

                {/* Items */}
                <div className="kitchen-card__items">
                  {(order.orderItems || []).map((item, i) => (
                    <div key={i} className="kitchen-card__item">
                      <span className="kitchen-card__item-name">{item.itemName}</span>
                      <span className="kitchen-card__item-qty">× {item.quantity}</span>
                    </div>
                  ))}
                  {(!order.orderItems || order.orderItems.length === 0) && (
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-3)' }}>No items info</p>
                  )}
                </div>

                {/* Status buttons */}
                <div className="kitchen-card__actions">
                  {STATUS_ORDER.filter(s => s !== 'CANCELLED').map(s => (
                    <button
                      key={s}
                      className={`kitchen-status-btn ${s === order.orderStatus ? 'active' : ''} ${s.toLowerCase()}`}
                      onClick={() => handleStatus(order.id, s)}
                      id={`kitchen-${order.id}-${s.toLowerCase()}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
