import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Shop } from '@/types/shop';
import { Product } from '@/types/product';

type ShopStore = {
  shop: Shop | null;
  product: Product | null;
  setProduct: (product: Product) => void;
  setShop: (shop: Shop) => void;
  clearShop: () => void;
  drugStore: Product[];
  addProductToDrugStore: (product: Product) => void;
};

export const shopStore = create<ShopStore>()(
  persist(
    (set) => ({
      shop: null,
      setShop: (shop: Shop) => set({ shop }),
      clearShop: () => set({ shop: null }),
      product: null,
      setProduct: (product: Product) => set({ product }),
      drugStore: [],
      addProductToDrugStore: (product: Product) =>
        set((state) => ({
          drugStore: state.drugStore.some((p) => p._id === product._id)
            ? state.drugStore
            : [...state.drugStore, product],
        })),
    }),
    { name: 'shop-store', skipHydration: true },
  ),
);
