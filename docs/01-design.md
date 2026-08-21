# 01 – Design System

Dokumentasi lengkap sistem desain website portofolio: warna, tipografi, token CSS, dan prinsip visual.

---

## Filosofi Desain

Website ini terinspirasi dari estetika **terminal/monospace minimalis** — bersih, fungsional, dengan sentuhan hacker culture. Prinsip utama:

- **Minimalis:** Tidak ada elemen dekoratif berlebihan
- **Monospace first:** Font kode untuk judul dan label; font sans-serif untuk body
- **Konten sebagai fokus:** Tata letak mendukung keterbacaan konten
- **Dark/Light-aware:** Semua warna didefinisikan untuk kedua mode

---

## Warna (Color Tokens)

Warna didefinisikan sebagai **CSS Custom Properties** di `src/styles/global.css` dan otomatis berubah berdasarkan class `.dark` pada `<html>`.

### Token Semantik

| Token CSS | Light Mode | Dark Mode | Kegunaan |
|-----------|-----------|----------|----------|
| `--primary` | `#2BBBD7` | `#218DAE` | Aksen utama, link, tag, highlight |
| `--container` | `#ffffff` | `#1b1a17` | Background halaman / card |
| `--on-container` | `#1b1a17` | `#ffffff` | Teks utama di atas container |
| `--surface` | `#f2f6f8` | `#242320` | Background elemen sekunder (sidebar, code inline) |
| `--border` | `#dde3e7` | `#343330` | Garis pembatas, border |
| `--muted` | `#6b7280` | `#9ca3af` | Teks sekunder, metadata, placeholder |

### Cara Menggunakan Token

Selalu gunakan token semantik, **bukan** hardcode warna:

```css
/* ✅ Benar */
color: var(--primary);
background: var(--container);
border-color: var(--border);

/* ❌ Hindari */
color: #2BBBD7;
background: white;
```

### Definisi di CSS

```css
/* src/styles/global.css */

:root {                          /* Light mode (default) */
  --primary:      #2BBBD7;
  --container:    #ffffff;
  --on-container: #1b1a17;
  --surface:      #f2f6f8;
  --border:       #dde3e7;
  --muted:        #6b7280;
}

html.dark {                      /* Dark mode */
  --primary:      #218DAE;
  --container:    #1b1a17;
  --on-container: #ffffff;
  --surface:      #242320;
  --border:       #343330;
  --muted:        #9ca3af;
}
```

---

## Tipografi (Typography)

### Font yang Digunakan

| Font | Jenis | Sumber | Kegunaan |
|------|-------|--------|----------|
| **Fira Code** | Monospace | Google Fonts | Judul, navbar brand, label, kode |
| **Poppins** | Sans-serif | Google Fonts | Body text, deskripsi, paragraf |

### Variabel Font

```css
/* Didefinisikan di @theme Tailwind v4 */
--font-mono: 'Fira Code', ui-monospace, monospace;
--font-sans: 'Poppins', ui-sans-serif, system-ui, sans-serif;
```

### Hierarki Tipografi

| Elemen | Font | Ukuran | Weight | Kegunaan |
|--------|------|--------|--------|----------|
| Navbar brand `./AlatBekam` | Mono | `1rem` | 500 | Logo/brand |
| Hero title `Hi, I'm...` | Mono | `clamp(1.75rem, 5vw, 2.5rem)` | 700 | Judul utama halaman |
| Section heading | Mono | `0.8rem` | 600 | Label section (uppercase) |
| Post title (list) | Mono | `1.125rem` | 600 | Judul di card list |
| Post title (detail) | Mono | `1.75rem` | 700 | Judul di halaman detail |
| Body text | Sans | `1rem` | 400 | Paragraf normal |
| Metadata | Mono | `0.775rem` | 400 | Tanggal, read time, word count |
| Tag | Mono | `0.75rem` | 400 | Tag pill |

### Kelas `.mono`

Kelas utilitas untuk menerapkan font monospace:

```html
<span class="mono">./path/to/something</span>
<p class="mono">metadata text</p>
```

---

## Spacing & Layout

### Container Utama

Semua konten dibungkus dalam container dengan lebar maksimum:

```css
/* BaseLayout.astro */
.main-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
}
```

### Layout Dua Kolom (Posts/Projects Archive)

Halaman archive menggunakan grid dua kolom:

```
┌─────────────────────────────────────────┐
│  160px sidebar  │  konten utama (1fr)   │
│  (sticky)       │                       │
└─────────────────────────────────────────┘
```

```css
.archive-layout {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 3rem;
}
/* Mobile: single column */
@media (max-width: 640px) {
  .archive-layout { grid-template-columns: 1fr; }
}
```

### Layout Post Detail (dengan ToC)

```
┌───────────────────────────────────┬──────────────┐
│  Konten artikel (1fr, max 70ch)  │  ToC (220px) │
│                                   │  (sticky)    │
└───────────────────────────────────┴──────────────┘
```

---

## Komponen Visual

### Tag Pill

```html
<span class="tag">#ctf</span>
```

```css
.tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
  border-radius: 0.25rem;
  padding: 0.125rem 0.5rem;
}
```

### Divider (Dashed)

```html
<hr class="divider" />
```

```css
.divider {
  border: none;
  border-top: 1px dashed var(--border);
}
```

---

## Dark/Light Mode

### Cara Kerja

1. **Deteksi awal** (tanpa flash): Script inline di `<head>` mengecek `localStorage` atau preferensi sistem sebelum halaman dirender.

```js
// BaseLayout.astro — dijalankan SEBELUM render
(function () {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();
```

2. **Toggle**: Klik tombol moon/sun di navbar menambah/hapus class `.dark` dari `<html>` dan menyimpan preferensi ke `localStorage`.

3. **CSS**: Semua warna menggunakan `var(--token)` yang berubah berdasarkan `html.dark { ... }`.

### Gambar Responsif terhadap Mode

Untuk gambar yang berbeda di light/dark mode (contoh: hero image):

```html
<img src="/images/hero-image-light.png" class="hero-img hero-img--light" alt="" />
<img src="/images/hero-image-dark.png"  class="hero-img hero-img--dark"  alt="" />
```

```css
html:not(.dark) .hero-img--dark  { display: none; }
html.dark       .hero-img--light { display: none; }
```

---

## Iconografi

Proyek menggunakan **Ionicons v7** via CDN untuk semua ikon:

```html
<!-- Dimuat di BaseLayout.astro -->
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
```

### Penggunaan

```html
<ion-icon name="moon-outline"></ion-icon>
<ion-icon name="sunny-outline"></ion-icon>
<ion-icon name="logo-github"></ion-icon>
<ion-icon name="logo-linkedin"></ion-icon>
<ion-icon name="mail-outline"></ion-icon>
<ion-icon name="globe-outline"></ion-icon>
<ion-icon name="menu-outline"></ion-icon>
```

Cari ikon lain di: https://ionic.io/ionicons

---

## Syntax Highlighting

Kode di dalam konten Markdown/MDX di-highlight menggunakan **Shiki** dengan tema `one-dark-pro`.

Konfigurasi di `astro.config.mjs`:

```js
markdown: {
  shikiConfig: {
    theme: 'one-dark-pro',  // Tema dark yang konsisten di light & dark mode
    wrap: true,             // Wrap baris panjang
  },
},
```

Tema lain yang tersedia: `github-dark`, `github-light`, `dracula`, `catppuccin-mocha`, dll.
Lihat daftar lengkap di: https://shiki.style/themes
