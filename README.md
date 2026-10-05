# 🌿 Kampung Inggris Mangrove Margo Mulyo

Website resmi Kampung Inggris Mangrove Margo Mulyo - Future Human Capital Hub

## 🚀 Deploy ke GitHub Pages

Website ini sudah dikonfigurasi untuk auto-deploy ke GitHub Pages menggunakan GitHub Actions.

### Langkah-langkah Deploy:

1. **Pastikan repository sudah public**
   - Buka Settings repository
   - Scroll ke bagian "Danger Zone"
   - Klik "Change visibility" → pilih "Public"

2. **Enable GitHub Pages**
   - Buka tab **Settings** di repository
   - Pilih menu **Pages** di sidebar kiri
   - Di bagian "Build and deployment":
     - **Source**: pilih **GitHub Actions**
   - Save perubahan

3. **Push code ke GitHub**
   ```bash
   git add .
   git commit -m "Update website"
   git push origin main
   ```

4. **Tunggu deployment selesai**
   - Buka tab **Actions** di repository
   - Lihat workflow "Deploy to GitHub Pages"
   - Tunggu sampai selesai (biasanya 2-3 menit)

5. **Akses website**
   - URL: `https://[username].github.io/[repository-name]/`
   - Contoh: `https://saprani-official.github.io/english-village-group/`

### Troubleshooting:

**Website tidak muncul?**
- Pastikan branch `main` atau `master` sudah ada
- Cek tab Actions untuk melihat error
- Pastikan repository sudah public
- Tunggu 5-10 menit setelah deploy pertama

**Asset (logo/gambar) tidak muncul?**
- Pastikan file ada di folder `public/`
- Cek console browser untuk error 404
- Clear cache browser (Ctrl+Shift+R)

**Build error?**
- Pastikan Node.js versi 20+
- Jalankan `npm install` terlebih dahulu
- Cek error message di tab Actions

### Struktur Project:

```
├── public/              # Static assets (logo, images)
│   ├── kimm-logo.svg
│   └── kimm-icon.svg
├── src/
│   ├── App.tsx         # Main component
│   ├── index.css       # Styles
│   └── main.tsx        # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── index.html          # HTML template
├── package.json
└── vite.config.ts
```

### Fitur Website:

- ✅ Bilingual (Indonesia/English)
- ✅ Responsive design
- ✅ Green eco-futuristic theme
- ✅ Video integration
- ✅ Gallery dengan lightbox
- ✅ FAQ accordion
- ✅ Registration form
- ✅ Contact section
- ✅ Team profiles
- ✅ Testimonials
- ✅ Events calendar
- ✅ Document library

### Development Lokal:

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

### Teknologi:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- GitHub Actions

---

**Website URL:** [akan muncul setelah deploy]

**Dikembangkan dengan:** ❤️ untuk Kampung Inggris Mangrove Margo Mulyo
