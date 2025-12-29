import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PromoBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  imageUrl?: string;
  backgroundColor?: string;
  variant?: "default" | "reverse";
}

export function PromoBanner({
  title,
  subtitle,
  description,
  ctaText = "Shop Now",
  ctaHref = "/shop",
  imageUrl,
  backgroundColor = "bg-primary",
  variant = "default",
}: PromoBannerProps) {
  return (
    <section className="py-12">
      <div
        className={cn("relative overflow-hidden rounded-2xl", backgroundColor)}
      >
        <div
          className={cn(
            "flex flex-col md:flex-row items-center gap-8 p-8 md:p-12",
            variant === "reverse" && "md:flex-row-reverse"
          )}
        >
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            {subtitle && (
              <p className="text-sm font-medium text-primary-foreground/80 mb-2">
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-primary-foreground/90 mb-6 max-w-md">
                {description}
              </p>
            )}
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="font-semibold"
            >
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>

          {/* Image */}
          {imageUrl && (
            <div className="flex-1 relative">
              <div className="relative aspect-square max-w-[300px] md:max-w-[400px] mx-auto">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          )}

          {/* Placeholder if no image */}
          {!imageUrl && (
            <div className="flex-1 relative">
              <div className="aspect-square max-w-[300px] md:max-w-[400px] mx-auto bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-lg bg-primary-foreground/20" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
