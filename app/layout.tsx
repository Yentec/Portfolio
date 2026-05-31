import type { Metadata } from "next";
import { inter, manrope, jetbrainsMono } from "./fonts";
import { ThemeProvider } from "@/lib/theme";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: "YENTEC — Développeur web sur mesure · Fréjus",
  description:
    "YENTEC — Développeur web freelance à Fréjus. Applications métier, sites performants, SaaS. Next.js, React, Node.js, TypeScript.",
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
