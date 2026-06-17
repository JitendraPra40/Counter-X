import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { processCardPayment, processQrPayment } from '../api/paymentApi';
import { createOrder } from '../api/orderApi';
import styles from '../styles/Payment.module.css';

import { QRCodeCanvas } from "qrcode.react";

export default function Payment() {
  const { cart, subtotal, tax, total, orderType, setCompletedOrder, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [tab, setTab] = useState('qr');
  const [qrPaid, setQrPaid] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);

  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const upiId = "jamesj20041@ybl";

  const validateCard = () => {
    const e = {};
    if (card.number.replace(/\s/g, '').length !== 16) e.number = 'Enter valid 16-digit card number';
    if (!card.name.trim()) e.name = 'Cardholder name is required';
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = 'Enter expiry as MM/YY';
    if (card.cvv.length !== 3) e.cvv = 'CVV must be 3 digits';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const formatCardNumber = (val) => {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const handleQrSimulate = async () => {
    setQrLoading(true);
    try {
      await processQrPayment(total);
      setQrPaid(true);
      await finalizeOrder('qr');
    } catch {
      addToast('Payment failed. Try again.', 'error');
    }
    setQrLoading(false);
  };

  const handleCardPay = async () => {
    if (!validateCard()) return;
    setCardLoading(true);
    try {
      const result = await processCardPayment(card, total);
      if (result.success) {
        await finalizeOrder('card');
      }
    } catch {
      addToast('Payment failed. Try again.', 'error');
    }
    setCardLoading(false);
  };

  const finalizeOrder = async (method) => {
    const order = await createOrder({
      type: orderType,
      items: cart.map(c => ({ name: c.name, qty: c.qty, price: c.price })),
      subtotal, tax, total,
      paymentMethod: method,
      table: orderType === 'Dine In' ? 'Table 5' : 'Counter',
    });
    setCompletedOrder(order);
    clearCart();
    navigate('/receipt');
  };

  return (
    <div className={styles.page}>
      <Header title="Payment" />

      <div className={styles.content}>
        <div className={styles.amountBanner}>
          <div className={styles.amountLabel}>Amount Due</div>
          <div className={styles.amountValue}>₹{total.toFixed(2)}</div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'qr' ? styles.activeTab : ''}`}
            onClick={() => setTab('qr')}
          >
            📱 QR / UPI
          </button>
          <button
            className={`${styles.tab} ${tab === 'card' ? styles.activeTab : ''}`}
            onClick={() => setTab('card')}
          >
            💳 Card
          </button>
        </div>

        {/* QR Panel */}
        {tab === 'qr' && (
          <div className={styles.panel}>
            {!qrPaid ? (
              <>
                <p className={styles.panelHint}>Scan with any UPI app to pay</p>
                <div className={styles.qrWrap}>
                  <div className={styles.qrScanRing} />
                  {/* <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=counterx@ybl&am=${total.toFixed(2)}&tn=CounterX+Order`}
                    alt="QR Code"
                    className={styles.qrImg}
                  /> */}
                  <QRCodeCanvas
                    value={`upi://pay?pa=${upiId}&pn=CounterX&am=${total.toFixed(
                      2
                    )}&tn=CounterX+Order`}
                    size={180}
                    className={styles.qrImg}
                  />
                </div>
                {/* <div className={styles.upiId}>counterx@ybl</div>
                 */}
                 <div className={styles.upiId}>{upiId}</div>
                <div className={styles.upiAmount}>₹{total.toFixed(2)}</div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={qrLoading}
                  onClick={handleQrSimulate}
                >
                  ✓ I have paid
                </Button>
              </>
            ) : (
              <div className={styles.successAnim}>
                <div className={styles.successCircle}>✓</div>
                <div className={styles.successText}>Payment Received!</div>
                <div className={styles.successSub}>Redirecting to receipt...</div>
              </div>
            )}
          </div>
        )}

        {/* Card Panel */}
        {tab === 'card' && (
          <div className={styles.panel}>
            <div className={styles.cardPreview}>
              <div className={styles.cardChip}>◈</div>
              <div className={styles.cardNumber}>
                {card.number || '•••• •••• •••• ••••'}
              </div>
              <div className={styles.cardBottom}>
                <div>
                  <div className={styles.cardFieldLabel}>Card Holder</div>
                  <div className={styles.cardFieldValue}>{card.name || '— — —'}</div>
                </div>
                <div>
                  <div className={styles.cardFieldLabel}>Expires</div>
                  <div className={styles.cardFieldValue}>{card.expiry || 'MM/YY'}</div>
                </div>
              </div>
            </div>

            <div className={styles.form}>
              <InputField
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={card.number}
                onChange={e => setCard(p => ({ ...p, number: formatCardNumber(e.target.value) }))}
                error={errors.number}
                maxLength={19}
              />
              <InputField
                label="Cardholder Name"
                placeholder="Name on card"
                value={card.name}
                onChange={e => setCard(p => ({ ...p, name: e.target.value }))}
                error={errors.name}
              />
              <div className={styles.row}>
                <InputField
                  label="Expiry (MM/YY)"
                  placeholder="MM/YY"
                  value={card.expiry}
                  onChange={e => setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                  error={errors.expiry}
                  maxLength={5}
                />
                <InputField
                  label="CVV"
                  placeholder="123"
                  value={card.cvv}
                  onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/, '').slice(0, 3) }))}
                  error={errors.cvv}
                  maxLength={3}
                  type="password"
                />
              </div>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={cardLoading}
                onClick={handleCardPay}
              >
                Pay ₹{total.toFixed(2)}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
