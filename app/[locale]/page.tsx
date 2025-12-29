import type { ReactElement } from "react";
import { HomeLayout } from "@/layouts";
import { createTranslation, type Locale } from "./i18n";
import {
  mockCategories,
  mockBanners,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
} from "@/data/mock";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({
  params,
}: PageProps): Promise<ReactElement> {
  const { locale } = await params;
  const { t } = await createTranslation(locale as Locale, "home");

  // Data fetching happens in page (will be replaced with services)
  const categories = mockCategories;
  const banners = mockBanners;
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  return (
    <HomeLayout
      t={t}
      categories={categories}
      banners={banners}
      featuredProducts={featuredProducts}
      newArrivals={newArrivals}
      bestSellers={bestSellers}
    />
  );
}
