import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Discover } from "@/components/sections/Discover";
import { Contact } from "@/components/sections/Contact";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "YENTEC",
            jobTitle: "Développeur web fullstack",
            url: "https://yentec.fr",
            email: "contact@yentec.fr",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Fréjus",
              postalCode: "83600",
              addressRegion: "Provence-Alpes-Côte d'Azur",
              addressCountry: "FR",
            },
            sameAs: ["https://github.com/Yentec", "https://www.linkedin.com/in/yentec"],
            knowsAbout: [
              "Next.js",
              "React",
              "Node.js",
              "TypeScript",
              "développement web fullstack",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "YENTEC — Développeur web Fullstack",
            description:
              "Création de sites vitrines et applications web sur mesure. Développeur fullstack freelance à Fréjus (Var), disponible partout en France.",
            url: "https://yentec.fr",
            email: "contact@yentec.fr",
            areaServed: ["Fréjus", "Var", "Provence-Alpes-Côte d'Azur", "France"],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Fréjus",
              postalCode: "83600",
              addressRegion: "Provence-Alpes-Côte d'Azur",
              addressCountry: "FR",
            },
            priceRange: "€€",
            sameAs: ["https://github.com/Yentec", "https://www.linkedin.com/in/yentec"],
          }),
        }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Discover />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
