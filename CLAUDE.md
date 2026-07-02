@AGENTS.md

# CLAUDE.md

Contexte projet pour Claude Code. À lire avant toute modification.

## Projet

Portfolio personnel de **YENTEC**, développeur web fullstack (Fréjus, France).
Objectif : site vitrine crédible, de niveau professionnel, destiné à la recherche d'emploi salarié.
Mono-page (one-page) avec navigation par ancres.

Le projet comprend **deux modes** :

- **Mode classique** (principal) : le portfolio one-page. C'est l'entrée par défaut et la version de référence. Tout le contenu professionnel doit y être pleinement accessible.
- **Mode RPG** (secondaire, route `/rpg`) : une présentation alternative et ludique du même contenu, sous forme de petit RPG 2D top-down. C'est une vitrine de compétences techniques, jamais le seul chemin vers le contenu. Voir la section « Mode RPG » plus bas.

## Principes directeurs (à respecter pour toute contribution)

1. **Pas de sur-engineering.** Un portfolio statique. Pas de base de données, pas d'auth, pas de lib de state management. Si une solution simple existe, c'est celle qu'on prend. (Le mode RPG a ses propres règles dérogatoires, explicitées dans sa section.)
2. **TypeScript strict, zéro `any`.** `strict: true` est non négociable.
3. **Séparation données / présentation.** Les composants ne contiennent jamais de contenu en dur :
   les données structurées viennent de `./content/`, les textes localisés de `./messages/`.
   Ajouter un projet = éditer `content/projects.ts` + les deux fichiers `messages/*.json`.
4. **Code propre et lisible** avant tout. Composants petits, une responsabilité chacun.
5. **Accessibilité et performance réelles**, pas cosmétiques (clavier, contraste, `prefers-reduced-motion`).

## Stack technique

| Domaine              | Choix                                                             |
| -------------------- | ----------------------------------------------------------------- |
| Framework            | Next.js 16 (App Router)                                           |
| Langage              | TypeScript (strict)                                               |
| Styling              | Tailwind CSS (tokens dans `globals.css`)                          |
| Animations           | Framer Motion (léger : whileInView)                               |
| Internationalisation | next-intl v4 (FR / EN) — messages dans `messages/`                |
| State                | `useState` local + ThemeProvider (context) — rien d'autre         |
| Formulaire           | Server Action + validation Zod + Resend                           |
| Fonts                | `next/font` (Manrope, Inter, JetBrains Mono) — pas de CDN externe |
| Mode RPG             | Canvas 2D maison + game loop `requestAnimationFrame` (pas de moteur) |
| Audio RPG            | Web Audio API native (pas de lib son)                             |
| Lint / format        | ESLint + Prettier                                                 |
| CI                   | GitHub Actions (lint + typecheck + build + test)                  |
| Déploiement          | Vercel                                                            |

**Ne pas introduire** : NestJS, Prisma, Postgres, Redux, Zustand, ou toute DB/backend lourd.
Pour le mode RPG : **pas de moteur de jeu** (Phaser, Pixi, kaplay) sauf blocage technique réel et
documenté — le canvas 2D maison est un choix volontaire (bundle léger, démonstration de maîtrise
d'une game loop). Ce sont de bons outils mais hors périmètre ici ; les ajouter dessert l'objectif.

Toute nouvelle dépendance doit être justifiée par un gain réel de simplicité ou de maintenabilité.
Préférer les APIs natives du navigateur et de Next.js.

## Architecture React

- Préférer les Server Components.
- Utiliser "use client" uniquement lorsque nécessaire.
- Éviter les effets React inutiles.
- Éviter la duplication d'état.
- Préférer les props simples aux abstractions complexes.

**Exception mode RPG** : le RPG est intégralement client (canvas, game loop, gestion d'input,
audio). Le composant de jeu est chargé en dynamique avec `ssr: false` et `"use client"` y est la
norme, pas l'exception. L'usage d'un `useReducer` pour l'état du jeu et d'effets pour la game loop
y est légitime et attendu. Cette dérogation est circonscrite au sous-système RPG (`lib/rpg/`,
`components/rpg/`, `content/rpg/`) et ne s'étend pas au reste du projet.

## Structure des dossiers

```
app/
├─ layout.tsx          # html, fonts, ThemeProvider, metadata globale
├─ page.tsx            # redirect racine → /fr
├─ globals.css         # tokens design system + @theme Tailwind
├─ opengraph-image.tsx # OG image (next/og)
├─ sitemap.ts / robots.ts
├─ actions/contact.ts  # Server Action (Zod + Resend)
└─ [locale]/
   ├─ layout.tsx       # layout localisé (setRequestLocale)
   ├─ page.tsx         # assemble les sections
   ├─ rpg/             # route du mode RPG (dynamic import, ssr: false)
   └─ legal-notice/    # mentions légales (noindex)
components/
├─ layout/   # Header, Footer
├─ sections/ # Hero, About, Skills, Projects, Services, Discover, Contact
├─ ui/       # Button, Badge, Section, SectionTitle
├─ motion/   # Reveal.tsx (wrapper Framer Motion)
├─ email/    # ContactEmail.ts
└─ rpg/      # GameCanvas, DialogueBox, GameUI, MobileControls, IntroSequence, ModeTransition, LoadingScreen
content/     # projects.ts, skills.ts, services.ts, profile.ts  (données structurées typées)
└─ rpg/      # npcs.ts (PNJ : position, sprite, dialogue), dialogues.ts (dérivés du contenu)
messages/    # fr.json, en.json  (textes UI + projets + études de cas localisés)
i18n/        # routing.ts (locales, localePrefix)
lib/         # theme.tsx, env.ts, cn.ts, contact-schema.ts
└─ rpg/      # engine.ts, map.ts, player.ts, npc.ts, camera.ts, assets.ts, audio.ts, input.ts, constants.ts
types/       # types partagés (+ rpg.ts pour le domaine RPG)
public/
└─ rpg/      # tileset, spritesheets (perso, PNJ), portraits, audio/
```

## Design system

- Thème clair par défaut, thème sombre (bleu nuit `#011627`), accent orange `#D68800`.
- Le thème est piloté par `data-theme` sur `<html>`, persisté en `localStorage`, avec script
  anti-flash exécuté avant l'hydratation.
- Tokens (couleurs, rayons, typo) définis comme variables CSS dans `globals.css` et exposés à
  Tailwind via `@theme`. Toujours utiliser les tokens, jamais de valeurs hex en dur dans les composants.
- Polices : Manrope (titres), Inter (corps), JetBrains Mono (code/labels techniques).

## Sections de la page

Hero · À propos (timeline + valeurs) · Compétences · Projets · Offres (Services) · RPG (Discover) · Contact · Footer.
La section RPG (composant `Discover`) renvoie vers la route `/rpg`.

## Mode RPG

Présentation alternative du portfolio sous forme de petit RPG 2D top-down. Vitrine technique.

### Principes spécifiques

- **Le mode classique reste la référence.** Aucun contenu ne doit être accessible *uniquement* via le RPG. Un bouton « Mode classique » est présent en permanence dans le HUD.
- **Isolation du bundle.** Tout le code RPG est chargé en dynamique (`next/dynamic`, `ssr: false`). Le mode classique ne doit pas grossir à cause du RPG — à vérifier dans la sortie de build.
- **Contenu dérivé, pas dupliqué.** Les dialogues des PNJ dérivent de `content/` (profil, compétences, projets) et des messages localisés. Pas de recopie de contenu.
- **Accessibilité.** Jouable au clavier ET au tactile (D-pad sur mobile, fonctionnement mobile exigé). `prefers-reduced-motion` désactive l'effet typewriter et les animations non essentielles.
- **Audio.** Musique + effets via Web Audio API. **Muet par défaut** au chargement (politique navigateur + confort), avec invite/toggle pour activer. Mute toujours accessible.

### Périmètre

Dans le scope : 
- transition mode classique ↔ RPG
- intro explicative (jouée pendant le préchargement des assets)
- 4 cartes (1 village, 1 maison avec 1 étage, 1 batiment type)
- transitions entre les cartes
- déplacement 4 directions (clavier + D-pad tactile) avec animation de marche
- collisions (murs, obstacles, bords, PNJ)
- 5 PNJ = 5 sections (À propos, Services, Compétences, Projets, Contact)
- système de dialogue à texte progressif
- PNJ Projets affichant des images et liant vers les pages projet
- PNJ avec léger mouvement
- easter eggs
- sons + mute

Hors scope (ne pas implémenter) : combats, inventaire, sauvegarde, quêtes, génération procédurale, mini-jeux additionnels.

### Architecture RPG

- **Moteur** (`lib/rpg/`) : logique pure (game loop, carte, joueur, PNJ, caméra, collisions, input, audio, préchargement). Séparé du rendu React.
- **Rendu React** (`components/rpg/`) : composants client (canvas, overlays DOM, HUD, contrôles).
- **Contenu** (`content/rpg/`) : données des PNJ et dialogues, typées.
- La boucle de jeu doit nettoyer proprement au démontage (annulation du `requestAnimationFrame`, retrait des event listeners, libération audio) — pas de fuite mémoire.
- Carte rendue par tiles depuis une grille ; grille de collision parallèle (booléens « walkable »).

### Assets & licence

- **Inspiration** : vue top-down 2D stricte à plat, grille régulière, palette GBA colorée, boîtes de dialogue, rythme narratif. Le portfolio est public et sert un objectif professionnel — tout actif protégé est une violation de copyright et un signal négatif.
- Tous les assets doivent être **CC0 ou sous licence explicitement compatible avec un usage web public** (lire la licence sur la page source, pas le tag de recherche ; chercher « commercial use allowed » et les conditions de crédit).
- **Prendre le personnage et le tileset dans le même pack** quand c'est possible : c'est le seul moyen fiable de garantir une échelle et une palette cohérentes. Mélanger perso et décor de packs différents est la première cause de rendu incohérent.
- **Créditer chaque asset** (auteur + licence) dans le README et idéalement in-game.

### Formats d'assets

**Approche de rendu** : grille logique en **16px** (standard GBA), rendu scalé sur le canvas avec `ctx.imageSmoothingEnabled = false` pour garder le pixel net. On raisonne en tuiles de 16px côté logique (carte, collisions, déplacement), on scale uniquement à l'affichage. Toutes les constantes ci-dessous sont définies dans `lib/rpg/constants.ts`.

- `TILE_SIZE = 16` — taille logique d'une tuile, native à l'atlas (`public/rpg/tileset.png`, Kenney *RPG Urban Pack*).
- `RENDER_SCALE = 3` — facteur d'agrandissement au rendu (tuile affichée à 48px).
- **Personnage** : pas de `SPRITE_SIZE` séparé — le personnage occupe une case 16×16 du même atlas que le tileset (même pack, échelle et palette garanties cohérentes). Bloc personnage à partir de `CHAR_BASE_COL = 23` : **4 colonnes (direction) × 3 lignes (frame de marche)** par variante, **6 variantes** empilées verticalement (1 joueur + 5 PNJ, voir `CHARACTER_VARIANT`).
  - Ordre des colonnes/directions (`DIRECTION_COL_OFFSET`) : col 0 = gauche, col 1 = bas, col 2 = haut, col 3 = droite.
  - Frame idle : `IDLE_FRAME = 0`. Séquence de marche : `WALK_FRAME_SEQUENCE = [0, 1, 2, 1]`.

## SEO

- Chaque section doit contribuer à la compréhension du profil professionnel.
- Utiliser une hiérarchie sémantique correcte (h1 unique, h2 par section).
- Metadata complètes (title, description, OpenGraph, Twitter).
- Données structurées JSON-LD (Person + ProfessionalService).
- Les images doivent avoir un alt pertinent.
- La route `/rpg` n'a pas vocation à être un point d'entrée SEO ; le contenu indexable de référence reste le mode classique.

## Accessibilité

- Tous les éléments interactifs doivent être accessibles au clavier.
- Les boutons et liens doivent posséder un focus visible.
- Les icônes décoratives doivent être aria-hidden.
- Les formulaires doivent posséder labels et messages d'erreur accessibles.
- Mode RPG : contrôles clavier + tactile, sortie vers le mode classique toujours possible, respect de `prefers-reduced-motion`.

## Git & CI

- **Commits conventionnels** : au format `<type>(<scope>): <subject>` avec des types `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`.
- Branches : `feat/...`, `fix/...`. Pas de commits directs sur `main`.
- PRs même en solo (workflow visible aux recruteurs).
- GitHub Actions : `lint`, `typecheck`, `build`, `test` sur chaque PR.
- Vercel preview deploys automatiques par PR.

## Versioning

- SemVer. Version actuelle : voir `package.json`.
- Chantier RPG : incréments **mineurs** (`1.7.0`, `1.8.0`, …) par sous-étape fonctionnelle, bumps patch en cours d'étape si besoin. Cible de fin de chantier RPG : **2.0.0**.
- Ne pas taguer les versions de fin d'étape (`npm version X.Y.Z --no-git-tag-version`).

## Conventions

- **Imports** : alias `@/` vers `./`.
- Pas de `console.log`, pas de code mort, pas de dépendance inutilisée avant un commit.
- Composants React : nommés en PascalCase, un composant par fichier.
- Texte de l'interface bilingue (FR / EN) via next-intl — jamais de chaîne en dur dans un composant.
  Langue par défaut : `fr`. Routes préfixées : `/fr/`, `/en/`. Les dialogues RPG suivent la même règle de localisation.

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

- Lighthouse ≥ 95 sur Performance / Accessibilité / Best Practices / SEO (mode classique).
- Le mode RPG ne doit pas dégrader les Core Web Vitals du mode classique (bundle isolé).
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