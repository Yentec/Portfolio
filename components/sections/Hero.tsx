import { type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";

function StatusBadge({ text }: { text: string }) {
  return (
    <span className="border-line bg-surface text-ink-soft mb-6.5 inline-flex items-center gap-2.25 rounded-full border px-3.5 py-1.5 text-[13.5px] font-medium">
      <span
        className="size-2 shrink-0 rounded-full bg-[#18c07a]"
        // color-mix avoids hardcoding an RGBA: the ring always matches the dot color
        style={{ boxShadow: "0 0 0 3px color-mix(in srgb, #18c07a 22%, transparent)" }}
        aria-hidden
      />
      {text}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

// Fixed colors (no theme tokens): CodeCard always renders on a dark background (--code-bg)
const TOK = {
  key: "#ff9d5c",
  str: "#9fd28a",
  fn: "#69b7ff",
  com: "rgba(215,227,236,0.4)",
} as const;

function T({ k, children }: { k: keyof typeof TOK; children: ReactNode }) {
  return <span style={{ color: TOK[k] }}>{children}</span>;
}

// Raw " in JSX text triggers react/no-unescaped-entities; template literal sidesteps it
function Str({ children }: { children: string }) {
  return <span style={{ color: TOK.str }}>{`"${children}"`}</span>;
}

function L({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div>
      <span className="mr-4 select-none" style={{ color: "rgba(215,227,236,0.28)" }}>
        {n}
      </span>
      {children}
    </div>
  );
}

// Decorative visual only — static content, not sourced from content/, hence aria-hidden
function CodeCard() {
  return (
    <div
      className="w-full overflow-hidden rounded-lg font-mono text-[13.5px] leading-[1.85]"
      style={{ background: "var(--code-bg)", boxShadow: "var(--shadow)" }}
      aria-hidden
    >
      <div className="flex items-center gap-1.75 border-b border-white/[0.07] px-4 py-3.25">
        <span className="block size-2.75 rounded-full bg-[#ff5f57]" />
        <span className="block size-2.75 rounded-full bg-[#febc2e]" />
        <span className="block size-2.75 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[12px]" style={{ color: "rgba(215,227,236,0.5)" }}>
          yentec / profile.ts
        </span>
      </div>
      <div className="overflow-x-auto px-5.5 py-5" style={{ color: "var(--code-ink)" }}>
        <L n={1}>
          <T k="key">const </T>
          <T k="fn">yentec</T> = {"{"}
        </L>
        <L n={2}>
          {"  "}role: <Str>Développeur full-stack</Str>,
        </L>
        <L n={3}>
          {"  "}base: <Str>Fréjus, France</Str>,
        </L>
        <L n={4}>
          {"  "}stack: [<Str>Next.js</Str>, <Str>React</Str>, <Str>Node</Str>],
        </L>
        <L n={5}>
          {"  "}databases: [<Str>MySQL</Str>, <Str>PostgreSQL</Str>],
        </L>
        <L n={6}>
          {"  "}approche: <Str>sur mesure, fiable, durable</Str>,
        </L>
        <L n={7}>
          {"  "}
          <T k="com">{"// apprend vite, livre propre"}</T>
        </L>
        <L n={8}>
          {"  "}ship: <T k="key">async </T>
          {"() => "}
          <Str>✓ done</Str>,
        </L>
        <L n={9}>{"};"}</L>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      // relative required: .section-grid::before in globals.css is position absolute
      className="section-grid relative overflow-hidden pt-32.5 pb-[clamp(70px,9vw,120px)] lg:pt-37.5"
    >
      <div className="max-w-site mx-auto px-7">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Intro */}
          <div>
            <StatusBadge text={profile.availability} />
            <h1 className="text-[clamp(38px,5.6vw,66px)] leading-[1.02]">
              Le web, fait <span className="text-accent">sur mesure</span>
              <br />
              et fait pour durer.
            </h1>
            <p className="text-ink-soft mt-6 max-w-[50ch] text-[clamp(17px,1.7vw,20px)]">
              {profile.heroLead}
            </p>
            <div className="mt-8.5 flex flex-wrap gap-3">
              <a href="#projects">
                <Button>
                  Voir les projets
                  <ArrowIcon />
                </Button>
              </a>
              <a href="#contact">
                <Button variant="ghost">Me contacter</Button>
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-7.5">
              {profile.stats.map((stat) => (
                <div key={stat.value}>
                  <b className="font-head block text-[26px] leading-none font-semibold">
                    {stat.value}
                  </b>
                  <span className="text-ink-faint mt-1 block text-[13.5px]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="flex items-center">
            <CodeCard />
          </div>
        </div>
      </div>
    </section>
  );
}
