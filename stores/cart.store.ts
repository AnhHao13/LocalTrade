import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem as DomainCartItem } from "@/types";

export interface LocalCartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  maxQuantity: number;
}

interface CartState {
  items: LocalCartItem[];
  addItem: (
    item: Omit<LocalCartItem, "quantity"> & { quantity?: number }
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getItemById: (id: string) => LocalCartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId
          );
          const quantityToAdd = item.quantity ?? 1;

          if (existingItem) {
            const newQuantity = Math.min(
              existingItem.quantity + quantityToAdd,
              existingItem.maxQuantity
            );
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: newQuantity }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...item, quantity: Math.min(quantityToAdd, item.maxQuantity) },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => {
              if (i.id === id) {
                const newQuantity = Math.max(
                  0,
                  Math.min(quantity, i.maxQuantity)
                );
                return { ...i, quantity: newQuantity };
              }
              return i;
            })
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getItemById: (id) => get().items.find((i) => i.id === id),
    }),
    {
      name: "cart-storage",
    }
  )
);

export function domainCartItemToLocal(item: DomainCartItem): LocalCartItem {
  return {
    id: item.id,
    productId: item.productId,
    name: item.name,
    slug: item.slug,
    price: item.price,
    originalPrice: item.originalPrice,
    quantity: item.quantity,
    image: item.image,
    maxQuantity: item.maxQuantity,
  };
}
