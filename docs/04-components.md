# 04 – Referensi Komponen

Dokumentasi semua komponen Astro yang tersedia dalam proyek.

---

## Daftar Komponen

| Komponen | File | Digunakan di |
|----------|------|-------------|
| `Navbar` | `src/components/Navbar.astro` | `BaseLayout.astro` |
| `ThemeToggle` | `src/components/ThemeToggle.astro` | `Navbar.astro` |
| `Footer` | `src/components/Footer.astro` | `BaseLayout.astro` |
| `PostCard` | `src/components/PostCard.astro` | `index.astro`, `posts/index.astro` |
| `ProjectCard` | `src/components/ProjectCard.astro` | `index.astro`, `projects/index.astro` |
| `TableOfContents` | `src/components/TableOfContents.astro` | `PostLayout.astro` |

---

## Navbar

**File:** [`src/components/Navbar.astro`](../src/components/Navbar.astro)

Navigasi utama yang sticky di atas halaman.

### Fitur
- Logo/brand di kiri: `./AlatBekam`
- Link navigasi di kanan: `home /`, `posts /`, `projects /`, `about /`
- Highlight link aktif berdasarkan URL saat ini
- Tombol `ThemeToggle` di ujung kanan
- Hamburger menu untuk mobile (`≤ 600px`)
- Backdrop blur untuk efek transparan

### Props
Tidak memerlukan props — otomatis mendeteksi URL aktif via `Astro.url.pathname`.

### Cara Menambah Link Navigasi

Edit array `navLinks` di file `Navbar.astro`:

```js
const navLinks = [
  { href: '/',         label: 'home /' },
  { href: '/posts',    label: 'posts /' },
  { href: '/projects', label: 'projects /' },
  { href: '/about',    label: 'about /' },
  // Tambahkan di sini:
  { href: '/tags',     label: 'tags /' },
];
```

---

## ThemeToggle

**File:** [`src/components/ThemeToggle.astro`](../src/components/ThemeToggle.astro)

Tombol pill-shaped untuk mengganti tema dark/light.

### Fitur
- Menampilkan ikon matahari (☀️) dan bulan (🌙) dari Ionicons
- Ikon aktif berwarna `--primary`, ikon tidak aktif meredup
- Menyimpan preferensi ke `localStorage` dengan key `theme`
- Menambah/hapus class `.dark` dari `<html>`

### Cara Kerja

```js
// Klik toggle → tambah/hapus class .dark di <html>
document.documentElement.classList.toggle('dark');
localStorage.setItem('theme', isDark ? 'dark' : 'light');
```

---

## Footer

**File:** [`src/components/Footer.astro`](../src/components/Footer.astro)

Footer sederhana di bagian bawah setiap halaman.

### Konten
- Copyright dengan tahun otomatis: `© 2026 AlatBekam`
- Link ke sitemap
- Link ke GitHub dengan ikon

### Kustomisasi

Untuk mengubah nama atau link, edit langsung di file `Footer.astro`.

---

## PostCard

**File:** [`src/components/PostCard.astro`](../src/components/PostCard.astro)

Kartu untuk menampilkan preview post di halaman list.

### Props

```ts
interface Props {
  post: CollectionEntry<'posts'>;
}
```

### Penggunaan

```astro
---
import PostCard from '../components/PostCard.astro';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
---

{posts.map(post => <PostCard post={post} />)}
```

### Tampilan

```
Jan 6, 2026  /  9 min read  /  1,771 words
Judul Post yang Panjang dan Deskriptif
Deskripsi singkat tentang isi post ini yang ditampilkan
di bawah judul sebagai preview konten.
#tag1  #tag2  #tag3                           read ↗
─────────────────────────────────────────────────────
```

### Kalkulasi Otomatis
- **Waktu baca**: `Math.ceil(wordCount / 200)` menit
- **Jumlah kata**: dihitung dari `post.body`
- **Format tanggal**: locale `id-ID` (mis: "6 Jan 2026")

---

## ProjectCard

**File:** [`src/components/ProjectCard.astro`](../src/components/ProjectCard.astro)

Kartu untuk menampilkan preview project dengan thumbnail opsional.

### Props

```ts
interface Props {
  project: CollectionEntry<'projects'>;
}
```

### Penggunaan

```astro
---
import ProjectCard from '../components/ProjectCard.astro';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
---

{projects.map(project => <ProjectCard project={project} />)}
```

### Tampilan (dengan thumbnail)

```
┌──────────────┐  Aug 20, 2026
│              │  Nama Project
│  [thumbnail] │  Deskripsi singkat proyek di sini.
│              │  #tag1  #tag2  #tag3
└──────────────┘  detail ↗  repo ↗  live ↗
```

### Tampilan (tanpa thumbnail)

Layout berubah ke single column:

```
Aug 20, 2026
Nama Project
Deskripsi singkat proyek di sini.
#tag1  #tag2  #tag3
detail ↗  repo ↗  live ↗
```

### Link Aksi
- **`detail ↗`** — Selalu ada, ke halaman detail project
- **`repo ↗`** — Muncul jika `repoUrl` diisi di frontmatter
- **`live ↗`** — Muncul jika `liveUrl` diisi di frontmatter

---

## TableOfContents

**File:** [`src/components/TableOfContents.astro`](../src/components/TableOfContents.astro)

Daftar isi yang sticky di sisi kanan halaman detail post/project.

### Props

```ts
interface Props {
  headings: Array<{
    depth: number;   // 1-6 (h1-h6)
    slug: string;    // ID anchor (otomatis dari Astro)
    text: string;    // Teks heading
  }>;
}
```

### Penggunaan

```astro
---
import TableOfContents from '../components/TableOfContents.astro';
const { headings } = await render(entry);
---

<TableOfContents headings={headings} />
```

### Perilaku
- Hanya menampilkan `h2` (depth 2) dan `h3` (depth 3)
- **Tidak tampil** jika heading yang relevan < 2 (tidak ada gunanya ToC)
- **Sticky** di desktop — mengikuti scroll pengguna
- **Highlight aktif** — heading yang sedang dibaca otomatis diberi warna `--primary` via `IntersectionObserver`
- **Mobile** — ToC bergeser ke atas konten (bukan di samping)

### Cara Kerja Highlight Aktif

```js
// IntersectionObserver dengan rootMargin: '-20% 0% -70% 0%'
// Artinya: heading dianggap "aktif" ketika berada di 20%-30% atas viewport
```

---

## Layout: BaseLayout

**File:** [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro)

Layout dasar yang digunakan oleh semua halaman.

### Props

```ts
interface Props {
  title: string;           // Judul tab browser + OG title
  description?: string;    // Meta description + OG description
  ogImage?: string;        // Path ke OG image (default: '/og-default.png')
}
```

### Penggunaan

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Judul Halaman | AlatBekam" description="Deskripsi halaman">
  <p>Konten halaman di sini</p>
</BaseLayout>
```

### Yang Disediakan BaseLayout
- `<html>`, `<head>`, `<body>` lengkap
- Meta tags SEO (title, description, canonical)
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Favicon link
- Ionicons CDN script
- Script deteksi tema (mencegah flash saat load)
- `<Navbar />` dan `<Footer />`
- Wrapper `.main-content` dengan max-width dan padding

---

## Layout: PostLayout

**File:** [`src/layouts/PostLayout.astro`](../src/layouts/PostLayout.astro)

Layout khusus untuk halaman detail post atau project.

### Props

```ts
interface Props {
  title: string;
  description?: string;
  publishDate: Date;
  updatedDate?: Date;
  tags?: string[];
  headings?: Array<{ depth: number; slug: string; text: string }>;
  breadcrumb?: { label: string; href: string };
  wordCount?: number;
}
```

### Penggunaan

```astro
---
import PostLayout from '../../layouts/PostLayout.astro';
const { Content, headings } = await render(post);
const wordCount = post.body.split(/\s+/).length;
---

<PostLayout
  title={post.data.title}
  description={post.data.description}
  publishDate={post.data.publishDate}
  tags={post.data.tags}
  headings={headings}
  breadcrumb={{ label: 'posts /', href: '/posts' }}
  wordCount={wordCount}
>
  <Content />
</PostLayout>
```

### Yang Disediakan PostLayout
- Breadcrumb navigasi di atas judul
- Header artikel (judul, metadata, tags)
- Layout dua kolom: artikel kiri, ToC kanan (desktop)
- ToC di atas konten (mobile, `≤ 850px`)
- Slot `<Content />` untuk konten Markdown
