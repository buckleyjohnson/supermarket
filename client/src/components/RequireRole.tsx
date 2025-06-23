import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { hasRole, selectToken } from '../features/auth/selectors';

interface Props {
    role: string;                 // e.g. "Store Manager"
    children: JSX.Element;
}

export default function RequireRole({ role, children }: Props) {
    const token = useAppSelector(selectToken);
    const authorised = useAppSelector(hasRole(role));
    const location = useLocation();

    if (!token) {
        // not logged in → send to login page (or home)
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    if (!authorised) {
        // logged in but wrong role
        return <p style={{ padding: 24 }}>403 – Forbidden</p>;
    }
    return children;
}
