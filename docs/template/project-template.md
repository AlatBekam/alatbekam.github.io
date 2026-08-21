# Template Project

> **Cara Menggunakan Template Ini:**
> 1. Copy seluruh isi file ini
> 2. Buat file baru di `src/content/projects/nama-project-kamu.md`
> 3. Sesuaikan semua field yang ditandai `[GANTI INI]`
> 4. Letakkan gambar thumbnail di `public/images/projects/nama-gambar.png`
> 5. Hapus semua komentar dan bagian yang tidak diperlukan

---

## Frontmatter Lengkap

```yaml
---
title: "[GANTI INI] Nama Project"
description: "[GANTI INI] Deskripsi singkat 1-2 kalimat tentang project ini."
publishDate: YYYY-MM-DD
# updatedDate: YYYY-MM-DD       # Uncomment jika ada update besar
tags:
  - "[GANTI INI] Python"        # Bahasa pemrograman
  - "[GANTI INI] Web"           # Kategori/domain
  - "[GANTI INI] CTF Tools"     # Tag tambahan
thumbnail: "nama-gambar.png"    # Nama file di public/images/projects/ (opsional)
repoUrl: "https://github.com/alatbekam/nama-repo"  # Opsional
liveUrl: "https://link-demo.com"                    # Opsional
# draft: true                   # Uncomment untuk menyembunyikan
---
```

---

## Template 1: Tool / Utilitas

Untuk tools, script, atau utilitas yang dibuat:

```markdown
---
title: "NamaTools – Deskripsi Singkat"
description: "Tool [Python/Go/Bash] untuk [fungsi utama]. Mendukung [fitur unggulan]."
publishDate: YYYY-MM-DD
tags:
  - Python
  - CLI Tool
  - CTF Tools
thumbnail: "namatools-preview.png"
repoUrl: "https://github.com/alatbekam/namatools"
---

## Tentang Project

Penjelasan singkat apa yang dilakukan tool ini dan kenapa dibuat.

**Motivasi:** Sering mengerjakan CTF challenge yang membutuhkan... sehingga saya membuat tool ini.

## Fitur

- ✅ Fitur utama pertama
- ✅ Fitur kedua
- ✅ Fitur ketiga
- 🚧 Fitur yang masih dalam pengembangan

## Instalasi

```bash
# Clone repository
git clone https://github.com/alatbekam/namatools.git
cd namatools

# Install dependencies
pip install -r requirements.txt
# atau
go install github.com/alatbekam/namatools@latest
```

## Penggunaan

```bash
# Penggunaan dasar
python namatools.py --help

# Contoh 1
python namatools.py -t http://target.com -o output.txt

# Contoh 2
python namatools.py --mode scan --verbose
```

### Output Contoh

```
[+] Starting scan...
[*] Target: http://target.com
[+] Found: /admin (200 OK)
[+] Found: /api/v1 (200 OK)
[!] Potential vulnerability: SQL Injection at /search
[+] Done. 2 issues found.
```

## Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Bahasa | Python 3.10+ |
| Dependencies | requests, argparse, colorama |
| Platform | Linux, macOS, Windows |

## Keterbatasan

- Belum support autentikasi OAuth
- Rate limiting belum diimplementasi

## Changelog

### v1.1.0 (YYYY-MM-DD)
- Tambah fitur X
- Fix bug Y

### v1.0.0 (YYYY-MM-DD)
- Initial release
```

---

## Template 2: Website / Web App

Untuk project web yang sudah atau bisa di-deploy:

```markdown
---
title: "NamaWebsite – Deskripsi Singkat"
description: "Website [fungsi] dibangun dengan [tech stack]. [Fitur unggulan]."
publishDate: YYYY-MM-DD
tags:
  - Astro
  - Tailwind CSS
  - Web
thumbnail: "namawebsite-preview.png"
repoUrl: "https://github.com/alatbekam/namawebsite"
liveUrl: "https://namawebsite.vercel.app"
---

## Tentang Project

Deskripsi project secara lebih detail dari frontmatter.

**Dibuat untuk:** [Keperluan / Use case]

## Screenshot

![Halaman Utama](/images/projects/namawebsite-home.png)

![Halaman Detail](/images/projects/namawebsite-detail.png)

## Fitur

- ✅ Fitur 1: deskripsi singkat
- ✅ Fitur 2: deskripsi singkat
- ✅ Responsive untuk mobile
- ✅ Dark mode support

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Astro / Next.js / Vite |
| Styling | Tailwind CSS |
| Database | - |
| Hosting | GitHub Pages / Vercel / Netlify |

## Cara Menjalankan Lokal

```bash
git clone https://github.com/alatbekam/namawebsite.git
cd namawebsite
npm install
npm run dev
```

## Deployment

Project ini di-deploy secara otomatis ke [platform] via [GitHub Actions / Vercel CLI].

URL production: [https://namawebsite.vercel.app](https://namawebsite.vercel.app)

## Pelajaran yang Didapat

Ceritakan apa yang dipelajari selama mengerjakan project ini...
```

---

## Template 3: Research / Studi

Untuk project riset, analisis, atau studi kasus:

```markdown
---
title: "Analisis [Topik]: [Sub-topik]"
description: "Studi kasus [topik] meliputi [aspek yang dianalisis]."
publishDate: YYYY-MM-DD
tags:
  - Research
  - Security
  - Malware Analysis  # Ganti sesuai topik
thumbnail: "research-preview.png"
---

## Abstrak

Ringkasan singkat (3-5 kalimat) tentang tujuan, metodologi, dan temuan utama penelitian ini.

## Latar Belakang

Konteks dan motivasi mengapa topik ini penting untuk diteliti...

## Metodologi

Penjelasan bagaimana penelitian/analisis dilakukan:

1. **Tahap 1:** Setup environment
2. **Tahap 2:** Pengumpulan data
3. **Tahap 3:** Analisis
4. **Tahap 4:** Verifikasi temuan

## Analisis

### [Sub-topik 1]

Temuan dan penjelasan...

```python
# Kode yang digunakan untuk analisis
import analysis_tool
result = analysis_tool.analyze(target)
```

### [Sub-topik 2]

Temuan dan penjelasan...

## Temuan

| Temuan | Severity | Detail |
|--------|----------|--------|
| Temuan 1 | High | Deskripsi |
| Temuan 2 | Medium | Deskripsi |

## Kesimpulan

Rangkuman temuan dan implikasinya...

## Referensi

- [Nama Paper/Artikel](https://url.com)
- [CVE-YYYY-XXXXX](https://nvd.nist.gov/vuln/detail/CVE-YYYY-XXXXX)
```

---

## Panduan Cepat: Frontmatter

```yaml
# WAJIB
title: "Nama Project"            # Nama project yang jelas
description: "Deskripsi singkat" # 1-2 kalimat, tampil di card
publishDate: 2026-08-21          # Format: YYYY-MM-DD

# OPSIONAL (tapi sangat direkomendasikan)
tags:
  - Python
  - Web
thumbnail: "preview.png"         # Nama file gambar di public/images/projects/
repoUrl: "https://github.com/..."
liveUrl: "https://..."

# OPSIONAL
updatedDate: 2026-09-01
draft: false
```

---

## Tips untuk Thumbnail

### Spesifikasi Ideal

| Aspek | Rekomendasi |
|-------|-------------|
| Ukuran | 800 × 500 px |
| Rasio | 16:10 |
| Format | PNG (screenshot) atau WebP (foto) |
| Ukuran file | < 500 KB |
| Background | Kontras dengan teks (agar terbaca) |

### Cara Membuat Thumbnail Bagus

1. **Screenshot aplikasi/tool** — Paling mudah dan autentik
2. **Screenshot kode** — Gunakan [Carbon](https://carbon.now.sh) untuk kode yang cantik
3. **Diagram arsitektur** — Buat dengan [Excalidraw](https://excalidraw.com)
4. **Mockup** — Gunakan template mockup dari Figma

### Kompres Gambar

```bash
# Install imagemagick
# Atau gunakan squoosh.app / tinypng.com secara online

# Convert dan kompres dengan ImageMagick
convert input.png -resize 800x500 -quality 85 public/images/projects/output.png
```

---

## Tags yang Disarankan

### Bahasa Pemrograman
`Python`, `Go`, `Rust`, `JavaScript`, `TypeScript`, `C`, `C++`, `Bash`, `PHP`, `Java`

### Framework / Library
`Astro`, `React`, `Next.js`, `FastAPI`, `Flask`, `Django`, `Express`

### Domain
`Web`, `CTF Tools`, `Security`, `Automation`, `CLI Tool`, `API`, `Browser Extension`

### Platform
`Linux`, `Windows`, `Cross-platform`, `Web App`, `Mobile`

### Tipe Project
`Research`, `Open Source`, `Personal`, `Team Project`, `Academic`
