/**
 * Product API DTOs
 *
 * Data Transfer Objects for product endpoints.
 * Match the backend API response structure.
 */

import type { CategoryDTO } from "./category.dto";

/**
 * Product response from GET /api/{locale}/products/:id
 */
export interface ProductDTO {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
  images: string[];
  category: CategoryDTO;
  stock: number;
  rating: number;
  review_count: number;
  tags?: string[];
  is_featured?: boolean;
  is_new?: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Products list query params for GET /api/{locale}/products
 */
export interface ProductsQueryDTO {
  category?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
  sort?: string;
  page?: number;
  per_page?: number;
  tags?: string;
  featured?: boolean;
  new_arrivals?: boolean;
}

/**
 * Products list response from GET /api/{locale}/products
 */
export interface ProductsResponseDTO {
  data: ProductDTO[];
  meta: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}
