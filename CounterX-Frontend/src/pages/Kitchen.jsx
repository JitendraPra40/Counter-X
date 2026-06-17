import { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../api/orderApi';
import { useToast } from '../context/ToastContext';
import styles from '../styles/Kitchen.module.css';
import BrandLogo from "../components/BrandLogo";

const COLUMNS = [
  { key: 'pending',   label: 'New Orders',  icon: '🔔', next: 'preparing' },
  { key: 'preparing', label: 'Preparing',   icon: '🔥', next: 'ready'     },
  { key: 'ready',     label: 'Ready',       icon: '✅', next: 'completed'  },
  { key: 'completed', label: 'Completed',   icon: '★',  next: null         },
];

const COLOR = {
  pending:   'var(--warning)',
  preparing: 'var(--primary)',
  ready:     'var(--secondary)',
  completed: 'var(--success)',
};

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const { addToast } = useToast();

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 30000);
    const clock = setInterval(() => setNow(new Date()), 1000);
    return () => { clearInterval(interval); clearInterval(clock); };
  }, []);

  const loadOrders = () => {
    getOrders().then(data => { setOrders(data); setLoading(false); });
  };

  const advance = async (order, nextStatus) => {
    const updated = await updateOrderStatus(order.id, nextStatus);
    setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
    const labels = { preparing: 'Now Preparing', ready: 'Ready to Serve!', completed: 'Order Complete' };
    addToast(`${order.id} → ${labels[nextStatus]}`, nextStatus === 'ready' ? 'success' : 'info');
  };

  const getElapsed = (createdAt) => {
    const diff = Math.floor((now - new Date(createdAt)) / 60000);
    if (diff < 1) return 'Just now';
    if (diff === 1) return '1 min ago';
    return `${diff} mins ago`;
  };

  return (
    <div className={styles.page}>
      {/* Kitchen header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {/* <div className={styles.logo}>CX</div> */}
          <BrandLogo size={120} />
          <div>
            <div className={styles.title}>Kitchen Display</div>
            <div className={styles.subtitle}>Live Order Management</div>
          </div>
        </div>
        <div className={styles.clock}>
          {now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statVal}>{orders.filter(o => o.status === 'pending').length}</span>
            <span className={styles.statLabel}>Pending</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statVal}>{orders.filter(o => o.status === 'preparing').length}</span>
            <span className={styles.statLabel}>Cooking</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statVal}>{orders.filter(o => o.status === 'ready').length}</span>
            <span className={styles.statLabel}>Ready</span>
          </div>
        </div>
      </div>

      {/* Columns */}
      {loading ? (
        <div className={styles.loadingWrap}>Loading orders...</div>
      ) : (
        <div className={styles.board}>
          {COLUMNS.map(col => {
            const colOrders = orders.filter(o => o.status === col.key);
            return (
              <div key={col.key} className={styles.column}>
                <div className={styles.colHeader} style={{ '--col-color': COLOR[col.key] }}>
                  <span className={styles.colIcon}>{col.icon}</span>
                  <span className={styles.colLabel}>{col.label}</span>
                  <span className={styles.colCount}>{colOrders.length}</span>
                </div>

                <div className={styles.cards}>
                  {colOrders.length === 0 ? (
                    <div className={styles.emptyCol}>
                      <div className={styles.emptyIcon}>○</div>
                      <div>No orders here</div>
                    </div>
                  ) : (
                    colOrders.map(order => (
                      <div
                        key={order.id}
                        className={styles.card}
                        style={{ '--card-accent': COLOR[col.key] }}
                      >
                        <div className={styles.cardTop}>
                          <div className={styles.orderId}>{order.id}</div>
                          <div className={styles.orderMeta}>
                            <span className={styles.orderType}>{order.type}</span>
                            <span className={styles.orderTable}>{order.table}</span>
                          </div>
                        </div>

                        <div className={styles.itemsList}>
                          {order.items.map((item, i) => (
                            <div key={i} className={styles.item}>
                              <span className={styles.itemQty}>×{item.qty}</span>
                              <span className={styles.itemName}>{item.name}</span>
                            </div>
                          ))}
                        </div>

                        <div className={styles.cardBottom}>
                          <div className={styles.elapsed}>{getElapsed(order.createdAt)}</div>
                          {col.next && (
                            <button
                              className={styles.advanceBtn}
                              style={{ '--btn-color': COLOR[col.next] }}
                              onClick={() => advance(order, col.next)}
                            >
                              {col.next === 'preparing' && '▶ Start'}
                              {col.next === 'ready'     && '✓ Ready'}
                              {col.next === 'completed' && '★ Done'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
