import type { MenuItem } from "@/types";

export interface SearchCategory {
  label: string;
  value: string;
}

/**
 * Main navigation menu configuration
 * Used by Header component for desktop and mobile navigation
 */
export const mainMenuConfig: MenuItem[] = [
  {
    id: 1,
    title: "Popular",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Shop",
    newTab: false,
    path: "/shop",
  },
  {
    id: 3,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "Pages",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Shop With Sidebar",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        title: "Shop Without Sidebar",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 64,
        title: "Checkout",
        newTab: false,
        path: "/checkout",
      },
      {
        id: 65,
        title: "Cart",
        newTab: false,
        path: "/cart",
      },
      {
        id: 66,
        title: "Wishlist",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 67,
        title: "Sign In",
        newTab: false,
        path: "/signin",
      },
      {
        id: 68,
        title: "Sign Up",
        newTab: false,
        path: "/signup",
      },
      {
        id: 69,
        title: "My Account",
        newTab: false,
        path: "/my-account",
      },
    ],
  },
  {
    id: 7,
    title: "Blog",
    newTab: false,
    path: "/blog",
  },
];

/**
 * Search categories for header search bar
 */
export const searchCategoriesConfig: SearchCategory[] = [
  { label: "Desktop", value: "desktop" },
  { label: "Laptop", value: "laptop" },
  { label: "Monitor", value: "monitor" },
  { label: "Phone", value: "phone" },
  { label: "Watch", value: "watch" },
  { label: "Mouse", value: "mouse" },
  { label: "Keyboard", value: "keyboard" },
  { label: "Headphone", value: "headphone" },
];
