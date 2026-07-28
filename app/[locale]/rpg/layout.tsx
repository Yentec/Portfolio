import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/site";

// The RPG page is “use client”: it cannot export metadata.
// Without this layout, it inherits the canonical tag from the homepage and is therefore
// identified as a variant of another page—status "Other page with correct
// canonical tag" in Search Console.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.rpg" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: absoluteUrl(`/${locale}/rpg`),
      languages: {
        fr: absoluteUrl("/fr/rpg"),
        en: absoluteUrl("/en/rpg"),
      },
    },
    // The classic mode remains the default indexable content. The HTML served
    // here is virtually empty (client-side canvas): indexing it would result in a
    // ghost page. `follow` allows links to the classic mode to be followed.
    robots: { index: false, follow: true },
  };
}

export default function RpgLayout({ children }: { children: ReactNode }) {
  return children;
}
