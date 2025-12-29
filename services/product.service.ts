/**
 * Product Service
 *
 * Handles all product-related API calls.
 * Uses the base api-client - NO direct fetch calls.
 */

import { createApiClient, type ApiClient } from "./api-client";
import type {
  ProductDTO,
  ProductsResponseDTO,
  ProductsQueryDTO,
} from "@/types/api";
import type {
  Product,
  Category,
  ProductFilters,
  PaginatedProducts,
} from "@/types";

// =============================================================================
// Mappers: DTO → Domain
// =============================================================================

function mapProductDTO(dto: ProductDTO): Product {
  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    description: dto.description,
    price: dto.price,
    originalPrice: dto.original_price,
    images: dto.images,
    category: mapCategoryDTO(dto.category),
    stock: dto.stock,
    rating: dto.rating,
    reviewCount: dto.review_count,
    tags: dto.tags,
    isFeatured: dto.is_featured,
    isNew: dto.is_new,
    createdAt: new Date(dto.created_at),
    updatedAt: new Date(dto.updated_at),
  };
}

function mapCategoryDTO(dto: ProductDTO["category"]): Category {
  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    description: dto.description,
    image: dto.image,
    productCount: dto.product_count,
  };
}

function mapFiltersToQuery(filters: ProductFilters): ProductsQueryDTO {
  return {
    category: filters.categorySlug,
    min_price: filters.minPrice,
    max_price: filters.maxPrice,
    search: filters.search,
    sort: filters.sort,
    page: filters.page,
    per_page: filters.limit,
    tags: filters.tags?.join(","),
    featured: filters.featured,
    new_arrivals: filters.newArrivals,
  };
}

// =============================================================================
// Service Factory
// =============================================================================

/**
 * Creates a product service instance for a specific locale.
 *
 * @param locale - The locale for API requests
 * @returns Product service with typed methods
 *
 * @example
 * ```ts
 * const productService = createProductService('en');
 *
 * // Get paginated products
 * const products = await productService.getProducts({ page: 1, limit: 12 });
 *
 * // Get single product
 * const product = await productService.getProductBySlug('wireless-headphones');
 *
 * // Get featured products
 * const featured = await productService.getFeaturedProducts();
 * ```
 */
export function createProductService(locale: string) {
  const api: ApiClient = createApiClient(locale);

  return {
    /**
     * Get paginated list of products with optional filters
     *
     * @endpoint GET /api/{locale}/products
     */
    async getProducts(filters?: ProductFilters): Promise<PaginatedProducts> {
      const query = filters ? mapFiltersToQuery(filters) : {};

      const response = await api.get<ProductsResponseDTO>("/products", {
        params: query as Record<string, string | number | boolean | undefined>,
        next: { revalidate: 60 }, // Cache for 60 seconds
      });

      return {
        items: response.data.map(mapProductDTO),
        total: response.meta.total,
        page: response.meta.page,
        totalPages: response.meta.total_pages,
        hasNextPage: response.meta.page < response.meta.total_pages,
        hasPreviousPage: response.meta.page > 1,
      };
    },

    /**
     * Get a single product by ID
     *
     * @endpoint GET /api/{locale}/products/:id
     */
    async getProductById(id: string): Promise<Product> {
      const response = await api.get<{ data: ProductDTO }>(`/products/${id}`, {
        next: { revalidate: 60, tags: [`product-${id}`] },
      });
      return mapProductDTO(response.data);
    },

    /**
     * Get a single product by slug
     *
     * @endpoint GET /api/{locale}/products/slug/:slug
     */
    async getProductBySlug(slug: string): Promise<Product> {
      const response = await api.get<{ data: ProductDTO }>(
        `/products/slug/${slug}`,
        {
          next: { revalidate: 60, tags: [`product-${slug}`] },
        }
      );
      return mapProductDTO(response.data);
    },

    /**
     * Get featured products
     *
     * @endpoint GET /api/{locale}/products?featured=true
     */
    async getFeaturedProducts(limit = 8): Promise<Product[]> {
      const response = await api.get<ProductsResponseDTO>("/products", {
        params: { featured: true, per_page: limit },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });
      return response.data.map(mapProductDTO);
    },

    /**
     * Get new arrival products
     *
     * @endpoint GET /api/{locale}/products?new_arrivals=true
     */
    async getNewArrivals(limit = 8): Promise<Product[]> {
      const response = await api.get<ProductsResponseDTO>("/products", {
        params: { new_arrivals: true, per_page: limit },
        next: { revalidate: 300 },
      });
      return response.data.map(mapProductDTO);
    },

    /**
     * Get best seller products
     *
     * @endpoint GET /api/{locale}/products?sort=popularity
     */
    async getBestSellers(limit = 8): Promise<Product[]> {
      const response = await api.get<ProductsResponseDTO>("/products", {
        params: { sort: "popularity", per_page: limit },
        next: { revalidate: 300 },
      });
      return response.data.map(mapProductDTO);
    },

    /**
     * Search products
     *
     * @endpoint GET /api/{locale}/products?search=query
     */
    async searchProducts(
      query: string,
      filters?: Omit<ProductFilters, "search">
    ): Promise<PaginatedProducts> {
      return this.getProducts({ ...filters, search: query });
    },

    /**
     * Get products by category
     *
     * @endpoint GET /api/{locale}/products?category=slug
     */
    async getProductsByCategory(
      categorySlug: string,
      filters?: Omit<ProductFilters, "categorySlug">
    ): Promise<PaginatedProducts> {
      return this.getProducts({ ...filters, categorySlug });
    },

    /**
     * Get related products for a product
     *
     * @endpoint GET /api/{locale}/products/:id/related
     */
    async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
      const response = await api.get<ProductsResponseDTO>(
        `/products/${productId}/related`,
        {
          params: { per_page: limit },
          next: { revalidate: 300 },
        }
      );
      return response.data.map(mapProductDTO);
    },
  };
}

// =============================================================================
// Type Export
// =============================================================================

export type ProductService = ReturnType<typeof createProductService>;
