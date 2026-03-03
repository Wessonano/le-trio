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
