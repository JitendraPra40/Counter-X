import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';
import BrandLogo from "./BrandLogo";

export default function Header({ title }) {
  const { cart } = useCart();
  const navigate = useNavigate();
  const totalItems = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <header className={styles.header}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Back</button>
      {/* <div className={styles.logo}>
        <span className={styles.logoMark}>CX</span>
        <span>{title || 'CounterX'}</span>
      </div> */}
      <div className={styles.logo}>
  <BrandLogo size={90} />
</div>
      <Link to="/order-summary" className={styles.cart}>
        🛒
        {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
      </Link>
    </header>
  );
}
