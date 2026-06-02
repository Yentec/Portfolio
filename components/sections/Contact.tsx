"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/cn";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { profile } from "@/content/profile";
import { contactContent } from "@/content/contact";
import { track } from "@vercel/analytics";

const initialState: ContactState = { status: "idle" };

// --- Icons ---

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
      <path d="M12 .5A11.5 11.5 0 0 0 8.4 22.9c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4 0 4.74 2.63 4.74 6V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9s-2.04 1.38-2.04 2.8V21h-4z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="text-ink-faint ml-auto shrink-0"
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function SendIcon() {
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
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
} as const;

// --- Shared input class ---

const inputClass =
  "w-full rounded-[10px] border border-line bg-bg px-[14px] py-3 text-[15px] text-ink " +
  "placeholder:text-ink-faint transition " +
  "focus:outline-none focus:border-accent " +
  "focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_22%,transparent)]";

// --- Submit button ---

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full justify-center">
      {pending ? "Envoi…" : "Envoyer le message"}
      {!pending && <SendIcon />}
    </Button>
  );
}

// --- Main component ---

export function Contact() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  useEffect(() => {
    if (state.status === "success") {
      track("contact_submitted");
    }
  }, [state.status]);

  return (
    <Section id="contact" tint className="section-grid">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr]">
        {/* Aside gauche */}
        <div>
          <Reveal>
            <Eyebrow>{contactContent.eyebrow}</Eyebrow>
            <h2 className="mb-4.5 text-[clamp(26px,3vw,36px)]">
              {contactContent.title}
              <br />
              {contactContent.titleLine2}
            </h2>
            <p className="text-ink-soft max-w-[42ch] text-justify text-[17px]">
              {contactContent.lead}
            </p>
          </Reveal>

          <Reveal delay={0.07}>
            <div className="mt-7.5 flex flex-col gap-3">
              {profile.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-base border-line bg-surface hover:border-accent/50 flex items-center gap-3.5 border px-4.5 py-3.75 shadow-(--shadow) transition hover:translate-x-1"
                  >
                    <span className="bg-surface-2 grid size-9.5 shrink-0 place-items-center rounded-[10px]">
                      {Icon && <Icon />}
                    </span>
                    <span>
                      <b className="text-ink block text-[15px] font-semibold">{social.label}</b>
                      <span className="text-ink-faint font-mono text-[12.5px]">
                        {social.handle}
                      </span>
                    </span>
                    <ArrowIcon />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Formulaire (droite) */}
        <Reveal delay={0.1}>
          <div className="border-line bg-surface rounded-lg border p-7.5 shadow-(--shadow)">
            {state.status === "success" ? (
              <div
                role="status"
                className="text-success-ink flex items-center gap-2.5 rounded-[10px] bg-[color-mix(in_srgb,var(--color-success)_14%,transparent)] p-3.25 text-[14px] font-semibold"
              >
                <CheckIcon />
                {contactContent.successMessage}
              </div>
            ) : (
              <form action={formAction} noValidate>
                {/* Honeypot anti-spam */}
                <div aria-hidden className="absolute -left-2499.75" tabIndex={-1}>
                  <label>
                    Société
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                {/* Nom + Email */}
                <div className="mb-4.5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-ink-soft mb-1.75 block text-[13px] font-semibold"
                    >
                      Nom <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Votre nom"
                      className={inputClass}
                    />
                    {state.status === "error" && state.fieldErrors?.["name"] && (
                      <p className="mt-1 text-[13px] text-red-600 dark:text-red-400">
                        {state.fieldErrors["name"][0]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-ink-soft mb-1.75 block text-[13px] font-semibold"
                    >
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="vous@exemple.com"
                      className={inputClass}
                    />
                    {state.status === "error" && state.fieldErrors?.["email"] && (
                      <p className="mt-1 text-[13px] text-red-600 dark:text-red-400">
                        {state.fieldErrors["email"][0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Sujet (optionnel) */}
                <div className="mb-4.5">
                  <label
                    htmlFor="subject"
                    className="text-ink-soft mb-1.75 block text-[13px] font-semibold"
                  >
                    Sujet
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Site vitrine, application métier…"
                    className={inputClass}
                  />
                </div>

                {/* Message */}
                <div className="mb-4.5">
                  <label
                    htmlFor="message"
                    className="text-ink-soft mb-1.75 block text-[13px] font-semibold"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Décrivez votre projet en quelques lignes…"
                    className={cn(inputClass, "min-h-27.5 resize-y")}
                  />
                  {state.status === "error" && state.fieldErrors?.["message"] && (
                    <p className="mt-1 text-[13px] text-red-600 dark:text-red-400">
                      {state.fieldErrors["message"][0]}
                    </p>
                  )}
                </div>

                {/* Erreur globale */}
                {state.status === "error" && !state.fieldErrors && (
                  <p role="alert" className="mb-4 text-[14px] text-red-600 dark:text-red-400">
                    {state.message}
                  </p>
                )}

                <SubmitButton />

                <p className="text-ink-faint mt-3 text-center text-[12.5px]">
                  {contactContent.formNote}
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
