// pages/ProductsPage.tsx
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { lazy, Suspense } from 'react';
const ProductTable = lazy(() => import('Monkey/ProductTable'));
/* If you used vanilla-extract: */
import * as s from '../styles/ProductsPage.css';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../types/Product';
export default function ProductsPage() {
    const dispatch = useAppDispatch();
    const handleAdd = (product: Product) => {
        dispatch(addToCart(product));
    };
    return (
        <>
            <h3>Product Page</h3>

            <Suspense fallback={<p>Loading remote table…</p>}>
                <ProductTable onAdd={handleAdd} />
            </Suspense>




        </>
    );
}
