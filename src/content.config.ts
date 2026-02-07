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
    canonicalUrl: z.string().url().optional(),
  }),
});

const authorCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/authors' }),
  schema: z.object({
    name: z.string(),
    linkedin: z.string(),
  }),
});

const videoCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/videos' }),
  schema: z.object({
    title: z.string(),
    publishedDate: z.date(),
    description: z.string(),
    youtubeId: z.string(),
    category: z.enum(['talk', 'tutorial', 'guest', 'podcast', 'other']),
    tags: z.array(z.string()).optional(),
    event: z.string().optional(),
    duration: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  authors: authorCollection,
  videos: videoCollection,
};
