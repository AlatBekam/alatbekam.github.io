# Development

Cara menjalankan development server, hot reload, dan build.

## Dev Server

```bash
npm run dev
```

Astro akan menjalankan dev server di `http://localhost:4321`.

### Hot Module Replacement (HMR)

Saat dev server berjalan, setiap perubahan file akan otomatis ter-refresh di browser tanpa perlu reload manual. Ini disebut **Hot Module Replacement (HMR)**.

Yang di-auto refresh:
- Edit file `.astro` → UI langsung update
- Edit file `.mdx` → konten blog langsung update
- Edit file `.css` → style langsung update
- Tambah/hapus file di `src/pages/` → route baru muncul

Yang **tidak** di-auto refresh (perlu restart dev server):
- Edit `astro.config.mjs`
- Edit `tailwind.config.mjs`
- Edit `src/content.config.ts` (schema)
- Install package baru (`npm install`)

## Build

```bash
npm run build
```

Meng-compile semua halaman ke HTML statis di folder `dist/`.

Output:
```
dist/
├── index.html              # Homepage
├── about/index.html        # About page
├── blog/index.html         # Blog listing
├── blog/writing/           # Individual blog posts
├── projects/index.html     # Projects listing
└── img/                    # Copy dari public/img/
```

Folder `dist/` siap di-deploy ke hosting mana pun (GitHub Pages, Netlify, Vercel, dll).

## Preview

```bash
npm run preview
```

Menjalankan server lokal untuk preview hasil build. Berguna untuk mengecek semua halaman sebelum deploy.

**Perbedaan `dev` vs `preview`:**

| | `npm run dev` | `npm run preview` |
|---|---|---|
| Build dulu? | Tidak | Ya (`npm run build` dulu) |
| HMR | Ya | Tidak |
| Kecepatan | Instan | Perlu build dulu |
| Gunakan saat | Development | Testing sebelum deploy |

## Workflow Typical

```bash
# 1. Mulai development
npm run dev

# 2. Edit files, lihat hasil di browser
#    - Buat post baru di src/content/blog/writing/
#    - Edit components di src/components/
#    - Tambah page baru di src/pages/

# 3. Build untuk memastikan tidak ada error
npm run build

# 4. Preview hasil build
npm run preview

# 5. Commit dan push
git add .
git commit -m "add: new blog post"
git push
```

## Troubleshooting

### "Cannot find module" error
```bash
# Install ulang dependencies
rm -rf node_modules
npm install
```

### Port sudah terpakai
```bash
# Jalankan di port lain
npx astro dev --port 3000
```

### Build error
Pastikan tidak ada syntax error di file `.astro` atau `.mdx`. Cek error message di terminal — Astro biasanya memberikan lokasi error yang jelas (file + baris).
