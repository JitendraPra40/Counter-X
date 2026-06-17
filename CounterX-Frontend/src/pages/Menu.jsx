import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import EmptyState from '../components/EmptyState';
import Spinner from '../components/Spinner';
import { useCart } from '../context/CartContext';
import { getMenuItems, getCategories } from '../api/menuApi';
import styles from '../styles/Menu.module.css';

export default function Menu() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { cart, orderType } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    getMenuItems(activeCategory, search).then(data => {
      setItems(data);
      setLoading(false);
    });
  }, [activeCategory, search]);

  return (
    <div className={styles.page}>
      <Header title="Menu" />

      <div className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.orderTypeBadge}>{orderType}</span>
          <h2 className={styles.heroTitle}>What's on your mind?</h2>
          <p className={styles.heroSub}>Fresh made with love, delivered to your table</p>
        </div>
      </div>

      <div className={styles.controls}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search dishes, drinks..."
        />
        <div className={styles.tabs}>
          <CategoryTabs
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </div>

      <div className={styles.main}>
        {loading ? (
          <div className={styles.spinnerWrap}>
            <Spinner size="lg" />
            <p>Loading menu...</p>
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="Nothing found"
            message="Try a different search term or category"
            action="Clear Search"
            onAction={() => { setSearch(''); setActiveCategory('All'); }}
          />
        ) : (
          <div className={styles.grid}>
            {items.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Floating cart */}
      {totalItems > 0 && (
        <button className={styles.floatingCart} onClick={() => navigate('/order-summary')}>
          <div className={styles.cartLeft}>
            <span className={styles.cartCount}>{totalItems}</span>
            <span>View Cart</span>
          </div>
          <div className={styles.cartRight}>
            <span>₹{totalPrice.toFixed(0)}</span>
            <span>→</span>
          </div>
        </button>
      )}
    </div>
  );
}
