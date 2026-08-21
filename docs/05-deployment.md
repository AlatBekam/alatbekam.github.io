# 05 – Deployment ke GitHub Pages

Panduan lengkap cara deploy website ke GitHub Pages secara otomatis maupun manual.

---

## Gambaran Umum

Website di-deploy ke **GitHub Pages** menggunakan **GitHub Actions**. Setiap kali ada push ke branch `main`, workflow otomatis akan:

1. Checkout kode
2. Setup Node.js 22
3. Install dependencies (`npm ci`)
4. Build site (`npm run build`)
5. Upload hasil build ke GitHub Pages artifact
6. Deploy ke GitHub Pages

---

## Konfigurasi Workflow

**File:** [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]       # Trigger saat push ke main
  workflow_dispatch:        # Trigger manual via GitHub UI

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false  # Tidak cancel deploy yang sedang berjalan

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci             # Install exact versions dari package-lock.json
      - run: npm run build      # Output ke dist/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v5
```

---

## Setup Awal (Sekali Saja)

### 1. Aktifkan GitHub Pages

Di repository GitHub:
1. Buka **Settings** → **Pages**
2. Pada **Source**, pilih: **GitHub Actions**
3. Simpan

### 2. Pastikan Nama Repository Benar

Untuk GitHub Pages user/org, nama repo harus: `<username>.github.io`

Contoh: `alatbekam.github.io`

### 3. Pastikan `site` di Astro Config Benar

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://alatbekam.github.io',  // ← Wajib benar!
  ...
});
```

URL yang salah akan menyebabkan masalah pada sitemap dan canonical URL.

---

## Alur Deploy

### Deploy Otomatis

```bash
# Edit file, commit, lalu push
git add .
git commit -m "feat: tambah post baru"
git push origin main

# → GitHub Actions otomatis berjalan
# → Website ter-update dalam ~1-2 menit
```

### Monitor Status Deploy

1. Buka repository di GitHub
2. Klik tab **Actions**
3. Lihat workflow yang berjalan
4. Klik untuk melihat detail log

### Deploy Manual

Di GitHub → tab **Actions** → pilih workflow **"Deploy to GitHub Pages"** → klik **"Run workflow"**

---

## Custom Domain (Opsional)

Jika ingin menggunakan domain sendiri (mis: `alatbekam.dev`):

### 1. Buat File CNAME

```bash
# Buat file public/CNAME (tanpa ekstensi)
echo "alatbekam.dev" > public/CNAME
```

### 2. Update astro.config.mjs

```js
export default defineConfig({
  site: 'https://alatbekam.dev',  // ← Ganti ke domain kamu
  ...
});
```

### 3. Konfigurasi DNS

Di provider domain kamu, tambahkan record:
```
Type: CNAME
Name: @  (atau subdomain)
Value: alatbekam.github.io
```

### 4. Aktifkan HTTPS di GitHub

Settings → Pages → centang **"Enforce HTTPS"**

---

## Troubleshooting Deploy

### Build Gagal di GitHub Actions

**Cek di Actions tab** untuk melihat error. Kemungkinan penyebab:

| Error | Solusi |
|-------|--------|
| `npm ci` gagal | Commit `package-lock.json` ke repo |
| TypeScript error | Jalankan `npx astro check` lokal dulu |
| Frontmatter tidak valid | Cek skema di `content.config.ts` |
| Missing file | Pastikan semua file ter-commit |

### Website Tidak Update Setelah Push

1. Cek apakah push ke branch `main` (bukan branch lain)
2. Cek tab Actions apakah ada error
3. Tunggu beberapa menit — GitHub Pages bisa sedikit lambat
4. Hard refresh browser: `Ctrl + Shift + R`

### 404 di Semua Halaman

Kemungkinan `site` di `astro.config.mjs` salah. Pastikan:
```js
site: 'https://alatbekam.github.io'  // Persis sama dengan URL repo GitHub Pages
```

### Gambar Tidak Muncul

Pastikan gambar ada di folder `public/` dan path di Markdown menggunakan path absolut:
```markdown
<!-- ✅ Benar (dari public/) -->
![alt](/images/projects/gambar.png)

<!-- ❌ Salah (path relatif tidak bekerja) -->
![alt](../../public/images/projects/gambar.png)
```

---

## Best Practices

1. **Selalu test lokal** sebelum push: `npm run build && npm run preview`
2. **Commit `package-lock.json`** — GitHub Actions menggunakan `npm ci` yang membutuhkan file ini
3. **Gunakan draft: true** untuk konten yang belum selesai
4. **Jangan commit folder `dist/`** — sudah ada di `.gitignore`
