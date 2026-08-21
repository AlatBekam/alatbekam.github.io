# 00 – Setup & Instalasi

Panduan lengkap untuk menyiapkan, menjalankan, dan me-maintain proyek portofolio secara lokal.

---

## Prasyarat

Sebelum memulai, pastikan perangkat kamu sudah terinstal:

| Kebutuhan | Versi Minimum | Cek Versi |
|-----------|--------------|-----------|
| **Node.js** | `≥ 22.12.0` | `node -v` |
| **npm** | `≥ 10.x` | `npm -v` |
| **Git** | terbaru | `git --version` |

> **Catatan:** Proyek ini menggunakan fitur Astro v7 dan Tailwind CSS v4 yang memerlukan Node.js 22+.

---

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/alatbekam/alatbekam.github.io.git
cd alatbekam.github.io
```

### 2. Install Dependencies

```bash
npm install
```

Perintah ini akan menginstall semua package yang dibutuhkan:

| Package | Versi | Fungsi |
|---------|-------|--------|
| `astro` | ^7.2.4 | Framework utama SSG |
| `@astrojs/mdx` | ^7.0.7 | Dukungan MDX (Markdown + JSX) |
| `@astrojs/sitemap` | ^3.7.3 | Auto-generate sitemap.xml |
| `tailwindcss` | ^4.3.3 | Utility CSS framework |
| `@tailwindcss/vite` | ^4.3.3 | Integrasi Tailwind v4 ke Vite |

---

## Menjalankan Proyek

### Mode Development

```bash
npm run dev
```

Server akan berjalan di: **http://localhost:4321**

- Hot reload otomatis saat file diubah
- Error ditampilkan di terminal dan browser

### Mode Preview (setelah build)

```bash
npm run build    # Build ke folder dist/
npm run preview  # Preview hasil build
```

---

## Perintah NPM

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Jalankan dev server (localhost:4321) |
| `npm run build` | Build static site ke folder `dist/` |
| `npm run preview` | Preview hasil build secara lokal |
| `npm run astro` | Akses Astro CLI langsung |

### Perintah Astro CLI Berguna

```bash
# Tambah integrasi baru
npx astro add <nama-integrasi>

# Cek tipe TypeScript
npx astro check

# Update Astro ke versi terbaru
npx astro upgrade
```

---

## Konfigurasi Utama

### `astro.config.mjs`

File konfigurasi utama Astro:

```js
export default defineConfig({
  site: 'https://alatbekam.github.io',  // ← URL production (penting untuk sitemap!)
  vite: {
    plugins: [tailwindcss()],           // ← Tailwind v4 via Vite plugin
  },
  integrations: [mdx(), sitemap()],     // ← MDX + Sitemap
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',            // ← Tema syntax highlighting
      wrap: true,
    },
  },
});
```

> **Penting:** Jika domain berubah, update nilai `site` di file ini agar sitemap dan canonical URL tetap benar.

### `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*":    ["src/layouts/*"],
      "@styles/*":     ["src/styles/*"],
      "@content/*":    ["src/content/*"]
    }
  }
}
```

Path alias memungkinkan import seperti `import X from '@components/Navbar.astro'`.

---

## Troubleshooting

### `npm install` gagal

```bash
# Hapus node_modules dan cache lalu install ulang
Remove-Item -Recurse -Force node_modules
npm cache clean --force
npm install
```

### Build error: "Cannot find module"

Pastikan semua import menggunakan path yang benar. Cek juga `astro.config.mjs` tidak mengimpor package yang belum diinstall.

### Port 4321 sudah dipakai

```bash
npm run dev -- --port 4322
```

### Content collection tidak terdeteksi

Pastikan file markdown ada di folder yang benar:
- Posts: `src/content/posts/*.md`
- Projects: `src/content/projects/*.md`

Dan pastikan frontmatter sesuai skema di [`src/content.config.ts`](../src/content.config.ts).
