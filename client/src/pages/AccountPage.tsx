// src/pages/AccountPage.tsx
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getAccount, type AccountInfo } from '../api/user';


const AccountPage = () => {
    const [info, setInfo] = useState<AccountInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAccount();
                setInfo(data);
            } catch {
                toast.error('Could not load account');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p>Loading…</p>;
    if (!info) return <p>Error.</p>;

    return (
        <main className='main'>
            <h1>Account</h1>
            <p><strong>Email:</strong> {info.email}</p>
            <p><strong>Joined:</strong> {new Date(info.createdAt).toLocaleDateString()}</p>
            <p>
                <strong>Roles:</strong>{' '}
                {info.roles.length ? info.roles.join(', ') : '—'}
            </p>
        </main>
    );
};

export default AccountPage;
