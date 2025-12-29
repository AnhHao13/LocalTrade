/**
 * Cart Service
 *
 * Handles all cart-related API calls.
 * Uses the base api-client - NO direct fetch calls.
 */

import { createApiClient, type ApiClient } from "./api-client";
import type {
  CartResponseDTO,
  CartItemDTO,
  AddToCartRequestDTO,
  UpdateCartItemRequestDTO,
  ApplyCouponRequestDTO,
} from "@/types/api";
import type {
  Cart,
  CartItem,
  AddToCartInput,
  UpdateCartItemInput,
  ApplyCouponInput,
} from "@/types";

// =============================================================================
// Mappers: DTO → Domain
// =============================================================================

function mapCartItemDTO(dto: CartItemDTO): CartItem {
  return {
    id: dto.id,
    productId: dto.product_id,
    name: dto.name,
    slug: dto.slug,
    price: dto.price,
    originalPrice: dto.original_price,
    quantity: dto.quantity,
    image: dto.image,
    maxQuantity: dto.max_quantity,
  };
}

function mapCartDTO(dto: CartResponseDTO): Cart {
  return {
    id: dto.id,
    items: dto.items.map(mapCartItemDTO),
    subtotal: dto.subtotal,
    discount: dto.discount,
    shipping: dto.shipping,
    tax: dto.tax,
    total: dto.total,
    itemCount: dto.item_count,
    couponCode: dto.coupon_code,
  };
}

// =============================================================================
// Mappers: Domain → DTO
// =============================================================================

function mapAddToCartInput(input: AddToCartInput): AddToCartRequestDTO {
  return {
    product_id: input.productId,
    quantity: input.quantity,
  };
}

function mapUpdateCartItemInput(
  input: UpdateCartItemInput
): UpdateCartItemRequestDTO {
  return {
    quantity: input.quantity,
  };
}

function mapApplyCouponInput(input: ApplyCouponInput): ApplyCouponRequestDTO {
  return {
    code: input.code,
  };
}

// =============================================================================
// Service Factory
// =============================================================================

/**
 * Creates a cart service instance for a specific locale.
 *
 * @param locale - The locale for API requests
 * @returns Cart service with typed methods
 *
 * @example
 * ```ts
 * const cartService = createCartService('en');
 *
 * // Get cart
 * const cart = await cartService.getCart();
 *
 * // Add item
 * const updatedCart = await cartService.addItem({ productId: '123', quantity: 1 });
 *
 * // Apply coupon
 * const cartWithDiscount = await cartService.applyCoupon({ code: 'SAVE10' });
 * ```
 */
export function createCartService(locale: string) {
  const api: ApiClient = createApiClient(locale);

  return {
    /**
     * Get the current cart
     *
     * @endpoint GET /api/{locale}/cart
     */
    async getCart(): Promise<Cart> {
      const response = await api.get<CartResponseDTO>("/cart", {
        cache: "no-store", // Cart should always be fresh
      });
      return mapCartDTO(response);
    },

    /**
     * Add an item to the cart
     *
     * @endpoint POST /api/{locale}/cart/items
     */
    async addItem(input: AddToCartInput): Promise<Cart> {
      const response = await api.post<CartResponseDTO>("/cart/items", {
        body: mapAddToCartInput(input),
      });
      return mapCartDTO(response);
    },

    /**
     * Update a cart item quantity
     *
     * @endpoint PATCH /api/{locale}/cart/items/:id
     */
    async updateItem(input: UpdateCartItemInput): Promise<Cart> {
      const response = await api.patch<CartResponseDTO>(
        `/cart/items/${input.itemId}`,
        {
          body: mapUpdateCartItemInput(input),
        }
      );
      return mapCartDTO(response);
    },

    /**
     * Remove an item from the cart
     *
     * @endpoint DELETE /api/{locale}/cart/items/:id
     */
    async removeItem(itemId: string): Promise<Cart> {
      const response = await api.delete<CartResponseDTO>(
        `/cart/items/${itemId}`
      );
      return mapCartDTO(response);
    },

    /**
     * Clear all items from the cart
     *
     * @endpoint DELETE /api/{locale}/cart
     */
    async clearCart(): Promise<Cart> {
      const response = await api.delete<CartResponseDTO>("/cart");
      return mapCartDTO(response);
    },

    /**
     * Apply a coupon code
     *
     * @endpoint POST /api/{locale}/cart/coupon
     */
    async applyCoupon(input: ApplyCouponInput): Promise<Cart> {
      const response = await api.post<CartResponseDTO>("/cart/coupon", {
        body: mapApplyCouponInput(input),
      });
      return mapCartDTO(response);
    },

    /**
     * Remove the applied coupon
     *
     * @endpoint DELETE /api/{locale}/cart/coupon
     */
    async removeCoupon(): Promise<Cart> {
      const response = await api.delete<CartResponseDTO>("/cart/coupon");
      return mapCartDTO(response);
    },

    /**
     * Sync local cart with server (for guest → logged in user)
     *
     * @endpoint POST /api/{locale}/cart/sync
     */
    async syncCart(items: AddToCartInput[]): Promise<Cart> {
      const response = await api.post<CartResponseDTO>("/cart/sync", {
        body: { items: items.map(mapAddToCartInput) },
      });
      return mapCartDTO(response);
    },
  };
}

// =============================================================================
// Type Export
// =============================================================================

export type CartService = ReturnType<typeof createCartService>;
