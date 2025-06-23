import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    removeFromCart,
    changeQty,
    clearCart,
} from '../features/cart/cartSlice';
import './CartPage.css'; // optional CSS (see note below)

const CartPage = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(s => s.cart.items);

    const subtotal = items.reduce((sum, i) => sum + i.price_cents * i.qty, 0);

    if (items.length === 0) {
        return (
            <main>
                <h1>Your Cart</h1>
                <p>The cart is currently empty.</p>
                <Link to="/products_page">Browse products</Link>
            </main>
        );
    }

    return (
        <main>
            <h1>Your Cart</h1>

            <table className="cart-table">
                <thead>
                    <tr>
                        <th colSpan={2}>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th />
                    </tr>
                </thead>

                <tbody>
                    {items.map(i => (
                        <tr key={i.id}>
                            <td className="img-cell">
                                <img src={i.image_url} alt={i.name} />
                            </td>
                            <td>{i.name}</td>

                            <td>
                                <input
                                    type="number"
                                    min={1}
                                    value={i.qty}
                                    onChange={e =>
                                        dispatch(
                                            changeQty({ id: i.id, qty: Number(e.target.value) }),
                                        )
                                    }
                                />
                            </td>

                            <td>${i.price_cents.toFixed(2)}</td>
                            <td>${(i.price_cents * i.qty).toFixed(2)}</td>

                            <td>
                                <button onClick={() => dispatch(removeFromCart(i.id))}>
                                    ×
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 style={{ textAlign: 'right', marginTop: '1rem' }}>
                Subtotal: ${subtotal.toFixed(2)}
            </h2>

            <div style={{ textAlign: 'right', marginTop: '.5rem' }}>
                <button onClick={() => dispatch(clearCart())}>Clear cart</button>
                {/* TODO: add checkout button when ready */}
            </div>
        </main>
    );
};

export default CartPage;
