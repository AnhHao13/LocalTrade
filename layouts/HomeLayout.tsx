import type { ReactElement } from "react";
import type { TFunction } from "i18next";
import type { Product, Category, Banner } from "@/types";
import {
  HeroCarousel,
  HeroFeatures,
  CategoryGrid,
  ProductGrid,
  PromoBanner,
  Newsletter,
} from "@/components/home";

interface HomeLayoutProps {
  t: TFunction;
  categories: Category[];
  banners: Banner[];
  featuredProducts: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
}

/**
 * HomeLayout - Layout for home page
 * Receives t function and data from page
 * Does NOT fetch data - pure presentation
 */
export function HomeLayout({
  t,
  categories,
  banners,
  featuredProducts,
  newArrivals,
  bestSellers,
}: HomeLayoutProps): ReactElement {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <HeroCarousel banners={banners} />
          <HeroFeatures />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Categories */}
        <CategoryGrid
          categories={categories}
          title={t("categories.title")}
          subtitle={t("categories.subtitle")}
        />

        {/* Featured Products */}
        <ProductGrid
          products={featuredProducts}
          title={t("featured.title")}
          subtitle={t("featured.subtitle")}
          viewAllHref="/shop?filter=featured"
        />

        {/* Promo Banner */}
        <PromoBanner
          title={t("promo.title")}
          subtitle={t("promo.subtitle")}
          description={t("promo.description")}
          ctaText={t("promo.cta")}
          ctaHref="/shop?sale=summer"
          backgroundColor="bg-gradient-to-r from-blue-600 to-purple-600"
        />

        {/* New Arrivals */}
        <ProductGrid
          products={newArrivals}
          title={t("newArrivals.title")}
          subtitle={t("newArrivals.subtitle")}
          viewAllHref="/shop?filter=new"
        />

        {/* Best Sellers */}
        <ProductGrid
          products={bestSellers}
          title={t("bestSellers.title")}
          subtitle={t("bestSellers.subtitle")}
          viewAllHref="/shop?filter=bestseller"
          columns={3}
        />

        {/* Newsletter */}
        <Newsletter />
      </div>
    </>
  );
}
