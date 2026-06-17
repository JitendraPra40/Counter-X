import styles from './InputField.module.css';

export default function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  maxLength,
  prefix,
  ...rest
}) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.inputWrap} ${error ? styles.hasError : ''}`}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          type={type}
          className={styles.input}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          {...rest}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
