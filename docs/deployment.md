# Deployment

Cara build dan deploy website ke GitHub Pages.

## Build untuk Production

```bash
npm run build
```

Output akan di-generate di folder `dist/`. Folder ini berisi HTML, CSS, JS, dan assets yang sudah di-compile — siap di-deploy.

## Deploy ke GitHub Pages

### Opsi 1: GitHub Actions (Recommended)

GitHub Actions akan otomatis build dan deploy setiap kali kamu push ke branch `main`.

**Langkah-langkah:**

1. Buat folder `.github/workflows/` di root project:

```bash
mkdir -p .github/workflows
```

2. Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build with Astro
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Push ke GitHub:

```bash
git add .
git commit -m "ci: add GitHub Actions deploy workflow"
git push
```

4. **Aktifkan GitHub Pages di repository settings:**
   - Buka repository di GitHub
   - Klik **Settings** → **Pages**
   - Di **Source**, pilih **GitHub Actions**
   - Save

Setelah itu, setiap push ke `main` akan otomatis deploy ke `https://alatbekam.github.io`.

### Opsi 2: Manual (Branch `gh-pages`)

Jika tidak ingin pakai GitHub Actions, kamu bisa push folder `dist/` ke branch `gh-pages`:

```bash
# 1. Build
npm run build

# 2. Install git.io (jika belum ada)
npm install -g gh-pages

# 3. Deploy
npx gh-pages -d dist
```

Atau manual:

```bash
npm run build
cd dist
git init
git checkout -b gh-pages
git add .
git commit -m "deploy"
git push -f origin gh-pages
cd ..
```

**Setting branch di GitHub:**
- Settings → Pages → Source: **Deploy from a branch**
- Branch: `gh-pages` / `root`

### Opsi 3: Netlify / Vercel

Jika menggunakan Netlify atau Vercel:

1. Connect repository ke Netlify/Vercel
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy otomatis setiap push

## Konfigurasi `site` dan `base`

Di `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://alatbekam.github.io',  // URL deployed site
  // base: '/my-repo',                   // Hapus atau comment jika deploy ke *.github.io
  ...
});
```

**Aturan `base`:**
- **Jangan** pakai `base` untuk repository `username.github.io` (deploy ke root domain)
- **Pakai** `base` untuk repository biasa (deploy ke `username.github.io/repo-name`)
- Contoh: repository `my-portfolio` → `base: '/my-portfolio'`

## Custom Domain (Opsional)

Jika ingin pakai custom domain:

1. Buat file `public/CNAME` berisi domain kamu:

```
www.example.com
```

2. Update `site` di `astro.config.mjs`:

```js
site: 'https://www.example.com',
```

3. Setup DNS di domain registrar (A record atau CNAME record ke `username.github.io`)

## Verifikasi Deploy

Setelah deploy, buka URL site kamu dan cek:

- [ ] Homepage tampil dengan benar
- [ ] Navigation links berfungsi
- [ ] Blog listing muncul
- [ ] Blog post bisa dibuka
- [ ] Projects listing muncul
- [ ] Gambar loading dengan benar
- [ ] Mobile responsive
