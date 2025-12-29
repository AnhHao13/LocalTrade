import type { MenuItem } from "@/types";

// Menu keys for i18n - translations in layout.json (nav.*)
export const menuData: MenuItem[] = [
  {
    id: 1,
    titleKey: "nav.popular",
    title: "Popular", // fallback
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    titleKey: "nav.shop",
    title: "Shop",
    newTab: false,
    path: "/shop",
  },
  {
    id: 3,
    titleKey: "nav.contact",
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    titleKey: "nav.pages",
    title: "Pages",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        titleKey: "nav.shopWithSidebar",
        title: "Shop With Sidebar",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        titleKey: "nav.shopWithoutSidebar",
        title: "Shop Without Sidebar",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 64,
        titleKey: "nav.checkout",
        title: "Checkout",
        newTab: false,
        path: "/checkout",
      },
      {
        id: 65,
        titleKey: "nav.cart",
        title: "Cart",
        newTab: false,
        path: "/cart",
      },
      {
        id: 66,
        titleKey: "nav.wishlist",
        title: "Wishlist",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 67,
        titleKey: "nav.signIn",
        title: "Sign In",
        newTab: false,
        path: "/signin",
      },
      {
        id: 68,
        titleKey: "nav.signUp",
        title: "Sign Up",
        newTab: false,
        path: "/signup",
      },
      {
        id: 69,
        titleKey: "nav.myAccount",
        title: "My Account",
        newTab: false,
        path: "/my-account",
      },
    ],
  },
  {
    id: 7,
    titleKey: "nav.blog",
    title: "Blog",
    newTab: false,
    path: "/blog",
  },
];
