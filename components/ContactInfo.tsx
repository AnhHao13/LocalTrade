"use client";
import React from "react";
import { useTranslation } from "@/app/[locale]/i18n/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function ContactInfo() {
  const { t } = useTranslation("contact");

  return (
    <Card className="xl:max-w-[370px] w-full rounded-xl shadow-1">
      <CardHeader className="py-5 px-4 sm:px-7.5 border-b border-border">
        <CardTitle className="text-xl">{t("info.heading")}</CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-7.5">
        {/* Contact details list */}
        <div className="flex flex-col gap-4 text-sm">
          <p className="flex items-center gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3C50E0"/>
            </svg>
            {t("info.address")}
          </p>

          <p className="flex items-center gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 8V7l-3 2-2-1-4 3-3-2-3 2v1l3-1 3 2 4-3 2 1 3-2z" fill="#3C50E0"/>
            </svg>
            {t("info.email")}
          </p>

          <p className="flex items-center gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.06-.24c1.12.45 2.33.69 3.57.69a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h2.5a1 1 0 011 1c0 1.24.24 2.45.69 3.57a1 1 0 01-.27 1.06l-2.3 2.16z" fill="#3C50E0"/>
            </svg>
            {t("info.phone")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
