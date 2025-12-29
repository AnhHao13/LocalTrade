/**
 * Types Index
 *
 * Central export for all types.
 * - Domain types: Frontend models used in components
 * - API types: DTOs matching backend responses (exported from ./api)
 */

// =============================================================================
// Domain Types (Frontend Models)
// =============================================================================

// Product types
export type {
  Product,
  Category,
  ProductFilters,
  ProductSortOption,
  PaginatedProducts,
} from "./product.types";

// Cart types
export type {
  Cart,
  CartItem,
  AddToCartInput,
  UpdateCartItemInput,
  ApplyCouponInput,
  CartSummary,
} from "./cart.types";

// User types
export type {
  User,
  Address,
  AuthResult,
  LoginCredentials,
  RegisterInput,
  PasswordResetInput,
  UpdateProfileInput,
} from "./user.types";

// Common types
export type {
  PaginatedResponse,
  ApiError,
  PriceRange,
  ImageAsset,
  SeoMeta,
  BreadcrumbItem,
  NavLink,
  Banner,
} from "./common.types";

// =============================================================================
// UI Types
// =============================================================================

// UI Navigation types
export interface MenuItem {
  id: number;
  title: string;
  titleKey?: string; // i18n translation key (e.g., "nav.popular")
  path: string;
  newTab?: boolean;
  submenu?: MenuItem[];
}

export type Menu = MenuItem;
