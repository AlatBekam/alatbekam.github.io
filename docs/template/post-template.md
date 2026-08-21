# Template Post

> **Cara Menggunakan Template Ini:**
> 1. Copy seluruh isi file ini
> 2. Buat file baru di `src/content/posts/nama-post-kamu.md`
> 3. Paste dan sesuaikan semua field yang ditandai `[GANTI INI]`
> 4. Hapus semua komentar dan bagian yang tidak diperlukan
> 5. Tulis konten di bawah garis `---` penutup

---

```markdown
---
title: "[GANTI INI] Judul Post yang Jelas dan Deskriptif"
description: "[GANTI INI] Deskripsi 1-2 kalimat. Ini akan tampil di card list dan meta SEO."
publishDate: YYYY-MM-DD
# updatedDate: YYYY-MM-DD   # Uncomment jika pernah direvisi
tags:
  - "[GANTI INI] Tag1"
  - "[GANTI INI] Tag2"
# draft: true   # Uncomment untuk menyembunyikan dari website
---
```

---

## Template 1: CTF Writeup

Salin bagian ini untuk menulis CTF writeup:

```markdown
---
title: "NamaCTF YYYY – Nama Challenge"
description: "Writeup challenge [kategori] dari [NamaCTF YYYY]. Meliputi [teknik utama]."
publishDate: YYYY-MM-DD
tags:
  - CTF
  - web          # Kategori: web, pwn, rev, crypto, misc, forensics, osint
  - sql-injection # Teknik spesifik
---

## Overview

| Info | Detail |
|------|--------|
| **CTF** | NamaCTF YYYY |
| **Kategori** | Web / Pwn / Rev / Crypto / dll |
| **Poin** | 500 |
| **Solve** | 42 teams |
| **Author** | challenge_author |

Deskripsi singkat challenge dan apa yang dibutuhkan untuk solve.

## Reconnaissance

Langkah pertama yang dilakukan saat mendapat challenge...

### Analisis Awal

```bash
# Perintah yang digunakan
file challenge_file
strings challenge_file | head -50
```

## Analysis

Penjelasan mendalam tentang vulnerability atau mekanisme challenge...

### Source Code Review

```python
# Snippet kode yang relevan
def vulnerable_function(user_input):
    query = f"SELECT * FROM users WHERE id = {user_input}"
    return db.execute(query)
```

Penjelasan kenapa kode di atas vulnerable...

## Exploitation

### Step 1: [Nama Langkah]

Penjelasan langkah pertama...

```python
import requests

TARGET = "http://challenge.ctf.example.com:1337"

payload = "' UNION SELECT 1,2,3--"
r = requests.get(f"{TARGET}/vuln", params={"id": payload})
print(r.text)
```

Output:
```
[output yang relevan]
```

### Step 2: [Nama Langkah]

Penjelasan langkah selanjutnya...

```python
# Script exploit lengkap
def exploit():
    ...
```

## Flag

```
FLAG{contoh_flag_diganti_dengan_yang_asli}
```

## Referensi

- [Nama Referensi](https://link-ke-resource.com)
- [Dokumentasi Teknik](https://link-dokumentasi.com)
```

---

## Template 2: Artikel / Catatan

Salin bagian ini untuk artikel atau catatan teknis:

```markdown
---
title: "Cara [Melakukan Sesuatu] dengan [Teknologi]"
description: "Panduan singkat tentang [topik]. Meliputi [sub-topik utama]."
publishDate: YYYY-MM-DD
tags:
  - tutorial
  - linux       # Ganti sesuai topik
---

## Pendahuluan

Penjelasan singkat tentang apa yang akan dibahas dan kenapa ini berguna.

## Prasyarat

Sebelum memulai, pastikan kamu sudah punya:
- Item 1
- Item 2
- Pengetahuan tentang X

## [Topik Utama 1]

Penjelasan...

```bash
# Contoh perintah
command --flag argument
```

## [Topik Utama 2]

Penjelasan...

### Sub-topik

Detail lebih lanjut...

## Kesimpulan

Ringkasan apa yang sudah dipelajari dan langkah selanjutnya.

## Referensi

- [Nama Link](https://url.com)
```

---

## Panduan Cepat: Frontmatter

```yaml
# WAJIB
title: "Judul Post"              # Tampil di card dan halaman detail
description: "Deskripsi singkat" # Tampil di card dan meta SEO (max ~160 karakter)
publishDate: 2026-08-21          # Format: YYYY-MM-DD

# OPSIONAL
updatedDate: 2026-08-22          # Jika ada revisi
tags:                            # Tag untuk kategorisasi
  - CTF
  - web
draft: false                     # true = tidak tampil di website
```

## Tips Menulis

### Judul yang Baik
- ✅ `"BucketCTF 2026 – Web Challenge: SSRF via PDF Renderer"`
- ✅ `"Linux Privilege Escalation: SUID Binary Exploitation"`
- ❌ `"writeup"` (terlalu umum)
- ❌ `"My CTF writeup for the web challenge"` (terlalu panjang)

### Deskripsi yang Baik (untuk SEO & card preview)
- Max 160 karakter
- Sebutkan teknik/topik spesifik
- ✅ `"Writeup SSRF challenge: exploit PDF renderer untuk baca file internal dan bypass autentikasi admin."`
- ❌ `"Writeup CTF yang saya ikuti kemarin"` (tidak informatif)

### Tags yang Konsisten
Gunakan tag yang konsisten agar mudah difilter nanti:

| Kategori CTF | Tools | Teknik |
|-------------|-------|--------|
| `CTF` | `burpsuite` | `sqli` |
| `web` | `python` | `xss` |
| `pwn` | `gdb` | `bof` |
| `rev` | `ghidra` | `rop` |
| `crypto` | `pwntools` | `heap` |
| `forensics` | `wireshark` | `ssrf` |
| `misc` | `sqlmap` | `lfi` |

### Struktur Heading untuk ToC
Gunakan `## H2` dan `### H3` agar otomatis masuk Table of Contents:

```markdown
## Overview         ← masuk ToC
## Analysis         ← masuk ToC
### Source Code     ← masuk ToC (sub-item)
### Network Traffic ← masuk ToC (sub-item)
## Exploitation     ← masuk ToC
### Step 1          ← masuk ToC (sub-item)
## Flag             ← masuk ToC
## Referensi        ← masuk ToC
```
