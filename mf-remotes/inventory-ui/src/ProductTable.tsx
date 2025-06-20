// mf-remotes/inventory-ui/src/ProductTable.tsx
// export default function ProductTable() {
//     return (
//         <div style={{ padding: 12, border: '1px solid #ccc' }}>
//             <h2>Inventory – Federated Remote</h2>
//             <p>This text is rendered from <code>inventory-ui</code>.</p>
//         </div>
//     );
// } 

import { useEffect, useState } from 'react';

interface ProductDto {
    id: number;
    isdn: string;
    image_url: string | null;
    unit_size: string;
    name: string;
    price_cents: number;
    category: string;
    qty: number;
}
interface Props {
    onAdd: (product: ProductDto) => void;
}

export default function ProductTable({ onAdd}: Props) {
    const [rows, setRows] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/inventory/products')
            .then(r => {
                console.log('Response:', r);
                if (!r.ok) throw new Error(`API ${r.status}`);
                return r.json() as Promise<ProductDto[]>;
            })
            .then(data => setRows(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading Inventory...</p>;

    return (
        <div style={{ padding: 12, border: '1px solid #ccc' }}>
            <h2>Inventory – Federated Remote</h2>

            {loading && <p>Loading inventory…</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {!loading && !error && (
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>ID</th>
                            <th style={{ textAlign: 'left' }}>Name</th>
                            <th style={{ textAlign: 'left' }}>Unit</th>
                            <th style={{ textAlign: 'right' }}>Price ($)</th>
                            <th style={{ textAlign: 'right' }}>Qty</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.unit_size}</td>
                                <td style={{ textAlign: 'right' }}>
                                    {(p.price_cents / 100).toFixed(2)}
                                </td>
                                <td style={{ textAlign: 'right' }}>{p.qty}</td>
                                <td>
                                    <button onClick={() => onAdd(p)}>Add to Cart</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
