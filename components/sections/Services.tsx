import { type ReactNode, Fragment } from "react";
import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";
import type { Service, ServiceIconName } from "@/types";

/* ── Service icons ──────────────────────────────────────────── */

function MonitorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-6"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M7 20h10" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-6"
      aria-hidden
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-6"
      aria-hidden
    >
      <path d="M12 3c3 2 5 5 5 9a5 5 0 0 1-10 0c0-4 2-7 5-9z" />
      <path d="M9 21h6" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-6"
      aria-hidden
    >
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />
    </svg>
  );
}

const SERVICE_ICONS: Record<ServiceIconName, () => React.ReactElement> = {
  monitor: MonitorIcon,
  grid: GridIcon,
  bulb: BulbIcon,
  wrench: WrenchIcon,
};

/* ── Axis icons ─────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-3.75"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-3.75"
      aria-hidden
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-3.75"
      aria-hidden
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

/* ── Helpers ────────────────────────────────────────────────── */

function parseBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="text-ink font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

type AxisType = "search" | "user" | "check";

const AXIS_ICONS: Record<AxisType, () => React.ReactElement> = {
  search: SearchIcon,
  user: UserIcon,
  check: CheckIcon,
};

function AxisItem({
  type,
  label,
  children,
}: {
  type: AxisType;
  label: string;
  children: ReactNode;
}) {
  const Icon = AXIS_ICONS[type];
  return (
    <div className="grid grid-cols-[18px_1fr] items-start gap-2.75">
      <span className="text-accent-strong dark:text-accent mt-1">
        <Icon />
      </span>
      <div>
        <span className="text-ink-faint mb-0.5 block font-mono text-[10.5px] tracking-widest uppercase">
          {label}
        </span>
        <span className="text-ink-soft text-[14.5px] leading-[1.45]">{children}</span>
      </div>
    </div>
  );
}

function ServiceRow({
  service,
  even,
  labels,
}: {
  service: Service;
  even: boolean;
  labels: { problem: string; audience: string; outcome: string };
}) {
  const Icon = SERVICE_ICONS[service.icon];
  return (
    <article
      className={cn(
        "bg-surface border-line flex flex-col overflow-hidden rounded-lg border shadow-(--shadow)",
        "md:flex-row",
        even && "md:flex-row-reverse",
      )}
    >
      {/* Aside */}
      <div
        className={cn(
          "bg-surface-2 border-line flex flex-col gap-3.5 p-8",
          "md:w-[42%] md:shrink-0",
          "border-b md:border-b-0",
          even ? "md:border-l" : "md:border-r",
        )}
      >
        <span
          className="text-accent-strong dark:text-accent grid size-11.5 place-items-center rounded-xl"
          style={{ background: "color-mix(in srgb, var(--color-accent) 14%, transparent)" }}
        >
          <Icon />
        </span>
        <h3 className="text-ink text-[24px] leading-tight font-semibold tracking-[-0.01em]">
          {service.title}
        </h3>
        <p className="text-ink-soft text-[14px] leading-relaxed">{service.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.75">
          {service.badges.map((badge) => (
            <span
              key={badge}
              className="bg-surface border-line text-ink-soft rounded-[7px] border px-2.5 py-1.25 font-mono text-[11.5px]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col justify-center gap-4.5 p-8">
        <AxisItem type="search" label={labels.problem}>
          {service.problem}
        </AxisItem>
        <AxisItem type="user" label={labels.audience}>
          {service.audience}
        </AxisItem>
        <AxisItem type="check" label={labels.outcome}>
          {parseBold(service.outcome)}
        </AxisItem>
      </div>
    </article>
  );
}

export async function Services() {
  const t = await getTranslations("services");
  const serviceMessages = t.raw("items") as Record<
    string,
    { title: string; description: string; problem: string; audience: string; outcome: string }
  >;
  const labels = t.raw("labels") as { problem: string; audience: string; outcome: string };

  const localizedServices = services.map((s) => ({
    ...s,
    ...(serviceMessages[s.id] ?? {}),
  }));

  return (
    <section className="services-spot relative overflow-hidden py-[clamp(72px,9vw,90px)]">
      <div className="max-w-site relative z-1 mx-auto w-full px-7">
        <span id="services" className="absolute -top-px" />

        <Reveal>
          <Eyebrow className="text-accent dark:text-accent-strong">{t("eyebrow")}</Eyebrow>
          <h2 className="mb-4.5 text-[clamp(28px,3.6vw,40px)] text-white dark:text-[#011627]">
            {t("title")}
          </h2>
          <p className="mb-12 max-w-[56ch] text-[clamp(16px,1.5vw,18px)] text-[rgba(234,241,247,0.74)] dark:text-[rgba(1,22,39,0.64)]">
            {t("lead")}
          </p>
        </Reveal>

        <div className="flex flex-col gap-6.5">
          {localizedServices.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.07}>
              <ServiceRow service={service} even={i % 2 === 1} labels={labels} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={localizedServices.length * 0.07} className="mt-6.5">
          <div className="bg-surface border-line flex flex-wrap items-center justify-between gap-7 rounded-lg border p-7 shadow-(--shadow)">
            <div>
              <h3 className="text-ink text-[22px] font-semibold tracking-[-0.01em]">
                {t("cta.title")}
              </h3>
              <p className="text-ink-soft mt-1.5 max-w-[52ch] text-[15px]">{t("cta.text")}</p>
            </div>
            <a href="#contact" className="shrink-0">
              <Button>
                {t("cta.button")}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4.25"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
