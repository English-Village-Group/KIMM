# 🚀 QUICK START - Deploy ke GitHub Pages

## ⚡ Cara Tercepat (3 Langkah)

### 1️⃣ Set Repository ke Public
```
Settings → General → Scroll ke bawah → Change visibility → Public
```

### 2️⃣ Enable GitHub Pages
```
Settings → Pages → Source: GitHub Actions → Save
```

### 3️⃣ Push Code
```bash
git add .
git commit -m "Deploy website"
git push origin main
```

**Tunggu 2-3 menit**, lalu buka:
```
https://[USERNAME].github.io/[REPO-NAME]/
```

---

## ❗ MASALAH UMUM

### Website Blank/Tidak Muncul?

**Penyebab:** Base path Vite tidak sesuai dengan GitHub Pages

**Solusi:** Edit file `vite.config.ts` tambahkan base path:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/english-village-group/', // ← TAMBAHKAN INI (sesuai nama repo Anda)
})
```

**Nama repo Anda:** `english-village-group`

**Jadi base path:** `/english-village-group/`

### Contoh Lengkap vite.config.ts:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/english-village-group/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

Setelah itu:
```bash
git add vite.config.ts
git commit -m "Fix base path for GitHub Pages"
git push origin main
```

---

## ✅ CHECKLIST

- [ ] Repository sudah **Public**
- [ ] GitHub Pages di-set ke **GitHub Actions**
- [ ] File `.github/workflows/deploy.yml` ada
- [ ] Base path di `vite.config.ts` sudah benar
- [ ] Push code ke branch `main`

---

## 🔗 URL Website Anda

Setelah deploy, website akan live di:
```
https://saprani-official.github.io/english-village-group/
```

---

## 📖 Dokumentasi Lengkap

Lihat file:
- `README.md` - Informasi project
- `DEPLOYMENT_GUIDE.md` - Panduan lengkap troubleshooting

---

**Butuh bantuan?** Lihat `DEPLOYMENT_GUIDE.md` untuk troubleshooting detail.
