import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { useCart } from '../context/CartContext';
import styles from '../styles/OrderSummary.module.css';

export default function OrderSummary() {
  const { cart, removeFromCart, updateQuantity, subtotal, tax, total, orderType } = useCart();
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className={styles.page}>
        <Header title="Your Order" />
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          message="Add some delicious items from our menu to get started"
          action="Browse Menu"
          onAction={() => navigate('/menu')}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header title="Your Order" />

      <div className={styles.content}>
        {/* Order type indicator */}
        <div className={styles.orderType}>
          <span>🪑</span>
          <span>{orderType}</span>
        </div>

        {/* Cart items */}
        <div className={styles.itemsList}>
          {cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImg} />
              <div className={styles.itemInfo}>
                <h4 className={styles.itemName}>{item.name}</h4>
                <div className={styles.itemPrice}>₹{item.price} each</div>
              </div>
              <div className={styles.itemControls}>
                <div className={styles.qtyControl}>
                  <button onClick={() => updateQuantity(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                </div>
                <div className={styles.itemTotal}>₹{(item.price * item.qty).toFixed(0)}</div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className={styles.notesSection}>
          <label className={styles.notesLabel}>Order Notes</label>
          <textarea
            className={styles.notes}
            placeholder="Any special instructions? (Eg. less spicy, no onions...)"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {/* Price breakdown */}
        <div className={styles.priceCard}>
          <h3 className={styles.priceTitle}>Bill Summary</h3>
          <div className={styles.priceRows}>
            <div className={styles.priceRow}>
              <span>Subtotal ({cart.reduce((s,c) => s+c.qty,0)} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.priceRow}>
              <span>GST & Taxes (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className={`${styles.priceRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => navigate('/payment')}
        >
          Continue to Payment — ₹{total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
}
