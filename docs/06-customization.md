# 06 – Kustomisasi

Panduan mengubah tampilan, konten personal, dan konfigurasi sesuai kebutuhan.

---

## Informasi Personal

### Handle / Nama

Ubah di beberapa tempat:

**`src/components/Navbar.astro`** — Brand di navbar:
```astro
<a href="/" class="nav-brand mono">./AlatBekam</a>
```

**`src/pages/index.astro`** — Judul hero:
```astro
<h1 class="hero-title mono">
  Hi, I'm <span class="hero-name">AlatBekam.</span>
</h1>
```

**`src/layouts/BaseLayout.astro`** — Default meta description:
```js
description = 'Portofolio pribadi AlatBekam — CTF writeups, projects, dan tulisan lainnya.',
```

**`src/components/Footer.astro`** — Copyright:
```astro
<span class="mono footer-copy">© {year} AlatBekam</span>
```

### Bio/Tagline

**`src/pages/index.astro`** — Cari bagian `<!-- TODO: Ganti teks bio -->`:
```astro
<p class="hero-bio">
  <!-- Ganti ini dengan bio kamu -->
  I like breaking things. Here, I post stuff I learned while doing CTFs.
</p>
```

### Sosial Media

**`src/pages/index.astro`** — Bagian hero socials:
```astro
<a href="https://github.com/USERNAME_KAMU" ...>
<a href="https://linkedin.com/in/USERNAME_KAMU" ...>
<a href="https://discord.com/users/USER_ID_KAMU" ...>
<a href="mailto:EMAIL_KAMU@gmail.com" ...>
```

**`src/pages/about.astro`** — Bagian `.about-socials`:
```astro
<a href="https://github.com/USERNAME_KAMU" ...>github.com/USERNAME_KAMU</a>
<a href="https://linkedin.com/in/USERNAME_KAMU" ...>linkedin</a>
<a href="mailto:EMAIL_KAMU@gmail.com" ...>EMAIL_KAMU@gmail.com</a>
```

**`src/components/Footer.astro`** — Link GitHub:
```astro
<a href="https://github.com/USERNAME_KAMU" ...>
```

---

## Warna

Semua warna dikontrol melalui CSS custom properties di `src/styles/global.css`.

### Mengubah Warna Primary

```css
:root {
  --primary: #2BBBD7;    /* ← Ganti ini untuk light mode */
}

html.dark {
  --primary: #218DAE;    /* ← Ganti ini untuk dark mode */
}
```

### Mengubah Warna Background

```css
:root {
  --container: #ffffff;  /* ← Background utama light mode */
  --surface:   #f2f6f8;  /* ← Background elemen sekunder */
}

html.dark {
  --container: #1b1a17;  /* ← Background utama dark mode */
  --surface:   #242320;
}
```

> **Tip:** Setelah ganti warna, refresh browser dengan `Ctrl+Shift+R` untuk melihat perubahan.

---

## Font

### Mengubah Font

Font diimport dari Google Fonts di `src/styles/global.css`:

```css
/* Baris 1 — Ganti URL ini untuk font berbeda */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
```

Lalu update variabel font di `@theme`:

```css
@theme {
  --font-mono: 'Fira Code', ui-monospace, monospace;  /* ← Font monospace */
  --font-sans: 'Poppins', ui-sans-serif, system-ui;   /* ← Font UI */
}
```

**Font monospace alternatif:** `JetBrains Mono`, `Source Code Pro`, `IBM Plex Mono`
**Font sans alternatif:** `Inter`, `DM Sans`, `Outfit`

---

## Gambar Hero

### Mengganti Gambar

Gambar hero terletak di:
```
public/images/hero-image-light.png   ← Untuk light mode
public/images/hero-image-dark.png    ← Untuk dark mode
```

Cukup **ganti file-nya** dengan gambar baru, nama file harus sama persis.

### Mengubah Ukuran

Di `src/pages/index.astro`, cari class `.hero-img`:

```css
.hero-img {
  height: 96px;    /* ← Ubah ukuran di sini */
  width: auto;
  object-fit: contain;
}
```

### Menggunakan Satu Gambar (Tidak Perlu Dua Mode)

Edit `src/pages/index.astro`, ganti dua `<img>` menjadi satu:

```astro
<!-- Ganti ini... -->
<img src="/images/hero-image-light.png" class="hero-img hero-img--light" alt="" />
<img src="/images/hero-image-dark.png"  class="hero-img hero-img--dark"  alt="" />

<!-- ...dengan ini -->
<img src="/images/hero-image.png" class="hero-img" alt="Profile illustration" />
```

Dan hapus CSS yang tidak perlu:
```css
/* Hapus baris ini */
html:not(.dark) .hero-img--dark  { display: none; }
html.dark       .hero-img--light { display: none; }
```

---

## Favicon

Ganti file `public/favicon.png` dengan favicon baru.

Ukuran favicon yang direkomendasikan: **32×32px** atau **64×64px** (PNG)

Jika ingin menggunakan format ICO atau menambahkan apple-touch-icon:

Edit `src/layouts/BaseLayout.astro`:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
<!-- Tambahkan jika perlu: -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

---

## Halaman About

Edit `src/pages/about.astro` untuk menyesuaikan:

### Bio
```astro
<p class="about-intro">
  My name is <strong>NAMA_KAMU</strong> — deskripsi singkat kamu.
</p>
```

### Tabel CTF

Tambah/hapus baris di tabel:
```html
<tr>
  <td>Nama Kompetisi</td>
  <td>Nama Tim</td>
  <td>1st Place</td>
</tr>
```

### Skills

Edit array skills:
```astro
{['Web Exploitation', 'Binary Exploitation', 'Reverse Engineering', 'Kustom Skill'].map(skill => (
  <span class="tag">{skill}</span>
))}
```

---

## Syntax Highlighting Theme

Ganti tema di `astro.config.mjs`:

```js
markdown: {
  shikiConfig: {
    theme: 'one-dark-pro',  // ← Ganti tema di sini
  },
},
```

**Tema populer:**
- `one-dark-pro` (current)
- `github-dark` / `github-light`
- `dracula`
- `catppuccin-mocha`
- `tokyo-night`
- `nord`
- `solarized-dark`

Lihat semua tema: https://shiki.style/themes

### Tema Berbeda untuk Light/Dark

```js
markdown: {
  shikiConfig: {
    themes: {
      light: 'github-light',
      dark: 'one-dark-pro',
    },
  },
},
```

---

## Menambah Halaman Baru

### Halaman Statis

Buat file di `src/pages/`:

```astro
---
// src/pages/uses.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Uses | AlatBekam" description="Tools yang saya gunakan">
  <h1>Uses</h1>
  <p>Ini adalah halaman /uses</p>
</BaseLayout>
```

URL otomatis: `/uses`

### Tambahkan ke Navbar

Edit `src/components/Navbar.astro`:

```js
const navLinks = [
  { href: '/',      label: 'home /' },
  { href: '/posts', label: 'posts /' },
  // ...
  { href: '/uses',  label: 'uses /' },  // ← Tambahkan ini
];
```

---

## Home Page — Mengubah Jumlah Item

Edit `src/pages/index.astro`:

```js
// Jumlah item di "Latest Updates"
const merged = [...].slice(0, 5);   // ← Ganti 5

// Jumlah item di "Latest Posts"
const latestPosts = allPosts.slice(0, 3);     // ← Ganti 3

// Jumlah item di "Latest Projects"
const latestProjects = allProjects.slice(0, 3); // ← Ganti 3
```

---

## Menambah Koleksi Konten Baru

Contoh: menambah koleksi `notes` (catatan pendek).

### 1. Edit `src/content.config.ts`

```ts
const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, projects, notes };
```

### 2. Buat Folder Konten

```
src/content/notes/
```

### 3. Buat Halaman

```
src/pages/notes/index.astro    ← daftar semua notes
src/pages/notes/[slug].astro   ← detail note
```

### 4. Buat Komponen (opsional)

```
src/components/NoteCard.astro
```
