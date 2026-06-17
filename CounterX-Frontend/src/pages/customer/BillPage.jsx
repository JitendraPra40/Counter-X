import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Receipt, Home, Utensils } from 'lucide-react';
import { getBillByOrderId } from '../../api/orders';
import './BillPage.css';

export default function BillPage() {
  const { orderId } = useParams();
  const navigate    = useNavigate();
  const [bill, setBill]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  useEffect(() => {
    getBillByOrderId(orderId)
      .then(res => setBill(res.data))
      .catch(() => setError('Could not load bill. Your order was placed successfully!'))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return (
    <div className="bill-page page-content">
      <div className="container"><div className="loading-state"><div className="spinner" /></div></div>
    </div>
  );

  return (
    <div className="bill-page page-content">
      <div className="container">
        <div className="bill-wrapper animate-slideUp">
          {/* Success Header */}
          <div className="bill-success">
            <div className="bill-success__icon">
              <CheckCircle size={44} />
            </div>
            <h1 className="bill-success__title">Order Placed!</h1>
            <p className="bill-success__subtitle">Your order has been confirmed and sent to the kitchen.</p>
            {bill?.dailyOrderNumber && (
              <div className="bill-token">
                <span className="bill-token__label">Your Token Number</span>
                <span className="bill-token__value">#{bill.dailyOrderNumber}</span>
              </div>
            )}
          </div>

          {error && <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>{error}</div>}

          {bill && (
            <div className="bill-card card">
              <div className="bill-card__header">
                <Receipt size={18} />
                <span>Receipt</span>
                <span className="bill-card__id">Bill #{bill.billId}</span>
              </div>

              <div className="bill-detail-rows">
                <div className="bill-detail-row">
                  <span>Order ID</span>
                  <span>#{bill.orderId}</span>
                </div>
                <div className="bill-detail-row">
                  <span>Order Type</span>
                  <span className="badge badge-info">{bill.orderType?.replace('_', ' ')}</span>
                </div>
                <div className="bill-detail-row">
                  <span>Payment Status</span>
                  <span className={`badge ${bill.paymentStatus === 'SUCCESS' ? 'badge-success' : 'badge-warning'}`}>
                    {bill.paymentStatus}
                  </span>
                </div>
                <div className="bill-detail-row">
                  <span>Date & Time</span>
                  <span>{bill.billDateTime ? new Date(bill.billDateTime).toLocaleString() : '—'}</span>
                </div>
              </div>

              <div className="divider" />

              <div className="bill-totals">
                <div className="bill-total-row"><span>Subtotal</span><span>₹{bill.subTotal?.toFixed(2)}</span></div>
                <div className="bill-total-row"><span>GST (5%)</span><span>₹{bill.gstAmount?.toFixed(2)}</span></div>
                <div className="divider" />
                <div className="bill-total-row bill-total-row--grand">
                  <span>Total Paid</span>
                  <span className="bill-grand-total">₹{bill.totalAmount?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bill-actions">
            <button className="btn btn-primary" onClick={() => navigate('/')} id="bill-home-btn">
              <Home size={16} /> Back to Home
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/menu')} id="bill-order-more-btn">
              <Utensils size={16} /> Order More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
