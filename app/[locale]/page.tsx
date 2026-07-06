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
            sameAs: [
              "https://github.com/Yentec",
              "https://www.linkedin.com/in/yentec",
              "https://www.google.com/maps/place/Yentec/@43.4259808,6.7563354,21z/data=!4m6!3m5!1s0x12ce97f3c03099cd:0xf69b26c05186533!8m2!3d43.4260473!4d6.7562997!16s%2Fg%2F11zcn94h2d",
            ],
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
            "@id": "https://yentec.fr/#business",
            name: "YENTEC — Développeur web Fullstack",
            description:
              "Création de sites vitrines et applications web sur mesure. Développeur fullstack freelance à Fréjus (Var), disponible partout en France.",
            url: "https://yentec.fr",
            logo: "https://yentec.fr/logo/logo_color.png",
            image: "https://yentec.fr/logo/long_color.png",
            foundingDate: "2025",
            founder: {
              "@type": "Person",
              name: "YENTEC",
              url: "https://yentec.fr",
            },
            areaServed: ["Fréjus", "Var", "Provence-Alpes-Côte d'Azur", "France"],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Fréjus",
              postalCode: "83600",
              addressRegion: "Provence-Alpes-Côte d'Azur",
              addressCountry: "FR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 43.42557144165039,
              longitude: 6.756052494049072,
            },
            priceRange: "€€",
            knowsLanguage: ["fr", "en"],
            sameAs: [
              "https://github.com/Yentec",
              "https://www.linkedin.com/in/yentec",
              "https://www.google.com/maps/place/Yentec/@43.4259808,6.7563354,21z/data=!4m6!3m5!1s0x12ce97f3c03099cd:0xf69b26c05186533!8m2!3d43.4260473!4d6.7562997!16s%2Fg%2F11zcn94h2d",
            ],
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
