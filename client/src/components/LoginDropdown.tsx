//components/LoginDropdown.tsx
import { useAuthForm } from "../hooks/useAuthForm";

// components/LoginDropdown.tsx
const LoginDropdown: React.FC<{
    mode: 'login' | 'register';
    setMode: React.Dispatch<React.SetStateAction<'login' | 'register'>>;
    onClose: () => void;
}> = ({ mode, setMode, onClose }) => {
    const {
        email, setEmail,
        password, setPassword,
        loading, submit,
    } = useAuthForm(mode, onClose);

    return (
        <form className="login-box" onSubmit={submit}>

            <input
                type="email"
                placeholder="Emailddd"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? '...' : mode === 'login' ? 'Login' : 'Register'}
            </button>
            <small>
                {mode === 'login' ? 'No account?' : 'Have an account?'}&nbsp;
                <span
                    className="linkish"
                    onClick={() => setMode(m => (m === 'login' ? 'register' : 'login'))}
                >
                    {mode === 'login' ? 'Sign up' : 'Log in'}
                </span>
            </small>

        </form>
    );
};
export default LoginDropdown;