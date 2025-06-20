// components/ProductCard.tsx
import { type Product } from '../types/Product';
import * as s from '../styles/ProductCard.css';

export default function ProductCard({ product }: { product: Product }) {
  const handleAdd = () => {
    /* toast + dispatch … */
  };

  return (
    <article className={s.card}>
      <img className={s.image} src={product.image} alt={product.name} />

      {/* body text stays in its own flex column */}
    <div className={s.bodyPanel}>
        <h4 className={s.title}>{product.name}</h4>
        <p className={s.textMuted}>{product.description}</p>
        <p className={s.price}>${product.price.toFixed(2)}</p>
    </div>

      {/*  👉 slide-in bar is now a direct child of <article>  */}
      <div className={s.addBar} onClick={handleAdd}>
        🛒 Add to Cart
      </div>
    </article>
  );
}
