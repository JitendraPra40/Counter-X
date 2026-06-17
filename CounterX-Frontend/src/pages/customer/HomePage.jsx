import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Clock, Star, ArrowRight } from 'lucide-react';
import { getAvailableMenuItems } from '../../api/menu';
import MenuCard from '../../components/MenuCard';
import './HomePage.css';

const FEATURES = [
  { icon: '⚡', title: 'Instant Ordering', desc: 'Browse, select and pay in under 2 minutes' },
  { icon: '🤖', title: 'AI Powered', desc: 'Smart recommendations tailored just for you' },
  { icon: '🔔', title: 'Live Updates', desc: 'Track your order from kitchen to table' },
  { icon: '💳', title: 'Easy Payments', desc: 'UPI, GPay, PhonePe and more accepted' },
];

const CATEGORIES = [
  { name: 'BREAKFAST', emoji: '🍳', label: 'Breakfast' },
  { name: 'MEALS', emoji: '🍱', label: 'Meals' },
  { name: 'SNACKS', emoji: '🍟', label: 'Snacks' },
  { name: 'DRINKS', emoji: '🥤', label: 'Drinks' },
  { name: 'DESSERT', emoji: '🍰', label: 'Desserts' },
];

function addToLocalCart(item) {
  const cart = JSON.parse(localStorage.getItem('cx_cart_items') || '[]');
  const idx = cart.findIndex(c => c.itemName === item.itemName);
  if (idx >= 0) {
    cart[idx].quantity += item.quantity;
  } else {
    cart.push({ itemName: item.itemName, quantity: item.quantity, price: item.price, imagePath: item.imagePath });
  }
  localStorage.setItem('cx_cart_items', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
}

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAvailableMenuItems()
      .then(res => setFeatured(res.data.slice(0, 4)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
          <div className="hero__grid" />
        </div>
        <div className="container hero__content">
          <div className="hero__badge animate-fadeIn">
            <Zap size={13} /> AI-Powered Self-Ordering Platform
          </div>
          <h1 className="hero__title animate-slideUp">
            Order Your Food,{' '}
            <span className="gradient-text">Your Way</span>
          </h1>
          <p className="hero__subtitle animate-slideUp">
            Browse our full menu, customize your order, and pay seamlessly — all from your table. No waiting, no hassle.
          </p>
          <div className="hero__cta animate-slideUp">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/menu')} id="hero-order-btn">
              Browse Menu <ArrowRight size={18} />
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('/cart')} id="hero-cart-btn">
              View Cart
            </button>
          </div>
          <div className="hero__stats">
            {[['500+', 'Daily Orders'], ['4.9★', 'Rating'], ['< 2min', 'Order Time']].map(([val, lbl]) => (
              <div key={lbl} className="hero__stat">
                <span className="hero__stat-value">{val}</span>
                <span className="hero__stat-label">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="section-spacing">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Browse by Category</h2>
              <p className="section-subtitle">Find exactly what you're craving</p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/menu')}>
              View All <ChevronRight size={15} />
            </button>
          </div>
          <div className="category-grid">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                className="cat-card"
                id={`cat-${cat.name.toLowerCase()}`}
                onClick={() => navigate(`/menu?category=${cat.name}`)}
              >
                <span className="cat-card__emoji">{cat.emoji}</span>
                <span className="cat-card__label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="section-spacing">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Items</h2>
              <p className="section-subtitle">Today's popular choices</p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/menu')}>
              Full Menu <ChevronRight size={15} />
            </button>
          </div>
          {loading ? (
            <div className="loading-state"><div className="spinner" /></div>
          ) : featured.length === 0 ? (
            <div className="empty-state">
              <p>No items available right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid-3">
              {featured.map(item => (
                <MenuCard key={item.id} item={item} onAdd={addToLocalCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="section-spacing features-section">
        <div className="container">
          <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <h2 className="section-title">Why CounterX?</h2>
              <p className="section-subtitle">Designed for a seamless dining experience</p>
            </div>
          </div>
          <div className="features-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="feature-card card">
                <div className="feature-card__icon">{f.icon}</div>
                <h4 className="feature-card__title">{f.title}</h4>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-spacing">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner__blob" />
            <div className="cta-banner__content">
              <h2>Ready to order?</h2>
              <p>Explore our full menu and place your order in seconds.</p>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/menu')} id="cta-order-btn">
              Order Now <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container home-footer__inner">
          <p>&copy; 2026 CounterX. AI-Powered Restaurant Platform.</p>
          <a href="/admin/login" className="home-footer__admin-link">Admin Portal →</a>
        </div>
      </footer>
    </div>
  );
}
