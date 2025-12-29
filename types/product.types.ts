/**
 * Product Domain Types
 *
 * Domain models for product-related entities.
 * These types represent the shape of data used throughout the application.
 */

/**
 * Product entity - represents a product in the domain
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: Category;
  stock: number;
  rating: number;
  reviewCount: number;
  tags?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Category entity - represents a product category
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
}

/**
 * Product filters for querying products
 */
export interface ProductFilters {
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: ProductSortOption;
  page?: number;
  limit?: number;
  tags?: string[];
  featured?: boolean;
  newArrivals?: boolean;
}

/**
 * Available sort options for products
 */
export type ProductSortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest"
  | "rating"
  | "popularity";

/**
 * Paginated products response
 */
export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
