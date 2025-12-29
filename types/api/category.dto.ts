/**
 * Category API DTOs
 *
 * Data Transfer Objects for category endpoints.
 */

/**
 * Category response from GET /api/{locale}/categories/:id
 */
export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  product_count: number;
  parent_id?: string;
}

/**
 * Categories list response from GET /api/{locale}/categories
 */
export interface CategoriesResponseDTO {
  data: CategoryDTO[];
  meta: {
    total: number;
  };
}
