/**
 * Services Index
 *
 * Central export for all API services.
 * All services use the base api-client for HTTP requests.
 *
 * Architecture:
 * - Component → Service → api-client → Backend
 * - Component → Zustand Store (state only)
 *
 * Usage:
 * ```ts
 * import { createProductService, createCartService } from '@/services';
 *
 * const productService = createProductService(locale);
 * const products = await productService.getProducts();
 * ```
 */

// Base API client
export {
  createApiClient,
  ApiError,
  setAccessToken,
  getAccessToken,
  clearAccessToken,
  type ApiClient,
  type HttpMethod,
  type RequestConfig,
  type ApiClientConfig,
} from "./api-client";

// Domain services
export { createProductService, type ProductService } from "./product.service";

export {
  createCategoryService,
  type CategoryService,
} from "./category.service";

export { createAuthService, type AuthService } from "./auth.service";

export { createCartService, type CartService } from "./cart.service";
