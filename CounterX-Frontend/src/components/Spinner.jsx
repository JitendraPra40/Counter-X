import styles from './Spinner.module.css';

export default function Spinner({ size = 'md', color = 'primary' }) {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`} />
  );
}
