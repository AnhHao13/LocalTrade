/**
 * Base API Client
 *
 * Single source of truth for all API communication.
 * All services MUST use this client - no direct fetch calls allowed.
 *
 * Features:
 * - Automatic locale prefix: /api/{locale}/...
 * - Full TypeScript generics support
 * - Centralized error handling
 * - Request/response interceptors ready
 * - Token management for authenticated requests
 */

import type { ApiErrorResponse } from "@/types/api";

// =============================================================================
// Types
// =============================================================================

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestConfig {
  /** Request headers */
  headers?: Record<string, string>;
  /** Query parameters */
  params?: Record<string, string | number | boolean | undefined>;
  /** Request body (will be JSON stringified) */
  body?: unknown;
  /** Include credentials (cookies) */
  credentials?: RequestCredentials;
  /** Request timeout in ms (default: 30000) */
  timeout?: number;
  /** Skip adding Authorization header */
  skipAuth?: boolean;
  /** Cache strategy */
  cache?: RequestCache;
  /** Next.js revalidation */
  next?: { revalidate?: number | false; tags?: string[] };
}

export interface ApiClientConfig {
  /** Base URL for API (default: process.env.NEXT_PUBLIC_API_URL or '') */
  baseUrl?: string;
  /** Default timeout in ms */
  timeout?: number;
  /** Default headers for all requests */
  defaultHeaders?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// =============================================================================
// Token Storage (Client-side only)
// =============================================================================

let accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("access_token");
  }
  return accessToken;
}

export function clearAccessToken(): void {
  setAccessToken(null);
}

// =============================================================================
// API Client Factory
// =============================================================================

const DEFAULT_CONFIG: Required<ApiClientConfig> = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 30000,
  defaultHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

/**
 * Creates an API client instance for a specific locale.
 *
 * @param locale - The locale to use for API requests (e.g., 'en', 'vi')
 * @param config - Optional configuration overrides
 * @returns API client with typed methods
 *
 * @example
 * ```ts
 * const api = createApiClient('en');
 *
 * // GET request
 * const products = await api.get<ProductsResponseDTO>('/products', {
 *   params: { page: 1, per_page: 10 }
 * });
 *
 * // POST request
 * const cart = await api.post<CartResponseDTO>('/cart/items', {
 *   body: { product_id: '123', quantity: 1 }
 * });
 * ```
 */
export function createApiClient(locale: string, config?: ApiClientConfig) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  /**
   * Build full URL with locale prefix
   */
  function buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    // Ensure endpoint starts with /
    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    // Build base URL: {baseUrl}/api/{locale}{endpoint}
    const url = new URL(
      `${mergedConfig.baseUrl}/api/${locale}${normalizedEndpoint}`
    );

    // Add query parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Build headers for request
   */
  function buildHeaders(
    customHeaders?: Record<string, string>,
    skipAuth?: boolean
  ): Headers {
    const headers = new Headers(mergedConfig.defaultHeaders);

    // Add custom headers
    if (customHeaders) {
      Object.entries(customHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    // Add Authorization header if token exists
    if (!skipAuth) {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    // Add locale header
    headers.set("Accept-Language", locale);

    return headers;
  }

  /**
   * Handle API response
   */
  async function handleResponse<T>(response: Response): Promise<T> {
    // Handle no content
    if (response.status === 204) {
      return undefined as T;
    }

    const data = await response.json();

    // Handle error responses
    if (!response.ok) {
      const errorData = data as ApiErrorResponse;
      throw new ApiError(
        errorData.error?.code || "UNKNOWN_ERROR",
        errorData.error?.message || response.statusText,
        response.status,
        errorData.error?.details
      );
    }

    return data as T;
  }

  /**
   * Execute HTTP request with timeout
   */
  async function request<T>(
    method: HttpMethod,
    endpoint: string,
    config?: RequestConfig
  ): Promise<T> {
    const url = buildUrl(endpoint, config?.params);
    const headers = buildHeaders(config?.headers, config?.skipAuth);
    const timeout = config?.timeout ?? mergedConfig.timeout;

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fetchOptions: RequestInit = {
        method,
        headers,
        signal: controller.signal,
        credentials: config?.credentials,
        cache: config?.cache,
      };

      // Add Next.js specific options
      if (config?.next) {
        (fetchOptions as RequestInit & { next?: unknown }).next = config.next;
      }

      // Add body for non-GET requests
      if (config?.body && method !== "GET") {
        fetchOptions.body = JSON.stringify(config.body);
      }

      const response = await fetch(url, fetchOptions);
      return await handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new ApiError("TIMEOUT", "Request timed out", 408);
        }
        throw new ApiError("NETWORK_ERROR", error.message, 0);
      }

      throw new ApiError("UNKNOWN_ERROR", "An unknown error occurred", 0);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Return API client methods
  return {
    /**
     * GET request
     * @example api.get<ProductDTO>('/products/123')
     */
    get: <T>(endpoint: string, config?: Omit<RequestConfig, "body">) =>
      request<T>("GET", endpoint, config),

    /**
     * POST request
     * @example api.post<CartDTO>('/cart/items', { body: { product_id: '123' } })
     */
    post: <T>(endpoint: string, config?: RequestConfig) =>
      request<T>("POST", endpoint, config),

    /**
     * PUT request
     * @example api.put<UserDTO>('/users/123', { body: { name: 'John' } })
     */
    put: <T>(endpoint: string, config?: RequestConfig) =>
      request<T>("PUT", endpoint, config),

    /**
     * PATCH request
     * @example api.patch<CartItemDTO>('/cart/items/123', { body: { quantity: 2 } })
     */
    patch: <T>(endpoint: string, config?: RequestConfig) =>
      request<T>("PATCH", endpoint, config),

    /**
     * DELETE request
     * @example api.delete('/cart/items/123')
     */
    delete: <T = void>(endpoint: string, config?: RequestConfig) =>
      request<T>("DELETE", endpoint, config),

    /**
     * Get the locale this client is configured for
     */
    locale,
  };
}

// =============================================================================
// Type Export for Services
// =============================================================================

export type ApiClient = ReturnType<typeof createApiClient>;
