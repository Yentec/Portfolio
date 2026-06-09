import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/lib/theme";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { LangAttributeSetter } from "@/components/LangAttributeSetter";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    metadataBase: new URL("https://yentec.fr"),
    title: {
      default: t("title"),
      template: "%s · YENTEC",
    },
    description: t("description"),
    keywords: [
      "développeur web",
      "développeur fullstack",
      "web developer",
      "fullstack developer",
      "développeur web Fréjus",
      "développeur freelance",
      "création site internet Fréjus",
      "application web sur mesure",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
    ],
    authors: [{ name: "YENTEC" }],
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: "https://yentec.fr",
      siteName: "YENTEC",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `https://yentec.fr/${locale}`,
      languages: {
        fr: "https://yentec.fr/fr",
        en: "https://yentec.fr/en",
        "x-default": "https://yentec.fr/fr",
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <LangAttributeSetter locale={locale} />
        {children}
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </NextIntlClientProvider>
  );
}
