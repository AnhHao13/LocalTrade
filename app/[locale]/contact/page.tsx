import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import LocaleSync from "@/components/LocaleSync";
import { createTranslation } from "@/app/[locale]/i18n/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> } | any) {
	const resolved = await params;
	const { t } = await createTranslation(resolved.locale as any, "contact");
	return {
		title: t("title"),
		description: t("description"),
	} as Metadata;
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> } | any) {
	const resolved = await params;
	const { t } = await createTranslation(resolved.locale as any, "contact");

	return (
		<main>
			<LocaleSync />
			<section className="py-12 sm:py-16">
				<div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
					{/* Heading */}
					<div className="mb-8 text-center">
						<h1 className="text-3xl font-semibold">{t("title")}</h1>
						<p className="mt-2 text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
					</div>

					{/* Two column layout: info + form */}
					<div className="flex flex-col xl:flex-row gap-7.5">
						<ContactInfo />

						<div className="xl:max-w-[770px] w-full">
							<ContactForm />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

