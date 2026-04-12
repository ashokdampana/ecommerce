import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, qty = 1) => {
        const items = get().cartItems;
        const exists = items.find(i => i._id === product._id);
        const updated = exists
          ? items.map(i => i._id === product._id ? { ...i, qty: i.qty + qty } : i )
          : [...items, { ...product, qty }];
        set({ cartItems: updated });
      },

      removeFromCart: (id) =>
        set({ cartItems: get().cartItems.filter(i => i._id !== id) }),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cartItems', // key in localStorage
    }
  )
);
