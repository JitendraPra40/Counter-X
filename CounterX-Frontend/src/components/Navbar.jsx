import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Utensils, ChevronRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cx_cart_items') || '[]');
      setCartCount(cart.reduce((sum, i) => sum + (i.quantity || 1), 0));
    };
    updateCart();
    window.addEventListener('storage', updateCart);
    window.addEventListener('cartUpdated', updateCart);
    return () => {
      window.removeEventListener('storage', updateCart);
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
  ];

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <Utensils size={20} />
          </div>
          <span className="navbar__logo-text">Counter<span>X</span></span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`navbar__link${location.pathname === l.to ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button
            className="navbar__cart-btn"
            onClick={() => navigate('/cart')}
            id="navbar-cart-btn"
            aria-label="View cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="navbar__cart-count">{cartCount}</span>
            )}
          </button>
          <Link to="/menu" className="btn btn-primary btn-sm navbar__order-btn">
            Order Now <ChevronRight size={15} />
          </Link>
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`navbar__mobile-link${location.pathname === l.to ? ' active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/cart" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
          <Link to="/admin/login" className="navbar__mobile-link navbar__mobile-admin" onClick={() => setMobileOpen(false)}>
            Admin Login
          </Link>
        </div>
      )}
    </nav>
  );
}
