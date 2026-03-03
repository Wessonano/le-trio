# PRD — Le Trio

## 1. Executive Summary

Le Trio est un blog public dédié à l'amitié entre Arnaud, Stéphane et Douce — trois personnes qui se sont rencontrées en psychiatrie et ont formé un lien sincère, sans filtre et sans masque. C'est un espace d'écriture personnelle où Arnaud raconte leur histoire : qui ils sont, ce qu'ils vivent, ce qu'ils représentent les uns pour les autres.

Chaque texte est accompagné d'une illustration générée par IA via Nano Banana 2 Pro (Gemini). Trois modes sont disponibles : prompt libre, photo + prompt (transformer un souvenir réel), ou génération automatique à partir du texte. Plusieurs styles visuels au choix (aquarelle, dessin, peinture, réaliste, minimaliste).

**MVP** : un site Astro statique déployé sur `trio.nanoserveur.fr`, avec les textes existants migrés, des illustrations générées via Nano Banana 2 Pro, et un design sombre centré sur la lecture.

## 2. Mission

**Raconter une amitié vraie, née là où personne ne s'y attend.**

### Principes
1. **Authenticité** — textes bruts, sincères, sans enrobage
2. **Beauté** — des illustrations IA qui subliment les mots
3. **Simplicité** — Astro + markdown, pas d'usine à gaz
4. **Ouverture** — public, lisible par tous, rapide à charger
5. **Respect** — Arnaud contrôle chaque mot publié, draft mode disponible

## 3. Target Users

### Lecteurs (public)
- Toute personne touchée par des récits authentiques sur l'amitié et la résilience
- Proches d'Arnaud, Stéphane et Douce
- Personnes en parcours de santé mentale cherchant des témoignages positifs
- **Niveau technique** : aucun requis — c'est un site web classique

### Auteur (Arnaud)
- Développeur senior, écrit en markdown, confortable avec Git et le terminal
- **Niveau technique** : 5/5 — workflow Git + CLI

## 4. MVP Scope

### Core Functionality
- ✅ Blog Astro statique avec design dédié (dark theme, centré texte + image)
- ✅ Content Collection `textes` avec frontmatter typé
- ✅ Pages : accueil, liste des textes, page individuelle par texte, à propos
- ✅ Tag `about` dans le frontmatter (arnaud, stephane, douce) pour filtrer par personnage
- ✅ Navigation prev/next entre les textes
- ✅ Responsive mobile-first

### Génération d'images
- ✅ Script CLI Python `scripts/generate-image.py`
- ✅ Mode 1 : prompt libre + style
- ✅ Mode 2 : photo + prompt + style (édition d'image via Nano Banana 2 Pro)
- ✅ Mode 3 : auto depuis le contenu markdown du texte
- ✅ 5 styles visuels : aquarelle, dessin, peinture à l'huile, réaliste, minimaliste
- ✅ Output WebP optimisé, jusqu'à 4K

### Deployment
- ✅ Build statique sur Proxmox LXC 104
- ✅ Serveur Caddy (fichiers statiques)
- ✅ Cloudflare tunnel `trio.nanoserveur.fr`
- ✅ Script de déploiement (build + rsync ou git pull)

### Out of Scope
- ❌ Authentification / multi-utilisateurs
- ❌ Éditeur WYSIWYG en ligne
- ❌ Commentaires
- ❌ Newsletter / RSS
- ❌ Galerie d'images séparée
- ❌ Recherche full-text
- ❌ Internationalisation

## 5. User Stories

1. **En tant qu'Arnaud**, je veux écrire un texte en markdown avec un frontmatter simple, pour que le site le publie automatiquement après build.
   > Exemple : je crée `src/content/textes/les-zombies.md`, je build, c'est en ligne.

2. **En tant qu'Arnaud**, je veux générer une illustration avec un prompt libre et un style choisi, pour accompagner un texte avec une image précise.
   > Exemple : `python scripts/generate-image.py --prompt "Trois amis riant sur un banc d'hôpital" --style aquarelle --output public/images/textes/le-trio.webp`

3. **En tant qu'Arnaud**, je veux générer une illustration à partir d'une photo + un prompt, pour transformer un souvenir réel en œuvre artistique.
   > Exemple : `python scripts/generate-image.py --photo souvenir.jpg --prompt "Rendre poétique et lumineux" --style dessin --output public/images/textes/souvenir.webp`

4. **En tant qu'Arnaud**, je veux qu'une illustration soit générée automatiquement depuis le texte, pour les cas où je n'ai pas d'idée précise.
   > Exemple : `python scripts/generate-image.py --from-text src/content/textes/le-trio.md --style peinture --output public/images/textes/le-trio.webp`

5. **En tant que lecteur**, je veux voir les textes avec leurs illustrations dans un design épuré, pour une expérience de lecture immersive.

6. **En tant que lecteur**, je veux filtrer les textes par personnage (Arnaud, Stéphane, Douce), pour lire les textes qui concernent une personne en particulier.

7. **En tant que lecteur**, je veux lire la page "À propos" pour comprendre qui sont ces trois personnes et l'histoire du Trio.

8. **En tant que lecteur**, je veux accéder au site sur mobile avec une expérience fluide et lisible.

## 6. Core Architecture & Patterns

### Directory Structure
```
le-trio/
├── .claude/
│   ├── PRD.md              # Ce fichier
│   ├── commands/            # Commandes Cole Framework
│   ├── plans/               # Plans par phase
│   ├── reference/           # Best practices
│   └── skills/              # agent-browser, e2e-test
├── src/
│   ├── content/
│   │   ├── config.ts        # Schema Content Collection
│   │   └── textes/          # Fichiers markdown
│   │       ├── le-trio.md
│   │       ├── les-zombies.md
│   │       ├── temoignage-douce.md
│   │       └── temoignage-stephane.md
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── TexteLayout.astro
│   ├── pages/
│   │   ├── index.astro       # Accueil
│   │   ├── a-propos.astro    # Qui sommes-nous
│   │   └── textes/
│   │       ├── index.astro   # Liste des textes
│   │       └── [...slug].astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── TexteCard.astro
│   │   └── ImageHero.astro
│   └── styles/
│       └── global.css
├── public/
│   └── images/
│       └── textes/           # Images générées (WebP)
├── scripts/
│   └── generate-image.py     # CLI génération d'images
├── astro.config.mjs
├── package.json
├── .env.example
├── .gitignore
└── CLAUDE.md
```

### Design Patterns
- **Astro Content Collections** — frontmatter typé, validation build-time
- **Static Site Generation** — pas de serveur, pas de runtime JS
- **Script CLI séparé** — génération d'images découplée du build Astro
- **Images dans `public/`** — référencées par chemin dans le frontmatter
- **Dark theme** — CSS custom properties pour theming cohérent

### Frontmatter Schema
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

## 7. Features

### 7.1 Blog statique
- **Accueil** : présentation courte du Trio + 3 derniers textes en cards
- **Liste textes** : toutes les publications, triées par date, filtrables par personnage
- **Page texte** : image hero pleine largeur + texte + métadonnées + nav prev/next
- **À propos** : présentation des 3 personnages avec illustration + bio courte

### 7.2 Générateur d'images CLI — Nano Banana 2 Pro

| Mode | Commande | Description |
|------|---------|-------------|
| Prompt libre | `--prompt "..." --style aquarelle` | Génère depuis un prompt texte |
| Photo + prompt | `--photo img.jpg --prompt "..." --style dessin` | Transforme une photo avec un style |
| Auto | `--from-text fichier.md --style peinture` | Extrait le contexte du markdown et génère |

**Modèle** : `gemini-3-pro-image-preview` (Nano Banana 2 Pro)
- Qualité studio, jusqu'à 4K
- Text rendering précis
- Édition photo (image input + prompt)
- Supporte jusqu'à 14 images en input

### Styles disponibles
| Style | Description | Prompt suffix |
|-------|-------------|---------------|
| `aquarelle` | Doux, poétique, couleurs diffuses | "watercolor painting, soft colors, dreamy" |
| `dessin` | Trait noir, croquis, intimiste | "pencil sketch, black and white, intimate" |
| `peinture` | Textures riches, couleurs profondes | "oil painting, rich textures, deep colors" |
| `realiste` | Photo-réaliste, cinématique | "photorealistic, cinematic lighting, 35mm" |
| `minimaliste` | Formes simples, couleurs pastel | "minimalist, simple shapes, pastel colors" |

### 7.3 Design
- Dark theme (#0a0a0a fond, #f5f5f5 texte, accent warm)
- Typographie serif pour les textes (Georgia, Lora, ou similaire)
- Sans-serif pour la navigation (Inter, system-ui)
- Espacement généreux, lecture confortable
- Images pleine largeur avec coins arrondis subtils

## 8. Technology Stack

### Frontend
- **Astro** 5.x — SSG, content collections, zero JS par défaut
- **CSS** vanilla — custom properties, pas de framework CSS
- **Zéro JS client** — site 100% statique

### Génération d'images
- **Nano Banana 2 Pro** — modèle `gemini-3-pro-image-preview`
- **Python 3.11+**
- **google-generativeai** SDK (>= 1.52.0)
- **Pillow** — conversion WebP et optimisation

### Déploiement
- **Proxmox LXC 104** — Debian 12, IP `192.168.1.104`
- **Caddy** — serveur fichiers statiques, port 8080
- **Cloudflare tunnel** — `trio.nanoserveur.fr`
- **Node.js 20+** — build Astro

### Dépendances npm
- `astro`
- `@astrojs/sitemap` (optionnel)

### Dépendances Python
- `google-generativeai` (>= 1.52.0)
- `Pillow`
- `python-dotenv`

## 9. Security & Configuration

### Configuration (.env)
```
GEMINI_API_KEY=xxx
```

### Sécurité
- **Pas d'auth** — site statique public, pas de données sensibles exposées
- **Pas d'API** — aucun endpoint, aucune surface d'attaque
- **Pas de DB** — tout est en fichiers markdown + images
- **Draft mode** — `draft: true` dans le frontmatter empêche la publication
- **GEMINI_API_KEY** — utilisée uniquement par le script CLI local, jamais exposée

### Déploiement
- Build sur Mac Mini ou LXC 104
- Fichiers statiques servis par Caddy
- HTTPS via Cloudflare tunnel

## 10. API Specification

N/A — site 100% statique, pas d'API.

## 11. Success Criteria

### MVP Definition
Le Trio est en ligne avec au moins 2 textes illustrés, lisible sur mobile et desktop.

### Functional Requirements
- ✅ Site accessible sur `trio.nanoserveur.fr`
- ✅ Au moins 4 textes publiés (Le Trio, Les Zombies, témoignages)
- ✅ Chaque texte a une illustration générée via Nano Banana 2 Pro
- ✅ Les 3 modes de génération d'image fonctionnent
- ✅ Filtrage par personnage fonctionne
- ✅ Navigation prev/next fonctionne
- ✅ Page à propos complète

### Quality Indicators
- ✅ Build < 10 secondes
- ✅ Lighthouse Performance > 95
- ✅ Lighthouse Accessibility > 90
- ✅ Images WebP < 500KB chacune (4K quality)
- ✅ Responsive : lisible sur 320px à 1920px

### UX Goals
- Lecture immersive (pas de distraction)
- Temps de chargement < 1s (statique + CDN Cloudflare)
- Navigation intuitive entre les textes

## 12. Implementation Phases

### Phase 1 — Structure Astro + Design
**Goal** : Site fonctionnel avec le design et les pages en place.

- ✅ Init projet Astro
- ✅ Content Collection `textes` avec schema typé
- ✅ BaseLayout + TexteLayout
- ✅ Pages : accueil, liste textes, texte individuel, à propos
- ✅ Dark theme, typographie, responsive
- ✅ Components : Header, Footer, TexteCard, ImageHero
- ✅ 1 texte exemple en placeholder

**Validation** : `npm run build && npm run preview` — site navigable en local

### Phase 2 — Générateur d'images CLI
**Goal** : Script Python fonctionnel pour les 3 modes de génération via Nano Banana 2 Pro.

- ✅ `scripts/generate-image.py` avec argparse
- ✅ Mode prompt libre (--prompt + --style)
- ✅ Mode photo + prompt (--photo + --prompt + --style)
- ✅ Mode auto depuis texte (--from-text + --style)
- ✅ 5 styles configurés
- ✅ Output WebP optimisé
- ✅ `.env.example` mis à jour

**Validation** : 1 image générée par mode, vérification visuelle + taille fichier

### Phase 3 — Contenu + Déploiement
**Goal** : Site en production avec le contenu réel.

- ✅ Migration des 4 textes existants (Le Trio, Les Zombies, témoignages)
- ✅ Génération des illustrations pour chaque texte
- ✅ Page à propos rédigée
- ✅ Build + déploiement sur LXC 104
- ✅ Caddy configuré
- ✅ Cloudflare tunnel `trio.nanoserveur.fr`
- ✅ Script deploy (build + rsync)

**Validation** : site accessible publiquement, e2e test (navigation, images, responsive)

## 13. Future Considerations

- **RSS feed** — pour les lecteurs qui veulent suivre les publications
- **Open Graph / SEO** — meta tags pour le partage social (preview image + description)
- **Galerie** — page dédiée aux illustrations, indépendante des textes
- **Audio** — version audio des textes (TTS ou lecture par Arnaud)
- **Multi-auteurs** — Stéphane et Douce écrivent aussi si le besoin se présente
- **Commentaires** — système léger (giscus ou similaire)
- **Recherche** — recherche full-text dans les textes

## 14. Risks & Mitigations

| Risque | Impact | Mitigation |
|--------|--------|-----------|
| Gemini API down ou quota dépassé | Pas de nouvelles illustrations | Images stockées en local dans le repo, pas de dépendance runtime |
| Qualité images insuffisante | Illustrations qui ne rendent pas justice aux textes | 5 styles + re-génération illimitée + mode prompt manuel pour contrôle fin |
| LXC 104 a l'ancienne app (aiohttp) | Conflit de config | Nettoyer le LXC : supprimer l'ancienne app, installer Node + Caddy |
| Contenu trop personnel | Risque vie privée pour Stéphane/Douce | Draft mode + Arnaud seul maître du contenu publié |
| Nano Banana 2 Pro lent (10-20s/image) | Génération pas instantanée | Acceptable — génération offline, pas de contrainte temps réel |

## 15. Appendix

### Textes existants à migrer
1. **Le Trio** — texte d'Arnaud sur Douce et leur amitié
2. **Les Zombies** — texte d'Arnaud sur Stéphane
3. **Témoignage de Douce** — ce que Douce écrit sur Arnaud
4. **Témoignage de Stéphane** — ce que Stéphane écrit sur Arnaud

### Références
- **Repo** : https://github.com/Wessonano/le-trio
- **LXC 104** : `192.168.1.104`, Proxmox `100.83.143.68`
- **Tunnel** : `trio.nanoserveur.fr`
- **Blog Arnaud** (ref design) : `arnaud.nanoserveur.fr`
- **Nano Banana 2 Pro** : modèle `gemini-3-pro-image-preview`
- **Google GenAI SDK** : `google-generativeai` >= 1.52.0
- **Astro docs** : https://docs.astro.build
