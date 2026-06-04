import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site yentec.fr — éditeur, hébergeur, données personnelles.",
  robots: { index: false, follow: false },
};

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-site mx-auto px-7 py-[clamp(72px,9vw,90px)]">
          <Link
            href="/"
            className="text-ink-soft hover:text-accent-strong mb-10 inline-flex items-center gap-2 text-sm transition"
          >
            ← Retour à l&apos;accueil
          </Link>

          <h1 className="mb-12 text-[clamp(28px,3.6vw,40px)]">Mentions légales</h1>

          <div className="prose-custom space-y-10 text-[15px] leading-relaxed">
            <section>
              <h2 className="mb-4 text-lg font-semibold">1. Éditeur du site</h2>
              <p className="text-ink-soft">
                Le site <strong className="text-ink">yentec.fr</strong> est édité par :
              </p>
              <ul className="text-ink-soft mt-3 space-y-1">
                <li>
                  <strong className="text-ink">Dénomination :</strong> YENTEC
                </li>
                <li>
                  <strong className="text-ink">Statut :</strong> Micro-entreprise
                  (auto-entrepreneur)
                </li>
                <li>
                  <strong className="text-ink">SIRET :</strong>{" "}
                  <span className="font-mono">988745618 00013</span>
                </li>
                <li>
                  <strong className="text-ink">Siège :</strong> Fréjus, 83600, France
                </li>
                <li>
                  <strong className="text-ink">Contact :</strong>{" "}
                  <a href="mailto:contact@yentec.fr" className="text-accent-strong hover:underline">
                    contact@yentec.fr
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">2. Hébergeur</h2>
              <ul className="text-ink-soft space-y-1">
                <li>
                  <strong className="text-ink">Société :</strong> Vercel Inc.
                </li>
                <li>
                  <strong className="text-ink">Adresse :</strong> 340 Pine Street, Suite 701, San
                  Francisco, CA 94104, États-Unis
                </li>
                <li>
                  <strong className="text-ink">Site :</strong>{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-strong hover:underline"
                  >
                    vercel.com
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">3. Propriété intellectuelle</h2>
              <p className="text-ink-soft">
                L&apos;ensemble du contenu de ce site (textes, code source, visuels) est la
                propriété exclusive de YENTEC. Toute reproduction ou représentation, totale ou
                partielle, sans autorisation expresse est interdite.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">4. Données personnelles et cookies</h2>
              <p className="text-ink-soft">
                Ce site n&apos;utilise <strong className="text-ink">aucun cookie</strong>{" "}
                publicitaire ou de suivi comportemental. Seuls les cookies strictement nécessaires
                au fonctionnement technique du site peuvent être déposés.
              </p>
              <p className="text-ink-soft mt-3">
                La mesure d&apos;audience est assurée par{" "}
                <strong className="text-ink">Vercel Analytics</strong>, un outil qui collecte des
                métriques agrégées et anonymisées (statistiques agrégées de fréquentation du site)
                sans identifier les visiteurs individuellement, et sans dépôt de cookie. Ces données
                sont traitées par Vercel Inc. conformément à sa{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-strong hover:underline"
                >
                  politique de confidentialité
                </a>
                .
              </p>
              <p className="text-ink-soft mt-3">
                Le formulaire de contact transmet les données saisies (nom, e-mail, message) à
                l&apos;éditeur du site via le service <strong className="text-ink">Resend</strong>.
                Elles sont utilisées uniquement pour répondre à la demande, ne sont pas partagées à
                des fins commerciales, et sont supprimées à l&apos;issue du traitement. La base
                légale est l&apos;intérêt légitime de l&apos;éditeur à répondre aux sollicitations
                reçues.
              </p>
              <p className="text-ink-soft mt-3">
                Conformément au RGPD, vous pouvez exercer vos droits d&apos;accès, de rectification
                et de suppression en contactant :{" "}
                <a href="mailto:contact@yentec.fr" className="text-accent-strong hover:underline">
                  contact@yentec.fr
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">5. Responsabilité</h2>
              <p className="text-ink-soft">
                L&apos;éditeur s&apos;efforce de maintenir les informations de ce site à jour et
                exactes, mais ne saurait être tenu responsable des erreurs ou omissions, ni des
                dommages résultant de l&apos;utilisation du site. L&apos;utilisation du site
                implique l&apos;acceptation pleine et entière des présentes mentions légales.
              </p>
            </section>
          </div>

          <p className="text-ink-soft mt-10 text-[13px]">Dernière mise à jour : 4 juin 2026</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
