import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface CheckoutLayoutProps {
  children: ReactNode;
  /** Order summary sidebar content */
  orderSummary?: ReactNode;
}

/**
 * CheckoutLayout - Layout for checkout flow
 * Simplified header (no nav), main content + order summary sidebar
 */
export function CheckoutLayout({
  children,
  orderSummary,
}: CheckoutLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Simplified Header - could be a different variant */}
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Checkout Steps */}
            <div className="space-y-6">{children}</div>

            {/* Order Summary */}
            {orderSummary && (
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-lg border bg-card p-6">
                  {orderSummary}
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
