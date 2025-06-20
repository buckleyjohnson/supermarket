import { Link, NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './NavBar.css';
import { useAppSelector } from '../app/hooks';

export default function NavBar() {
        const cartQty = useAppSelector(
        s => s.cart.items.reduce((sum, i) => sum + i.qty, 0)
    );
    return (
        <header className="navbar">
            {/* brand */}
            <Link to="/" className="brand">
                SuperMarket
            </Link>

            {/* main nav links */}
            <nav className="links">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/products_page">Products</NavLink>
            </nav>

            {/* right-hand actions */}
            <div className="actions">
                <NavLink to="/checkout_page" className="cart-btn">
                    <AiOutlineShoppingCart size={24} />
                    {cartQty > 0 && <span className="badge">{cartQty}</span>}
                </NavLink>
                <NavLink to="/checkout_page">Checkout</NavLink>
            </div>
        </header>
    );
}
