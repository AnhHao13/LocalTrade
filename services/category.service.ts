/**
 * Category Service
 *
 * Handles all category-related API calls.
 * Uses the base api-client - NO direct fetch calls.
 */

import { createApiClient, type ApiClient } from "./api-client";
import type { CategoryDTO, CategoriesResponseDTO } from "@/types/api";
import type { Category } from "@/types";

// =============================================================================
// Mappers: DTO → Domain
// =============================================================================

function mapCategoryDTO(dto: CategoryDTO): Category {
  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    description: dto.description,
    image: dto.image,
    productCount: dto.product_count,
  };
}

// =============================================================================
// Service Factory
// =============================================================================

/**
 * Creates a category service instance for a specific locale.
 *
 * @param locale - The locale for API requests
 * @returns Category service with typed methods
 *
 * @example
 * ```ts
 * const categoryService = createCategoryService('en');
 *
 * // Get all categories
 * const categories = await categoryService.getCategories();
 *
 * // Get single category
 * const category = await categoryService.getCategoryBySlug('electronics');
 * ```
 */
export function createCategoryService(locale: string) {
  const api: ApiClient = createApiClient(locale);

  return {
    /**
     * Get all categories
     *
     * @endpoint GET /api/{locale}/categories
     */
    async getCategories(): Promise<Category[]> {
      const response = await api.get<CategoriesResponseDTO>("/categories", {
        next: { revalidate: 300, tags: ["categories"] },
      });
      return response.data.map(mapCategoryDTO);
    },

    /**
     * Get a single category by ID
     *
     * @endpoint GET /api/{locale}/categories/:id
     */
    async getCategoryById(id: string): Promise<Category> {
      const response = await api.get<{ data: CategoryDTO }>(
        `/categories/${id}`,
        {
          next: { revalidate: 300, tags: [`category-${id}`] },
        }
      );
      return mapCategoryDTO(response.data);
    },

    /**
     * Get a single category by slug
     *
     * @endpoint GET /api/{locale}/categories/slug/:slug
     */
    async getCategoryBySlug(slug: string): Promise<Category> {
      const response = await api.get<{ data: CategoryDTO }>(
        `/categories/slug/${slug}`,
        {
          next: { revalidate: 300, tags: [`category-${slug}`] },
        }
      );
      return mapCategoryDTO(response.data);
    },

    /**
     * Get featured/main categories for homepage
     *
     * @endpoint GET /api/{locale}/categories?featured=true
     */
    async getFeaturedCategories(limit = 6): Promise<Category[]> {
      const response = await api.get<CategoriesResponseDTO>("/categories", {
        params: { featured: true, per_page: limit },
        next: { revalidate: 300 },
      });
      return response.data.map(mapCategoryDTO);
    },

    /**
     * Get child categories of a parent
     *
     * @endpoint GET /api/{locale}/categories/:id/children
     */
    async getChildCategories(parentId: string): Promise<Category[]> {
      const response = await api.get<CategoriesResponseDTO>(
        `/categories/${parentId}/children`,
        {
          next: { revalidate: 300 },
        }
      );
      return response.data.map(mapCategoryDTO);
    },
  };
}

// =============================================================================
// Type Export
// =============================================================================

export type CategoryService = ReturnType<typeof createCategoryService>;
