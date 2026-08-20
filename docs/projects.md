# Panduan Projects

Cara menambah dan mengelola project showcase.

## Content Collection

Project post disimpan di `src/content/projects/writing/` sebagai file `.mdx`.

```
src/content/projects/writing/
├── coffee-shop-landing.mdx
├── tiltjs-demo.mdx
├── css-flexbox-grid.mdx
└── ... (project baru ditambah di sini)
```

## Frontmatter

```yaml
---
title: "Nama Project"                  # Wajib
description: "Deskripsi singkat"       # Wajib
date: 2026-07-20                       # Wajib — tanggal project dibuat/dipublish
tags: ["HTML", "CSS", "Frontend"]      # Opsional — teknologi yang dipakai
image: "/img/Projects/screenshot.png"  # Opsional — thumbnail/screenshot
link: "https://..."                    # Opsional — URL live demo
github: "https://github.com/..."      # Opsional — URL source code
---
```

### Referensi Frontmatter

| Field | Tipe | Wajib | Default | Deskripsi |
|---|---|---|---|---|
| `title` | string | Ya | - | Nama project |
| `description` | string | Ya | - | Deskripsi singkat |
| `date` | date | Ya | - | Tanggal (format: `YYYY-MM-DD`) |
| `tags` | string[] | Tidak | `[]` | Teknologi/stack yang dipakai |
| `image` | string | Tidak | - | Path gambar thumbnail |
| `link` | string | Tidak | - | URL live demo |
| `github` | string | Tidak | - | URL source code |

> **Catatan:** Berbeda dengan blog, project tidak memiliki field `draft`. Semua project yang ada akan selalu ditampilkan.

## Cara Menambah Project Baru

1. Buat file baru di `src/content/projects/writing/`
2. Isi frontmatter (lihat di atas)
3. Isi konten (overview, features, tech stack, dll)
4. Jalankan `npm run dev` untuk preview

### Contoh Lengkap

Buat file `src/content/projects/writing/my-app.mdx`:

```mdx
---
title: "My Awesome App"
description: "A web application for managing tasks"
date: 2026-08-20
tags: ["React", "Node.js", "MongoDB"]
image: "/img/Projects/my-app-screenshot.png"
link: "https://my-app.example.com"
github: "https://github.com/AlatBekam/my-app"
---

## Overview

Deskripsi tentang project ini.

## Features

- Fitur 1
- Fitur 2
- Fitur 3

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB

## What I Learned

- Hal baru yang dipelajari dari project ini
```

## Menggunakan Gambar

Gambar project harus diletakkan di `public/img/Projects/`:

```
public/img/Projects/
├── my-app-screenshot.png
├── Coffe.png
├── TiltJS.png
└── flexbox-grid.png
```

Di frontmatter, cukup tulis path relatif dari root:

```yaml
image: "/img/Projects/my-app-screenshot.png"
```

## Tips

- **Konsisten dengan tag** — gunakan nama teknologi yang sama (misal: selalu pakai `JavaScript`, bukan campuran `JS` dan `javascript`)
- **Tambah gambar** — project dengan screenshot lebih menarik daripada yang hanya teks
- **Isi `link` dan `github`** — memudahkan orang lain untuk mencoba dan melihat kode
- **Deskripsi yang jelas** — buat deskripsi yang menjelaskan apa project ini dalam satu kalimat
