import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts collection: CTF writeups, articles, etc.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Projects collection: portfolio projects with optional thumbnail
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    thumbnail: z.string().optional(), // relative to public/images/projects/
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, projects };
