import { useState, useEffect } from 'react';
import { Menu, TrendingUp, ShoppingBag, DollarSign, Clock, RefreshCw } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { getDashboardToday, getDashboardWeek, getTopItems } from '../../api/admin';
import './AdminPages.css';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [today, setToday]     = useState(null);
  const [week, setWeek]       = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    Promise.all([getDashboardToday(), getDashboardWeek(), getTopItems()])
      .then(([t, w, top]) => {
        setToday(t.data);
        setWeek(Array.isArray(w.data) ? w.data : []);
        setTopItems(Array.isArray(top.data) ? top.data.slice(0, 5) : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const maxRevenue = week.length > 0 ? Math.max(...week.map(d => d.totalRevenue || 0), 1) : 1;

  return (
    <div className="admin-layout">
      <AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setSidebarOpen(true)} id="dashboard-menu-btn">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="admin-topbar__title">Dashboard</h1>
            <p className="admin-topbar__sub">Welcome back! Here's what's happening today.</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={fetchData} id="dashboard-refresh-btn">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner" /></div>
        ) : (
          <>
            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(255,107,43,0.15)' }}>
                  <DollarSign size={22} color="var(--color-primary)" />
                </div>
                <div className="stat-body">
                  <p className="stat-label">Today's Revenue</p>
                  <p className="stat-value">₹{today?.totalRevenue?.toFixed(0) ?? '—'}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.15)' }}>
                  <ShoppingBag size={22} color="var(--color-info)" />
                </div>
                <div className="stat-body">
                  <p className="stat-label">Total Orders</p>
                  <p className="stat-value">{today?.totalOrders ?? '—'}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>
                  <TrendingUp size={22} color="var(--color-success)" />
                </div>
                <div className="stat-body">
                  <p className="stat-label">Avg. Order Value</p>
                  <p className="stat-value">
                    ₹{today?.totalOrders
                      ? (today.totalRevenue / today.totalOrders).toFixed(0)
                      : '—'}
                  </p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>
                  <Clock size={22} color="var(--color-warning)" />
                </div>
                <div className="stat-body">
                  <p className="stat-label">Pending Orders</p>
                  <p className="stat-value">{today?.pendingOrders ?? '—'}</p>
                </div>
              </div>
            </div>

            <div className="dashboard-row">
              {/* Weekly Revenue Chart */}
              <div className="card dashboard-chart">
                <h3 className="card-title">Weekly Revenue</h3>
                <div className="bar-chart">
                  {week.map((d, i) => (
                    <div key={i} className="bar-chart__col">
                      <div className="bar-chart__bar-wrap">
                        <div
                          className="bar-chart__bar"
                          style={{ height: `${((d.totalRevenue || 0) / maxRevenue) * 100}%` }}
                          title={`₹${d.totalRevenue?.toFixed(0)}`}
                        />
                      </div>
                      <span className="bar-chart__label">
                        {d.date ? new Date(d.date).toLocaleDateString('en-IN', { weekday: 'short' }) : `D${i + 1}`}
                      </span>
                      <span className="bar-chart__value">₹{(d.totalRevenue || 0).toFixed(0)}</span>
                    </div>
                  ))}
                  {week.length === 0 && <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem' }}>No data available</p>}
                </div>
              </div>

              {/* Top Items */}
              <div className="card dashboard-top-items">
                <h3 className="card-title">Top Selling Items</h3>
                <div className="top-items-list">
                  {topItems.length === 0 && <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem' }}>No data available</p>}
                  {topItems.map((item, i) => (
                    <div key={i} className="top-item">
                      <span className="top-item__rank">#{i + 1}</span>
                      <div className="top-item__info">
                        <p className="top-item__name">{item.itemName || item.name}</p>
                        <div className="progress-bar" style={{ marginTop: '0.3rem' }}>
                          <div
                            className="progress-fill"
                            style={{
                              width: `${((item.totalQuantity || item.quantity || 0) / (topItems[0]?.totalQuantity || topItems[0]?.quantity || 1)) * 100}%`,
                              background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                            }}
                          />
                        </div>
                      </div>
                      <span className="top-item__qty">{item.totalQuantity || item.quantity || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
