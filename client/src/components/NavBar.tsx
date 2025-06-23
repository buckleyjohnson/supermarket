import { Link, NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { logout } from '../features/auth/authSlice';
import LoginDropdown from './LoginDropdown';
import './NavBar.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useState } from 'react';

export default function NavBar() {
    const cartQty = useAppSelector(
        s => s.cart.items.reduce((sum, i) => sum + i.qty, 0)
    );
    // const token = useAppSelector(s => s.auth.token);
    const { token, roles } = useAppSelector(s => s.auth);



    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'login' | 'register'>('login');

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
                <NavLink to="/cart_page" className="cart-btn">
                    <AiOutlineShoppingCart size={24} />
                    {cartQty > 0 && <span className="badge">{cartQty}</span>}
                </NavLink>
                <NavLink to="/cart_page">Cart</NavLink>
                {token && <NavLink to="/account">Account</NavLink>}
                {/* {roles.includes('Store Manager') && (
                    <NavLink to="/employees">Employees</NavLink>
                )} */}
                {token && roles.includes('Store Manager') && (
                    <NavLink to="/employees" className="auth-btn">
                        Employees
                    </NavLink>
                )}
                {token ? (
                    <button className="auth-btn" onClick={() => dispatch(logout())}>Logout</button>
                ) : (
                    <div className="login-wrapper">
                        <button className="auth-btn" onClick={() => setOpen(o => !o)}>Login</button>
                        {open && (
                            <LoginDropdown mode={mode} setMode={setMode} onClose={() => setOpen(false)} />
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
