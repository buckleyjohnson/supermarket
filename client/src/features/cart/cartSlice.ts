import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Product';

/* -----------------------------------------------------------
    Match the fields that come from your inventory API.
    Add/remove fields as your Product shape evolves.
----------------------------------------------------------- */


interface CartItem extends Product {
    qty: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const existing = state.items.find(i => i.id === action.payload.id);
            if (existing) {
                existing.qty += 1;
            } else {
                state.items.push({ ...action.payload, qty: 1 });
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        changeQty(
            state,
            action: PayloadAction<{ id: number; qty: number }>
        ) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) item.qty = action.payload.qty;
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, changeQty, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
