import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, UtensilsCrossed } from 'lucide-react';
import './CartPage.css';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const loadCart = () => {
    const stored = JSON.parse(localStorage.getItem('cx_cart_items') || '[]');
    setCartItems(stored);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const saveCart = (updated) => {
    setCartItems(updated);
    localStorage.setItem('cx_cart_items', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQty = (idx, delta) => {
    const updated = [...cartItems];
    updated[idx].quantity = Math.max(1, (updated[idx].quantity || 1) + delta);
    saveCart(updated);
  };

  const removeItem = (idx) => {
    const updated = cartItems.filter((_, i) => i !== idx);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const subtotal = cartItems.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);
  const gst      = subtotal * 0.05;
  const total    = subtotal + gst;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page page-content">
        <div className="container">
          <div className="empty-state" style={{ minHeight: '60vh' }}>
            <UtensilsCrossed size={64} color="var(--color-text-3)" />
            <h3>Your cart is empty</h3>
            <p>Add items from our menu to get started</p>
            <button className="btn btn-primary" onClick={() => navigate('/menu')} id="cart-browse-btn">
              Browse Menu <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-content">
      <div className="container">
        <div className="cart-page__header">
          <div>
            <h1 className="cart-page__title">Your <span className="gradient-text">Cart</span></h1>
            <p className="cart-page__subtitle">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} selected</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={clearCart} id="cart-clear-btn">
            <Trash2 size={14} /> Clear All
          </button>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cartItems.map((item, idx) => (
              <div key={idx} className="cart-item card animate-fadeIn">
                <div className="cart-item__img">
                  {item.imagePath
                    ? <img src={item.imagePath} alt={item.itemName} />
                    : <span>🍽️</span>
                  }
                </div>
                <div className="cart-item__info">
                  <h4 className="cart-item__name">{item.itemName}</h4>
                  <p className="cart-item__price-unit">₹{item.price?.toFixed(2)} each</p>
                </div>
                <div className="cart-item__actions">
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQty(idx, -1)} id={`cart-dec-${idx}`}><Minus size={13} /></button>
                    <span className="qty-value">{item.quantity || 1}</span>
                    <button className="qty-btn" onClick={() => updateQty(idx, 1)} id={`cart-inc-${idx}`}><Plus size={13} /></button>
                  </div>
                  <span className="cart-item__total">₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  <button className="btn-icon btn-danger" onClick={() => removeItem(idx)} id={`cart-remove-${idx}`}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary card">
            <h3 className="cart-summary__title">Order Summary</h3>
            <div className="cart-summary__rows">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary__row">
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="divider" />
              <div className="cart-summary__row cart-summary__row--total">
                <span>Total</span>
                <span className="cart-summary__total-value">₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => navigate('/checkout', { state: { cartItems, subtotal, gst, total } })}
              id="cart-checkout-btn"
            >
              Proceed to Checkout <ArrowRight size={17} />
            </button>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              onClick={() => navigate('/menu')} id="cart-continue-btn">
              + Add More Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
