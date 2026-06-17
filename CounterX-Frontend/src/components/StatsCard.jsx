import styles from './StatsCard.module.css';

export default function StatsCard({ icon, label, value, change, up, color = 'primary', prefix = '' }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.icon} style={{ '--c': `var(--${color})`, '--ca': `var(--${color}-alpha)` }}>
          {icon}
        </div>
        {change !== undefined && (
          <span className={`${styles.change} ${up ? styles.up : styles.down}`}>
            {up ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <div className={styles.value}>{prefix}{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
