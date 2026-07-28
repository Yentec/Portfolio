import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/lib/theme";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { SITE_URL, absoluteUrl } from "@/lib/site";
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
  const ogImage = {
    url: locale === "fr" ? "/og-image-fr.png" : "/og-image-en.png",
    width: 1200,
    height: 630,
    alt: t("ogTitle"),
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s · Yentec",
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
    authors: [{ name: "Yentec" }],
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: absoluteUrl(`/${locale}`),
      siteName: "Yentec",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [ogImage],
    },
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: {
        fr: absoluteUrl("/fr"),
        en: absoluteUrl("/en"),
        "x-default": absoluteUrl("/fr"),
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
