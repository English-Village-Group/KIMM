# 📋 PANDUAN DEPLOYMENT GITHUB PAGES

## ⚠️ MASALAH UTAMA: Base Path

Website tidak tampil karena **Vite menggunakan absolute path** (`/assets/...`) tapi GitHub Pages deploy ke **subdirectory** (`/english-village-group/assets/...`).

## 🔧 SOLUSI: Edit vite.config.ts

### Langkah 1: Buka file `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/english-village-group/', // ← TAMBAHKAN BARIS INI
})
```

### Langkah 2: Ganti nama repository

Jika nama repository Anda **BUKAN** `english-village-group`, ganti dengan nama repository Anda:

**Contoh:**
- Repository: `https://github.com/saprani-official/my-website`
- Base path: `base: '/my-website/',`

- Repository: `https://github.com/john-doe/kimm-site`
- Base path: `base: '/kimm-site/',`

### Langkah 3: Commit dan Push

```bash
git add vite.config.ts
git commit -m "fix: configure base path for GitHub Pages"
git push origin main
```

### Langkah 4: Tunggu GitHub Actions

1. Buka repository di GitHub
2. Klik tab **"Actions"**
3. Lihat workflow "Deploy to GitHub Pages"
4. Tunggu sampai selesai (✓ hijau)

### Langkah 5: Akses Website

Website Anda akan tersedia di:
```
https://USERNAME.github.io/REPOSITORY-NAME/
```

**Contoh:**
```
https://saprani-official.github.io/english-village-group/
```

---

## 🎯 AKTIVASI GITHUB PAGES

Jika website masih tidak tampil setelah deploy:

1. **Buka Settings repository**
   ```
   https://github.com/USERNAME/REPOSITORY-NAME/settings
   ```

2. **Klik menu "Pages"** (sidebar kiri)

3. **Pada bagian "Build and deployment":**
   - Source: Pilih **"GitHub Actions"**
   - (BUKAN "Deploy from a branch")

4. **Tunggu 1-2 menit**

5. **Refresh browser** dengan `Ctrl + Shift + R`

---

## 🐛 TROUBLESHOOTING

### ❌ Website blank / putih saja

**Penyebab:** Base path belum dikonfigurasi

**Solusi:**
```bash
# Edit vite.config.ts
# Tambahkan: base: '/nama-repository/',

# Rebuild
npm run build

# Commit dan push
git add .
git commit -m "fix: add base path"
git push origin main
```

### ❌ Logo tidak muncul

**Penyebab:** File logo tidak ter-copy ke dist

**Solusi:**
```bash
# Pastikan file ada di public/
ls public/kimm-logo.svg
ls public/kimm-icon.svg

# Rebuild
npm run build

# Check dist folder
ls dist/kimm-logo.svg
ls dist/kimm-icon.svg

# Jika tidak ada, commit dan push lagi
git add public/
git commit -m "fix: add logo files"
git push origin main
```

### ❌ CSS/JS tidak load (404)

**Penyebab:** Base path salah

**Solusi:**
1. Cek nama repository di URL GitHub
2. Pastikan `base` di `vite.config.ts` sama persis
3. Jangan lupa tanda `/` di awal dan akhir

**Benar:**
```typescript
base: '/english-village-group/',
```

**Salah:**
```typescript
base: 'english-village-group',  // ❌ kurang /
base: '/english-village-group', // ❌ kurang / di akhir
```

### ❌ GitHub Actions gagal

**Penyebab:** Berbagai kemungkinan

**Solusi:**
1. Buka tab **"Actions"** di GitHub
2. Klik workflow yang gagal
3. Lihat error message
4. Common errors:
   - `npm ci` gagal → Check `package-lock.json` ada
   - Build error → Check console di lokal dulu
   - Permission error → Check repository permissions

---

## 📱 TEST LOKAL SEBELUM PUSH

Sebelum push ke GitHub, test di lokal:

```bash
# Build production
npm run build

# Preview build
npm run preview
```

Buka browser ke URL yang muncul (biasanya `http://localhost:4173`)

Jika tampil sempurna di lokal, baru push ke GitHub.

---

## 🌐 CUSTOM DOMAIN (Opsional)

Jika ingin menggunakan domain sendiri (contoh: `kimm-balikpapan.id`):

### Langkah 1: Buat file `public/CNAME`

```
kimm-balikpapan.id
```

### Langkah 2: Update DNS

Di registrar domain Anda, tambahkan:

**Type:** CNAME  
**Name:** www  
**Value:** `USERNAME.github.io`

**Type:** A  
**Name:** @  
**Value:** 
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

### Langkah 3: Enable HTTPS

1. Buka Settings → Pages
2. Centang "Enforce HTTPS"

---

## ✅ CHECKLIST DEPLOYMENT

- [ ] Edit `vite.config.ts` → tambah `base: '/nama-repo/',`
- [ ] Commit dan push perubahan
- [ ] Tunggu GitHub Actions selesai (✓)
- [ ] Aktifkan GitHub Pages di Settings
- [ ] Pilih source: "GitHub Actions"
- [ ] Test di browser (Ctrl + Shift + R)
- [ ] Check logo muncul
- [ ] Check semua halaman berfungsi
- [ ] Test di mobile

---

## 📞 BANTUAN

Jika masih ada masalah:

1. **Check GitHub Actions logs** - lihat error detail
2. **Browser Console** (F12) - lihat error JavaScript
3. **Network tab** (F12) - cek file yang 404
4. **Clear cache** - Ctrl + Shift + R

---

**Good luck! 🚀**
