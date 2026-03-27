import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Shop } from '@/types/shop';

type ShopStore = {
  shop: Shop | null;
  setShop: (shop: Shop) => void;
  clearShop: () => void;
};

export const shopStore = create<ShopStore>()(
  persist(
    (set) => ({
      shop: null,
      setShop: (shop: Shop) => set({ shop }),
      clearShop: () => set({ shop: null }),
    }),
    { name: 'shop-store', skipHydration: true },
  ),
);
