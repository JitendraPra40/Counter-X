import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import ChartContainer from '../components/ChartContainer';
import Spinner from '../components/Spinner';
import { getDashboardStats, getTopItems, getHourlyOrders } from '../api/dashboardApi';
import styles from '../styles/Dashboard.module.css';

function MiniBarChart({ data, color = 'var(--primary)' }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className={styles.barChart}>
      {data.map((d, i) => (
        <div key={i} className={styles.barGroup}>
          <div
            className={styles.miniBar}
            style={{ height: `${(d.value / max) * 100}%`, background: color }}
            title={`${d.label}: ${d.value}`}
          />
          <div className={styles.barLabel}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulative = 0;
  const cx = 80, cy = 80, r = 60, strokeW = 20;
  const circumference = 2 * Math.PI * r;

  const colors = ['var(--primary)', 'var(--secondary)', 'var(--warning)', 'var(--success)', 'var(--danger)'];

  return (
    <div className={styles.donutWrap}>
      <svg viewBox="0 0 160 160" className={styles.donutSvg}>
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dashArr = `${pct * circumference} ${circumference}`;
          const rotate = cumulative * 360 - 90;
          cumulative += pct;
          return (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth={strokeW}
              strokeDasharray={dashArr}
              transform={`rotate(${rotate} ${cx} ${cy})`}
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          );
        })}
        <text x={cx} y={cy - 8} textAnchor="middle" className={styles.donutTotal}>{total}</text>
        <text x={cx} y={cx + 10} textAnchor="middle" className={styles.donutLabel}>Total</text>
      </svg>
      <div className={styles.donutLegend}>
        {segments.map((seg, i) => (
          <div key={i} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: colors[i % colors.length] }} />
            <span className={styles.legendName}>{seg.label}</span>
            <span className={styles.legendVal}>{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [topItems, setTopItems] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getTopItems(), getHourlyOrders()]).then(
      ([s, t, h]) => { setStats(s); setTopItems(t); setHourly(h); setLoading(false); }
    );
  }, []);

  const hourlyChartData = hourly.map(h => ({ label: h.hour.replace(' ', ''), value: h.orders }));

  const categoryData = [
    { label: 'Breakfast', value: 82 },
    { label: 'Snacks',    value: 96 },
    { label: 'Beverages', value: 106 },
  ];

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>Analytics</h1>
            <p className={styles.pageDate}>Performance overview for today</p>
          </div>
          <div className={styles.periodBadge}>Today</div>
        </header>

        {loading ? (
          <div className={styles.loadingWrap}><Spinner size="lg" /></div>
        ) : (
          <div className={styles.content}>
            {/* KPI row */}
            <div className={styles.statsGrid}>
              <StatsCard icon="📋" label="Total Orders"  value={stats.totalOrders} change={`+${stats.ordersGrowth}%`}   up color="primary" />
              <StatsCard icon="💰" label="Revenue"       value={`₹${(stats.revenue/1000).toFixed(1)}k`} change={`+${stats.revenueGrowth}%`}  up color="secondary" />
              <StatsCard icon="👥" label="Customers"     value={stats.customers}   change={`+${stats.customersGrowth}%`} up color="secondary" />
              <StatsCard icon="⏳" label="Avg Wait Time" value="12 min"            change="-2 min"                       up />
            </div>

            {/* Charts row */}
            <div className={styles.chartsRow}>
              <ChartContainer
                title="Hourly Order Volume"
                subtitle="Orders received per hour today"
              >
                <MiniBarChart
                  data={hourlyChartData}
                  color="var(--primary)"
                />
              </ChartContainer>

              <ChartContainer
                title="Orders by Category"
                subtitle="Distribution across menu sections"
              >
                <DonutChart segments={categoryData} />
              </ChartContainer>
            </div>

            {/* Top items */}
            <ChartContainer
              title="Top Performing Items"
              subtitle="Ranked by order volume today"
            >
              <div className={styles.topItemsList}>
                {topItems.map((item, i) => (
                  <div key={i} className={styles.topItem}>
                    <div className={styles.topItemRank}>{i + 1}</div>
                    <div className={styles.topItemInfo}>
                      <div className={styles.topItemName}>{item.name}</div>
                      <div className={styles.topItemBar}>
                        <div
                          className={styles.topItemFill}
                          style={{ width: `${(item.orders / topItems[0].orders) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className={styles.topItemStats}>
                      <div className={styles.topItemOrders}>{item.orders} orders</div>
                      <div className={styles.topItemRevenue}>₹{item.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ChartContainer>

            {/* Customer stats row */}
            <div className={styles.metricRow}>
              {[
                { label: 'New Customers',    value: '58',   icon: '🆕', change: '+12%', up: true },
                { label: 'Returning',        value: '134',  icon: '🔄', change: '+4%',  up: true },
                { label: 'Avg Order Value',  value: '₹346', icon: '🧾', change: '+5%',  up: true },
                { label: 'Peak Hour',        value: '1 PM', icon: '⚡', change: '74 orders', up: true },
              ].map((m, i) => (
                <div key={i} className={styles.metricCard}>
                  <div className={styles.metricIcon}>{m.icon}</div>
                  <div className={styles.metricValue}>{m.value}</div>
                  <div className={styles.metricLabel}>{m.label}</div>
                  <div className={`${styles.metricChange} ${m.up ? styles.up : styles.down}`}>
                    {m.up ? '↑' : '↓'} {m.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
