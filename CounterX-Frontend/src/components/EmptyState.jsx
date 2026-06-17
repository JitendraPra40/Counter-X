import styles from './EmptyState.module.css';

export default function EmptyState({ icon = '🍽️', title, message, action, onAction }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      {message && <p className={styles.message}>{message}</p>}
      {action && (
        <button className={styles.btn} onClick={onAction}>{action}</button>
      )}
    </div>
  );
}
