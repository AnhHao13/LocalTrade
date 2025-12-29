import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryGridProps {
  categories: Category[];
  title?: string;
  subtitle?: string;
}

export function CategoryGrid({
  categories,
  title = "Shop by Category",
  subtitle = "Browse our popular categories",
}: CategoryGridProps) {
  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Card
              className={cn(
                "group cursor-pointer transition-all duration-300",
                "hover:shadow-lg hover:-translate-y-1"
              )}
            >
              <CardContent className="p-4 text-center">
                <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-16 h-16 rounded-full"
                        style={{
                          backgroundColor: `hsl(${
                            (index * 60) % 360
                          }, 70%, 85%)`,
                        }}
                      />
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {category.productCount} products
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
