# Kustomisasi

Panduan mengubah tampilan, tema, dan komponen website.

## Mengganti Warna Tema

Edit `tailwind.config.mjs` di root project:

```js
theme: {
  extend: {
    colors: {
      dark: '#1B1A17',     // Warna utama (background navbar, footer, code block)
      accent: '#FFFF00',   // Warna aksen (highlight, tag aktif, link decoration)
    },
  },
},
```

### Contoh Kombinasi Warna

| Tema | `dark` | `accent` |
|---|---|---|
| Default (gelap+kuning) | `#1B1A17` | `#FFFF00` |
| Biru | `#0F172A` | `#38BDF8` |
| Hijau | `#022C22` | `#4ADE80` |
| Ungu | `#1E1B4B` | `#A78BFA` |
| Merah | `#1C1917` | `#EF4444` |

### Mengganti Warna Selection

Edit `src/styles/global.css`:

```css
::selection {
  @apply bg-accent text-dark;  /* Ganti bg-accent dengan warna baru */
}
```

## Mengganti Font

### 1. Tambah Google Font

Edit `src/layouts/BaseLayout.astro`, tambahkan link font di `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;700&display=swap" rel="stylesheet" />
```

Browse font di [Google Fonts](https://fonts.google.com).

### 2. Update Tailwind Config

Edit `tailwind.config.mjs`:

```js
fontFamily: {
  sans: ['Your Font', 'sans-serif'],    // Font utama
  mono: ['Your Mono Font', 'monospace'], // Font code block
},
```

## Mengubah Profile

Edit `src/components/Hero.astro`:

### Foto Profile

Ganti path gambar:

```html
<img src="/img/thumb.jpg" alt="Profile" ... />
```

Gambar harus diletakkan di `public/img/`.

### Nama

Cari dan ganti text "Hisara":

```html
<h1 class="text-5xl md:text-7xl font-bold mb-2">Hisara</h1>
```

### Subtitle

Ganti text "Security Enthusiast & Developer":

```html
<p class="text-lg text-gray-400 font-mono mb-6">Security Enthusiast & Developer</p>
```

### Social Links

Edit link social media di `src/components/Hero.astro`:

```html
<a href="https://github.com/AlatBekam" target="_blank" ...>
<a href="https://www.instagram.com/hiisara_/" target="_blank" ...>
<a href="https://bit.ly/3SXxTBn" target="_blank" ...>
```

Ganti URL sesuai akun kamu. Untuk menghapus social link, hapus elemen `<a>` yang tidak diperlukan. Untuk menambah, copy-paste elemen `<a>` yang ada dan ganti URL + SVG icon.

## Mengubah Navigation Link

Edit `src/components/Navbar.astro`:

```js
const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];
```

Ubah, tambah, atau hapus item di array `links`. Format: `{ href: '/url', label: 'Teks Tampilan' }`.

## Menambah Page Baru

Buat file `.astro` baru di `src/pages/`:

```
src/pages/
├── index.astro        # → /
├── about.astro        # → /about
├── contact.astro      # → /contact  (contoh tambahan)
└── my-page/
    └── index.astro    # → /my-page
```

**Contoh — membuat halaman `/contact`:**

Buat file `src/pages/contact.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="Contact - AlatBekam">
  <Navbar />
  <main class="pt-28 pb-20 px-6">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">Contact Me</h1>
      <p>Email: your@email.com</p>
    </div>
  </main>
  <Footer />
</BaseLayout>
```

## Mengubah About Page

Edit `src/pages/about.astro` untuk mengubah konten halaman About.

## Menambah Component Baru

1. Buat file `.astro` baru di `src/components/`
2. Import di halaman yang membutuhkan:

```astro
---
import MyComponent from '../components/MyComponent.astro';
---

<MyComponent />
```

## Mengubah Footer

Edit `src/components/Footer.astro` untuk mengubah teks footer.

## Mengubah Favicon

Ganti file `public/favicon.svg` dengan icon SVG baru. Format harus SVG.

## Mengubah Deskripsi SEO

Edit tag `<meta name="description">` di `src/layouts/BaseLayout.astro` untuk mengubah deskripsi default yang muncul di Google search results.
