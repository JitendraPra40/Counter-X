import { useState, useEffect } from 'react';
import { Menu, RefreshCw, TrendingUp } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { getDashboardToday, getDashboardWeek, getTopItems, getCategoryRevenue } from '../../api/admin';
import './AdminPages.css';

export default function SalesReport() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [today, setToday]     = useState(null);
  const [week, setWeek]       = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [catRevenue, setCatRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    Promise.all([getDashboardToday(), getDashboardWeek(), getTopItems(), getCategoryRevenue()])
      .then(([t, w, top, cat]) => {
        setToday(t.data);
        setWeek(Array.isArray(w.data) ? w.data : []);
        setTopItems(Array.isArray(top.data) ? top.data : []);
        setCatRevenue(Array.isArray(cat.data) ? cat.data : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const maxCatRev = catRevenue.length > 0 ? Math.max(...catRevenue.map(c => c.totalRevenue || 0), 1) : 1;
  const maxWeekRev = week.length > 0 ? Math.max(...week.map(d => d.totalRevenue || 0), 1) : 1;

  return (
    <div className="admin-layout">
      <AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <div className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setSidebarOpen(true)} id="sales-sidebar-btn"><Menu size={20} /></button>
          <div>
            <h1 className="admin-topbar__title">Sales Report</h1>
            <p className="admin-topbar__sub">Revenue analytics and performance metrics</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={fetchData} id="sales-refresh-btn">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner" /></div>
        ) : (
          <>
            {/* Today Stats */}
            <div className="stats-grid" style={{ marginBottom: '2rem' }}>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(255,107,43,0.15)' }}>💰</div>
                <div className="stat-body">
                  <p className="stat-label">Today's Revenue</p>
                  <p className="stat-value">₹{today?.totalRevenue?.toFixed(0) ?? '0'}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.15)' }}>📦</div>
                <div className="stat-body">
                  <p className="stat-label">Orders Today</p>
                  <p className="stat-value">{today?.totalOrders ?? '0'}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>
                  <TrendingUp size={22} color="var(--color-success)" />
                </div>
                <div className="stat-body">
                  <p className="stat-label">Week Revenue</p>
                  <p className="stat-value">₹{week.reduce((s, d) => s + (d.totalRevenue || 0), 0).toFixed(0)}</p>
                </div>
              </div>
            </div>

            <div className="sales-grid">
              {/* Weekly Chart */}
              <div className="card">
                <h3 className="card-title">Weekly Revenue Trend</h3>
                <div className="bar-chart" style={{ height: 160 }}>
                  {week.map((d, i) => (
                    <div key={i} className="bar-chart__col">
                      <div className="bar-chart__bar-wrap">
                        <div
                          className="bar-chart__bar"
                          style={{ height: `${((d.totalRevenue || 0) / maxWeekRev) * 100}%` }}
                          title={`₹${d.totalRevenue?.toFixed(0)}`}
                        />
                      </div>
                      <span className="bar-chart__label">
                        {d.date ? new Date(d.date).toLocaleDateString('en-IN', { weekday: 'short' }) : `D${i+1}`}
                      </span>
                    </div>
                  ))}
                  {week.length === 0 && <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem' }}>No data</p>}
                </div>
              </div>

              {/* Top Items */}
              <div className="card">
                <h3 className="card-title">Top Selling Items</h3>
                <div className="top-items-list">
                  {topItems.slice(0, 8).map((item, i) => (
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
                  {topItems.length === 0 && <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem' }}>No data available</p>}
                </div>
              </div>

              {/* Category Revenue */}
              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <h3 className="card-title">Category Revenue Breakdown</h3>
                <div className="cat-revenue-list">
                  {catRevenue.map((cat, i) => (
                    <div key={i} className="cat-revenue-item">
                      <div className="cat-revenue-header">
                        <span className="cat-revenue-name">{cat.category || cat.name}</span>
                        <span className="cat-revenue-amount">₹{(cat.totalRevenue || 0).toFixed(2)}</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${((cat.totalRevenue || 0) / maxCatRev) * 100}%`,
                            background: `hsl(${i * 50}, 70%, 55%)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {catRevenue.length === 0 && <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem' }}>No category data available</p>}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
