"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Footer link keys for i18n - translations in layout.json
const footerLinkKeys = {
  company: [
    { labelKey: "footer.aboutUs", href: "/about" },
    { labelKey: "footer.contact", href: "/contact" },
    { labelKey: "footer.careers", href: "/careers" },
    { labelKey: "footer.press", href: "/press" },
  ],
  support: [
    { labelKey: "footer.helpCenter", href: "/help" },
    { labelKey: "footer.safetyCenter", href: "/safety" },
    { labelKey: "footer.communityGuidelines", href: "/guidelines" },
    { labelKey: "footer.termsOfService", href: "/terms" },
  ],
  legal: [
    { labelKey: "footer.privacyPolicy", href: "/privacy" },
    { labelKey: "footer.cookiePolicy", href: "/cookies" },
    { labelKey: "footer.licensing", href: "/licensing" },
    { labelKey: "footer.refundPolicy", href: "/refund" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
];

export function Footer() {
  const { t } = useTranslation("layout");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold">eCommerce</h2>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm">
              {t("footer.brandDescription")}
            </p>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="font-medium">{t("footer.newsletterTitle")}</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("footer.newsletterPlaceholder")}
                  className="max-w-xs"
                />
                <Button>{t("footer.subscribe")}</Button>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2">
              {footerLinkKeys.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.support")}</h3>
            <ul className="space-y-2">
              {footerLinkKeys.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.contactTitle")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>{t("footer.address")}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>(+965) 7492-3477</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>support@ecommerce.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {t("footer.copyright", { year: currentYear })}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              {footerLinkKeys.legal.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
