import styles from './CategoryTabs.module.css';

const icons = { All: '🍽️', Breakfast: '🥞', Snacks: '🍟', Beverages: '🧃' };

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className={styles.tabs}>
      {categories.map(cat => (
        <button
          key={cat}
          className={`${styles.tab} ${active === cat ? styles.active : ''}`}
          onClick={() => onChange(cat)}
        >
          <span className={styles.icon}>{icons[cat] || '🍴'}</span>
          {cat}
        </button>
      ))}
    </div>
  );
}
