@AGENTS.md

# CLAUDE.md

Contexte projet pour Claude Code. À lire avant toute modification.

## Projet

Portfolio personnel de **YENTEC**, développeur web fullstack (Fréjus, France).
Objectif : site vitrine crédible, de niveau professionnel, destiné à la recherche d'emploi salarié.
Mono-page (one-page) avec navigation par ancres.

## Principes directeurs (à respecter pour toute contribution)

1. **Pas de sur-engineering.** Un portfolio statique. Pas de base de données, pas d'auth, pas de
   lib de state management. Si une solution simple existe, c'est celle qu'on prend.
2. **TypeScript strict, zéro `any`.** `strict: true` est non négociable.
3. **Séparation données / présentation.** Les composants ne contiennent jamais de contenu en dur :
   tout vient de `./content/`. Ajouter un projet = éditer un seul fichier.
4. **Code propre et lisible** avant tout. Composants petits, une responsabilité chacun.
5. **Accessibilité et performance réelles**, pas cosmétiques (clavier, contraste, `prefers-reduced-motion`).

## Stack technique

| Domaine       | Choix                                                             |
| ------------- | ----------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router)                                           |
| Langage       | TypeScript (strict)                                               |
| Styling       | Tailwind CSS (tokens dans `globals.css`)                          |
| Animations    | Framer Motion (léger : whileInView)                               |
| State         | `useState` local + ThemeProvider (context) — rien d'autre         |
| Formulaire    | Server Action + validation Zod + Resend                           |
| Fonts         | `next/font` (Manrope, Inter, JetBrains Mono) — pas de CDN externe |
| Lint / format | ESLint + Prettier                                                 |
| CI            | GitHub Actions (lint + typecheck + build)                         |
| Déploiement   | Vercel                                                            |

**Ne pas introduire** : NestJS, Prisma, Postgres, Redux, Zustand, ou toute DB/backend lourd.
Ce sont de bons outils mais hors périmètre ici ; les ajouter dessert l'objectif du portfolio.

Toute nouvelle dépendance doit être justifiée par un gain réel de simplicité ou de maintenabilité.
Préférer les APIs natives du navigateur et de Next.js.

## Architecture React

- Préférer les Server Components.
- Utiliser "use client" uniquement lorsque nécessaire.
- Éviter les effets React inutiles.
- Éviter la duplication d'état.
- Préférer les props simples aux abstractions complexes.

## Structure des dossiers

```
src/
├─ app/
│  ├─ layout.tsx          # html, fonts, ThemeProvider, metadata globale
│  ├─ page.tsx            # assemble les sections
│  ├─ globals.css         # tokens design system + @theme Tailwind
│  ├─ opengraph-image.tsx # OG image (next/og)
│  ├─ sitemap.ts / robots.ts
│  └─ actions/contact.ts  # Server Action (Zod + Resend)
├─ components/
│  ├─ layout/   # Header, Footer
│  ├─ sections/ # Hero, About, Skills, Projects, Contact
│  ├─ ui/       # Button, Badge, Section, SectionTitle
│  └─ motion/   # Reveal.tsx (wrapper Framer Motion)
├─ content/     # projects.ts, skills.ts, profile.ts  (SOURCE DE VÉRITÉ du contenu)
├─ lib/         # theme.tsx, env.ts
└─ types/       # types partagés
```

## Design system

- Thème clair par défaut, thème sombre (bleu nuit `#011627`), accent orange `#D68800`.
- Le thème est piloté par `data-theme` sur `<html>`, persisté en `localStorage`, avec script
  anti-flash exécuté avant l'hydratation.
- Tokens (couleurs, rayons, typo) définis comme variables CSS dans `globals.css` et exposés à
  Tailwind via `@theme`. Toujours utiliser les tokens, jamais de valeurs hex en dur dans les composants.
- Polices : Manrope (titres), Inter (corps), JetBrains Mono (code/labels techniques).

## Sections de la page

Hero · À propos (timeline + valeurs) · Compétences · Projets · Teaser RPG (optionnel) · Contact · Footer.

## SEO

- Chaque section doit contribuer à la compréhension du profil professionnel.
- Utiliser une hiérarchie sémantique correcte (h1 unique, h2 par section).
- Metadata complètes (title, description, OpenGraph, Twitter).
- Données structurées JSON-LD de type Person.
- Les images doivent avoir un alt pertinent.

## Accessibilité

- Tous les éléments interactifs doivent être accessibles au clavier.
- Les boutons et liens doivent posséder un focus visible.
- Les icônes décoratives doivent être aria-hidden.
- Les formulaires doivent posséder labels et messages d'erreur accessibles.

## Git & CI

- **Commits conventionnels** : au format `<type>(<scope>): <subject>` avec des types `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`.
- Branches : `feat/...`, `fix/...`. Pas de commits directs sur `main`.
- PRs même en solo (workflow visible aux recruteurs).
- GitHub Actions : `lint`, `typecheck`, `build`, `test` sur chaque PR.
- Vercel preview deploys automatiques par PR.

## Conventions

- **Imports** : alias `@/` vers `./`.
- Pas de `console.log`, pas de code mort, pas de dépendance inutilisée avant un commit.
- Composants React : nommés en PascalCase, un composant par fichier.
- Texte de l'interface en **français**.

## Variables d'environnement

Définies dans `.env.example` (versionné). Le `.env` réel n'est **jamais** commité.

```
RESEND_API_KEY=        # clé API Resend pour le formulaire de contact
CONTACT_TO_EMAIL=      # adresse de réception des messages
```

Validées au démarrage via `./lib/env.ts` (Zod).

## Commandes

```bash
npm run dev        # serveur de développement
npm run build      # build de production
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm test
```

## Critères de qualité (objectifs)

- Lighthouse ≥ 95 sur Performance / Accessibilité / Best Practices / SEO.
- Build et CI verts avant tout merge.
- Aucune erreur TypeScript, aucun warning ESLint.
- Navigation entièrement utilisable au clavier ; animations désactivées si `prefers-reduced-motion`.

## Style de réponse attendu

L'auteur du projet préfère des réponses **objectives, concises et factuelles**, sans validation émotionnelle inutile ni questions de suivi superflues. Pour ce dépôt :

- Aller droit au but, proposer du code directement quand c'est demandé.
- Justifier les choix non évidents.
- Signaler les pièges (sécurité multi-tenant, indexes manquants, fuites côté client) sans en faire des paragraphes.
- Ne pas suggérer de refactos massifs non demandés.
- Préférer la vérité technique à l'encouragement.
