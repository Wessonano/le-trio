# Feature: Phase 1 — Structure Astro + Design

The following plan should be complete, but its important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils types and models. Import from the right files etc.

## Feature Description

Initialiser le projet Astro avec la structure complète : content collections, layouts, pages, components, dark theme et responsive design. Un texte exemple (Le Trio) est inclus pour valider le rendu.

## User Story

As a lecteur
I want to naviguer sur un site beau et lisible présentant les textes du Trio
So that je puisse lire les récits d'Arnaud sur son amitié avec Stéphane et Douce

## Problem Statement

Le projet est un repo vide avec uniquement la doc (PRD, CLAUDE.md, reference). Il faut créer toute la structure Astro, le design system et les pages.

## Solution Statement

Créer un projet Astro 5.x from scratch avec content collections, un dark theme épuré, des layouts et components réutilisables, et les 4 pages principales (accueil, liste textes, texte individuel, à propos).

## Feature Metadata

**Feature Type**: New Capability
**Estimated Complexity**: Medium
**Primary Systems Affected**: Frontend (Astro), CSS, Content
**Dependencies**: Node.js 20+, npm, Astro 5.x

---

## CONTEXT REFERENCES

### Relevant Codebase Files IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

- `.claude/PRD.md` — PRD complet, sections 6 (architecture), 7 (features), 7.3 (design)
- `.claude/reference/components.md` — Patterns Astro, Content Collections schema, Layout pattern, CSS custom properties
- `CLAUDE.md` — Rules globales, structure, conventions

### New Files to Create

- `package.json` — Dépendances Astro
- `astro.config.mjs` — Config Astro
- `tsconfig.json` — TypeScript config
- `src/content/config.ts` — Schema Content Collection `textes`
- `src/content/textes/le-trio.md` — Premier texte exemple
- `src/layouts/BaseLayout.astro` — Layout global (head, dark theme, meta)
- `src/layouts/TexteLayout.astro` — Layout page texte (image hero + contenu + nav)
- `src/pages/index.astro` — Page accueil
- `src/pages/a-propos.astro` — Page à propos
- `src/pages/textes/index.astro` — Liste des textes
- `src/pages/textes/[...slug].astro` — Page texte individuel
- `src/components/Header.astro` — Header avec navigation
- `src/components/Footer.astro` — Footer minimaliste
- `src/components/TexteCard.astro` — Card preview (image + titre + extrait)
- `src/components/ImageHero.astro` — Image hero pleine largeur
- `src/styles/global.css` — Dark theme, typographie, variables CSS, responsive
- `public/images/textes/.gitkeep` — Placeholder dossier images

### Relevant Documentation YOU SHOULD READ THESE BEFORE IMPLEMENTING!

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
  - Schema definition, getCollection, type-safe frontmatter
  - Why: Core pattern for les textes
- [Astro Layouts](https://docs.astro.build/en/basics/layouts/)
  - Slot pattern, props interface
  - Why: BaseLayout + TexteLayout structure
- [Astro Pages & Routing](https://docs.astro.build/en/guides/routing/)
  - Dynamic routes [...slug], getStaticPaths
  - Why: Pages textes dynamiques

### Patterns to Follow

**Naming Conventions:**
- Fichiers textes : `kebab-case.md`
- Components : `PascalCase.astro`
- CSS custom properties : `--color-*`, `--font-*`, `--space-*`

**Frontmatter Schema:**
```yaml
---
title: "Le trio"
description: "Comment trois personnes se sont trouvées en psychiatrie"
date: 2026-03-03
about: ["arnaud", "stephane", "douce"]
image: "/images/textes/le-trio.webp"
imageAlt: "Trois silhouettes dans un jardin, style aquarelle"
imageStyle: "aquarelle"
draft: false
---
```

**CSS Theme:**
```css
:root {
  --color-bg: #0a0a0a;
  --color-text: #f5f5f5;
  --color-text-muted: #999;
  --color-accent: #e8a87c;
  --color-surface: #1a1a1a;
  --color-border: #333;
  --font-serif: 'Lora', Georgia, serif;
  --font-sans: Inter, system-ui, sans-serif;
  --font-size-base: 1.125rem;
  --line-height: 1.8;
  --max-width-content: 720px;
  --max-width-image: 960px;
}
```

**Zero JS:** Pas de `client:*` directives. Tout est rendu côté serveur.

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation

Init Astro, configuration, dépendances, structure de dossiers.

**Tasks:**
- Initialiser le projet Astro
- Configurer TypeScript
- Créer la structure de dossiers
- Configurer le content collection schema

### Phase 2: Design System

CSS global, dark theme, typographie, variables, responsive.

**Tasks:**
- Créer global.css avec les custom properties
- Importer Google Fonts (Lora pour serif)
- Reset CSS + base styles
- Responsive breakpoints

### Phase 3: Layouts & Components

BaseLayout, TexteLayout, Header, Footer, TexteCard, ImageHero.

**Tasks:**
- BaseLayout avec head, meta, slot
- TexteLayout pour les pages textes
- Header avec navigation
- Footer minimaliste
- TexteCard pour les cards preview
- ImageHero pour l'image pleine largeur

### Phase 4: Pages & Content

Les 4 pages + le texte exemple.

**Tasks:**
- Page accueil (index.astro)
- Page liste textes (textes/index.astro)
- Page texte dynamique ([...slug].astro)
- Page à propos (a-propos.astro)
- Texte exemple Le Trio (content/textes/le-trio.md)

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

### Task 1: CREATE project foundation

- **IMPLEMENT**: Initialiser Astro avec `npm create astro@latest` ou manuellement via package.json
- **IMPORTS**: `astro` (latest 5.x)
- **GOTCHA**: Ne pas utiliser de template — on part from scratch
- **VALIDATE**: `npm install && npm run build` doit réussir (même avec un site vide)

**package.json:**
```json
{
  "name": "le-trio",
  "type": "module",
  "version": "0.1.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0"
  }
}
```

**astro.config.mjs:**
```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://trio.nanoserveur.fr',
});
```

**tsconfig.json:**
```json
{
  "extends": "astro/tsconfigs/strict"
}
```

### Task 2: CREATE content collection schema

- **IMPLEMENT**: Définir le schema `textes` avec Zod dans `src/content/config.ts`
- **PATTERN**: `.claude/reference/components.md` — section Content Collections
- **GOTCHA**: `date` doit être `z.coerce.date()` pour parser les dates YAML
- **VALIDATE**: `npm run build` sans erreur de schema

**src/content/config.ts:**
```ts
import { defineCollection, z } from 'astro:content';

const textes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    about: z.array(z.enum(['arnaud', 'stephane', 'douce'])),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageStyle: z.enum(['aquarelle', 'dessin', 'peinture', 'realiste', 'minimaliste']).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { textes };
```

### Task 3: CREATE global.css — Design System

- **IMPLEMENT**: Dark theme complet avec custom properties, reset, typographie, responsive
- **PATTERN**: `.claude/reference/components.md` — section CSS Custom Properties
- **GOTCHA**: Lora font via Google Fonts CDN (lien dans BaseLayout head)
- **VALIDATE**: Vérification visuelle après création du BaseLayout

**src/styles/global.css** — inclure :
- CSS reset (box-sizing, margin, padding)
- Custom properties (colors, fonts, spacing, layout)
- Base styles (body, headings, links, paragraphs)
- Utility classes (.container, .sr-only)
- Responsive breakpoints (@media 768px, 1024px)
- Scrollbar styling (dark)

### Task 4: CREATE BaseLayout.astro

- **IMPLEMENT**: Layout HTML complet avec head (meta, fonts, CSS), Header, slot, Footer
- **PATTERN**: `.claude/reference/components.md` — section Layout pattern
- **IMPORTS**: `Header.astro`, `Footer.astro`, `../styles/global.css`
- **GOTCHA**: `lang="fr"` sur html, Google Fonts preconnect
- **VALIDATE**: Créer une page index.astro minimale qui utilise BaseLayout, `npm run dev`

### Task 5: CREATE Header.astro

- **IMPLEMENT**: Navigation simple — logo/titre "Le Trio" + liens (Textes, À propos)
- **PATTERN**: Style nav sticky, fond semi-transparent avec backdrop-filter
- **GOTCHA**: Lien actif basé sur `Astro.url.pathname`
- **VALIDATE**: Visible dans le dev server

### Task 6: CREATE Footer.astro

- **IMPLEMENT**: Footer minimaliste — "Le Trio — Arnaud, Stéphane & Douce" + année
- **VALIDATE**: Visible en bas de page

### Task 7: CREATE TexteCard.astro

- **IMPLEMENT**: Card preview avec image, titre, date, extrait (description), tags about
- **PATTERN**: Props typées (title, description, date, image, imageAlt, about, slug)
- **GOTCHA**: Si pas d'image, afficher un placeholder gradient
- **VALIDATE**: Utilisable dans la liste des textes

### Task 8: CREATE ImageHero.astro

- **IMPLEMENT**: Image pleine largeur avec coins arrondis, max-width 960px, centré
- **PATTERN**: `loading="eager"` (above the fold), width/height pour éviter layout shift
- **GOTCHA**: Si pas d'image, ne rien afficher (pas de placeholder sur la page texte)
- **VALIDATE**: Visible sur la page texte

### Task 9: CREATE TexteLayout.astro

- **IMPLEMENT**: Layout pour les pages textes — ImageHero + titre + date + about tags + contenu (slot) + nav prev/next
- **IMPORTS**: `BaseLayout.astro`, `ImageHero.astro`
- **PATTERN**: Centré, max-width 720px pour le texte
- **VALIDATE**: Fonctionne avec le texte exemple

### Task 10: CREATE texte exemple — le-trio.md

- **IMPLEMENT**: Premier texte avec le contenu réel (Le Trio, texte d'Arnaud sur Douce)
- **PATTERN**: Frontmatter conforme au schema
- **GOTCHA**: `image` optionnel pour l'instant (pas encore d'image générée)
- **VALIDATE**: `npm run build` parse le texte sans erreur

**src/content/textes/le-trio.md** — frontmatter:
```yaml
---
title: "Le trio"
description: "En psychiatrie, on ne choisit pas ses voisins de couloir. Parfois, on les adopte."
date: 2026-03-02
about: ["arnaud", "stephane", "douce"]
draft: false
---
```
Contenu : le texte "Le trio" existant dans la mémoire d'Arnaud (memory/daily/2026-03-02.md)

### Task 11: CREATE page accueil — index.astro

- **IMPLEMENT**: Intro du Trio (titre, description poétique) + 3 derniers textes en TexteCard
- **IMPORTS**: `BaseLayout`, `TexteCard`, `getCollection`
- **PATTERN**: Query textes non-draft, triés par date desc, limit 3
- **VALIDATE**: `npm run dev` — page accueil affiche le texte exemple

### Task 12: CREATE page liste textes — textes/index.astro

- **IMPLEMENT**: Liste complète des textes en TexteCard, triés par date desc
- **IMPORTS**: `BaseLayout`, `TexteCard`, `getCollection`
- **PATTERN**: Filtrage par personnage via query params (optionnel MVP, juste le layout pour l'instant)
- **VALIDATE**: Liste affiche tous les textes non-draft

### Task 13: CREATE page texte dynamique — textes/[...slug].astro

- **IMPLEMENT**: Page individuelle avec TexteLayout, rendu du markdown, nav prev/next
- **IMPORTS**: `TexteLayout`, `getCollection`, `render`
- **PATTERN**: `getStaticPaths` retourne tous les slugs, prev/next calculés par date
- **GOTCHA**: Astro 5.x utilise `entry.render()` qui retourne `{ Content }`
- **VALIDATE**: `/textes/le-trio` affiche le texte complet

### Task 14: CREATE page à propos — a-propos.astro

- **IMPLEMENT**: Présentation des 3 personnages (Arnaud, Stéphane, Douce) avec bio courte
- **IMPORTS**: `BaseLayout`
- **PATTERN**: Layout simple, texte centré, pas d'image pour l'instant (sera ajouté Phase 2)
- **VALIDATE**: `/a-propos` affiche les 3 bios

### Task 15: CREATE .gitignore + public structure

- **IMPLEMENT**: .gitignore Astro standard + `public/images/textes/.gitkeep`
- **VALIDATE**: `git status` propre après ajout

### Task 16: UPDATE .env.example

- **IMPLEMENT**: Déjà fait (GEMINI_API_KEY seulement)
- **VALIDATE**: Fichier contient uniquement `GEMINI_API_KEY=your_gemini_api_key_here`

---

## TESTING STRATEGY

### Build Test
```bash
npm run build
```
Doit réussir sans erreur ni warning.

### Dev Server Test
```bash
npm run dev
```
Naviguer manuellement sur :
- `http://localhost:4321/` — accueil avec texte card
- `http://localhost:4321/textes/` — liste des textes
- `http://localhost:4321/textes/le-trio` — page texte complète
- `http://localhost:4321/a-propos` — page à propos

### Responsive Test
Vérifier chaque page en :
- Mobile (320px)
- Tablet (768px)
- Desktop (1280px)

### Content Collection Test
```bash
npm run build 2>&1 | grep -i error
```
Aucune erreur de schema.

---

## VALIDATION COMMANDS

### Level 1: Build
```bash
npm run build
```

### Level 2: Preview
```bash
npm run preview
```
Ouvrir http://localhost:4321 et vérifier les 4 pages.

### Level 3: Manual Validation
- [ ] Accueil : titre + description + cards textes
- [ ] Liste textes : tous les textes affichés
- [ ] Page texte : contenu complet + navigation prev/next
- [ ] À propos : 3 personnages présentés
- [ ] Dark theme : fond sombre, texte clair, accent warm
- [ ] Responsive : lisible sur mobile (320px)
- [ ] Navigation : header sticky, liens fonctionnels
- [ ] Footer : visible en bas

---

## ACCEPTANCE CRITERIA

- [ ] `npm run build` réussit sans erreur
- [ ] 4 pages navigables (accueil, textes, texte, à propos)
- [ ] Content Collection `textes` fonctionne avec le schema
- [ ] Dark theme appliqué (fond #0a0a0a, texte #f5f5f5)
- [ ] Typographie : serif pour le contenu, sans-serif pour la nav
- [ ] Responsive mobile-first (320px → 1920px)
- [ ] Header sticky avec navigation
- [ ] Texte "Le Trio" affiché correctement
- [ ] Navigation prev/next sur la page texte
- [ ] Zéro JS envoyé au client

---

## COMPLETION CHECKLIST

- [ ] All tasks completed in order (1-16)
- [ ] `npm run build` passes
- [ ] `npm run preview` — 4 pages fonctionnelles
- [ ] Dark theme cohérent sur toutes les pages
- [ ] Responsive vérifié (mobile + desktop)
- [ ] Code propre, conventions suivies
- [ ] Git commit ready

---

## NOTES

- Les images ne sont pas encore générées (Phase 2). Le design doit gérer gracieusement l'absence d'image (placeholder gradient ou pas d'image).
- La page à propos aura des illustrations ajoutées en Phase 2/3.
- Le filtrage par personnage est prévu mais peut être simplifié en Phase 1 (juste les tags affichés, pas de filtre interactif sans JS).
- Google Font Lora chargée via CDN dans le `<head>`. Pas de self-hosting pour le MVP.
