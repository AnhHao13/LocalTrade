"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/[locale]/i18n/client";

export function Newsletter() {
  const { t } = useTranslation("home");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-12">
      <div className="bg-muted rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {t("newsletter.title", { defaultValue: "Subscribe to Our Newsletter" })}
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {t("newsletter.subtitle", { defaultValue: "Get the latest updates on new products and upcoming sales directly to your inbox." })}
        </p>

        {isSubmitted ? (
          <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg max-w-md mx-auto">
            {t("newsletter.success", { defaultValue: "Thanks for subscribing! Check your inbox for confirmation." })}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder={t("newsletter.placeholder", { defaultValue: "Enter your email" })}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
                t("newsletter.subscribing", { defaultValue: "Subscribing..." })
              ) : (
                <>
                  {t("newsletter.button", { defaultValue: "Subscribe" })}
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          {t("newsletter.disclaimer", { defaultValue: "By subscribing, you agree to our Privacy Policy and consent to receive updates from our company." })}
        </p>
      </div>
    </section>
  );
}
