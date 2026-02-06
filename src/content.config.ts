import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    publishedDate: z.date(),
    summary: z.string(),
    coverImage: z.string().optional(),
    author: reference('authors'),
    imageUrl: z.string().optional(),
  }),
});

const authorCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/authors' }),
  schema: z.object({
    name: z.string(),
    linkedin: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  authors: authorCollection
};
