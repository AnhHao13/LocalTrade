"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { useTranslation } from "react-i18next";
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
import { menuData } from "./menuData";

// Category keys for i18n
const categoryKeys = [
  { labelKey: "categories.all", value: "all" },
  { labelKey: "categories.desktop", value: "desktop" },
  { labelKey: "categories.laptop", value: "laptop" },
  { labelKey: "categories.monitor", value: "monitor" },
  { labelKey: "categories.phone", value: "phone" },
  { labelKey: "categories.watch", value: "watch" },
  { labelKey: "categories.mouse", value: "mouse" },
  { labelKey: "categories.keyboard", value: "keyboard" },
];

// Placeholder for logo fallback - uses placehold.co
const LOGO_PLACEHOLDER = "https://placehold.co/150x30/6b7280/ffffff?text=Logo";

export function Header() {
  const { t } = useTranslation("layout");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartCount] = useState(0);
  const [logoError, setLogoError] = useState(false);

  // Handle logo image error
  const handleLogoError = useCallback(() => {
    setLogoError(true);
  }, []);

  // Helper to get translated menu title
  const getMenuTitle = (item: { titleKey?: string; title: string }) => {
    return item.titleKey ? t(item.titleKey) : item.title;
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/80"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0">
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
          <div className="hidden flex-1 max-w-xl lg:flex items-center">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-35 rounded-r-none border-r-0 bg-muted/50">
                <SelectValue placeholder={t("categories.all")} />
              </SelectTrigger>
              <SelectContent>
                {categoryKeys.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {t(cat.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder={t("common:searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-l-none pr-10 bg-muted/50"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full hover:bg-transparent"
                aria-label={t("common:search")}
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language Switcher - Desktop */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Account - Desktop */}
            <Link href="/signin" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">{t("header.signIn")}</span>
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
                <span className="sr-only">
                  {t("header.cart")} ({cartCount})
                </span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t("header.menu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-70 sm:w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    {t("header.menu")}
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1">
                  {/* Mobile Search */}
                  <div className="relative mb-4">
                    <Input
                      type="search"
                      placeholder={t("common:searchPlaceholder")}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex items-center justify-between py-3 border-b border-border mb-2">
                    <div className="flex items-center gap-2">
                      <LanguageSwitcher />
                    </div>
                  </div>

                  {/* User Account - Mobile */}
                  <Link
                    href="/signin"
                    className="flex items-center gap-3 py-3 text-sm font-medium hover:text-primary transition-colors"
                  >
                    <User className="h-4 w-4" />
                    {t("header.signIn")}
                  </Link>

                  <div className="h-px bg-border my-2" />

                  {/* Mobile Navigation Links */}
                  {menuData.map((item) => (
                    <div key={item.id}>
                      {item.submenu ? (
                        <div className="space-y-1">
                          <p className="py-2 font-medium text-foreground">
                            {getMenuTitle(item)}
                          </p>
                          <div className="pl-4 space-y-1 border-l border-border ml-2">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.id}
                                href={subItem.path}
                                className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {getMenuTitle(subItem)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.path}
                          className="block py-3 font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {getMenuTitle(item)}
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

      {/* Navigation Bar - Desktop only */}
      <nav className="hidden lg:block border-t border-border">
        <div className="container mx-auto px-4">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList className="gap-0">
              {menuData.map((item) => (
                <NavigationMenuItem key={item.id}>
                  {item.submenu ? (
                    <>
                      <NavigationMenuTrigger className="h-11 bg-transparent data-[state=open]:bg-accent">
                        {getMenuTitle(item)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-100 gap-2 p-4 md:w-125 md:grid-cols-2">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.path}
                                  className={cn(
                                    "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                    "hover:bg-accent hover:text-accent-foreground",
                                    "focus:bg-accent focus:text-accent-foreground"
                                  )}
                                >
                                  <span className="text-sm font-medium">
                                    {getMenuTitle(subItem)}
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
                        href={item.path}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "h-11 bg-transparent"
                        )}
                      >
                        {getMenuTitle(item)}
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
