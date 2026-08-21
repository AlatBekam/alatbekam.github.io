# 02 – Struktur Proyek

Penjelasan lengkap setiap file dan folder dalam proyek.

---

## Gambaran Umum

```
alatbekam.github.io/
│
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions: auto-deploy ke GitHub Pages
│
├── docs/                       ← 📖 Dokumentasi proyek (kamu sedang di sini)
│   ├── README.md
│   ├── 00-setup.md
│   ├── 01-design.md
│   ├── 02-structure.md
│   ├── 03-content.md
│   ├── 04-components.md
│   ├── 05-deployment.md
│   ├── 06-customization.md
│   └── template/
│       ├── post-template.md
│       └── project-template.md
│
├── public/                     ← Aset statis (tidak diproses Astro)
│   ├── favicon.png             ← Icon tab browser
│   └── images/
│       ├── hero-image-light.png  ← Gambar hero untuk light mode
│       ├── hero-image-dark.png   ← Gambar hero untuk dark mode
│       └── projects/           ← Thumbnail gambar project
│           └── *.png / *.jpg
│
├── src/                        ← Kode sumber utama
│   │
│   ├── content.config.ts       ← Definisi skema content collections (Astro v5+)
│   │
│   ├── content/                ← Konten Markdown/MDX
│   │   ├── posts/              ← CTF writeups & artikel
│   │   │   └── nama-post.md
│   │   └── projects/           ← Portfolio projects
│   │       └── nama-project.md
│   │
│   ├── components/             ← Komponen Astro yang dapat dipakai ulang
│   │   ├── Navbar.astro        ← Navigasi utama (sticky)
│   │   ├── ThemeToggle.astro   ← Tombol dark/light mode (moon/sun)
│   │   ├── Footer.astro        ← Footer sederhana
│   │   ├── PostCard.astro      ← Kartu post untuk list view
│   │   ├── ProjectCard.astro   ← Kartu project dengan thumbnail
│   │   └── TableOfContents.astro ← Daftar isi sticky untuk halaman detail
│   │
│   ├── layouts/                ← Template layout halaman
│   │   ├── BaseLayout.astro    ← Layout dasar (HTML head, navbar, footer)
│   │   └── PostLayout.astro    ← Layout artikel (breadcrumb, header, ToC)
│   │
│   ├── pages/                  ← Halaman website (routing file-based)
│   │   ├── index.astro         ← Halaman Home (/)
│   │   ├── about.astro         ← Halaman About (/about)
│   │   ├── 404.astro           ← Halaman 404 Not Found
│   │   ├── posts/
│   │   │   ├── index.astro     ← Daftar semua post (/posts)
│   │   │   └── [slug].astro    ← Detail post (/posts/nama-post)
│   │   └── projects/
│   │       ├── index.astro     ← Daftar semua project (/projects)
│   │       └── [slug].astro    ← Detail project (/projects/nama-project)
│   │
│   └── styles/
│       └── global.css          ← CSS global (Tailwind v4 + token + prose)
│
├── astro.config.mjs            ← Konfigurasi Astro
├── tsconfig.json               ← Konfigurasi TypeScript
├── package.json                ← Dependencies dan scripts
└── .gitignore
```

---

## Penjelasan per Folder

### `public/`

File di folder ini di-copy langsung ke output `dist/` tanpa diproses. Gunakan untuk:
- Favicon (`favicon.png`)
- Gambar yang tidak perlu dioptimasi Astro
- File statis lainnya (`robots.txt`, dll)

Diakses via URL root: `public/favicon.png` → `https://alatbekam.github.io/favicon.png`

### `src/content/`

Semua konten website dalam format Markdown (`.md`) atau MDX (`.mdx`).

- **`posts/`** — Untuk CTF writeup, artikel, catatan. URL: `/posts/nama-file`
- **`projects/`** — Untuk portfolio proyek. URL: `/projects/nama-file`

Nama file = URL slug. Contoh: `ctf-2026-web.md` → `/posts/ctf-2026-web`

### `src/components/`

Komponen Astro yang dapat dipakai di berbagai halaman. Lihat detail di [04-components.md](./04-components.md).

### `src/layouts/`

Template yang membungkus halaman:

- **`BaseLayout.astro`** — Digunakan oleh semua halaman. Berisi `<head>`, Navbar, Footer, dan Ionicons CDN.
- **`PostLayout.astro`** — Digunakan oleh halaman detail post/project. Menambahkan breadcrumb, header artikel, dan ToC.

### `src/pages/`

Routing Astro bersifat **file-based**:

| File | URL |
|------|-----|
| `pages/index.astro` | `/` |
| `pages/about.astro` | `/about` |
| `pages/posts/index.astro` | `/posts` |
| `pages/posts/[slug].astro` | `/posts/:slug` |
| `pages/projects/index.astro` | `/projects` |
| `pages/projects/[slug].astro` | `/projects/:slug` |
| `pages/404.astro` | Halaman 404 |

### `src/styles/global.css`

CSS utama proyek dengan:
- `@import "tailwindcss"` — Tailwind v4
- `@theme { ... }` — Token Tailwind custom (font, warna)
- `:root { ... }` dan `html.dark { ... }` — Token semantik untuk theming
- `.prose` — Style untuk konten Markdown
- `.tag`, `.mono`, `.divider` — Kelas utilitas

### `src/content.config.ts`

Mendefinisikan skema untuk content collections menggunakan Zod. Astro v5+ menggunakan format **glob loader**. Lihat detail di [03-content.md](./03-content.md).

---

## Alur Data (Data Flow)

```
Markdown file (src/content/posts/*.md)
    ↓ diparsing oleh Astro Content Collections
    ↓ divalidasi oleh skema Zod (content.config.ts)
    ↓
[slug].astro mengambil data dengan getCollection()
    ↓ render() untuk menghasilkan HTML dari Markdown
    ↓
PostLayout.astro membungkus konten dengan layout
    ↓
BaseLayout.astro menambahkan head, navbar, footer
    ↓
Output: HTML statis di dist/
```

---

## File Konfigurasi Kunci

### `astro.config.mjs`

```js
export default defineConfig({
  site: 'https://alatbekam.github.io',  // URL live site
  vite: { plugins: [tailwindcss()] },   // Tailwind v4
  integrations: [mdx(), sitemap()],     // MDX + auto-sitemap
  markdown: {
    shikiConfig: { theme: 'one-dark-pro', wrap: true },
  },
});
```

### `src/content.config.ts`

```ts
// Skema posts
schema: z.object({
  title: z.string(),          // Wajib
  description: z.string(),    // Wajib
  publishDate: z.coerce.date(), // Wajib
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),  // true = tidak tampil di production
})

// Skema projects (+ field tambahan)
thumbnail: z.string().optional(),  // nama file di public/images/projects/
repoUrl: z.string().url().optional(),
liveUrl: z.string().url().optional(),
```
