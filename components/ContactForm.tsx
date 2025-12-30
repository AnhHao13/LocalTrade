"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/[locale]/i18n/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ContactForm() {
  const { t } = useTranslation("contact");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  return (
    <Card className="w-full rounded-xl shadow-1">
      <CardContent className="p-4 sm:p-7.5 xl:p-10">
        {/* Form layout */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
            <div className="w-full">
              <label htmlFor="name" className="block mb-2.5">
                {t("form.name")} <span className="text-red">*</span>
              </label>
              <Input
                id="name"
                name="name"
                placeholder={t("form.namePlaceholder")}
                value={form.name}
                onChange={onChange}
              />
            </div>

            <div className="w-full">
              <label htmlFor="email" className="block mb-2.5">
                {t("form.email")} <span className="text-red">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("form.emailPlaceholder")}
                value={form.email}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="subject" className="block mb-2.5">
              {t("form.subject")}
            </label>
            <Input
              id="subject"
              name="subject"
              placeholder={t("form.subjectPlaceholder")}
              value={form.subject}
              onChange={onChange}
            />
          </div>

          <div className="mb-7.5">
            <label htmlFor="message" className="block mb-2.5">
              {t("form.message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20"
              placeholder={t("form.messagePlaceholder")}
              value={form.message}
              onChange={onChange}
            />
          </div>

          <CardFooter className="p-0">
            <Button type="submit" className="" size="lg">
              {t("form.submit")}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
