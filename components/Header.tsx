"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/app/[locale]/i18n/client";
import { mainMenuConfig, searchCategoriesConfig } from "@/data/menu.config";
import { useCartStore } from "@/stores";

// Placeholder for logo fallback
const LOGO_PLACEHOLDER = "https://placehold.co/150x30/6b7280/ffffff?text=Logo";

// Menu title translation map
const menuTitleMap: Record<string, string> = {
  "Popular": "popular",
  "Shop": "shop",
  "Contact": "contact",
  "Pages": "pages",
  "Blog": "blog",
  "Shop With Sidebar": "shopWithSidebar",
  "Shop Without Sidebar": "shopWithoutSidebar",
  "Checkout": "checkout",
  "Cart": "cart",
  "Wishlist": "wishlist",
  "Sign In": "signIn",
  "Sign Up": "signUp",
  "My Account": "myAccount",
};

export function Header() {
  const { t } = useTranslation("common");
  const params = useParams();
  const locale = params?.locale as string;
  
  // Helper function to translate menu titles
  const getMenuTitle = (title: string): string => {
    const translationKey = menuTitleMap[title];
    return translationKey ? t(translationKey, { defaultValue: title }) : title;
  };
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stickyMenu, setStickyMenu] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.length;

  // Handle sticky menu on scroll
  useEffect(() => {
    const handleStickyMenu = () => {
      setStickyMenu(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  // Handle logo image error
  const handleLogoError = useCallback(() => {
    setLogoError(true);
  }, []);

  // Helper function to construct locale-aware links
  const getLocalePath = (path: string) => `/${locale}${path}`;

  return (
    <header
      id="main-header"
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border transition-all duration-300",
        stickyMenu 
          ? "bg-background/95 backdrop-blur-sm shadow-sm py-2" 
          : "bg-background/95 backdrop-blur-sm py-4"
      )}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Header Row */}
        <div className="flex h-auto items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <Link href={getLocalePath("/")} className="shrink-0 flex-shrink-0">
            <Image
              src={logoError ? LOGO_PLACEHOLDER : "/images/logo/logo.svg"}
              alt="Store Logo"
              width={120}
              height={28}
              className="h-7 w-auto dark:invert sm:h-8"
              priority
              onError={handleLogoError}
            />
          </Link>

          {/* Search Bar - Hidden on mobile/tablet */}
          <div className="hidden flex-1 max-w-2xl lg:flex items-center gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 rounded-lg bg-muted/50">
                <SelectValue
                  placeholder={t("allCategories", { defaultValue: "Category" })}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="all" value="all">
                    {t("allCategories", { defaultValue: "All Categories" })}
                  </SelectItem>
                {searchCategoriesConfig.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder={t("searchPlaceholder", { defaultValue: "Search products..." })}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg pr-10 bg-muted/50"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full hover:bg-transparent"
                aria-label={t("search", { defaultValue: "Search" })}
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            {/* Language Switcher - Hidden on mobile */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Separator */}
            <div className="hidden sm:block h-6 w-px bg-border mx-1" />

            {/* User Account - Desktop */}
            <Link href={getLocalePath("/signin")} className="hidden sm:block text-foreground">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 text-xs md:text-sm text-foreground"
              >
                <User className="h-4 w-4 text-foreground" />
                <span className="hidden md:inline text-foreground">
                  {t("signIn", { defaultValue: "Sign In" })}
                </span>
              </Button>
            </Link>

            {/* Cart Button */}
            <Link href={getLocalePath("/cart")}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-9 w-9 sm:h-10 sm:w-10 text-foreground"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
                <span className="sr-only">
                  {t("cart", { defaultValue: "Cart" })} ({cartCount})
                </span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5 text-foreground" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-80">
                <SheetHeader className="text-left">
                  <SheetTitle>
                    {t("menu", { defaultValue: "Menu" })}
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="mt-6 flex flex-col gap-2 space-y-1">
                  {/* Mobile Search */}
                  <div className="relative mb-6">
                    <Input
                      type="search"
                      placeholder={t("searchPlaceholder", { defaultValue: "Search..." })}
                      className="pr-10 text-foreground"
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex items-center justify-between py-3 border-b border-border mb-2">
                    <LanguageSwitcher />
                  </div>

                  {/* User Account - Mobile */}
                  <Link
                    href={getLocalePath("/signin")}
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center gap-3 py-3 px-2 text-sm font-medium hover:text-primary hover:bg-accent rounded-md transition-colors text-foreground"
                  >
                    <User className="h-4 w-4 text-foreground" />
                    <span className="sign-in-text">
                      {t("signIn", { defaultValue: "Sign In" })}
                    </span>
                  </Link>

                  <div className="h-px bg-border my-2" />

                  {/* Mobile Navigation Links */}
                  {mainMenuConfig.map((item) => (
                    <div key={item.id}>
                      {item.submenu ? (
                        <details className="group">
                          <summary className="py-3 px-2 font-medium text-foreground cursor-pointer hover:text-primary transition-colors flex items-center justify-between">
                            {getMenuTitle(item.title)}
                            <span className="transform group-open:rotate-180 transition-transform">
                              ▼
                            </span>
                          </summary>
                          <div className="pl-4 space-y-1 border-l border-border ml-2">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.id}
                                href={getLocalePath(subItem.path)}
                                onClick={() => setSheetOpen(false)}
                                className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {getMenuTitle(subItem.title)}
                              </Link>
                            ))}
                          </div>
                        </details>
                      ) : (
                        <Link
                          href={getLocalePath(item.path)}
                          onClick={() => setSheetOpen(false)}
                          className="block py-3 px-2 font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                        >
                          {getMenuTitle(item.title)}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <nav className="hidden lg:block border-t border-border mt-2 sm:mt-3">
        <div className="container mx-auto px-4 max-w-7xl">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList className="gap-0">
              {mainMenuConfig.map((item) => (
                <NavigationMenuItem key={item.id}>
                  {item.submenu ? (
                    <>
                      <NavigationMenuTrigger className="h-11 bg-transparent data-[state=open]:bg-accent rounded-none">
                        {getMenuTitle(item.title)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-96 gap-2 p-4 md:grid-cols-2">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={getLocalePath(subItem.path)}
                                  className={cn(
                                    "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                    "hover:bg-accent hover:text-accent-foreground",
                                    "focus:bg-accent focus:text-accent-foreground"
                                  )}
                                >
                                  <span className="text-sm font-medium">
                                    {getMenuTitle(subItem.title)}
                                  </span>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={getLocalePath(item.path)}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "h-11 bg-transparent rounded-none"
                        )}
                      >
                        {getMenuTitle(item.title)}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
}
