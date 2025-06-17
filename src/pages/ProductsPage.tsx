// pages/ProductsPage.tsx
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

/* If you used vanilla-extract: */
import * as s from '../styles/ProductsPage.css';

export default function ProductsPage() {
    return (

    <section className={s.grid /* or "productGrid" for plain CSS */}>
        {products.map(p => (
            <ProductCard key={p.id} product={p} />
        ))}
    </section>
        );
}
