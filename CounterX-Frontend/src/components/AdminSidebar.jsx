import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, UtensilsCrossed, ClipboardList, ChefHat,
  Package, BarChart2, LogOut, Utensils, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AdminSidebar.css';

const navItems = [
  { to: '/admin/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/admin/menu', icon: <UtensilsCrossed size={18} />, label: 'Menu' },
  { to: '/admin/orders', icon: <ClipboardList size={18} />, label: 'Orders' },
  { to: '/admin/kitchen', icon: <ChefHat size={18} />, label: 'Kitchen' },
  { to: '/admin/inventory', icon: <Package size={18} />, label: 'Inventory' },
  { to: '/admin/sales', icon: <BarChart2 size={18} />, label: 'Sales' },
];

export default function AdminSidebar({ mobileOpen, onClose }) {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`admin-sidebar${mobileOpen ? ' open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon"><Utensils size={18} /></div>
          <span className="sidebar-logo-text">Counter<span>X</span></span>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
            <X size={18} />
          </button>
        </div>

        {/* Admin info */}
        <div className="sidebar-admin">
          <div className="sidebar-admin-avatar">
            {admin?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="sidebar-admin-info">
            <p className="sidebar-admin-name">{admin?.username || 'Admin'}</p>
            <p className="sidebar-admin-role">Administrator</p>
          </div>
        </div>

        <div className="sidebar-divider" />

        {/* Nav */}
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-nav-item${location.pathname === item.to ? ' active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout} id="admin-logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
