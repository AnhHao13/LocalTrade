import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
  /** Show footer - default true */
  showFooter?: boolean;
  /** Show header - default true */
  showHeader?: boolean;
}

/**
 * MainLayout - Default layout with Header and Footer
 * Used for: Home, Shop, Product Detail, Blog, Contact, etc.
 */
export function MainLayout({
  children,
  showFooter = true,
  showHeader = true,
}: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
