/**
 * Common/Shared Types
 *
 * Generic types used throughout the application.
 */

/**
 * Generic paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Generic API error
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

/**
 * Price range
 */
export interface PriceRange {
  min: number;
  max: number;
}

/**
 * Image with metadata
 */
export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * SEO metadata
 */
export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Navigation link
 */
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  children?: NavLink[];
}

/**
 * Banner/Promotion
 */
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: ImageAsset;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
}
