import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from '../styles/Welcome.module.css';
import logo from '../assets/logo.png';
import BrandLogo from "../components/BrandLogo";

export default function Welcome() {
  const navigate = useNavigate();
  const { setOrderType } = useCart();

  const handleOrderType = (type) => {
    setOrderType(type);
    navigate('/menu');
  };

  return (
    <div className={styles.page}>
      {/* Animated background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <div className={styles.content}>
        {/* Logo */}
        {/* <div className={styles.logo}>
          <div className={styles.logoMark}>CX</div>
          <span className={styles.logoText}>CounterX</span>
        </div> */}
        {/* <div className={styles.logo}>
  <img
    src={logo}
    alt="CounterX Logo"
    className={styles.logoImage}
  />
</div> */}
<div className={styles.logo}>
  <BrandLogo size={280} />
</div>

        {/* Illustration */}
        {/* <div className={styles.illustration}>
          <div className={styles.plateCircle}>
            <span className={styles.plateEmoji}>🍽️</span>
          </div>
          <div className={styles.floatItem} style={{ '--delay': '0s' }}>🥞</div>
          <div className={styles.floatItem} style={{ '--delay': '0.5s' }}>🧃</div>
          <div className={styles.floatItem} style={{ '--delay': '1s' }}>🍟</div>
        </div> */}

        {/* Hero text */}
        <h1 className={styles.headline}>
          Order Fresh,<br />
          <span className={styles.highlight}>Eat Happy</span>
        </h1>
        <p className={styles.sub}>
          Browse our menu and place your order in seconds.
          Skip the queue, enjoy the food.
        </p>

        {/* Order type buttons */}
        <div className={styles.actions}>
          <button
            className={`${styles.orderBtn} ${styles.dineIn}`}
            onClick={() => handleOrderType('Dine In')}
          >
            <span className={styles.btnIcon}>🪑</span>
            <div>
              <div className={styles.btnLabel}>Dine In</div>
              <div className={styles.btnSub}>Order at your table</div>
            </div>
          </button>

          <button
            className={`${styles.orderBtn} ${styles.takeAway}`}
            onClick={() => handleOrderType('Take Away')}
          >
            <span className={styles.btnIcon}>🛍️</span>
            <div>
              <div className={styles.btnLabel}>Take Away</div>
              <div className={styles.btnSub}>Pick up your order</div>
            </div>
          </button>
        </div>

        {/* Admin link */}
        {/* <button
          className={styles.adminLink}
          onClick={() => navigate('/admin')}
        >
          🔑 Staff Login
        </button> */}
        <div className={styles.loginActions}>
  <button
    className={styles.staffLogin}
    onClick={() => navigate('/staff-login')}
  >
    👨‍🍳 Staff Login
  </button>

  <button
    className={styles.adminLogin}
    onClick={() => navigate('/admin-login')}
  >
    👨‍💼 Admin Login
  </button>
</div>
      </div>

      <div className={styles.footer}>
        <span>Powered by</span>
        <strong> CounterX</strong>
        <span> · Restaurant OS</span>
      </div>
    </div>
  );
}
