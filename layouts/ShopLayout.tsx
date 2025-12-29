import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface ShopLayoutProps {
  children: ReactNode;
  /** Sidebar content - filters, categories, etc. */
  sidebar?: ReactNode;
  /** Sidebar position - default left */
  sidebarPosition?: "left" | "right";
}

/**
 * ShopLayout - Layout for shop pages with optional sidebar
 * Used for: Shop with filters, Category pages, Search results
 */
export function ShopLayout({
  children,
  sidebar,
  sidebarPosition = "left",
}: ShopLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {sidebar ? (
            <div
              className={`grid gap-8 lg:grid-cols-[280px_1fr] ${
                sidebarPosition === "right" ? "lg:grid-cols-[1fr_280px]" : ""
              }`}
            >
              {sidebarPosition === "left" && (
                <aside className="hidden lg:block">
                  <div className="sticky top-24 space-y-6">{sidebar}</div>
                </aside>
              )}

              <div>{children}</div>

              {sidebarPosition === "right" && (
                <aside className="hidden lg:block">
                  <div className="sticky top-24 space-y-6">{sidebar}</div>
                </aside>
              )}
            </div>
          ) : (
            children
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
