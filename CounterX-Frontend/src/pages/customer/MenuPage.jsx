import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { getAvailableMenuItems, getMenuByCategory, searchMenu } from '../../api/menu';
import MenuCard from '../../components/MenuCard';
import './MenuPage.css';

const CATEGORIES = ['ALL', 'BREAKFAST', 'MEALS', 'SNACKS', 'DRINKS', 'DESSERT'];

function addToLocalCart(item) {
  const cart = JSON.parse(localStorage.getItem('cx_cart_items') || '[]');
  const idx = cart.findIndex(c => c.itemName === item.itemName);
  if (idx >= 0) cart[idx].quantity += item.quantity;
  else cart.push({ itemName: item.itemName, quantity: item.quantity, price: item.price, imagePath: item.imagePath });
  localStorage.setItem('cx_cart_items', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
}

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initCat = searchParams.get('category') || 'ALL';

  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeCategory, setActiveCategory] = useState(initCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem('cx_cart_items') || '[]');
      setCartCount(cart.reduce((s, i) => s + (i.quantity || 1), 0));
    };
    update();
    window.addEventListener('cartUpdated', update);
    return () => window.removeEventListener('cartUpdated', update);
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetch = activeCategory === 'ALL'
      ? getAvailableMenuItems()
      : getMenuByCategory(activeCategory);
    fetch
      .then(res => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    searchMenu(searchQuery.trim())
      .then(res => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSearchQuery('');
    setSearchParams(cat !== 'ALL' ? { category: cat } : {});
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    handleCategoryChange(activeCategory);
  };

  return (
    <div className="menu-page page-content">
      <div className="container">
        {/* Header */}
        <div className="menu-page__header">
          <div>
            <h1 className="menu-page__title">Our <span className="gradient-text">Menu</span></h1>
            <p className="menu-page__subtitle">{items.length} items available</p>
          </div>
          {cartCount > 0 && (
            <a href="/cart" className="btn btn-primary" id="menu-view-cart-btn">
              <ShoppingCart size={17} /> View Cart ({cartCount})
            </a>
          )}
        </div>

        {/* Toolbar */}
        <div className="menu-page__toolbar">
          {/* Search */}
          <form className="search-bar" onSubmit={handleSearch} id="menu-search-form">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search dishes…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              id="menu-search-input"
            />
            {searchQuery && (
              <button type="button" onClick={handleClearSearch} style={{ color: 'var(--color-text-3)', fontSize: '1.1rem', lineHeight: 1 }}>✕</button>
            )}
          </form>

          {/* Category Pills */}
          <div className="category-pills" id="menu-category-pills">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`category-pill${activeCategory === cat ? ' active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
                id={`cat-pill-${cat.toLowerCase()}`}
              >
                {cat === 'ALL' ? 'All Items' : cat.charAt(0) + cat.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="loading-state"><div className="spinner" /></div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: '3rem' }}>🍽️</span>
            <h3>No items found</h3>
            <p>Try a different category or search term</p>
            <button className="btn btn-secondary" onClick={() => handleCategoryChange('ALL')}>Show All</button>
          </div>
        ) : (
          <div className="menu-items-grid">
            {items.map(item => (
              <MenuCard key={item.id} item={item} onAdd={addToLocalCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
