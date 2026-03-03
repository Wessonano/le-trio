# Astro Components — Best Practices

## Principes

- **Zero JS** : pas de `client:*` directives, tout est rendu côté serveur
- **Props typées** : toujours définir l'interface Props
- **Scoped CSS** : utiliser `<style>` dans chaque composant, hériter des custom properties globales

## Pattern composant

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>

<style>
  .component {
    color: var(--color-text);
  }
</style>
```

## Content Collections (Astro 5.x)

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const textes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    about: z.array(z.enum(['arnaud', 'stephane', 'douce'])),
    image: z.string(),
    imageAlt: z.string(),
    imageStyle: z.enum(['aquarelle', 'dessin', 'peinture', 'realiste', 'minimaliste']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { textes };
```

## Query des textes

```astro
---
import { getCollection } from 'astro:content';

const textes = (await getCollection('textes', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
```

## Layout pattern

```astro
---
// BaseLayout.astro
interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} — Le Trio</title>
  {description && <meta name="description" content={description} />}
  {image && <meta property="og:image" content={image} />}
  <link rel="stylesheet" href="/styles/global.css" />
</head>
<body>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</body>
</html>
```

## CSS Custom Properties (global.css)

```css
:root {
  /* Colors */
  --color-bg: #0a0a0a;
  --color-text: #f5f5f5;
  --color-text-muted: #999;
  --color-accent: #e8a87c;
  --color-surface: #1a1a1a;
  --color-border: #333;

  /* Typography */
  --font-serif: 'Lora', Georgia, serif;
  --font-sans: Inter, system-ui, sans-serif;
  --font-size-base: 1.125rem;
  --line-height: 1.8;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;

  /* Layout */
  --max-width-content: 720px;
  --max-width-image: 960px;
}
```

## Images

- Toujours en WebP
- `loading="lazy"` sauf image hero (above the fold)
- `width` et `height` définis pour éviter le layout shift
- Alt text obligatoire
