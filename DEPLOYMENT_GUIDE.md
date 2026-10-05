# 📘 PANDUAN DEPLOY GITHUB PAGES

## ❓ Kenapa Website Tidak Tampil?

Website Vite + React butuh konfigurasi khusus untuk GitHub Pages. Berikut solusinya:

---

## ✅ SOLUSI CEPAT (5 Menit)

### Langkah 1: Pastikan Repository Public
1. Buka GitHub repository Anda
2. Klik tab **Settings** (di kanan atas)
3. Scroll ke bawah ke bagian **Danger Zone**
4. Klik **Change visibility**
5. Pilih **Public** → Konfirmasi

### Langkah 2: Enable GitHub Pages
1. Masih di **Settings**
2. Klik menu **Pages** di sidebar kiri
3. Di bagian **Build and deployment**:
   - **Source**: pilih **GitHub Actions** (BUKAN "Deploy from a branch")
4. Klik **Save**

### Langkah 3: Push Code
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### Langkah 4: Tunggu Deploy
1. Buka tab **Actions** di repository
2. Lihat workflow "Deploy to GitHub Pages" sedang berjalan
3. Tunggu sampai muncul ✅ (biasanya 2-3 menit)

### Langkah 5: Akses Website
URL website Anda:
```
https://[USERNAME].github.io/[REPO-NAME]/
```

Contoh:
```
https://saprani-official.github.io/english-village-group/
```

---

## 🔧 TROUBLESHOOTING

### ❌ Website Blank / Tidak Muncul

**Cek 1: Branch Name**
- Pastikan branch utama bernama `main` atau `master`
- Jika nama branch lain, edit file `.github/workflows/deploy.yml`:
  ```yaml
  on:
    push:
      branches: [ nama-branch-anda ]
  ```

**Cek 2: GitHub Actions Enabled**
- Buka tab **Actions**
- Jika ada warning "Workflows aren't being run", klik **Enable workflows**

**Cek 3: Build Success**
- Buka tab **Actions**
- Klik workflow terakhir
- Lihat apakah ada error (merah) atau success (hijau)
- Jika error, klik untuk lihat detail

### ❌ Logo/Gambar Tidak Muncul

**Solusi 1: Clear Cache**
- Tekan `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)
- Atau buka Incognito/Private mode

**Solusi 2: Cek Console**
- Tekan `F12` untuk buka Developer Tools
- Klik tab **Console**
- Lihat error 404 untuk file yang hilang

**Solusi 3: Pastikan File Ada**
- File logo harus ada di folder `public/`:
  - `public/kimm-logo.svg`
  - `public/kimm-icon.svg`

### ❌ Build Error di GitHub Actions

**Error: "npm ci" failed**
```bash
# Solusi: Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "Fix dependencies"
git push
```

**Error: "Build failed"**
- Buka tab **Actions**
- Klik workflow yang gagal
- Lihat log error
- Biasanya masalah di code TypeScript/CSS

---

## 📋 CHECKLIST DEPLOYMENT

Sebelum push, pastikan:

- [ ] Repository sudah **Public**
- [ ] Branch utama bernama `main` atau `master`
- [ ] File `.github/workflows/deploy.yml` ada
- [ ] File `public/kimm-logo.svg` ada
- [ ] File `public/kimm-icon.svg` ada
- [ ] File `public/404.html` ada
- [ ] File `public/.nojekyll` ada
- [ ] GitHub Pages di-set ke **GitHub Actions**
- [ ] Semua perubahan sudah di-commit dan push

---

## 🎯 ALTERNATIF: Deploy Manual

Jika GitHub Actions tidak bekerja, coba cara manual:

### Cara 1: Deploy dari Branch

1. Build website lokal:
   ```bash
   npm run build
   ```

2. Buat branch `gh-pages`:
   ```bash
   git checkout -b gh-pages
   ```

3. Copy isi folder `dist/` ke root:
   ```bash
   # Windows (PowerShell)
   Copy-Item -Path dist\* -Destination . -Recurse -Force
   
   # Mac/Linux
   cp -r dist/* .
   ```

4. Commit dan push:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

5. Di Settings → Pages:
   - **Source**: pilih **Deploy from a branch**
   - **Branch**: pilih `gh-pages` → `/ (root)`
   - Save

### Cara 2: Pakai gh-pages Package

1. Install package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Tambah script di `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run build
   npm run deploy
   ```

---

## 🔍 VERIFIKASI DEPLOYMENT

### Cek 1: Actions Tab
- Buka tab **Actions**
- Lihat workflow "Deploy to GitHub Pages"
- Harus ada ✅ hijau

### Cek 2: Pages Settings
- Buka Settings → Pages
- Lihat bagian "Your site is live at"
- URL harus muncul

### Cek 3: Akses URL
- Buka URL: `https://[username].github.io/[repo]/`
- Website harus tampil

### Cek 4: Custom Domain (Optional)
Jika punya domain sendiri:
1. Di Settings → Pages
2. Isi **Custom domain**: `www.domain-anda.com`
3. Save
4. Setup DNS di domain registrar

---

## 📞 BANTUAN

Jika masih bermasalah:

1. **Screenshot error** di tab Actions
2. **Screenshot console** browser (F12)
3. **Screenshot Settings → Pages**
4. Share ke:
   - GitHub Issues di repository ini
   - Atau hubungi developer

---

## 🎉 SUKSES!

Jika website sudah tampil, selamat! 🎊

Website Anda sekarang live di:
```
https://[username].github.io/[repo-name]/
```

### Share Website:
- WhatsApp: `https://[username].github.io/[repo-name]/`
- Instagram: Share link di bio
- Facebook: Post link
- LinkedIn: Share sebagai portfolio

---

**Catatan Penting:**
- Setiap kali push ke branch `main`, website auto-update
- Tunggu 2-3 menit setelah push untuk melihat perubahan
- Clear cache browser jika tidak update (Ctrl+Shift+R)

**Dibuat untuk:** Kampung Inggris Mangrove Margo Mulyo
**Tanggal:** 2026
