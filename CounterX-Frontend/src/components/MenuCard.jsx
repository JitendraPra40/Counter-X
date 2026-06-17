import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Star, Tag } from 'lucide-react';
import './MenuCard.css';

const CATEGORY_COLORS = {
  BREAKFAST: '#F59E0B',
  MEALS: '#10B981',
  SNACKS: '#3B82F6',
  DRINKS: '#8B5CF6',
  DESSERT: '#EC4899',
};

export default function MenuCard({ item, onAdd }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd({ ...item, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const catColor = CATEGORY_COLORS[item.category] || 'var(--color-primary)';

  return (
    <div className="menu-card animate-fadeIn">
      {/* Image */}
      <div className="menu-card__img-wrap">
        {item.imagePath ? (
          <img src={item.imagePath} alt={item.itemName} className="menu-card__img" loading="lazy" />
        ) : (
          <div className="menu-card__img-placeholder">
            <span>🍽️</span>
          </div>
        )}
        <span className="menu-card__category-badge" style={{ background: `${catColor}22`, color: catColor }}>
          <Tag size={10} /> {item.category}
        </span>
        {!item.available && (
          <div className="menu-card__unavailable">Unavailable</div>
        )}
      </div>

      {/* Body */}
      <div className="menu-card__body">
        <h4 className="menu-card__name">{item.itemName}</h4>
        <p className="menu-card__desc">{item.description}</p>

        <div className="menu-card__footer">
          <div className="menu-card__price">
            <span className="menu-card__price-symbol">₹</span>
            <span className="menu-card__price-value">{item.price?.toFixed(2)}</span>
          </div>

          {item.available && (
            <div className="menu-card__actions">
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>
                  <Minus size={13} />
                </button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>
                  <Plus size={13} />
                </button>
              </div>
              <button
                className={`menu-card__add-btn${added ? ' added' : ''}`}
                onClick={handleAdd}
                id={`add-to-cart-${item.id}`}
              >
                {added ? '✓ Added' : <><ShoppingCart size={15} /> Add</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
