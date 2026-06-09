import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.legalNotice" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default async function LegalNoticePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legalNotice");

  const section1Items = t.raw("section1Items") as { label: string; value: string }[];
  const section2Items = t.raw("section2Items") as { label: string; value: string }[];

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-site mx-auto px-7 py-[clamp(72px,9vw,90px)]">
          <Link
            href="/"
            className="border-line hover:border-ink hover:bg-line-soft focus-visible:outline-accent text-ink-soft hover:text-ink inline-flex items-center gap-2 rounded-[9px] border px-3.25 py-2 font-mono text-[13px] transition focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {t("back")}
          </Link>

          <h1 className="mb-12 pt-10 text-[clamp(28px,3.6vw,40px)]">{t("title")}</h1>

          <div className="prose-custom space-y-10 text-[15px] leading-relaxed">
            <section>
              <h2 className="mb-4 text-lg font-semibold">{t("section1Title")}</h2>
              <p className="text-ink-soft">
                {t("section1Intro").split("yentec.fr")[0]}
                <strong className="text-ink">yentec.fr</strong>
                {t("section1Intro").split("yentec.fr")[1]}
              </p>
              <ul className="text-ink-soft mt-3 space-y-1">
                {section1Items.map((item) => (
                  <li key={item.label}>
                    <strong className="text-ink">{item.label} :</strong>{" "}
                    {item.label === "SIRET" ? (
                      <span className="font-mono">{item.value}</span>
                    ) : (
                      item.value
                    )}
                  </li>
                ))}
                <li>
                  <strong className="text-ink">Contact :</strong>{" "}
                  <a href="mailto:contact@yentec.fr" className="text-accent-strong hover:underline">
                    contact@yentec.fr
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">{t("section2Title")}</h2>
              <ul className="text-ink-soft space-y-1">
                {section2Items.map((item) => (
                  <li key={item.label}>
                    <strong className="text-ink">{item.label} :</strong> {item.value}
                  </li>
                ))}
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
              <h2 className="mb-4 text-lg font-semibold">{t("section3Title")}</h2>
              <p className="text-ink-soft">{t("section3Body")}</p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">{t("section4Title")}</h2>
              <p className="text-ink-soft">{t("section4Body1")}</p>
              <p className="text-ink-soft mt-3">
                {t("section4Body2")}{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-strong hover:underline"
                >
                  {t("vercelPrivacyLabel")}
                </a>
                .
              </p>
              <p className="text-ink-soft mt-3">{t("section4Body3")}</p>
              <p className="text-ink-soft mt-3">
                {t("section4Body4")}{" "}
                <a href="mailto:contact@yentec.fr" className="text-accent-strong hover:underline">
                  contact@yentec.fr
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">{t("section5Title")}</h2>
              <p className="text-ink-soft">{t("section5Body")}</p>
            </section>
          </div>

          <p className="text-ink-soft mt-10 text-[13px]">{t("lastUpdate")}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
