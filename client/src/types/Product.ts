// types/Product.ts
export type Product = {
    id: number;
    isdn: string;          // ← fixed typo
    name: string;
    description: string;
    weight: number;
    unit_size: string;     // optional, matches DB
    price_cents: number;   // int in cents
    image_url: string;
    category: string;
};