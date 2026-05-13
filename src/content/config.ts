import { defineCollection, z } from 'astro:content';

const history = defineCollection({
  type: 'data',
  schema: z.object({
    year: z.string(),
    order: z.number(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    icon: z.string().optional(),
    color: z.string(), // "from-red-600 to-black-600"
    side: z.enum(['left', 'right']),
    image: z.string().optional(),
    link: z.string().optional(),
  }),
});

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.enum(['general', 'votacion', 'liga', 'cuenta', 'tecnico']).default('general'),
    order: z.number().default(99),
    updatedAt: z.coerce.date().optional(),
  }),
});

const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    docSlug: z.enum(['terminos', 'privacidad', 'codigo-de-conducta']),
    lastUpdated: z.coerce.date(),
    version: z.string().default('1.0'),
  }),
});

export const collections = { history, faq, legal };
