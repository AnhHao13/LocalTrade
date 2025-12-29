/**
 * Mock Data
 *
 * Placeholder data for UI development.
 * Replace with actual API calls when backend is ready.
 */

import type { Product, Category, Banner } from "@/types";

// Placeholder image helper - uses placehold.co with .png format for Next.js Image compatibility
const placeholder = {
  category: (name: string, color = "e2e8f0", textColor = "64748b") =>
    `https://placehold.co/400x400/${color}/${textColor}.png?text=${encodeURIComponent(
      name
    )}`,
  product: (name: string, color = "f1f5f9", textColor = "475569") =>
    `https://placehold.co/600x600/${color}/${textColor}.png?text=${encodeURIComponent(
      name
    )}`,
  banner: (name: string, color = "3b82f6", textColor = "ffffff") =>
    `https://placehold.co/1920x600/${color}/${textColor}.png?text=${encodeURIComponent(
      name
    )}`,
};

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronics",
    image: placeholder.category("Electronics", "3b82f6", "ffffff"),
    productCount: 156,
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    description: "Trendy clothes and accessories",
    image: placeholder.category("Fashion", "ec4899", "ffffff"),
    productCount: 243,
  },
  {
    id: "3",
    name: "Home & Living",
    slug: "home-living",
    description: "Furniture and home decor",
    image: placeholder.category("Home", "f59e0b", "ffffff"),
    productCount: 89,
  },
  {
    id: "4",
    name: "Sports",
    slug: "sports",
    description: "Sports equipment and activewear",
    image: placeholder.category("Sports", "10b981", "ffffff"),
    productCount: 67,
  },
  {
    id: "5",
    name: "Beauty",
    slug: "beauty",
    description: "Skincare and cosmetics",
    image: placeholder.category("Beauty", "8b5cf6", "ffffff"),
    productCount: 112,
  },
  {
    id: "6",
    name: "Books",
    slug: "books",
    description: "Books and stationery",
    image: placeholder.category("Books", "6366f1", "ffffff"),
    productCount: 198,
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description:
      "Premium noise-canceling wireless headphones with 30-hour battery life",
    price: 199.99,
    originalPrice: 299.99,
    images: [
      placeholder.product("Headphones", "1e293b", "94a3b8"),
      placeholder.product("Headphones+2", "1e293b", "94a3b8"),
    ],
    category: mockCategories[0],
    stock: 50,
    rating: 4.8,
    reviewCount: 234,
    tags: ["bestseller", "featured"],
    isFeatured: true,
    isNew: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    slug: "smart-watch-pro",
    description: "Advanced smartwatch with health monitoring and GPS",
    price: 349.99,
    originalPrice: 449.99,
    images: [placeholder.product("Watch", "0f172a", "94a3b8")],
    category: mockCategories[0],
    stock: 30,
    rating: 4.6,
    reviewCount: 189,
    tags: ["featured"],
    isFeatured: true,
    isNew: true,
    createdAt: new Date("2024-11-20"),
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    slug: "premium-cotton-tshirt",
    description: "100% organic cotton t-shirt with modern fit",
    price: 29.99,
    images: [placeholder.product("T-Shirt", "f8fafc", "64748b")],
    category: mockCategories[1],
    stock: 200,
    rating: 4.5,
    reviewCount: 456,
    tags: ["bestseller"],
    isFeatured: false,
    isNew: false,
    createdAt: new Date("2024-06-10"),
    updatedAt: new Date("2024-10-20"),
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    description: "Professional ergonomic chair with lumbar support",
    price: 599.99,
    originalPrice: 799.99,
    images: [placeholder.product("Chair", "fef3c7", "92400e")],
    category: mockCategories[2],
    stock: 15,
    rating: 4.9,
    reviewCount: 87,
    tags: ["featured"],
    isFeatured: true,
    isNew: false,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-11-30"),
  },
  {
    id: "5",
    name: "Running Shoes Ultra",
    slug: "running-shoes-ultra",
    description: "Lightweight running shoes with advanced cushioning",
    price: 159.99,
    images: [placeholder.product("Shoes", "dcfce7", "166534")],
    category: mockCategories[3],
    stock: 75,
    rating: 4.7,
    reviewCount: 312,
    tags: ["bestseller"],
    isFeatured: false,
    isNew: true,
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-20"),
  },
  {
    id: "6",
    name: "Vitamin C Serum",
    slug: "vitamin-c-serum",
    description: "Brightening serum with 20% Vitamin C",
    price: 45.99,
    originalPrice: 59.99,
    images: [placeholder.product("Serum", "fce7f3", "9d174d")],
    category: mockCategories[4],
    stock: 120,
    rating: 4.8,
    reviewCount: 543,
    tags: ["bestseller", "featured"],
    isFeatured: true,
    isNew: false,
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "7",
    name: "Laptop Stand Adjustable",
    slug: "laptop-stand-adjustable",
    description: "Aluminum laptop stand with adjustable height",
    price: 79.99,
    images: [placeholder.product("Stand", "e0e7ff", "3730a3")],
    category: mockCategories[0],
    stock: 60,
    rating: 4.4,
    reviewCount: 178,
    isFeatured: false,
    isNew: true,
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2024-12-18"),
  },
  {
    id: "8",
    name: "Denim Jacket Classic",
    slug: "denim-jacket-classic",
    description: "Classic denim jacket with vintage wash",
    price: 89.99,
    originalPrice: 120.0,
    images: [placeholder.product("Jacket", "dbeafe", "1e40af")],
    category: mockCategories[1],
    stock: 45,
    rating: 4.6,
    reviewCount: 234,
    tags: ["featured"],
    isFeatured: true,
    isNew: false,
    createdAt: new Date("2024-08-20"),
    updatedAt: new Date("2024-12-05"),
  },
];

export const mockBanners: Banner[] = [
  {
    id: "1",
    title: "Summer Sale",
    subtitle: "Up to 50% off on selected items",
    image: {
      url: placeholder.banner("Summer+Sale", "3b82f6", "ffffff"),
      alt: "Summer sale banner",
      width: 1920,
      height: 600,
    },
    ctaText: "Shop Now",
    ctaLink: "/shop?sale=summer",
    backgroundColor: "#3B82F6",
  },
  {
    id: "2",
    title: "New Arrivals",
    subtitle: "Check out the latest products",
    image: {
      url: placeholder.banner("New+Arrivals", "10b981", "ffffff"),
      alt: "New arrivals banner",
      width: 1920,
      height: 600,
    },
    ctaText: "Explore",
    ctaLink: "/shop?filter=new",
    backgroundColor: "#10B981",
  },
  {
    id: "3",
    title: "Free Shipping",
    subtitle: "On orders over $50",
    image: {
      url: placeholder.banner("Free+Shipping", "8b5cf6", "ffffff"),
      alt: "Free shipping banner",
      width: 1920,
      height: 600,
    },
    ctaText: "Learn More",
    ctaLink: "/shipping",
    backgroundColor: "#8B5CF6",
  },
];

// Helper functions to get filtered mock data
export const getFeaturedProducts = (): Product[] =>
  mockProducts.filter((p) => p.isFeatured);

export const getNewArrivals = (): Product[] =>
  mockProducts.filter((p) => p.isNew);

export const getBestSellers = (): Product[] =>
  mockProducts.filter((p) => p.tags?.includes("bestseller"));
