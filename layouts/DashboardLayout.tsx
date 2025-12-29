import type { ReactNode } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { icon: User, label: "My Profile", href: "/account/profile" },
  { icon: Package, label: "My Orders", href: "/account/orders" },
  { icon: Heart, label: "Wishlist", href: "/account/wishlist" },
  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/account/payment" },
  { icon: Settings, label: "Settings", href: "/account/settings" },
];

interface DashboardLayoutProps {
  children: ReactNode;
  /** Currently active page for sidebar highlighting */
  activePage?: string;
}

/**
 * DashboardLayout - Layout for user account/dashboard pages
 * Has Header, Sidebar navigation, Content area, Footer
 */
export function DashboardLayout({
  children,
  activePage,
}: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <aside className="space-y-2">
              <div className="rounded-lg border bg-card p-6">
                <h2 className="font-semibold mb-4">My Account</h2>
                <nav className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        activePage === link.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  ))}

                  <hr className="my-2" />

                  <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="rounded-lg border bg-card p-6">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
