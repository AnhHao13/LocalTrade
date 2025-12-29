/**
 * Cart API DTOs
 *
 * Data Transfer Objects for cart endpoints.
 */

/**
 * Cart item from API
 */
export interface CartItemDTO {
  id: string;
  product_id: string;
  name: string;
  slug: string;
  price: number;
  original_price?: number;
  quantity: number;
  image: string;
  max_quantity: number;
}

/**
 * Cart response from GET /api/{locale}/cart
 */
export interface CartResponseDTO {
  id: string;
  items: CartItemDTO[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  item_count: number;
  coupon_code?: string;
}

/**
 * Add to cart request for POST /api/{locale}/cart/items
 */
export interface AddToCartRequestDTO {
  product_id: string;
  quantity: number;
}

/**
 * Update cart item request for PATCH /api/{locale}/cart/items/:id
 */
export interface UpdateCartItemRequestDTO {
  quantity: number;
}

/**
 * Apply coupon request for POST /api/{locale}/cart/coupon
 */
export interface ApplyCouponRequestDTO {
  code: string;
}
