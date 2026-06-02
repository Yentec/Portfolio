import type { Metadata } from "next";
import { inter, manrope, jetbrainsMono } from "./fonts";
import { ThemeProvider } from "@/lib/theme";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yentec.fr"),
  title: {
    default: "YENTEC — Développeur web fullstack · Fréjus",
    template: "%s · YENTEC",
  },
  description:
    "Développeur web fullstack freelance à Fréjus — création de sites vitrines, applications métier et SaaS sur mesure. React, Next.js, Node.js, TypeScript. Code propre, livraison sérieuse.",
  keywords: [
    "développeur web",
    "développeur fullstack",
    "développeur web Fréjus",
    "développeur freelance",
    "création site internet Fréjus",
    "application web sur mesure",
    "développeur React",
    "développeur Next.js",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "Var",
    "PACA",
  ],
  authors: [{ name: "YENTEC" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://yentec.fr",
    siteName: "YENTEC",
    title: "YENTEC — Développeur web fullstack",
    description:
      "Sites vitrines, applications métier et SaaS sur mesure. Développeur fullstack freelance à Fréjus, disponible partout en France.",
  },
  twitter: {
    card: "summary_large_image",
    title: "YENTEC — Développeur web fullstack",
    description: "Applications métier, sites performants, SaaS.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      data-theme="light"
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
