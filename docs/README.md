# AlatBekam Portfolio — Dokumentasi

Portfolio website dan blog untuk CTF writeup serta project showcase. Dibangun dengan **Astro 5**, **Tailwind CSS**, dan **MDX**.

## Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| [Astro](https://astro.build) | 5.x | Static site generator |
| [Tailwind CSS](https://tailwindcss.com) | 3.x | Utility-first CSS framework |
| [MDX](https://mdxjs.com) | - | Markdown dengan JSX components |
| [TypeScript](https://www.typescriptlang.org) | strict | Type safety |

## Fitur

- **Posts (Writeup & Blog)** — Tulis writeup CTF, catatan belajar, dll dalam format MDX dengan tag kategori
- **Project Showcase** — Tampilkan project kerja (web app, mobile app) dengan gambar, link live demo, dan source code
- **Tag Filter** — Filter post berdasarkan tag di halaman `/posts`
- **Table of Contents** — TOC sidebar otomatis pada halaman writeup (navigate per section)
- **Syntax Highlighting** — Code block otomatis di-highlight menggunakan Shiki (theme: `github-dark`)
- **Responsive** — Tampilan optimal di desktop dan mobile
- **Dark/Light Mode** — Toggle tema gelap/terang dengan Ionicons

## Quick Start

```bash
# 1. Clone repository
git clone https://github.com/AlatBekam/alatbekam.github.io.git
cd alatbekam.github.io

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
```

Buka `http://localhost:4321` di browser.

## Dokumentasi

| File | Deskripsi |
|---|---|
| [setup.md](./setup.md) | Instalasi, konfigurasi, dan struktur project |
| [development.md](./development.md) | Cara menjalankan dev server, build, dan preview |
| [blog.md](./blog.md) | Panduan menulis post (writeup, catatan belajar, dll) |
| [projects.md](./projects.md) | Panduan menambah project |
| [customization.md](./customization.md) | Kustomisasi tema, warna, komponen |
| [deployment.md](./deployment.md) | Build dan deploy ke GitHub Pages |
| [file-reference.md](./file-reference.md) | Referensi lengkap semua file |

## Templates

Template siap pakai untuk menulis post baru:

| Template | File |
|---|---|
| CTF Writeup — Web | [templates/1.ctf-web.md](./templates/1.ctf-web.md) |
| CTF Writeup — Crypto | [templates/2.ctf-crypto.md](./templates/2.ctf-crypto.md) |
| CTF Writeup — Forensics | [templates/3.ctf-forensics.md](./templates/3.ctf-forensics.md) |
| Project Log | [templates/4.project-log.md](./templates/4.project-log.md) |
| Catatan Belajar | [templates/5.catatan-belajar.md](./templates/5.catatan-belajar.md) |

## Struktur direktori

```
├── docs/                          # Dokumentasi ini
│   ├── templates/                 # Template posts (writeup, project, belajar)
│   └── ...
├── public/img/                    # Gambar (profile, project thumbnails)
├── src/
│   ├── components/                # Astro components (Navbar, TOC, Cards, dll)
│   ├── content/
│   │   ├── writeups/writing/      # MDX posts (CTF writeup, catatan belajar)
│   │   └── projects/writing/      # MDX project logs
│   ├── layouts/                   # Page layouts (BaseLayout, WriteupPost)
│   ├── pages/                     # Routes (file = URL)
│   └── styles/global.css          # Tailwind + prose styles
├── astro.config.mjs               # Astro config
├── tailwind.config.mjs            # Tailwind config (warna tema)
├── package.json                   # Dependencies
└── tsconfig.json                  # TypeScript config
```
