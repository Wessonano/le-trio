# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Le Trio est un blog statique public sur l'amitié entre Arnaud, Stéphane et Douce — trois personnes qui se sont rencontrées en psychiatrie. Arnaud écrit des textes, illustrés par des images générées via Nano Banana 2 Pro (Gemini). Site déployé sur `trio.nanoserveur.fr`.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Astro 5.x | SSG, content collections, zero JS |
| CSS vanilla | Dark theme, custom properties |
| Python 3.11+ | Script CLI génération d'images |
| Nano Banana 2 Pro (`gemini-3-pro-image-preview`) | Génération d'illustrations |
| google-generativeai SDK (>= 1.52.0) | API Gemini |
| Pillow | Conversion WebP, optimisation |
| Caddy | Serveur fichiers statiques (LXC 104) |
| Cloudflare tunnel | HTTPS `trio.nanoserveur.fr` |

---

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Generate image (prompt libre)
python scripts/generate-image.py --prompt "description" --style aquarelle --output public/images/textes/nom.webp

# Generate image (photo + prompt)
python scripts/generate-image.py --photo photo.jpg --prompt "transformation" --style dessin --output public/images/textes/nom.webp

# Generate image (auto depuis texte)
python scripts/generate-image.py --from-text src/content/textes/nom.md --style peinture --output public/images/textes/nom.webp

# Deploy
bash scripts/deploy.sh
```

---

## Project Structure

```
le-trio/
├── src/
│   ├── content/
│   │   ├── config.ts          # Schema Content Collection
│   │   └── textes/            # Fichiers markdown (les textes du Trio)
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Layout global (head, meta, dark theme)
│   │   └── TexteLayout.astro  # Layout page texte (image hero + contenu)
│   ├── pages/
│   │   ├── index.astro        # Accueil
│   │   ├── a-propos.astro     # Présentation du Trio
│   │   └── textes/
│   │       ├── index.astro    # Liste des textes
│   │       └── [...slug].astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── TexteCard.astro    # Card preview (image + titre + extrait)
│   │   └── ImageHero.astro    # Image pleine largeur
│   └── styles/
│       └── global.css         # Dark theme, typographie, responsive
├── public/
│   └── images/textes/         # Images générées (WebP)
├── scripts/
│   └── generate-image.py      # CLI génération Nano Banana 2 Pro
├── astro.config.mjs
├── package.json
├── .env.example               # GEMINI_API_KEY
└── CLAUDE.md                  # Ce fichier
```

---

## Architecture

Site 100% statique. Pas de serveur, pas de DB, pas d'API.

- **Contenu** : markdown dans `src/content/textes/` avec frontmatter typé
- **Build** : Astro SSG → fichiers HTML/CSS/images dans `dist/`
- **Images** : générées offline via script CLI Python, stockées dans `public/images/textes/`
- **Deploy** : rsync `dist/` vers LXC 104, servi par Caddy

---

## Code Patterns

### Frontmatter Schema
```yaml
---
title: "Titre du texte"
description: "Résumé court"
date: 2026-03-03
about: ["arnaud", "stephane", "douce"]  # personnages concernés
image: "/images/textes/nom.webp"
imageAlt: "Description de l'image"
imageStyle: "aquarelle"                  # style utilisé
draft: false
---
```

### Naming Conventions
- Fichiers textes : `kebab-case.md` (ex: `le-trio.md`, `les-zombies.md`)
- Images : même nom que le texte (ex: `le-trio.webp`)
- Components Astro : `PascalCase.astro`
- CSS : custom properties `--color-*`, `--font-*`, `--space-*`

### Styles d'images disponibles
- `aquarelle` — doux, poétique
- `dessin` — trait noir, croquis
- `peinture` — huile, textures riches
- `realiste` — photo-réaliste, cinématique
- `minimaliste` — formes simples, pastel

### Design
- Dark theme : fond `#0a0a0a`, texte `#f5f5f5`, accent warm
- Typographie : serif pour les textes (Lora/Georgia), sans-serif pour la nav (Inter/system-ui)
- Mobile-first, responsive

---

## Validation

```bash
# Avant de committer
npm run build          # Build sans erreur
npm run preview        # Vérification visuelle

# Images
# Vérifier que chaque texte a son image dans public/images/textes/
# Images en WebP, < 500KB
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/content/config.ts` | Schema des content collections |
| `src/styles/global.css` | Theme global, typographie, variables CSS |
| `scripts/generate-image.py` | CLI génération d'images Nano Banana 2 Pro |
| `.env.example` | Variables d'environnement requises |
| `.claude/PRD.md` | Product Requirements Document complet |

---

## On-Demand Context

| Topic | File |
|-------|------|
| PRD complet | `.claude/PRD.md` |
| Components frontend | `.claude/reference/components.md` |
| Image generation | `.claude/reference/image-generation.md` |

---

## Notes

- **Pas de JS client** — le site doit rester 100% statique, zéro JS envoyé au navigateur
- **Images offline** — jamais de call API Gemini au runtime, tout est pré-généré
- **Langue** — contenu en français, code/config en anglais
- **Draft mode** — `draft: true` dans le frontmatter = pas publié au build
- **Déploiement cible** — LXC 104 Proxmox (`192.168.1.104`), tunnel `trio.nanoserveur.fr`
