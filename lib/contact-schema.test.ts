import { z } from "zod";
import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const valid = {
  name: "Jean Dupont",
  email: "jean@example.com",
  message: "Bonjour, je vous contacte pour une mission.",
};

function fieldErrors(input: unknown): Record<string, string[] | undefined> {
  const result = contactSchema.safeParse(input);
  if (result.success) throw new Error("Expected failure");
  return z.flattenError(result.error).fieldErrors;
}

describe("contactSchema — cas valides", () => {
  it("accepte une saisie minimale sans sujet", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("accepte une saisie complète avec sujet et honeypot vide", () => {
    expect(
      contactSchema.safeParse({ ...valid, subject: "Mission React", company: "" }).success,
    ).toBe(true);
  });

  it("accepte un honeypot absent (undefined)", () => {
    expect(contactSchema.safeParse({ ...valid, company: undefined }).success).toBe(true);
  });

  it("trim le nom et le message avant validation", () => {
    const result = contactSchema.safeParse({
      ...valid,
      name: "  Jean  ",
      message: "  " + valid.message,
    });
    expect(result.success).toBe(true);
  });
});

describe("contactSchema — validation du nom", () => {
  it("rejette un nom trop court (< 2 caractères)", () => {
    expect(fieldErrors({ ...valid, name: "A" })["name"]).toBeDefined();
  });

  it("rejette un nom trop long (> 80 caractères)", () => {
    expect(fieldErrors({ ...valid, name: "A".repeat(81) })["name"]).toBeDefined();
  });
});

describe("contactSchema — validation de l'email", () => {
  it("rejette un email sans @", () => {
    expect(fieldErrors({ ...valid, email: "pas-un-email" })["email"]).toBeDefined();
  });

  it("rejette un email sans domaine", () => {
    expect(fieldErrors({ ...valid, email: "test@" })["email"]).toBeDefined();
  });
});

describe("contactSchema — validation du message", () => {
  it("rejette un message trop court (< 10 caractères)", () => {
    expect(fieldErrors({ ...valid, message: "Court" })["message"]).toBeDefined();
  });

  it("rejette un message trop long (> 2000 caractères)", () => {
    expect(fieldErrors({ ...valid, message: "A".repeat(2001) })["message"]).toBeDefined();
  });
});

describe("contactSchema — validation du sujet", () => {
  it("rejette un sujet trop long (> 120 caractères)", () => {
    expect(fieldErrors({ ...valid, subject: "A".repeat(121) })["subject"]).toBeDefined();
  });
});

describe("contactSchema — honeypot anti-bot", () => {
  it("rejette un honeypot non vide (bot détecté)", () => {
    expect(contactSchema.safeParse({ ...valid, company: "Acme Corp" }).success).toBe(false);
  });

  it("accepte un honeypot vide (humain)", () => {
    expect(contactSchema.safeParse({ ...valid, company: "" }).success).toBe(true);
  });
});
