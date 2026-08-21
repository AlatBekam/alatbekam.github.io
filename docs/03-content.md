# 03 – Manajemen Konten

Panduan lengkap cara membuat, mengedit, dan mengelola konten post dan project.

---

## Gambaran Sistem Konten

Website ini menggunakan **Astro Content Collections** dengan format Markdown (`.md`) dan MDX (`.mdx`).

- **Post** → `src/content/posts/` → URL: `/posts/nama-file`
- **Project** → `src/content/projects/` → URL: `/projects/nama-file`

Setiap file terdiri dari dua bagian:

```markdown
---
# Frontmatter (metadata) — wajib ada
title: "Judul Konten"
description: "Deskripsi singkat"
publishDate: 2026-08-21
---

Konten Markdown di sini...
```

---

## Membuat Post Baru

### Langkah 1: Buat File

Buat file baru di `src/content/posts/` dengan nama file yang akan menjadi URL slug.

```
src/content/posts/nama-post-kamu.md
```

> **Konvensi penamaan file:**
> - Gunakan huruf kecil
> - Ganti spasi dengan tanda `-`
> - Hindari karakter khusus
> - Contoh: `htb-university-ctf-2026.md` → URL: `/posts/htb-university-ctf-2026`

### Langkah 2: Tulis Frontmatter

```yaml
---
title: "Judul Post yang Deskriptif"
description: "Deskripsi 1-2 kalimat tentang isi post ini."
publishDate: 2026-08-21
updatedDate: 2026-08-22      # opsional: jika ada revisi
tags: ["CTF", "web", "sqli"] # opsional: tag untuk kategorisasi
draft: false                  # true = tidak muncul di website
---
```

### Frontmatter Posts — Referensi Lengkap

| Field | Tipe | Wajib | Keterangan |
|-------|------|-------|------------|
| `title` | string | ✅ | Judul post, tampil di card dan halaman detail |
| `description` | string | ✅ | Deskripsi singkat, tampil di card dan meta SEO |
| `publishDate` | date | ✅ | Format: `YYYY-MM-DD`. Digunakan untuk sorting |
| `updatedDate` | date | ❌ | Format: `YYYY-MM-DD`. Tampil di halaman detail jika ada |
| `tags` | string[] | ❌ | Array tag. Default: `[]` |
| `draft` | boolean | ❌ | `true` = disembunyikan dari build. Default: `false` |

### Langkah 3: Tulis Konten

Gunakan Markdown standar di bawah frontmatter:

```markdown
---
title: "BucketCTF 2026 – Web Writeup"
description: "Writeup challenge web BucketCTF 2026 meliputi SSRF dan JWT bypass."
publishDate: 2026-08-21
tags: ["CTF", "web", "SSRF", "JWT"]
---

## Overview

Challenge ini...

## Analysis

Setelah membuka...

## Exploitation

```python
import requests
payload = ...
```

## Flag

`FLAG{...}`
```

> **Tips:** Gunakan heading `## H2` dan `### H3` agar Table of Contents (ToC) terbentuk otomatis di halaman detail.

---

## Membuat Project Baru

### Langkah 1: Buat File

```
src/content/projects/nama-project.md
```

### Langkah 2: Siapkan Thumbnail (Opsional)

Letakkan gambar thumbnail di:
```
public/images/projects/nama-gambar.png
```

Format yang didukung: `.png`, `.jpg`, `.jpeg`, `.webp`

Ukuran thumbnail yang direkomendasikan: **800×500px** (rasio 16:10)

### Langkah 3: Tulis Frontmatter

```yaml
---
title: "Nama Project"
description: "Deskripsi singkat proyek, 1-2 kalimat."
publishDate: 2026-08-21
updatedDate: 2026-09-01      # opsional
tags: ["Python", "Web", "CTF Tools"]
thumbnail: "nama-gambar.png"  # opsional, nama file saja (bukan path penuh)
repoUrl: "https://github.com/alatbekam/nama-repo"  # opsional
liveUrl: "https://nama-project.vercel.app"          # opsional
draft: false
---
```

### Frontmatter Projects — Referensi Lengkap

| Field | Tipe | Wajib | Keterangan |
|-------|------|-------|------------|
| `title` | string | ✅ | Nama project |
| `description` | string | ✅ | Deskripsi singkat |
| `publishDate` | date | ✅ | Format: `YYYY-MM-DD` |
| `updatedDate` | date | ❌ | Format: `YYYY-MM-DD` |
| `tags` | string[] | ❌ | Teknologi yang digunakan |
| `thumbnail` | string | ❌ | Nama file gambar di `public/images/projects/` |
| `repoUrl` | string (URL) | ❌ | Link ke GitHub repository |
| `liveUrl` | string (URL) | ❌ | Link ke demo/live version |
| `draft` | boolean | ❌ | Default: `false` |

---

## Markdown Cheatsheet

Fitur Markdown yang tersedia di semua konten:

### Heading

```markdown
## Heading 2 (masuk ToC)
### Heading 3 (masuk ToC)
#### Heading 4 (tidak masuk ToC)
```

### Teks

```markdown
**Bold** atau __bold__
*Italic* atau _italic_
~~Strikethrough~~
`kode inline`
```

### Link & Gambar

```markdown
[teks link](https://url.com)
[link internal](/posts/nama-post)

![alt text](/images/projects/gambar.png)
![alt text](https://url-eksternal.com/gambar.png)
```

### List

```markdown
- Item tidak berurutan
- Item kedua
  - Sub-item

1. Item berurutan
2. Item kedua
```

### Blockquote

```markdown
> Kutipan atau catatan penting di sini.
```

### Code Block

Gunakan triple backtick dengan nama bahasa untuk syntax highlighting:

````markdown
```python
def exploit():
    payload = "' OR 1=1 --"
    return payload
```

```bash
curl -X POST http://target.ctf/login -d "user=admin&pass=test"
```

```c
#include <stdio.h>
int main() {
    printf("pwn!\n");
}
```
````

Bahasa yang didukung Shiki: `python`, `c`, `cpp`, `bash`, `js`, `ts`, `html`, `css`, `sql`, `json`, `yaml`, `rust`, `go`, dll.

### Tabel

```markdown
| Kolom 1 | Kolom 2 | Kolom 3 |
|---------|---------|---------|
| Data A  | Data B  | Data C  |
| Data D  | Data E  | Data F  |
```

### Horizontal Rule

```markdown
---
```

---

## MDX (Markdown + JSX)

File `.mdx` memungkinkan penggunaan komponen Astro/HTML di dalam Markdown:

```mdx
---
title: "Post dengan Komponen"
publishDate: 2026-08-21
description: "Contoh MDX"
---

Paragraf Markdown biasa.

<div style="border: 1px solid var(--border); padding: 1rem; border-radius: 0.5rem;">
  Ini adalah HTML/JSX di dalam MDX.
</div>

Kembali ke Markdown lagi.
```

---

## Draft Mode

Untuk menyembunyikan konten sementara tanpa menghapus file:

```yaml
---
draft: true  # ← Post/project ini tidak akan tampil di website
---
```

Draft tidak akan muncul di:
- Halaman list (posts/projects archive)
- Halaman home (latest sections)
- Sitemap

---

## Mengelola Gambar di Konten

### Gambar dari Folder Public

```markdown
![Deskripsi gambar](/images/projects/nama-gambar.png)
```

### Gambar Eksternal

```markdown
![Screenshot tool](https://i.imgur.com/contoh.png)
```

### Tips Gambar

- Kompresi gambar sebelum upload (gunakan [squoosh.app](https://squoosh.app) atau [tinypng.com](https://tinypng.com))
- Format WebP untuk ukuran lebih kecil
- Thumbnail project: **800×500px** (rasio 16:10)
- Selalu isi atribut `alt` untuk aksesibilitas

---

## Sorting & Filtering

### Cara Website Menampilkan Konten

1. **Semua konten** diambil dengan `getCollection('posts')` atau `getCollection('projects')`
2. **Draft difilter**: hanya yang `draft: false` yang tampil
3. **Diurutkan**: berdasarkan `publishDate` dari terbaru ke terlama
4. **Halaman Home**: menampilkan 3 terbaru dari masing-masing koleksi

### Mengubah Jumlah Item di Home

Edit `src/pages/index.astro` pada bagian:

```js
const latestPosts    = allPosts.slice(0, 3);    // ← Ubah angka ini
const latestProjects = allProjects.slice(0, 3); // ← Ubah angka ini
```

---

## Estimasi Waktu Baca

Waktu baca dihitung otomatis dengan rumus:

```
Word count ÷ 200 kata/menit = menit baca
```

Tidak perlu input manual — dihitung saat build dari jumlah kata di konten.
