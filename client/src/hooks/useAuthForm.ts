// hooks/useAuthForm.ts
import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setToken } from '../features/auth/authSlice';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { login, register } from '../api/auth';

interface JWTPayload { roles: string[] }

export function useAuthForm(
    mode: 'login' | 'register',
    onSuccess?: () => void
) {
    const dispatch = useAppDispatch();
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading]   = useState(false);

    const submit: React.FormEventHandler = async e => {
        e.preventDefault();
        setLoading(true);
        try {
        const { data } =
            mode === 'login'
            ? await login(email, password)
            : await register(email, password);

        const { roles } = jwtDecode<JWTPayload>(data.token);

        dispatch(setToken(data.token));
        toast.success(mode === 'login' ? `Logged in as ${roles.join(', ')}` : 'Registered & logged in');
        setEmail('');
        setPassword('');
        onSuccess?.();
        } catch (err: any) {
        toast.error(err.response?.data?.msg ?? 'Request failed');
        } finally {
        setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        submit,
    };
}
