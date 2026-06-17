import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChartContainer from '../components/ChartContainer';
import Spinner from '../components/Spinner';
import { getSalesData, getMonthlyTrends, getExpenseBreakdown, getKpiCards } from '../api/salesApi';
import styles from '../styles/SalesBoard.module.css';

function LineChart({ data }) {
  if (!data.length) return null;
  const W = 500, H = 160, PAD = 20;
  const maxVal = Math.max(...data.map(d => d.revenue));
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const toX = (i) => PAD + (i / (data.length - 1)) * (W - PAD * 2);
  const toY = (v) => H - PAD - ((v - minVal) / range) * (H - PAD * 2);

  const revPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d.revenue)}`).join(' ');
  const profPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d.profit)}`).join(' ');
  const expPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d.expenses)}`).join(' ');

  const areaBase = `L${toX(data.length - 1)},${H - PAD} L${toX(0)},${H - PAD} Z`;

  return (
    <div className={styles.lineChartWrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.lineSvg}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--success)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--success)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((pct, i) => (
          <line
            key={i}
            x1={PAD} y1={toY(maxVal * pct)}
            x2={W - PAD} y2={toY(maxVal * pct)}
            stroke="var(--border-light)" strokeDasharray="4"
          />
        ))}

        {/* Revenue area */}
        <path d={`${revPath} ${areaBase}`} fill="url(#revGrad)" />
        {/* Profit area */}
        <path d={`${profPath} ${areaBase}`} fill="url(#profGrad)" />

        {/* Lines */}
        <path d={revPath}  fill="none" stroke="var(--primary)"   strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={expPath}  fill="none" stroke="var(--danger)"    strokeWidth="1.5" strokeDasharray="5,3" strokeLinecap="round" strokeLinejoin="round" />
        <path d={profPath} fill="none" stroke="var(--success)"   strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round" />

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text key={i} x={toX(i)} y={H - 2} textAnchor="middle" className={styles.axisLabel}>
            {d.month}
          </text>
        ))}

        {/* Dots on revenue line */}
        {data.map((d, i) => (
          <circle key={i} cx={toX(i)} cy={toY(d.revenue)} r="3.5"
            fill="var(--primary)" stroke="#fff" strokeWidth="1.5" />
        ))}
      </svg>

      <div className={styles.lineLegend}>
        <div className={styles.legendLine} style={{ '--lc': 'var(--primary)' }}>Revenue</div>
        <div className={styles.legendLine} style={{ '--lc': 'var(--success)' }}>Profit</div>
        <div className={styles.legendLine} style={{ '--lc': 'var(--danger)', '--dash': '5px dashed' }}>Expenses</div>
      </div>
    </div>
  );
}

function ExpenseBreakdown({ data }) {
  return (
    <div className={styles.expList}>
      {data.map((item, i) => (
        <div key={i} className={styles.expItem}>
          <div className={styles.expInfo}>
            <span className={styles.expName}>{item.category}</span>
            <span className={styles.expAmt}>₹{item.amount.toLocaleString()}</span>
          </div>
          <div className={styles.expBar}>
            <div
              className={styles.expFill}
              style={{
                width: `${item.pct}%`,
                background: `hsl(${i * 50}, 70%, 55%)`,
              }}
            />
          </div>
          <span className={styles.expPct}>{item.pct}%</span>
        </div>
      ))}
    </div>
  );
}

export default function SalesBoard() {
  const [sales, setSales] = useState(null);
  const [trends, setTrends] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSalesData(), getMonthlyTrends(), getExpenseBreakdown(), getKpiCards()]).then(
      ([s, t, e, k]) => { setSales(s); setTrends(t); setExpenses(e); setKpis(k); setLoading(false); }
    );
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>Sales Board</h1>
            <p className={styles.pageDate}>Financial performance — June 2026</p>
          </div>
          <div className={styles.exportBtn}>Export Report</div>
        </header>

        {loading ? (
          <div className={styles.loadingWrap}><Spinner size="lg" /></div>
        ) : (
          <div className={styles.content}>
            {/* Revenue / Expenses / Profit */}
            <div className={styles.financialRow}>
              <div className={`${styles.finCard} ${styles.revenue}`}>
                <div className={styles.finIcon}>💰</div>
                <div className={styles.finValue}>₹{(sales.totalRevenue / 1000).toFixed(1)}k</div>
                <div className={styles.finLabel}>Total Revenue</div>
                <div className={styles.finChange}>↑ {sales.revenueGrowth}% vs last month</div>
              </div>
              <div className={`${styles.finCard} ${styles.expenses}`}>
                <div className={styles.finIcon}>📤</div>
                <div className={styles.finValue}>₹{(sales.totalExpenses / 1000).toFixed(1)}k</div>
                <div className={styles.finLabel}>Total Expenses</div>
                <div className={styles.finChange}>↑ {sales.expenseGrowth}% vs last month</div>
              </div>
              <div className={`${styles.finCard} ${styles.profit}`}>
                <div className={styles.finIcon}>📈</div>
                <div className={styles.finValue}>₹{(sales.netProfit / 1000).toFixed(1)}k</div>
                <div className={styles.finLabel}>Net Profit</div>
                <div className={styles.finChange}>↑ {sales.profitGrowth}% vs last month</div>
              </div>
              <div className={`${styles.finCard} ${styles.margin}`}>
                <div className={styles.finIcon}>%</div>
                <div className={styles.finValue}>{sales.profitMargin}%</div>
                <div className={styles.finLabel}>Profit Margin</div>
                <div className={styles.finChange}>↑ Healthy margin</div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className={styles.kpiRow}>
              {kpis.map((kpi, i) => (
                <div key={i} className={styles.kpiCard}>
                  <div className={styles.kpiLabel}>{kpi.label}</div>
                  <div className={styles.kpiValue}>{kpi.value}</div>
                  <div className={`${styles.kpiChange} ${kpi.up ? styles.up : styles.down}`}>
                    {kpi.up ? '↑' : '↓'} {kpi.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className={styles.chartsRow}>
              <ChartContainer
                title="Monthly Revenue Trends"
                subtitle="Revenue, expenses and profit over 6 months"
              >
                <LineChart data={trends} />
              </ChartContainer>

              <ChartContainer
                title="Expense Breakdown"
                subtitle="Where the money goes this month"
              >
                <ExpenseBreakdown data={expenses} />
              </ChartContainer>
            </div>

            {/* Monthly table */}
            <ChartContainer title="Monthly Summary" subtitle="Detailed breakdown by month">
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Revenue</th>
                      <th>Expenses</th>
                      <th>Profit</th>
                      <th>Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trends.map((row, i) => {
                      const margin = ((row.profit / row.revenue) * 100).toFixed(1);
                      return (
                        <tr key={i}>
                          <td className={styles.monthCell}>{row.month} 2026</td>
                          <td>₹{row.revenue.toLocaleString()}</td>
                          <td className={styles.expenseCell}>₹{row.expenses.toLocaleString()}</td>
                          <td className={styles.profitCell}>₹{row.profit.toLocaleString()}</td>
                          <td>
                            <span className={styles.marginBadge}>{margin}%</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </ChartContainer>
          </div>
        )}
      </div>
    </div>
  );
}
