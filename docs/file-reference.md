# Referensi File

Daftar lengkap semua file dalam project beserta deskripsi dan apakah file tersebut aman untuk di-edit.

## Root Config Files

| File | Deskripsi | Editable? |
|---|---|---|
| `astro.config.mjs` | Konfigurasi Astro (site URL, integrasi, syntax highlighting) | Ya |
| `tailwind.config.mjs` | Konfigurasi Tailwind CSS (warna tema, font) | Ya |
| `tsconfig.json` | Konfigurasi TypeScript | Jarang perlu diubah |
| `package.json` | Metadata project, dependencies, scripts | Ya (hati-hati) |
| `package-lock.json` | Locked dependency versions | Jangan di-edit manual |
| `.gitignore` | File/folder yang di-ignore git | Ya |

## Source Code (`src/`)

### Content Config

| File | Deskripsi | Editable? |
|---|---|---|
| `src/content.config.ts` | Schema untuk blog & projects collections | Ya — jika ingin menambah/mengubah field |

### Components

| File | Deskripsi | Editable? |
|---|---|---|
| `src/components/Navbar.astro` | Navigasi atas (fixed, responsive) | Ya |
| `src/components/Hero.astro` | Section profile di homepage | Ya |
| `src/components/About.astro` | Section "About Me" di homepage | Ya |
| `src/components/BlogCard.astro` | Card component untuk blog post | Ya |
| `src/components/ProjectCard.astro` | Card component untuk project | Ya |
| `src/components/TagBadge.astro` | Badge/pill untuk tag | Ya |
| `src/components/Footer.astro` | Footer halaman | Ya |

### Layouts

| File | Deskripsi | Editable? |
|---|---|---|
| `src/layouts/BaseLayout.astro` | Shell HTML (head, meta, fonts) | Ya |
| `src/layouts/BlogPost.astro` | Layout untuk individual blog post | Ya |

### Pages (Routes)

| File | URL | Deskripsi | Editable? |
|---|---|---|---|
| `src/pages/index.astro` | `/` | Homepage | Ya |
| `src/pages/about.astro` | `/about` | About page | Ya |
| `src/pages/blog/index.astro` | `/blog` | Blog listing + tag filter | Ya |
| `src/pages/blog/[...slug].astro` | `/blog/:slug` | Individual blog post | Jarang perlu diubah |
| `src/pages/projects/index.astro` | `/projects` | Projects listing | Ya |

### Content (MDX)

| File | Deskripsi | Editable? |
|---|---|---|
| `src/content/blog/writing/*.mdx` | Blog posts (CTF writeup, dll) | Ya — ini konten yang kamu tulis |
| `src/content/projects/writing/*.mdx` | Project posts | Ya — ini konten yang kamu tulis |

### Styles

| File | Deskripsi | Editable? |
|---|---|---|
| `src/styles/global.css` | Tailwind base + prose typography | Ya |

## Public Assets (`public/`)

| File | Deskripsi | Editable? |
|---|---|---|
| `public/favicon.svg` | Ikon browser tab | Ya — ganti dengan icon sendiri |
| `public/img/thumb.jpg` | Foto profile (Hero section) | Ya — ganti dengan foto sendiri |
| `public/img/Projects/*.png` | Thumbnail gambar project | Ya — tambah/ganti sesuai project |

> **Catatan:** File di `public/` di-serve langsung tanpa di-compile. Path di code menggunakan `/img/...` (bukan `public/img/...`).

## Content Collection Schema

### Blog Collection

```typescript
{
  title: string;          // Wajib — judul post
  description: string;    // Wajib — deskripsi singkat
  date: Date;             // Wajib — tanggal publish
  tags: string[];         // Opsional — default: []
  image: string;          // Opsional — path gambar banner
  draft: boolean;         // Opsional — default: false
}
```

### Projects Collection

```typescript
{
  title: string;          // Wajib — nama project
  description: string;    // Wajib — deskripsi singkat
  date: Date;             // Wajib — tanggal
  tags: string[];         // Opsional — default: []
  image: string;          // Opsional — path thumbnail
  link: string;           // Opsional — URL live demo
  github: string;         // Opsional — URL source code
}
```

## Route Map

| URL | Source File | Deskripsi |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage |
| `/about` | `src/pages/about.astro` | About page |
| `/blog` | `src/pages/blog/index.astro` | Blog listing |
| `/blog/{slug}` | `src/pages/blog/[...slug].astro` | Blog post (auto-generate dari MDX) |
| `/projects` | `src/pages/projects/index.astro` | Projects listing |

## Generated Files

Berikut file yang di-generate otomatis oleh Astro (**jangan di-edit manual**):

| File | Deskripsi |
|---|---|
| `.astro/types.d.ts` | TypeScript type definitions |
| `.astro/content.d.ts` | Content collection types |
| `.astro/content-modules.mjs` | Content import map |
| `.astro/collections/*.json` | JSON schemas |
| `dist/` | Build output |

## Dependencies

| Package | Versi | Kegunaan |
|---|---|---|
| `astro` | ^5.12.4 | Static site generator framework |
| `@astrojs/mdx` | ^4.3.4 | MDX integration |
| `@astrojs/tailwind` | ^6.0.2 | Tailwind CSS integration |
| `tailwindcss` | ^3.4.17 | Utility-first CSS |
