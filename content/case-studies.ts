import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "feedbackflow",
    metaTitle: "FeedbackFlow — Étude de cas · YENTEC",
    metaDescription:
      "FeedbackFlow — alternative open-source à Canny pour collecter, prioriser et livrer le feedback produit. Étude de cas : contexte, problème, solution et décisions techniques (Next.js 16, TypeScript, Prisma).",
    kind: "Open source · Produit",
    title: "FeedbackFlow",
    lead: "Collecter, prioriser et livrer le feedback produit — une alternative open-source à Canny. Un espace public de votes, une roadmap et un tableau de bord, le tout pensé pour rester simple à héberger.",
    repoUrl: "https://github.com/Yentec/FeedbackFlow",
    liveUrl: "https://feedbackflow-deploy.vercel.app/",
    liveLabel: "Démo en ligne",
    liveIcon: "external",
    stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "App Router", "Tailwind"],
    role: "Conception & dév.",
    period: "2025 · 2 sem.",
    projectType: "Projet perso",
    status: "En ligne",
    heroImage: "/projects/feedbackflow.webp",
    heroAlt: "Vue d'ensemble de FeedbackFlow",
    contexte: [
      "Les outils de feedback produit comme Canny sont efficaces mais <strong>fermés et payants</strong> dès qu'on dépasse l'usage minimal. Je voulais un projet à scope court pour démontrer ma capacité à livrer un produit complet, propre et déployable — du schéma de données à l'interface publique.",
      "FeedbackFlow est donc pensé comme une <strong>brique auto-hébergeable</strong> : une équipe l'installe, ouvre un portail de feedback, et garde la main sur ses données.",
    ],
    problemeIntro: "Au-delà du « clone », trois contraintes structuraient le projet :",
    problemePoints: [
      {
        label: "Hiérarchiser le bruit.",
        body: "Beaucoup de retours, peu de signal : il faut un système de votes et de statuts pour faire remonter ce qui compte.",
      },
      {
        label: "Deux audiences, une base.",
        body: "Un espace public pour les utilisateurs, un back-office pour l'équipe — sans dupliquer la logique.",
      },
      {
        label: "Simple à déployer.",
        body: "Pas d'infra exotique : une base Postgres et une plateforme type Vercel doivent suffire.",
      },
    ],
    solutionBody: [
      "J'ai découpé le produit en trois surfaces : un <strong>portail public</strong> (soumettre une idée, voter, suivre l'avancement), une <strong>roadmap</strong> en colonnes par statut, et un <strong>tableau de bord</strong> pour trier, fusionner et faire évoluer les demandes.",
      "Le tout repose sur un modèle de données unique et un rendu côté serveur (App Router) pour des pages publiques rapides et indexables.",
    ],
    solutionGallery: [
      { alt: "Portail public — liste des idées" },
      { alt: "Roadmap par statut" },
      { alt: "Tableau de bord d'administration", wide: true },
    ],
    decisions: [
      {
        tech: "Next.js 16 · App Router",
        title: "Rendu serveur pour le public",
        body: "Les pages publiques (idées, roadmap) sont rendues côté serveur : rapides au premier affichage et indexables par les moteurs.",
        why: "Le SEO et la vitesse sont essentiels pour un portail de feedback ouvert.",
      },
      {
        tech: "Prisma · PostgreSQL",
        title: "Un schéma unique, deux usages",
        body: "Le même modèle (idées, votes, statuts, commentaires) alimente le portail public et l'admin. Prisma sécurise les requêtes avec le typage de bout en bout.",
        why: "Éviter la duplication de logique et les incohérences entre les deux surfaces.",
      },
      {
        tech: "TypeScript",
        title: "Typage de bout en bout",
        body: "Des types partagés entre la base, l'API et les composants : moins de bugs silencieux, des refactors sereins.",
        why: "Livrer vite sans sacrifier la fiabilité — la marque de fabrique du projet.",
      },
    ],
    resultatBody:
      "Un produit complet, open-source et déployable en quelques minutes — qui sert aussi de démonstration concrète de ma façon de travailler : <strong>scope clair, code typé, mise en production réelle.</strong>",
    resultatFacts: [
      { value: "3", label: "surfaces : portail, roadmap, admin" },
      { value: "100 %", label: "TypeScript, de la base à l'UI" },
      { value: "~2 sem.", label: "de l'idée à la mise en ligne" },
    ],
    nextProject: { slug: "linkforge", title: "LinkForge" },
  },
  {
    slug: "linkforge",
    metaTitle: "LinkForge — Étude de cas · YENTEC",
    metaDescription:
      "LinkForge — API de raccourcissement d'URL avec authentification, clés d'API, suivi de clics asynchrone anonymisé et analytics. Étude de cas : contexte, problème, solution et décisions techniques (Fastify, Prisma, PostgreSQL, Redis, BullMQ).",
    kind: "Open source · API",
    title: "LinkForge",
    lead: "Une API de raccourcissement d'URL avec authentification, clés d'API, suivi de clics asynchrone et anonymisé, et analytics. Conçue pour rester rapide et tenir la charge, même quand les redirections s'enchaînent.",
    repoUrl: "https://github.com/Yentec/LinkForge",
    liveUrl: "https://linkforge-538y.onrender.com/docs/",
    liveLabel: "Documentation API",
    liveIcon: "doc",
    stack: ["Fastify", "TypeScript", "Prisma", "PostgreSQL", "Redis", "BullMQ"],
    role: "Conception & dév.",
    period: "2025 · 2 sem.",
    projectType: "Projet perso",
    status: "En ligne",
    heroImage: "/projects/linkforge.webp",
    heroAlt: "Documentation ou dashboard analytics de LinkForge",
    contexte: [
      "Le raccourcisseur d'URL est un classique trompeur : <strong>facile à faire mal, difficile à faire bien</strong>. Derrière une simple redirection se cachent des questions de performance, de sécurité et de mesure d'audience.",
      "J'ai voulu en faire un projet à scope court mais <strong>exigeant côté back-end</strong> : une vraie API, authentifiée, instrumentée, et pensée pour encaisser du trafic sans ralentir la redirection.",
    ],
    problemeIntro: "Trois exigences orientaient toute l'architecture :",
    problemePoints: [
      {
        label: "La redirection doit rester instantanée.",
        body: "Mesurer un clic ne doit jamais ralentir l'utilisateur qui suit le lien.",
      },
      {
        label: "Des stats utiles, sans pister.",
        body: "Compter et qualifier les clics tout en anonymisant les données personnelles.",
      },
      {
        label: "Un accès programmable et sécurisé.",
        body: "Authentification et clés d'API pour intégrer le service ailleurs.",
      },
    ],
    solutionBody: [
      "Le cœur du système sépare <strong>le chemin chaud</strong> (la redirection) du <strong>chemin froid</strong> (l'analytics). À chaque clic, l'API répond immédiatement par la redirection et <strong>délègue le traitement</strong> du clic à une file d'attente, consommée en arrière-plan.",
      "Résultat : l'utilisateur final ne paie jamais le coût de la mesure, et les statistiques se construisent de façon fiable, à son rythme.",
    ],
    solutionGallery: [
      { alt: "Création d'un lien court + clé d'API" },
      { alt: "Analytics — clics dans le temps" },
      { alt: "Schéma : redirection → file d'attente → analytics", wide: true },
    ],
    decisions: [
      {
        tech: "Fastify",
        title: "Un framework taillé pour la vitesse",
        body: "Fastify offre un surcoût minimal par requête : idéal pour un service dont la fonction principale est de répondre vite, des milliers de fois.",
        why: "La latence de redirection est le critère n°1 du produit.",
      },
      {
        tech: "Redis · BullMQ",
        title: "Suivi des clics en asynchrone",
        body: "Chaque clic est poussé dans une file BullMQ (sur Redis) et traité hors du chemin de réponse : enrichissement, anonymisation et agrégation se font en arrière-plan.",
        why: "Découpler la mesure de la redirection garantit des temps de réponse stables sous charge.",
      },
      {
        tech: "Prisma · PostgreSQL",
        title: "Données durables & requêtables",
        body: "Postgres stocke liens, clés d'API et statistiques agrégées ; Prisma sécurise l'accès avec un typage strict partagé avec le reste de l'API.",
        why: "Des analytics fiables demandent une base relationnelle solide, pas un simple cache.",
      },
    ],
    resultatBody:
      "Une API complète et documentée qui démontre concrètement ma façon d'aborder le back-end : <strong>performance d'abord, mesure fiable ensuite, respect de la vie privée par conception.</strong>",
    resultatFacts: [
      { value: "2", label: "chemins séparés : chaud / froid" },
      { value: "Async", label: "suivi des clics hors réponse" },
      { value: "Anonyme", label: "analytics sans données perso" },
    ],
    prevProject: { slug: "feedbackflow", title: "FeedbackFlow" },
  },
];
