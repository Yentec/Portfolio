import type { Metadata } from "next";
import { inter, manrope, jetbrainsMono } from "./fonts";
import { ThemeProvider } from "@/lib/theme";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yentec.fr"),
  title: {
    default: "YENTEC — Développeur web fullstack · Fréjus",
    template: "%s · YENTEC",
  },
  description:
    "Développeur web fullstack à Fréjus. Applications métier, sites performants, SaaS. Next.js, React, Node.js, TypeScript.",
  keywords: ["développeur web", "fullstack", "Next.js", "React", "Node.js", "Fréjus"],
  authors: [{ name: "YENTEC" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://yentec.fr",
    siteName: "YENTEC",
    title: "YENTEC — Développeur web fullstack",
    description: "Applications métier, sites performants, SaaS. Next.js, React, Node.js.",
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
      </body>
    </html>
  );
}
