import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import styles from './FoodCard.module.css';

export default function FoodCard({ item }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const { addToast } = useToast();
  const [imgError, setImgError] = useState(false);

  const cartItem = cart.find(c => c.id === item.id);
  const qty = cartItem ? cartItem.qty : 0;

  const handleAdd = () => {
    addToCart(item);
    addToast(`${item.name} added to cart`, 'success');
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={imgError ? '/placeholder-food.svg' : item.image}
          alt={item.name}
          className={styles.image}
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div className={styles.badges}>
          {item.popular && <span className={styles.popularBadge}>Popular</span>}
          <span className={`${styles.vegBadge} ${item.veg ? styles.veg : styles.nonveg}`}>
            {item.veg ? '●' : '●'}
          </span>
        </div>
        <div className={styles.rating}>★ {item.rating}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.category}>{item.category}</div>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.desc}>{item.description}</p>

        <div className={styles.footer}>
          <div className={styles.price}>₹{item.price}</div>

          {qty === 0 ? (
            <button className={styles.addBtn} onClick={handleAdd}>
              + Add
            </button>
          ) : (
            <div className={styles.qty}>
              <button onClick={() => updateQuantity(item.id, qty - 1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => addToCart(item)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
