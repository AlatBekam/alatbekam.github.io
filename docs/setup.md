# Setup

Panduan instalasi dan konfigurasi awal project.

## Prasyarat

| Software | Versi Minimum | Cek Versi |
|---|---|---|
| [Node.js](https://nodejs.org) | >= 22 | `node --version` |
| [npm](https://www.npmjs.com) | >= 10 | `npm --version` |
| [Git](https://git-scm.com) | >= 2.x | `git --version` |

### Instalasi Node.js

Gunakan [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) untuk mengelola versi Node.js:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Install Node.js 22
nvm install 22

# Verifikasi
node --version  # v22.x.x
npm --version   # 10.x.x
```

## Clone & Install

```bash
# Clone repository
git clone https://github.com/AlatBekam/alatbekam.github.io.git
cd alatbekam.github.io

# Install dependencies
npm install
```

Semua dependencies akan terinstall di folder `node_modules/`. Jangan commit folder ini ke git (sudah ada di `.gitignore`).

## Struktur Project

```
alatbekam.github.io/
├── public/                        # Static assets (tidak di-compile)
│   ├── favicon.svg                # Ikon browser tab
│   └── img/                       # Gambar
│       ├── thumb.jpg              # Foto profile
│       └── Projects/              # Thumbnail project
│
├── src/                           # Source code
│   ├── components/                # reusable UI components
│   │   ├── Navbar.astro           # Navigasi atas (fixed, theme toggle)
│   │   ├── Hero.astro             # Bagian profile di homepage
│   │   ├── About.astro            # Bagian "About Me" di homepage
│   │   ├── BlogCard.astro         # Card untuk preview post
│   │   ├── ProjectCard.astro      # Card untuk preview project
│   │   ├── TagBadge.astro         # Badge/pill untuk tag
│   │   ├── TableOfContents.astro  # TOC sidebar untuk writeup
│   │   └── Footer.astro           # Footer halaman
│   │
│   ├── content/                   # Content collections (MDX)
│   │   ├── writeups/
│   │   │   └── writing/           # Posts (CTF writeup, catatan belajar, dll)
│   │   └── projects/
│   │       └── writing/           # Project logs
│   │
│   ├── layouts/                   # Page layouts
│   │   ├── BaseLayout.astro       # Shell HTML untuk semua halaman
│   │   └── WriteupPost.astro      # Layout untuk writeup (dengan TOC sidebar)
│   │
│   ├── pages/                     # Routes — nama file = URL
│   │   ├── index.astro            # Homepage (/)
│   │   ├── about.astro            # About page (/about)
│   │   ├── posts/
│   │   │   ├── index.astro        # Posts listing (/posts)
│   │   │   └── [...slug].astro    # Dynamic route (/posts/:slug)
│   │   └── projects/
│   │       └── index.astro        # Projects listing (/projects)
│   │
│   ├── content.config.ts          # Schema untuk content collections
│   └── styles/
│       └── global.css             # Tailwind base + prose styles
│
├── astro.config.mjs               # Konfigurasi Astro
├── tailwind.config.mjs            # Konfigurasi Tailwind CSS
├── tsconfig.json                  # Konfigurasi TypeScript
├── package.json                   # Metadata & dependencies
└── .gitignore                     # File yang di-ignore git
```

## Penjelasan Config Files

### `astro.config.mjs`

Konfigurasi utama Astro:

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://alatbekam.github.io',  // URL部署
  integrations: [mdx(), tailwind()],    // Aktifkan MDX & Tailwind
  markdown: {
    shikiConfig: {
      theme: 'github-dark',             // Theme syntax highlighting
    },
  },
});
```

**Yang bisa diubah:**
- `site` — Ganti jika deploy ke domain lain
- `markdown.shikiConfig.theme` — Ganti theme syntax highlighting (lihat [daftar theme Shiki](https://shiki.style/themes))

### `tailwind.config.mjs`

Konfigurasi Tailwind CSS dan tema warna:

```js
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: '#1B1A17',     // Warna utama (gelap)
        accent: '#FFFF00',   // Warna aksen (kuning)
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

**Yang bisa diubah:**
- `colors.dark` — Warna latar belakang utama
- `colors.accent` — Warna aksen/highlight
- `fontFamily.mono` — Font untuk code block dan teks monospace

### `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

Menggunakan preset TypeScript strict dari Astro. Tidak perlu diubah kecuali ada kebutuhan khusus.

### `package.json`

```json
{
  "name": "alatbekam.github.io",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.12.4",
    "@astrojs/mdx": "^4.3.4",
    "@astrojs/tailwind": "^6.0.2",
    "tailwindcss": "^3.4.17"
  }
}
```

**Scripts:**
- `npm run dev` — Jalankan dev server
- `npm run build` — Build untuk production
- `npm run preview` — Preview hasil build

**Dependencies:**
- `astro` — Framework utama
- `@astrojs/mdx` — Support MDX (Markdown + JSX)
- `@astrojs/tailwind` — Integrasi Tailwind CSS
- `tailwindcss` — CSS utility framework

### `src/content.config.ts`

Schema untuk content collections (writeups dan projects):

```ts
import { defineCollection, z } from 'astro:content';

const writeups = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),               // Wajib
    description: z.string(),         // Wajib
    date: z.coerce.date(),           // Wajib
    tags: z.array(z.string()).default([]),  // Opsional
    image: z.string().optional(),    // Opsional
    draft: z.boolean().default(false),      // Opsional
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),               // Wajib
    description: z.string(),         // Wajib
    date: z.coerce.date(),           // Wajib
    tags: z.array(z.string()).default([]),  // Opsional
    image: z.string().optional(),    // Opsional
    link: z.string().optional(),     // Opsional — URL live demo
    github: z.string().optional(),   // Opsional — URL source code
  }),
});

export const collections = { writeups, projects };
```

Lihat [blog.md](./blog.md) dan [projects.md](./projects.md) untuk penjelasan cara mengisi konten.
