import { type FormEvent, useState } from 'react';

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
    } as const,
    card: {
        width: 400,
        padding: 24,
        borderRadius: 12,
        background: '#ffffff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        fontFamily: `system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif`,
    } as const,
    heading: {
        margin: 0,
        marginBottom: 16,
        fontSize: 22,
        fontWeight: 600,
    } as const,
    field: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: 550,
        color: '#111',
    } as const,
    input: {
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: 6,
        fontSize: 15,
    } as const,
    button: {
        marginTop: 10,
        padding: '10px 16px',
        borderRadius: 6,
        border: 'none',
        background: '#2563eb',
        color: '#fff',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
    } as const,
    msg: { marginTop: 8, fontSize: 14 } as const,
};

export default function AddProduct() {
    const [form, setForm] = useState({
        isdn: '',
        image_url: '',
        unit_size: '',
        name: '',
        price_cents: '',
        category: '',
        qty: '',
        reorder_point: '',
    });
    const [msg, setMsg] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setMsg(null);

        if (!form.name.trim()) {
            setMsg('Name is required');
            return;
        }
        if (Number(form.price_cents) <= 0) {
            setMsg('Price must be > 0');
            return;
        }

        try {
            const res = await fetch('/inventory/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    price_cents: Number(form.price_cents),
                    qty: Number(form.qty),
                    reorder_point: Number(form.reorder_point),
                }),
            });
            if (!res.ok) throw new Error(`API ${res.status}`);
            setMsg('✅ Product added');
            setForm({
                isdn: '',
                image_url: '',
                unit_size: '',
                name: '',
                price_cents: '',
                category: '',
                qty: '',
                reorder_point: '',
            });
        } catch (err: any) {
            setMsg(`Error: ${err.message}`);
        }
    }

    return (
        <div style={styles.wrapper}>
            <form style={styles.card} onSubmit={handleSubmit}>
                <h2 style={styles.heading}>Add a Product</h2>

                {Object.entries({
                    isdn: 'ISDN / SKU',
                    image_url: 'Image URL',
                    unit_size: 'Unit Size',
                    name: 'Name *',
                    price_cents: 'Price (cents) *',
                    category: 'Category',
                    qty: 'Quantity',
                    reorder_point: 'Re-order point',
                }).map(([field, label]) => (
                    <div key={field} style={{ ...styles.field, marginBottom: 12 }}>
                        <label style={styles.label} htmlFor={field}>
                            {label}
                        </label>
                        <input
                            style={styles.input}
                            id={field}
                            name={field}
                            value={(form as any)[field]}
                            onChange={handleChange}
                            type={field.includes('price') || field.includes('qty') ? 'number' : 'text'}
                            min={field.includes('price') || field.includes('qty') ? 0 : undefined}
                            required={label.includes('*')}
                        />
                    </div>
                ))}

                <button style={styles.button} type="submit">
                    Add Product
                </button>

                {msg && <p style={styles.msg}>{msg}</p>}
            </form>
        </div>
    );
}
