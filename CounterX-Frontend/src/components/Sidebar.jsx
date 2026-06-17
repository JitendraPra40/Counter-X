import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import BrandLogo from "./BrandLogo";

const navItems = [
  { to: '/admin',      icon: '⊞', label: 'Dashboard'  },
  { to: '/dashboard',  icon: '📊', label: 'Analytics'  },
  { to: '/salesboard', icon: '💹', label: 'Sales'      },
  { to: '/kitchen',    icon: '🍳', label: 'Kitchen'    },
  { to: '/menu',       icon: '🍽️', label: 'Menu'       },
  { to: '/welcome',    icon: '↩', label: 'Exit'        },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      {/* <div className={styles.brand}>
        <div className={styles.logo}>CX</div>
        <span className={styles.brandName}>CounterX</span>
      </div> */}
      <div className={styles.brand}>
  <BrandLogo size={140} />
</div>

      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.linkIcon}>{item.icon}</span>
            <span className={styles.linkLabel}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.avatar}>A</div>
        <div>
          <div className={styles.adminName}>Admin</div>
          <div className={styles.adminRole}>Manager</div>
        </div>
      </div>
    </aside>
  );
}
