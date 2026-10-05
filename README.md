# 🌿 Kampung Inggris Mangrove Margo Mulyo - Website

Website resmi untuk program Kampung Inggris Mangrove Margo Mulyo, Balikpapan.

## 🚀 Deploy ke GitHub Pages

### ⚠️ PENTING: Konfigurasi Base Path

Sebelum deploy, Anda **HARUS** mengubah file `vite.config.ts`:

**Buka file `vite.config.ts` dan tambahkan baris `base`:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/english-village-group/', // ← TAMBAHKAN INI (sesuaikan dengan nama repository Anda)
})
```

**Cara mengetahui nama repository Anda:**
- Lihat URL GitHub: `https://github.com/USERNAME/REPOSITORY-NAME`
- Contoh: `https://github.com/saprani-official/english-village-group`
- Maka base path: `/english-village-group/`

### 📝 Langkah-langkah Deploy

1. **Commit perubahan vite.config.ts:**
   ```bash
   git add vite.config.ts
   git commit -m "fix: add base path for GitHub Pages"
   git push origin main
   ```

2. **GitHub Actions akan otomatis:**
   - Build website
   - Deploy ke GitHub Pages
   - Tunggu 2-3 menit

3. **Akses website Anda:**
   ```
   https://USERNAME.github.io/REPOSITORY-NAME/
   ```
   
   Contoh: `https://saprani-official.github.io/english-village-group/`

### 🔧 Troubleshooting

#### Website tidak tampil / 404?

✅ **Pastikan sudah menambahkan `base` di vite.config.ts**

✅ **Cek GitHub Actions:**
- Buka tab "Actions" di repository
- Lihat apakah workflow berhasil (✓) atau gagal (✗)

✅ **Aktifkan GitHub Pages:**
- Buka Settings → Pages
- Source: "GitHub Actions"
- Tunggu deployment selesai

✅ **Clear cache browser:**
- Tekan `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)
- Atau buka di Incognito/Private mode

#### Logo tidak muncul?

✅ **Pastikan file logo ada di folder `public/`:**
- `public/kimm-logo.svg`
- `public/kimm-icon.svg`

✅ **Rebuild setelah push:**
```bash
npm run build
git add .
git commit -m "fix: add logo files"
git push origin main
```

### 📂 Struktur File Penting

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   ├── .nojekyll               # Prevent Jekyll processing
│   ├── kimm-logo.svg          # Logo utama
│   └── kimm-icon.svg          # Favicon
├── src/
│   ├── App.tsx                 # Main component
│   └── index.css              # Styles
├── index.html
├── package.json
└── vite.config.ts             # ⚠️ HARUS EDIT BASE PATH
```

### 🎨 Fitur Website

- ✅ Bilingual (Indonesia/English)
- ✅ Green Eco-Futuristic Theme
- ✅ Responsive Design
- ✅ Video Integration
- ✅ Gallery dengan Filter
- ✅ FAQ Accordion
- ✅ Registration Form
- ✅ Contact Section
- ✅ Team Section
- ✅ Testimonials
- ✅ Events Calendar
- ✅ Document Library

### 🛠️ Development Lokal

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 📞 Kontak

- **WhatsApp:** +62 822-2397-2222
- **Email:** info@kimm-balikpapan.id
- **Lokasi:** Margo Mulyo, Balikpapan Barat, Kalimantan Timur

### 📄 Lisensi

© 2026 Kampung Inggris Mangrove Margo Mulyo. All rights reserved.

---

**Dibuat dengan ❤️ untuk masa depan SDM Balikpapan dan Kalimantan Timur**
