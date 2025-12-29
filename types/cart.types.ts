/**
 * Cart Domain Types
 *
 * Domain models for cart-related entities.
 */

/**
 * Cart entity - represents the shopping cart
 */
export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  couponCode?: string;
}

/**
 * Cart item entity - represents an item in the cart
 */
export interface CartItem {
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

/**
 * Add to cart request
 */
export interface AddToCartInput {
  productId: string;
  quantity: number;
}

/**
 * Update cart item request
 */
export interface UpdateCartItemInput {
  itemId: string;
  quantity: number;
}

/**
 * Apply coupon request
 */
export interface ApplyCouponInput {
  code: string;
}

/**
 * Cart summary for checkout
 */
export interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}
