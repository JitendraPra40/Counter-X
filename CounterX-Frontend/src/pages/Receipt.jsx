import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import styles from '../styles/Receipt.module.css';
import BrandLogo from "../components/BrandLogo";

export default function Receipt() {
  const { completedOrder } = useCart();
  const navigate = useNavigate();
  const receiptRef = useRef(null);

  useEffect(() => {
    if (!completedOrder) navigate('/welcome');
  }, [completedOrder, navigate]);

  if (!completedOrder) return null;

  const handlePrint = () => window.print();

  const orderDate = new Date(completedOrder.createdAt);

  return (
    <div className={styles.page}>
      <div className={styles.receipt} ref={receiptRef}>
        <div className={styles.restaurantHeader}>
          <BrandLogo size={140} />
          <h1 className={styles.restaurantName}>CounterX</h1>
          <p className={styles.restaurantTagline}>Modern Restaurant OS</p>
          <p className={styles.restaurantAddress}>123 Food Street, Chennai, TN 600001</p>
          <p className={styles.restaurantContact}>+91 98765 43210 · counterx.in</p>
        </div>

        <div className={styles.divider}>· · · · · · · · · ·</div>

        <div className={styles.orderMeta}>
          <div className={styles.metaRow}><span>Order No.</span><strong>{completedOrder.id}</strong></div>
          <div className={styles.metaRow}><span>Date</span><span>{orderDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
          <div className={styles.metaRow}><span>Time</span><span>{orderDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span></div>
          <div className={styles.metaRow}><span>Order Type</span><span className={styles.typeBadge}>{completedOrder.type}</span></div>
          <div className={styles.metaRow}><span>Payment</span><span>{completedOrder.paymentMethod === 'qr' ? 'UPI / QR' : 'Card'}</span></div>
        </div>

        <div className={styles.divider}>· · · · · · · · · ·</div>

        <div className={styles.itemsSection}>
          <div className={styles.itemsHeader}>
            <span>Item</span><span>Qty</span><span>Amount</span>
          </div>
          {completedOrder.items.map((item, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemQty}>x{item.qty}</span>
              <span className={styles.itemAmt}>Rs.{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className={styles.divider}>· · · · · · · · · ·</div>

        <div className={styles.totals}>
          <div className={styles.totalRow}><span>Subtotal</span><span>Rs.{completedOrder.subtotal.toFixed(2)}</span></div>
          <div className={styles.totalRow}><span>GST &amp; Taxes (18%)</span><span>Rs.{completedOrder.tax.toFixed(2)}</span></div>
          <div className={`${styles.totalRow} ${styles.grandTotal}`}>
            <span>Total Paid</span><span>Rs.{completedOrder.total.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.thankYou}>
          <div className={styles.checkmark}>✓</div>
          <p className={styles.thankMsg}>Payment Successful</p>
          <p className={styles.thankSub}>Thank you for dining with us!</p>
          <p className={styles.thankSub}>We hope to see you again soon</p>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" onClick={handlePrint}>
          Print Receipt
        </Button>
        <Button variant="primary" onClick={() => navigate('/welcome')}>
          New Order
        </Button>
      </div>
    </div>
  );
}
