<div align="center">

# Portfolio — YENTEC

Portfolio personnel de YENTEC, développeur web fullstack basé à Fréjus.
Site vitrine one-page : présentation, parcours, services, compétences, projets et contact.

![CI](https://github.com/Yentec/portfolio/actions/workflows/ci.yml/badge.svg)

**[Lien](https://yentec.fr)**

</div>

## Stack

| Domaine           | Choix                                                         |
| ----------------- | ------------------------------------------------------------- |
| Framework         | Next.js 16 (App Router, Server Components, Server Actions)    |
| Langage           | TypeScript strict (`noUncheckedIndexedAccess`, zéro `any`)    |
| Styling           | Tailwind CSS v4 (tokens CSS dans `globals.css`)               |
| Animations        | Motion (Framer Motion) — respect de `prefers-reduced-motion`  |
| Internationalisation | next-intl v4 (FR / EN, `localePrefix: "always"`)           |
| Formulaire        | Server Action + validation Zod + envoi via Resend             |
| Tests             | Vitest (schéma Zod, rendu email, parité des traductions)      |
| Qualité           | ESLint, Prettier, CI GitHub Actions                           |
| Déploiement       | Vercel (preview par PR, production sur `main`)                |

## Fonctionnalités

- Responsive mobile / tablette / desktop
- Bilingue FR / EN — routes préfixées (`/fr/`, `/en/`), contenu localisé dans `messages/`
- Thème clair / sombre sans flash au chargement (script anti-flash avant hydratation)
- Micro-animations sobres au scroll (`whileInView`, désactivées si `prefers-reduced-motion`)
- Formulaire de contact fonctionnel — backend réel, anti-spam honeypot, validation Zod
- Mentions légales conformes RGPD (`/fr/legal-notice`) — mesure d'audience anonymisée (Vercel Analytics, sans cookie)
- SEO complet : metadata, OpenGraph dynamique (`next/og`), sitemap, robots.txt, JSON-LD `Person`
- Accessibilité : navigation clavier, anneaux de focus visibles, contrastes WCAG AA, labels ARIA

## Démarrage

```bash
git clone https://github.com/Yentec/portfolio.git
cd portfolio
npm install
cp .env.example .env          # puis renseigner les variables
npm run dev
```

### Variables d'environnement

| Variable           | Description                               |
| ------------------ | ----------------------------------------- |
| `RESEND_API_KEY`   | Clé API [Resend](https://resend.com) pour l'envoi du formulaire |
| `CONTACT_TO_EMAIL` | Adresse de réception des messages         |

## Scripts

| Commande              | Action                                  |
| --------------------- | --------------------------------------- |
| `npm run dev`         | Serveur de développement                |
| `npm run build`       | Build de production                     |
| `npm run lint`        | Analyse ESLint                          |
| `npm run typecheck`   | Vérification TypeScript (`tsc --noEmit`) |
| `npm test`            | Tests unitaires (Vitest)                |
| `npm run format`      | Formatage Prettier                      |
| `npm run format:check`| Vérification du formatage               |

## Architecture

```
app/
├─ layout.tsx / page.tsx      # Racine : redirect vers /fr
├─ globals.css                # Tokens design system (@theme Tailwind)
├─ opengraph-image.tsx        # Image OG générée dynamiquement
├─ sitemap.ts / robots.ts     # SEO technique
├─ actions/contact.ts         # Server Action — formulaire de contact
└─ [locale]/
   ├─ layout.tsx / page.tsx   # Layout localisé, sections
   └─ legal-notice/           # Mentions légales (noindex, RGPD)
components/
├─ layout/    Header, Footer
├─ sections/  Hero, About, Services, Skills, Projects, Discover, Contact
├─ ui/        Button, Badge, ProjectCard, Section
├─ motion/    Reveal (wrapper Framer Motion)
└─ email/     Template HTML du mail de contact
content/      Profil, services, compétences, projets — données structurées typées
messages/     fr.json / en.json — contenu localisé (textes UI + projets + études de cas)
i18n/         routing.ts — configuration next-intl (locales, prefixe)
lib/          ThemeProvider, validation d'env (Zod), utilitaires
types/        Types partagés
```

Le contenu est découplé du rendu : ajouter un projet nécessite `content/projects.ts` + les entrées correspondantes dans `messages/fr.json` et `messages/en.json`.

## Licence

Code sous licence MIT. Le contenu textuel et les visuels restent la propriété de YENTEC.
