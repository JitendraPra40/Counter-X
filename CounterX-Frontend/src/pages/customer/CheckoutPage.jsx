import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Utensils, Package, CheckCircle, Loader } from 'lucide-react';
import { placeOrder, addOrderItem, processPayment } from '../../api/orders';
import './CheckoutPage.css';

const ORDER_TYPES   = [
  { value: 'DINE_IN',   label: 'Dine In',   icon: <Utensils size={20} />,  desc: 'Eat at your table' },
  { value: 'TAKE_AWAY', label: 'Take Away',  icon: <Package size={20} />,   desc: 'Take your order home' },
];
const PAYMENT_METHODS = ['UPI', 'GPAY', 'PHONEPE', 'PAYTM'];

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const { cartItems = [], subtotal = 0, gst = 0, total = 0 } = state || {};

  const [orderType,    setOrderType]    = useState('DINE_IN');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  const handlePlaceOrder = async () => {
    if (!cartItems.length) { setError('Your cart is empty!'); return; }
    setLoading(true); setError('');
    try {
      // 1. Place order
      const orderRes = await placeOrder({ totalAmount: total, orderType });
      const order    = orderRes.data;

      // 2. Add order items
      await Promise.all(
        cartItems.map(item =>
          addOrderItem({ orderId: order.id, itemName: item.itemName, quantity: item.quantity || 1, price: item.price })
        )
      );

      // 3. Process payment
      await processPayment({ orderId: order.id, paymentMethod });

      // 4. Clear cart
      localStorage.removeItem('cx_cart_items');
      window.dispatchEvent(new Event('cartUpdated'));

      // 5. Navigate to bill
      navigate(`/bill/${order.id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page page-content">
      <div className="container">
        <div className="checkout-page__header">
          <h1>Checkout</h1>
          <p>Almost there! Complete your order below.</p>
        </div>

        <div className="checkout-layout">
          {/* Left Column */}
          <div className="checkout-form">
            {/* Order Type */}
            <div className="checkout-section card">
              <h3 className="checkout-section__title">Order Type</h3>
              <div className="order-type-grid">
                {ORDER_TYPES.map(ot => (
                  <button
                    key={ot.value}
                    className={`order-type-card${orderType === ot.value ? ' active' : ''}`}
                    onClick={() => setOrderType(ot.value)}
                    id={`order-type-${ot.value.toLowerCase()}`}
                  >
                    <span className="order-type-card__icon">{ot.icon}</span>
                    <span className="order-type-card__label">{ot.label}</span>
                    <span className="order-type-card__desc">{ot.desc}</span>
                    {orderType === ot.value && <CheckCircle size={16} className="order-type-card__check" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="checkout-section card">
              <h3 className="checkout-section__title">Payment Method</h3>
              <div className="payment-methods">
                {PAYMENT_METHODS.map(pm => (
                  <button
                    key={pm}
                    className={`payment-method-btn${paymentMethod === pm ? ' active' : ''}`}
                    onClick={() => setPaymentMethod(pm)}
                    id={`payment-${pm.toLowerCase()}`}
                  >
                    <CreditCard size={16} />
                    {pm}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
          </div>

          {/* Right: Order Summary */}
          <div className="checkout-summary card">
            <h3 className="checkout-section__title">Order Summary</h3>
            <div className="checkout-items">
              {cartItems.map((item, i) => (
                <div key={i} className="checkout-item">
                  <span className="checkout-item__name">
                    {item.itemName}
                    <span className="checkout-item__qty"> × {item.quantity || 1}</span>
                  </span>
                  <span className="checkout-item__price">₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div className="checkout-totals">
              <div className="checkout-total-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="checkout-total-row"><span>GST (5%)</span><span>₹{gst.toFixed(2)}</span></div>
              <div className="divider" />
              <div className="checkout-total-row checkout-total-row--grand">
                <span>Total</span>
                <span className="checkout-grand-total">₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
              onClick={handlePlaceOrder}
              disabled={loading}
              id="checkout-confirm-btn"
            >
              {loading
                ? <><Loader size={17} className="spin-anim" /> Processing…</>
                : <><CreditCard size={17} /> Confirm & Pay ₹{total.toFixed(2)}</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
