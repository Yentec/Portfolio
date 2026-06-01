import { describe, expect, it } from "vitest";
import { renderContactEmail } from "@/components/email/ContactEmail";

const base = {
  name: "Jean Dupont",
  email: "jean@example.com",
  message: "Bonjour, je vous contacte pour une mission.",
  portfolioName: "YENTEC",
};

describe("renderContactEmail — structure HTML", () => {
  it("commence par <!DOCTYPE html>", () => {
    expect(renderContactEmail(base)).toMatch(/^<!DOCTYPE html>/);
  });

  it("inclut le nom, l'email et le message", () => {
    const html = renderContactEmail(base);
    expect(html).toContain("Jean Dupont");
    expect(html).toContain("jean@example.com");
    expect(html).toContain("Bonjour, je vous contacte pour une mission.");
  });

  it("inclut le nom du portfolio dans le header", () => {
    expect(renderContactEmail(base)).toContain("YENTEC");
  });
});

describe("renderContactEmail — bloc sujet", () => {
  it("affiche le sujet quand il est fourni", () => {
    const html = renderContactEmail({ ...base, subject: "Mission React" });
    expect(html).toContain("Mission React");
    expect(html).toContain("Sujet");
  });

  it("omet le bloc sujet quand il est absent", () => {
    const html = renderContactEmail(base);
    expect(html).not.toContain("Sujet");
  });
});

describe("renderContactEmail — échappement XSS", () => {
  it("échappe les balises HTML dans le nom", () => {
    const html = renderContactEmail({ ...base, name: '<script>alert("xss")</script>' });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("échappe les balises HTML dans le message", () => {
    const html = renderContactEmail({ ...base, message: "Test <b>injection</b> & variante" });
    expect(html).not.toContain("<b>");
    expect(html).toContain("&lt;b&gt;");
    expect(html).toContain("&amp;");
  });

  it("échappe les guillemets dans l'email (injection d'attribut)", () => {
    const html = renderContactEmail({ ...base, email: 'a"@example.com' });
    expect(html).not.toContain('"@example.com');
    expect(html).toContain("&quot;");
  });

  it("échappe les balises HTML dans le sujet", () => {
    const html = renderContactEmail({ ...base, subject: "<img src=x onerror=alert(1)>" });
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
  });
});
