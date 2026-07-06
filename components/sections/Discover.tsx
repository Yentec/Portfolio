import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { rpgCharacter } from "@/content/discover";

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4.25"
      aria-hidden
    >
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4.25"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export async function Discover() {
  const t = await getTranslations("discover");
  const cvRows = t.raw("cvRows") as { label: string; value: string }[];
  const rpgStats = t.raw("rpgStats") as { label: string; value: string }[];
  const rpgChar = t.raw("rpgCharacter") as { level: string; characterClass: string };

  return (
    <section className="rpg-bg relative overflow-hidden bg-[#03101f] py-[clamp(72px,9vw,90px)] text-[#eaf1f7]">
      <div className="max-w-site relative z-1 mx-auto w-full px-7">
        <span id="discover" className="absolute -top-px" />
        <Reveal>
          <div className="mb-11.5">
            <Eyebrow className="text-accent">{t("eyebrow")}</Eyebrow>
            <h2 className="text-[clamp(28px,3.8vw,44px)] text-white">{t("title")}</h2>
            <p className="mt-4 text-justify text-[17px] text-[rgba(234,241,247,0.74)]">
              {t("lead")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {/* CV Card */}
          <Reveal delay={0.07}>
            <article className="flex h-full flex-col gap-4 rounded-lg border border-[rgba(1,22,39,0.08)] bg-white p-8 text-[#011627] shadow-[0_30px_60px_-34px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-3.5">
                <div>
                  <p className="text-accent-strong mb-0.5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                    <span className="bg-accent inline-block h-[1.5px] w-4.5" aria-hidden />
                    {t("cv.tag")}
                  </p>
                  <h3 className="font-head text-[26px] leading-tight font-semibold tracking-[-0.02em] text-[#011627]">
                    {t("cv.title")}
                  </h3>
                </div>
              </div>

              <p className="text-justify text-[15px] leading-[1.55] text-[rgba(1,22,39,0.62)]">
                {t("cv.sub")}
              </p>

              <div className="flex flex-1 flex-col">
                {cvRows.map((row, i) => (
                  <div
                    key={row.label}
                    className={cn(
                      "flex justify-between gap-4 py-2.5",
                      i > 0 && "border-t border-[rgba(1,22,39,0.1)]",
                    )}
                  >
                    <span className="pt-0.75 font-mono text-[11px] tracking-[0.04em] whitespace-nowrap text-[rgba(1,22,39,0.5)] uppercase">
                      {row.label}
                    </span>
                    <span className="text-right text-[14px] font-semibold text-[#011627]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-1.5 grid grid-cols-1 gap-2.75 sm:grid-cols-2">
                <a
                  href="/resume-yentec-fullstack-developer.pdf"
                  download="CV-YENTEC-Developpeur-Web-Fullstack.pdf"
                  aria-label={t("cv.ariaDownload")}
                >
                  <Button variant="secondary" className="w-full justify-center">
                    {t("cv.ctaDownload")}
                    <DownloadIcon />
                  </Button>
                </a>
                <a href="#contact">
                  <Button className="w-full justify-center">{t("cv.ctaContact")}</Button>
                </a>
              </div>
            </article>
          </Reveal>

          {/* RPG Card */}
          <Reveal delay={0.12}>
            <article
              className="rpg-card-glow relative flex h-full flex-col gap-4 overflow-hidden rounded-lg border border-[rgba(234,241,247,0.16)] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_30px_60px_-34px_rgba(0,0,0,0.7)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(234,241,247,.07), rgba(234,241,247,.015))",
              }}
            >
              <div className="relative flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="text-accent inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                    <span className="bg-accent inline-block h-[1.5px] w-4.5" aria-hidden />
                    {t("rpg.tag")}
                  </p>
                  <span className="rounded-[8px] border border-[rgba(234,241,247,0.18)] px-2.5 py-0.5 font-mono text-[11px] tracking-widest whitespace-nowrap text-[rgba(234,241,247,0.62)]">
                    {rpgChar.level}
                  </span>
                </div>
                <h3 className="font-head text-[26px] leading-tight font-semibold tracking-[-0.02em] text-white">
                  {t("rpg.title")}
                </h3>
              </div>

              <p className="relative text-justify text-[15px] leading-[1.55] text-[rgba(234,241,247,0.74)]">
                {t("rpg.sub")}
              </p>

              <div className="relative flex flex-1 flex-col gap-3.25 rounded-[15px] border border-[rgba(234,241,247,0.12)] bg-[rgba(3,16,31,0.55)] px-5 py-4.5">
                <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] text-[rgba(234,241,247,0.62)] uppercase">
                  <span>HP</span>
                  <div className="hpbar">
                    <div className="hpbar__fill" style={{ width: `${rpgCharacter.hpPercent}%` }} />
                  </div>
                  <span>{rpgCharacter.hpPercent}%</span>
                </div>

                <p className="text-accent font-mono text-[12.5px]">{rpgChar.characterClass}</p>

                <div className="flex flex-col font-mono text-[13px]">
                  {rpgStats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={cn(
                        "flex justify-between gap-2 py-2 text-[rgba(234,241,247,0.82)]",
                        i > 0 && "border-t border-[rgba(234,241,247,0.1)]",
                      )}
                    >
                      <span>{stat.label}</span>
                      <b className="shrink-0 tracking-[1px]">
                        {[...stat.value].map((char, j) => (
                          <span key={j} className={char === "☆" ? "text-white" : "text-accent"}>
                            {char}
                          </span>
                        ))}
                      </b>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-1.5 flex flex-wrap items-center gap-2.75">
                <Link href="/rpg" className="w-full">
                  <Button className="w-full justify-center">
                    {t("rpg.ctaPlay")}
                    <ArrowIcon />
                  </Button>
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
