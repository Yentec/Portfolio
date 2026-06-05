import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Discover } from "@/components/sections/Discover";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Données structurées pour les moteurs de recherche */}
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
            address: { "@type": "PostalAddress", addressLocality: "Fréjus", addressCountry: "FR" },
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
