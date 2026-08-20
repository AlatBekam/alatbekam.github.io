# Panduan Blog

Cara menulis blog post / CTF writeup dalam format MDX.

## Content Collection

Blog post disimpan di `src/content/blog/writing/` sebagai file `.mdx`.

```
src/content/blog/writing/
├── sql-injection-writeup.mdx
├── caesar-cipher-writeup.mdx
└── ... (post baru ditambah di sini)
```

Setiap file `.mdx` = satu blog post. Nama file akan menjadi URL slug:
- `sql-injection-writeup.mdx` → `/blog/writing/sql-injection-writeup`
- `my-new-post.mdx` → `/blog/writing/my-new-post`

## Frontmatter

Setiap post harus memiliki frontmatter (metadata) di bagian atas file:

```yaml
---
title: "Judul Post"                    # Wajib — judul yang ditampilkan
description: "Deskripsi singkat"       # Wajib — deskripsi untuk preview
date: 2026-08-20                       # Wajib — tanggal publish
tags: ["Web", "SQL Injection"]         # Opsional — tag kategori
image: "/img/blog/banner.png"          # Opsional — gambar banner
draft: false                           # Opsional — true = tidak dipublish
---
```

### Referensi Frontmatter

| Field | Tipe | Wajib | Default | Deskripsi |
|---|---|---|---|---|
| `title` | string | Ya | - | Judul post |
| `description` | string | Ya | - | Deskripsi singkat (untuk SEO & card preview) |
| `date` | date | Ya | - | Tanggal publish (format: `YYYY-MM-DD`) |
| `tags` | string[] | Tidak | `[]` | Tag/kategori post |
| `image` | string | Tidak | - | Path gambar banner (letakkan di `public/`) |
| `draft` | boolean | Tidak | `false` | `true` = post tidak muncul di website |

## Cara Membuat Post Baru

1. Buat file baru di `src/content/blog/writing/`
2. Gunakan nama file yang deskriptif (contoh: `xss-writeup.mdx`)
3. Isi frontmatter (lihat di atas)
4. Isi konten di bawah frontmatter
5. Jalankan `npm run dev` untuk preview
6. Post baru akan muncul di halaman `/blog`

**Contoh langkah-langkah:**

```bash
# 1. Buat file baru
touch src/content/blog/writing/xss-writeup.mdx

# 2. Edit file tersebut (lihat template di bawah atau di folder templates/)

# 3. Jalankan dev server
npm run dev

# 4. Buka http://localhost:4321/blog
```

## Daftar Tag

Tag digunakan untuk memfilter blog post di halaman `/blog`. Beberapa tag yang umum dipakai:

### CTF Categories
- `Web` — SQL Injection, XSS, IDOR, SSRF, etc.
- `Crypto` — Caesar cipher, RSA, hash, etc.
- `Forensics` — Steganography, memory forensics, network analysis, etc.
- `Reverse Engineering` — Binary analysis, decompilation, etc.
- `Pwn` — Buffer overflow, format string, etc.

### Skill Levels
- `Beginner`
- `Intermediate`
- `Advanced`

### Teknologi
- `HTML`, `CSS`, `JavaScript`, `Python`, etc.

Tag bersifat fleksibel — kamu bisa menambah tag baru sesuai kebutuhan. Cukup tulis di array `tags` di frontmatter.

## Menggunakan Gambar

### Banner Image (Frontmatter)

Tambahkan field `image` di frontmatter:

```yaml
---
title: "My Writeup"
image: "/img/blog/writeup-banner.png"
---
```

Gambar harus diletakkan di folder `public/`. Contoh:
- `public/img/blog/writeup-banner.png`

### Inline Image (Body)

Di dalam konten MDX, gunakan syntax Markdown biasa:

```markdown
![Alt text](/img/blog/screenshot.png)
```

Atau dengan ukuran custom menggunakan HTML:

```html
<img src="/img/blog/screenshot.png" alt="Screenshot" width="600" />
```

## Code Block & Syntax Highlighting

Astro menggunakan [Shiki](https://shiki.style) untuk syntax highlighting dengan theme `github-dark`.

### Inline Code

Gunakan backtick:

```markdown
Gunakan `npm run dev` untuk menjalankan dev server.
```

### Code Block

Gunakan triple backtick dengan bahasa pemrograman:

````markdown
```python
def hello():
    print("Hello, world!")
```
````

```python
def hello():
    print("Hello, world!")
```

### Code Block dengan Judul

````markdown
```python title="solve.py"
# Solution script
print("Hello")
```
````

### Bahasa yang Didukung

Shiki mendukung hampir semua bahasa pemrograman. Beberapa yang sering dipakai untuk CTF:

| Bahasa | Tag di Code Block |
|---|---|
| Python | `python` atau `py` |
| JavaScript | `javascript` atau `js` |
| Bash/Shell | `bash` atau `sh` |
| SQL | `sql` |
| HTML | `html` |
| HTTP Request | `http` |
| JSON | `json` |
| C | `c` |

## Markdown Syntax Lainnya

### Heading

```markdown
# H1 — Judul Besar
## H2 — Judul Section
### H3 — Judul Sub-section
```

### Bold & Italic

```markdown
**bold text** dan *italic text*
```

### Link

```markdown
[teks link](https://example.com)
```

### List

```markdown
- Item 1
- Item 2

1. Step 1
2. Step 2
```

### Blockquote

```markdown
> Ini adalah blockquote. Berguna untuk catatan atau quote penting.
```

### Table

```markdown
| Kolom 1 | Kolom 2 | Kolom 3 |
|---|---|---|
| Data 1 | Data 2 | Data 3 |
```

## Tips

- **Gunakan `draft: true`** untuk post yang masih dalam proses penulisan. Post draft tidak akan muncul di website.
- **Gunakan nama file yang deskriptif** — ini akan menjadi URL, jadi hindari spasi dan karakter khusus.
- **Konsisten dengan tag** — gunakan tag yang sama untuk post yang sejenis agar mudah difilter.
- **Tambah gambar** di `public/img/blog/` untuk post yang memerlukan ilustrasi.

## Template

Lihat folder [templates/](./templates/) untuk template siap pakai:

| Template | File |
|---|---|
| CTF Writeup — Web | [templates/1.ctf-web.md](./templates/1.ctf-web.md) |
| CTF Writeup — Crypto | [templates/2.ctf-crypto.md](./templates/2.ctf-crypto.md) |
| CTF Writeup — Forensics | [templates/3.ctf-forensics.md](./templates/3.ctf-forensics.md) |
| Project Log | [templates/4.project-log.md](./templates/4.project-log.md) |
| Catatan Belajar | [templates/5.catatan-belajar.md](./templates/5.catatan-belajar.md) |
