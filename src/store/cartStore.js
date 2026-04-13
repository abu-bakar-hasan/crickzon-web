import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, selectedOptions, quantity = 1) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.variantId === variant._id,
        );

        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex].quantity += quantity;
          set({ items: updated });
        } else {
          set({
            items: [
              ...items,
              {
                productId: product._id,
                variantId: variant._id,
                name: product.name,
                brand: product.brand,
                image: product.images?.[0] || "",
                selectedOptions,
                price: variant.price,
                stock: variant.stock,
                quantity,
              },
            ],
          });
        }
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter((item) => item.variantId !== variantId),
        });
      },

      updateQuantity: (variantId, quantity) => {
        set({
          items: get().items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: "crickzon-cart" },
  ),
);

export default useCartStore;
