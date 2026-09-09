import { useState, useEffect, useRef } from 'react';

// Language context


export default function App() {
  const [lang, setLang] = useState<Lang>('id');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string; meta: string; title: string }>({ open: false, src: '', meta: '', title: '' });
  const [docModal, setDocModal] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [formSuccess, setFormSuccess] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1800);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 400);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.count || '0');
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, 30);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const t = (id: string, en: string) => lang === 'id' ? id : en;

  const galleryItems = [
    { cat: 'belajar', titleId: 'Kelas English Conversation Dasar', titleEn: 'Basic English Conversation Class', img: 'https://image.qwenlm.ai/generated-images/c6c3c679-8281-465f-a692-948af2d12ed2/_result.png', meta: 'MARGO MULYO · 2026' },
    { cat: 'wisata', titleId: 'English Mangrove Tour', titleEn: 'English Mangrove Tour', img: 'https://image.qwenlm.ai/generated-images/de880078-f0c0-43a6-95bf-61e080178af6/_result.png', meta: 'MANGROVE MARGO MULYO · 2026' },
    { cat: 'komunitas', titleId: 'English Day & Komunitas', titleEn: 'English Day & Community', img: 'https://image.qwenlm.ai/generated-images/905bb3e7-5fea-4ae1-a06f-32fa3fac2462/_result.png', meta: 'MARGO MULYO · 2026' },
    { cat: 'industri', titleId: 'Maritime English Session', titleEn: 'Maritime English Session', img: 'https://image.qwenlm.ai/generated-images/6ebb471d-5477-4706-9f9e-89bcae2e69ac/_result.png', meta: 'BALIKPAPAN BARAT · 2026' },
    { cat: 'komunitas', titleId: 'Musyawarah Pembentukan Kelompok', titleEn: 'Founding Assembly of the Group', img: 'https://image.qwenlm.ai/generated-images/b093e4ba-1aa4-46a1-81e7-18b8a5bea397/_result.png', meta: 'MARGO MULYO · 2026' },
    { cat: 'wisata', titleId: 'Eco English Camp', titleEn: 'Eco English Camp', img: 'https://image.qwenlm.ai/generated-images/5b1f7a8c-7c61-4295-85ec-c81b63d72631/_result.png', meta: 'MANGROVE MARGO MULYO · 2026' },
    { cat: 'industri', titleId: 'Panorama Balikpapan & Industri', titleEn: 'Balikpapan Panorama & Industry', img: 'https://image.qwenlm.ai/generated-images/a963c7d0-a891-46b7-99e5-8d028da4f4ba/_result.png', meta: 'KARIANGAU · 2026' },
    { cat: 'komunitas', titleId: 'Pelatihan UMKM & Digital Marketing', titleEn: 'MSME Training & Digital Marketing', img: 'https://image.qwenlm.ai/generated-images/307c2d65-a3ff-4ef1-ad78-d0e9cd7815fe/_result.png', meta: 'MARGO MULYO · 2026' },
  ];

  const filteredGallery = galleryFilter === 'all' ? galleryItems : galleryItems.filter(i => i.cat === galleryFilter);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
    showToast(t('✅ Pendaftaran berhasil dicatat!', '✅ Registration recorded!'));
  };

  return (
    <>
      {/* Loader */}
      <div className={`loader ${!loading ? 'hidden' : ''}`}>
        <div className="loader-text">KIMM.SYS // INITIALIZING</div>
        <div className="loader-bar"></div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>

      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="nav-logo-link">
            <img src="/kimm-logo.svg" alt="KIMM Logo" className="nav-logo-img" />
          </a>
          <div className="nav-links">
            <a href="#tentang">{t('Tentang', 'About')}</a>
            <a href="#program">{t('Program', 'Programs')}</a>
            <a href="#video">{t('Video', 'Video')}</a>
            <a href="#galeri">{t('Galeri', 'Gallery')}</a>
            <a href="#tim">{t('Tim', 'Team')}</a>
            <a href="#faq">FAQ</a>
            <a href="#kontak">{t('Kontak', 'Contact')}</a>
            <button className="lang-toggle" onClick={() => setLang(lang === 'id' ? 'en' : 'id')}>
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileMenu(true)}>☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenu ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMobileMenu(false)}>✕</button>
        <a href="#tentang" onClick={() => setMobileMenu(false)}>{t('Tentang', 'About')}</a>
        <a href="#program" onClick={() => setMobileMenu(false)}>{t('Program', 'Programs')}</a>
        <a href="#video" onClick={() => setMobileMenu(false)}>{t('Video', 'Video')}</a>
        <a href="#galeri" onClick={() => setMobileMenu(false)}>{t('Galeri', 'Gallery')}</a>
        <a href="#tim" onClick={() => setMobileMenu(false)}>{t('Tim', 'Team')}</a>
        <a href="#faq" onClick={() => setMobileMenu(false)}>FAQ</a>
        <a href="#agenda" onClick={() => setMobileMenu(false)}>{t('Agenda', 'Events')}</a>
        <a href="#kontak" onClick={() => setMobileMenu(false)}>{t('Kontak', 'Contact')}</a>
        <button className="lang-toggle" onClick={() => setLang(lang === 'id' ? 'en' : 'id')}>
          {lang === 'id' ? 'EN' : 'ID'}
        </button>
      </div>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-bg-img" style={{ backgroundImage: `url('https://image.qwenlm.ai/generated-images/9695da5f-61ba-4a67-aabb-3cb28d452804/_result.png')` }}></div>
          <div className="hero-glow"></div>
          <div className="wrap hero-grid">
            <div>
              <span className="chip-status reveal">
                <span className="pulse-dot"></span>
                {t('PROGRAM STRATEGIS DAERAH // BALIKPAPAN 2026', 'REGIONAL STRATEGIC PROGRAM // BALIKPAPAN 2026')}
              </span>
              <h1 className="reveal">
                <span className="l1">KAMPUNG INGGRIS</span>
                <span className="l2">MANGROVE</span>
                <span className="l3">MARGO MULYO</span>
              </h1>
              <p className="hero-term reveal">
                &gt; {t('membangun SDM penyangga IKN', 'building the IKN support workforce')}
                <span className="caret"></span>
              </p>
              <p className="hero-sub reveal">
                {t(
                  'Pusat pengembangan SDM berbasis edukasi, ekowisata, industri, dan pemberdayaan masyarakat — integrasi pendidikan vokasi, pelatihan industri maritim, ekowisata mangrove, dan ekonomi kreatif.',
                  'A human-resource development hub built on education, eco-tourism, industry, and community empowerment — integrating vocational education, maritime-industry training, mangrove eco-tourism, and the creative economy.'
                )}
              </p>
              <div className="pillars reveal">
                <span>01 {t('Belajar', 'Education')}</span>
                <span>02 {t('Berwisata', 'Eco-Tourism')}</span>
                <span>03 {t('Berkarya', 'Industry')}</span>
                <span>04 {t('Berdaya', 'Empowerment')}</span>
              </div>
              <div className="hero-btns reveal">
                <a href="#program" className="btn btn-g">{t('Jelajahi Program', 'Explore Programs')} →</a>
                <a href="#gabung" className="btn btn-o">{t('Gabung Sekarang', 'Join Now')}</a>
              </div>
              <p className="hero-coord reveal">01°16′S · 116°49′E — MARGO MULYO · BALIKPAPAN BARAT · KALIMANTAN TIMUR</p>
            </div>
            <div className="hud reveal">
              <div className="scanline"></div>
              <div className="hp-head">
                <span className="pulse-dot"></span> KIMM.SYS · STATUS: <b>ONLINE</b>
                <span className="hp-clock"><Clock /></span>
              </div>
              <div className="radar">
                <div className="ring r1"></div>
                <div className="ring r2"></div>
                <div className="cross-h"></div>
                <div className="cross-v"></div>
                <div className="sweep"></div>
                <span className="rdot" style={{ top: '28%', left: '62%' }}></span>
                <span className="rdot" style={{ top: '58%', left: '30%', animationDelay: '.8s' }}></span>
                <span className="rdot" style={{ top: '44%', left: '74%', animationDelay: '1.5s' }}></span>
              </div>
              <div className="hp-grid">
                <div><b>EST</b><span>2026</span></div>
                <div><b>PILLARS</b><span>04</span></div>
                <div><b>PROGRAMS</b><span>06</span></div>
                <div><b>Y1·TARGET</b><span>300</span></div>
              </div>
              <div className="hp-coord">SCAN: EKOWISATA ✦ VOKASI ✦ INDUSTRI ✦ UMKM</div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee">
          <div className="mq-track">
            <span>ENGLISH DAY <i>✦</i></span>
            <span>MARITIME ENGLISH ACADEMY <i>✦</i></span>
            <span>ECO ENGLISH CAMP <i>✦</i></span>
            <span>IKN ENGLISH PREPARATION <i>✦</i></span>
            <span>INTERNATIONAL MANGROVE FESTIVAL <i>✦</i></span>
            <span>INDUSTRIAL ENGLISH ACADEMY <i>✦</i></span>
            <span>ENGLISH DAY <i>✦</i></span>
            <span>MARITIME ENGLISH ACADEMY <i>✦</i></span>
            <span>ECO ENGLISH CAMP <i>✦</i></span>
            <span>IKN ENGLISH PREPARATION <i>✦</i></span>
            <span>INTERNATIONAL MANGROVE FESTIVAL <i>✦</i></span>
            <span>INDUSTRIAL ENGLISH ACADEMY <i>✦</i></span>
          </div>
        </div>

        {/* STATS */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="stats">
              <div className="stat reveal"><b data-count="300" data-suffix="+">0</b><span>{t('Peserta — Tahun Pertama', 'Participants — Year One')}</span></div>
              <div className="stat reveal"><b data-count="20">0</b><span>{t('Tutor Lokal Terlatih', 'Trained Local Tutors')}</span></div>
              <div className="stat reveal"><b data-count="10">0</b><span>{t('UMKM Binaan', 'Supported MSMEs')}</span></div>
              <div className="stat reveal"><b data-count="5" data-suffix="+">0</b><span>{t('Mitra Perusahaan & Sekolah', 'Corporate & School Partners')}</span></div>
            </div>
          </div>
        </section>

        {/* TENTANG / ABOUT */}
        <section id="tentang">
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('01 // Tentang Kami', '01 // About Us')}</span>
                <h2 className="st">
                  <span className="lm">{t('Bukan Sekadar Tempat', 'More Than Just an')}</span>
                  <span className="lm"><span className="acc">{t('Belajar Bahasa Inggris', 'English Learning Place')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.01 / KIMM-2026</span>
            </div>
            <div className="about-grid">
              <div className="reveal">
                <p className="quote-big" dangerouslySetInnerHTML={{ __html: t(
                  '"Bahasa Inggris dalam gagasan ini bukan tujuan akhir, melainkan <span class="hl">jembatan menuju pengetahuan, peluang kerja, komunikasi internasional, teknologi, jejaring, dan kepercayaan diri</span>."',
                  '"In this vision, English is not the final destination; it is <span class="hl">a bridge to knowledge, employment opportunities, international communication, technology, networks, and confidence</span>."'
                ) }}></p>
                <p className="quote-sig">— SAPRANI · {t('PERWAKILAN PENGGAGAS & PENDIRI', 'REPRESENTATIVE OF THE INITIATORS & FOUNDERS')}</p>
                <div className="about-img-wrapper" style={{ marginTop: '24px' }}>
                  <img src="https://image.qwenlm.ai/generated-images/9695da5f-61ba-4a67-aabb-3cb28d452804/_result.png" alt={t('Ekosistem Mangrove Margo Mulyo', 'Mangrove Ecosystem Margo Mulyo')} loading="lazy" />
                </div>
              </div>
              <ul className="v-list reveal">
                <li><span className="vn">A1</span><p><span dangerouslySetInnerHTML={{ __html: t('<b>Mangrove</b> sebagai laboratorium lingkungan & ekowisata.', 'The <b>mangrove</b> as a laboratory for environmental learning & eco-tourism.') }}></span></p></li>
                <li><span className="vn">A2</span><p><span dangerouslySetInnerHTML={{ __html: t('<b>Kawasan industri</b> sebagai laboratorium profesionalisme.', 'The <b>industrial area</b> as a laboratory for professionalism.') }}></span></p></li>
                <li><span className="vn">A3</span><p><span dangerouslySetInnerHTML={{ __html: t('<b>Masyarakat</b> sebagai pusat pengembangan kapasitas.', 'The <b>community</b> as the center of capacity development.') }}></span></p></li>
                <li><span className="vn">A4</span><p><span dangerouslySetInnerHTML={{ __html: t('Pendidikan hadir di tengah ekosistem kehidupan — dimulai dari <b>satu kelas, satu percakapan, satu keterampilan, satu peluang</b>.', 'Education becomes part of a living ecosystem — starting with <b>one class, one conversation, one skill, one opportunity</b>.') }}></span></p></li>
              </ul>
            </div>
          </div>
        </section>

        {/* PELUANG / OPPORTUNITY */}
        <section id="peluang" style={{ background: 'var(--bg2)' }}>
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('02 // Peluang', '02 // The Opportunity')}</span>
                <h2 className="st">
                  <span className="lm">{t('Mengapa Program Ini', 'Why Is This Program')}</span>
                  <span className="lm"><span className="acc">{t('Relevan Sekarang?', 'Relevant Now?')}</span></span>
                </h2>
                <p className="lead">{t('Pertumbuhan IKN memperbesar kebutuhan SDM dengan komunikasi Bahasa Inggris praktis dan profesional.', "IKN's growth amplifies the need for human resources with practical and professional English communication.")}</p>
              </div>
              <span className="sec-num">SEC.02 / GAP-ANALYSIS</span>
            </div>
            <div className="grid-3">
              <div className="card reveal">
                <span className="idx">01</span>
                <h3>{t('Kompetensi English Praktis', 'Practical English Competency')}</h3>
                <p>{t('Masyarakat dan lulusan sekolah menengah di Balikpapan Barat masih membutuhkan English yang dekat dengan dunia kerja.', 'Residents and secondary-school graduates in West Balikpapan still need English that is close to the world of work.')}</p>
              </div>
              <div className="card reveal">
                <span className="idx">02</span>
                <h3>{t('Kebutuhan Sektor Strategis', 'Strategic Sector Demand')}</h3>
                <p>{t('Industri maritim, logistik, energi, perdagangan, konstruksi, hotel, dan pariwisata membutuhkan komunikasi global.', 'Maritime, logistics, energy, trade, construction, hospitality, and tourism industries require global communication.')}</p>
              </div>
              <div className="card reveal">
                <span className="idx">03</span>
                <h3>{t('Aset Lokal Belum Terintegrasi', 'Unintegrated Local Assets')}</h3>
                <p>{t('Pendidikan vokasi, kawasan industri, dan wisata mangrove berpotensi menjadi satu ekosistem pembelajaran.', 'Vocational education, industrial areas, and mangrove tourism can become one integrated learning ecosystem.')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PARALLAX IMAGE BANNER */}
        <div className="parallax-banner" style={{ backgroundImage: `url('https://image.qwenlm.ai/generated-images/a963c7d0-a891-46b7-99e5-8d028da4f4ba/_result.png')` }}>
          <div className="parallax-overlay">
            <h3 className="reveal">{t('Dari Mangrove untuk Dunia', 'From Mangrove to the World')}</h3>
            <p className="reveal">{t('Balikpapan Barat · Kalimantan Timur · Indonesia', 'West Balikpapan · East Kalimantan · Indonesia')}</p>
          </div>
        </div>

        {/* SOLUSI / SOLUTION */}
        <section id="solusi">
          <div className="wrap split">
            <div className="split-left reveal">
              <span className="eyebrow">{t('03 // Solusi', '03 // The Solution')}</span>
              <h2 className="st" dangerouslySetInnerHTML={{ __html: t('Satu Ekosistem untuk <span class="acc">Belajar, Bekerja & Berwisata</span>', 'One Ecosystem to <span class="acc">Learn, Work & Explore</span>') }}></h2>
              <p className="lead">{t('Empat pusat pembelajaran yang menggabungkan bahasa dengan kebutuhan vokasi, industri, ekowisata, dan ekonomi kreatif.', 'Four learning centers combining language with vocational, industrial, eco-tourism, and creative-economy needs.')}</p>
              <div className="strip">{t('Belajar → Praktik → Lapangan → Kerja/Usaha', 'Learn → Practice → Field → Career/Business')}</div>
            </div>
            <div className="split-right">
              <div className="card s-card reveal">
                <img className="s-card-img" src="https://image.qwenlm.ai/generated-images/c6c3c679-8281-465f-a692-948af2d12ed2/_result.png" alt="English Learning Center" loading="lazy" />
                <span className="snum">01</span>
                <div>
                  <span className="tag tg">Foundation</span>
                  <h3>English Learning Center</h3>
                  <div className="chips"><span>General English</span><span>Conversation</span><span>Public Speaking</span><span>TOEFL/IELTS Prep</span><span>English Camp</span></div>
                </div>
              </div>
              <div className="card s-card reveal">
                <img className="s-card-img" src="https://image.qwenlm.ai/generated-images/6ebb471d-5477-4706-9f9e-89bcae2e69ac/_result.png" alt="English for Industry Center" loading="lazy" />
                <span className="snum">02</span>
                <div>
                  <span className="tag tc">Job Ready</span>
                  <h3>English for Industry Center</h3>
                  <div className="chips"><span>Logistics</span><span>Maritime</span><span>Port Operation</span><span>Shipyard</span><span>HSE</span><span>Business Communication</span></div>
                </div>
              </div>
              <div className="card s-card reveal">
                <img className="s-card-img" src="https://image.qwenlm.ai/generated-images/de880078-f0c0-43a6-95bf-61e080178af6/_result.png" alt="Mangrove Eco Education Park" loading="lazy" />
                <span className="snum">03</span>
                <div>
                  <span className="tag tg">Eco-Learning</span>
                  <h3>Mangrove Eco Education Park</h3>
                  <div className="chips"><span>English Mangrove Tour</span><span>Outdoor Speaking</span><span>Environmental Education</span><span>Conservation</span><span>Eco Camp</span></div>
                </div>
              </div>
              <div className="card s-card reveal">
                <img className="s-card-img" src="https://image.qwenlm.ai/generated-images/307c2d65-a3ff-4ef1-ad78-d0e9cd7815fe/_result.png" alt="Creative Economy & UMKM Center" loading="lazy" />
                <span className="snum">04</span>
                <div>
                  <span className="tag td">Empowerment</span>
                  <h3>Creative Economy & UMKM Center</h3>
                  <div className="chips"><span>Pelatihan UMKM</span><span>Digital Marketing</span><span>Souvenir</span><span>Kuliner Lokal</span><span>Homestay</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM */}
        <section id="program" style={{ background: 'var(--bg2)' }}>
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('04 // Program Unggulan', '04 // Signature Programs')}</span>
                <h2 className="st">
                  <span className="lm">{t('Enam Program', 'Six')} <span className="acc">Flagship</span></span>
                </h2>
                <p className="lead">{t('Jalur masuk yang jelas bagi pelajar, pekerja, masyarakat, dan mitra.', 'Clear entry paths for students, workers, communities, and partners.')}</p>
              </div>
              <span className="sec-num">SEC.04 / FLAGSHIP.SYS</span>
            </div>
            <div className="bento">
              <div className="b-card w2 reveal">
                <img src="https://image.qwenlm.ai/generated-images/905bb3e7-5fea-4ae1-a06f-32fa3fac2462/_result.png" alt="English Day" loading="lazy" />
                <div className="bc-in">
                  <span className="bnum">PRG.01</span>
                  <h3>English Day</h3>
                  <p>{t('Satu hari khusus English di seluruh aktivitas kawasan.', 'A full English day across all activities in the area.')}</p>
                  <span className="bfoot">COMMUNITY · WEEKLY</span>
                </div>
              </div>
              <div className="b-card reveal">
                <img src="https://image.qwenlm.ai/generated-images/6ebb471d-5477-4706-9f9e-89bcae2e69ac/_result.png" alt="Industrial English Academy" loading="lazy" />
                <div className="bc-in">
                  <span className="bnum">PRG.02</span>
                  <h3>Industrial English Academy</h3>
                  <p>{t('Pelatihan intensif English untuk siswa vokasi dan pekerja.', 'Intensive English training for vocational students and workers.')}</p>
                  <span className="bfoot">VOCATIONAL · INTENSIVE</span>
                </div>
              </div>
              <div className="b-card reveal">
                <img src="https://image.qwenlm.ai/generated-images/a963c7d0-a891-46b7-99e5-8d028da4f4ba/_result.png" alt="Maritime English Academy" loading="lazy" />
                <div className="bc-in">
                  <span className="bnum">PRG.03</span>
                  <h3>Maritime English Academy</h3>
                  <p>{t('English khusus pelabuhan, kebaharian, dan galangan kapal.', 'Specialized English for ports, maritime affairs, and shipyards.')}</p>
                  <span className="bfoot">PORT · SHIPYARD · HSE</span>
                </div>
              </div>
              <div className="b-card reveal">
                <img src="https://image.qwenlm.ai/generated-images/b093e4ba-1aa4-46a1-81e7-18b8a5bea397/_result.png" alt="IKN English Preparation" loading="lazy" />
                <div className="bc-in">
                  <span className="bnum">PRG.06</span>
                  <h3>IKN English Preparation</h3>
                  <p>{t('Percepatan kompetensi English bagi calon tenaga pendukung IKN.', 'Accelerated English competency for the future IKN workforce.')}</p>
                  <span className="bfoot">IKN WORKFORCE</span>
                </div>
              </div>
              <div className="b-card reveal">
                <img src="https://image.qwenlm.ai/generated-images/5b1f7a8c-7c61-4295-85ec-c81b63d72631/_result.png" alt="International Mangrove Festival" loading="lazy" />
                <div className="bc-in">
                  <span className="bnum">PRG.05</span>
                  <h3>International Mangrove Festival</h3>
                  <p>{t('Festival untuk promosi wisata, budaya, dan edukasi lingkungan.', 'A festival promoting tourism, culture, and environmental education.')}</p>
                  <span className="bfoot">ANNUAL · GLOBAL</span>
                </div>
              </div>
              <div className="b-card w2 reveal">
                <img src="https://image.qwenlm.ai/generated-images/de880078-f0c0-43a6-95bf-61e080178af6/_result.png" alt="Eco English Camp" loading="lazy" />
                <div className="bc-in">
                  <span className="bnum">PRG.04</span>
                  <h3>Eco English Camp</h3>
                  <p>{t('Camp English yang memadukan aktivitas konservasi mangrove.', 'An English camp combining mangrove conservation activities.')}</p>
                  <span className="bfoot">CONSERVATION · IMMERSION</span>
                </div>
              </div>
            </div>
            <div className="strip reveal">{t('OUTCOME: komunikasi ↑ · akses industri ↑ · pengalaman ekowisata ↑ · kolaborasi ekonomi lokal ↑', 'OUTCOME: communication ↑ · industry access ↑ · eco-tourism experience ↑ · local economic collaboration ↑')}</div>
          </div>
        </section>

        {/* LOKASI / LOCATION */}
        <section id="lokasi">
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('05 // Keunggulan Lokasi', '05 // Why Here?')}</span>
                <h2 className="st">
                  <span className="lm">{t('Kombinasi Aset yang', 'A Rare Combination')} <span className="gold">{t('Langka', 'of Assets')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.05 / GEO-ASSETS</span>
            </div>
            <div className="grid-2">
              <div className="card loc-card reveal"><span className="lic">🌿</span><div><h3>Mangrove Margo Mulyo</h3><p>{t('Destinasi wisata alam, edukasi lingkungan, penelitian, dan lokasi aktivitas pelajar.', 'A destination for nature tourism, environmental education, research, and student activities.')}</p></div></div>
              <div className="card loc-card reveal"><span className="lic">🎓</span><div><h3>SMKN 7 Balikpapan & Kampus Mitra</h3><p>{t('Basis vokasi dan calon peserta; sumber akademisi, peneliti, dan tutor.', 'A vocational base and participant pool; a source of academics, researchers, and tutors.')}</p></div></div>
              <div className="card loc-card reveal"><span className="lic">🚢</span><div><h3>Kawasan Industri Kariangau</h3><p>{t('Koridor pelabuhan, terminal peti kemas, pergudangan, energi, dan galangan kapal.', 'A corridor of ports, container terminals, warehousing, energy, and shipyards.')}</p></div></div>
              <div className="card loc-card reveal"><span className="lic">🏘</span><div><h3>Masyarakat Margo Mulyo</h3><p>{t('Pelaksana lokal, pelaku UMKM, penyedia homestay, dan penggerak wisata komunitas.', 'Local implementers, MSME actors, homestay providers, and community-tourism drivers.')}</p></div></div>
            </div>
          </div>
        </section>

        {/* DAMPAK / IMPACT */}
        <section id="dampak" style={{ background: 'var(--bg2)' }}>
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('06 // Target Dampak', '06 // Target Impact')}</span>
                <h2 className="st">
                  <span className="lm">{t('Dari Kelas Kecil Menuju', 'From Small Classes to a')} <span className="acc">{t('Ekosistem SDM', 'Human Capital Ecosystem')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.06 / IMPACT.METRICS</span>
            </div>
            <div className="imp-nums reveal">
              <div><b data-count="300">0</b><span>{t('Peserta Pelatihan', 'Trainees')}</span></div>
              <div><b data-count="20">0</b><span>{t('Tutor Terlatih', 'Trained Tutors')}</span></div>
              <div><b data-count="10">0</b><span>{t('UMKM Binaan', 'MSMEs')}</span></div>
              <div><b data-count="5" data-suffix="+">0</b><span>{t('Mitra', 'Partners')}</span></div>
            </div>
            <div className="maturity">
              <div className="mat reveal">
                <span className="my">{t('TAHUN 1 // RINTISAN', 'YEAR 1 // PILOT')}</span>
                <h3>{t('Pilot', 'Pilot')}</h3>
                <p>{t('300 peserta • 20 tutor • 10 UMKM', '300 participants • 20 tutors • 10 MSMEs')}</p>
              </div>
              <div className="mat reveal">
                <span className="my">{t('TAHUN 3 // TERPADU', 'YEAR 3 // INTEGRATED')}</span>
                <h3>{t('Pusat Terpadu', 'Integrated Center')}</h3>
                <p>{t('1.000 peserta aktif • 50 tutor • 25 UMKM', '1,000 active participants • 50 tutors • 25 MSMEs')}</p>
              </div>
              <div className="mat reveal">
                <span className="my">{t('TAHUN 5 // UNGGULAN', 'YEAR 5 // LEADING')}</span>
                <h3>{t('Destinasi Unggulan', 'Leading Destination')}</h3>
                <p>{t('Jaringan IKN & nasional • sertifikasi standar internasional', 'IKN & national network • international-standard certification')}</p>
              </div>
            </div>
            <div className="strip reveal">{t('IMPACT: Pendidikan ✦ Ekonomi ✦ Sosial ✦ Lingkungan', 'IMPACT: Education ✦ Economy ✦ Social ✦ Environment')}</div>
          </div>
        </section>

        {/* INVESTASI / INVESTMENT */}
        <section id="investasi">
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('07 // Investasi', '07 // Investment Case')}</span>
                <h2 className="st">
                  <span className="lm">{t('Rencana Pembangunan', 'Building the')} <span className="gold">{t('Fondasi Program', 'Program Foundation')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.07 / BUDGET.SYS</span>
            </div>
            <div className="invest">
              <div className="inv-amt reveal">
                <div className="amt">Rp 2,6<small> {t('MILIAR', 'BILLION')}</small></div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 16px' }}>{t('Kebutuhan investasi awal untuk fasilitas, digitalisasi, pengembangan mangrove, SDM, dan operasi.', 'Initial investment for facilities, digitalization, mangrove development, human resources, and operations.')}</p>
                <ul className="fund">
                  <li><b>F1</b>{t('APBD Kota Balikpapan', 'Balikpapan City Budget (APBD)')}</li>
                  <li><b>F2</b>{t('Bantuan Keuangan Provinsi Kaltim', 'East Kalimantan Provincial Grant')}</li>
                  <li><b>F3</b>{t('CSR / TJSL Industri', 'Corporate CSR / TJSL')}</li>
                  <li><b>F4</b>{t('Dukungan kementerian & donor', 'Ministry & donor support')}</li>
                </ul>
              </div>
              <div className="alloc reveal">
                <h3>{t('Alokasi Penggunaan', 'Use of Funds')}</h3>
                <ul>
                  <li><span className="an">01</span>{t('Gedung & renovasi fasilitas', 'Buildings & facility renovation')}</li>
                  <li><span className="an">02</span>{t('Lab bahasa & perangkat modern', 'Modern language labs & equipment')}</li>
                  <li><span className="an">03</span>{t('Infrastruktur digital & internet', 'Digital infrastructure & internet')}</li>
                  <li><span className="an">04</span>{t('Pengembangan kawasan mangrove edukasi', 'Educational mangrove area development')}</li>
                  <li><span className="an">05</span>{t('Pelatihan SDM, sertifikasi & tutor', 'HR training, certification & tutors')}</li>
                  <li><span className="an">06</span>{t('Operasional tahun pertama', 'First-year operations')}</li>
                  <li><span className="an">07</span>{t('Promosi, branding & branding kawasan', 'Promotion & area branding')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" style={{ background: 'var(--bg2)' }}>
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('08 // Peta Jalan', '08 // Delivery Roadmap')}</span>
                <h2 className="st">
                  <span className="lm">{t('Mulai Sederhana, Buktikan,', 'Start Simple, Prove It,')} <span className="acc">{t('Lalu Scale', 'Then Scale')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.08 / ROADMAP.SYS</span>
            </div>
            <div className="road">
              <div className="r-step reveal"><span className="rn">01</span><span className="rt">Start</span><h4>{t('Kelompok English Swadaya', 'English Swadaya Group')}</h4><p>{t('Conversation • English Day • dokumentasi • daftar hadir', 'Conversation • English Day • documentation • attendance')}</p></div>
              <div className="r-step reveal"><span className="rn">02</span><span className="rt">Validate</span><h4>{t('Kemitraan Awal', 'Early Partnerships')}</h4><p>{t('Sekolah • kampus • industri • tutor • UMKM', 'Schools • universities • industry • tutors • MSMEs')}</p></div>
              <div className="r-step reveal"><span className="rn">03</span><span className="rt">Scale</span><h4>{t('Fasilitas & Flagship', 'Facilities & Flagships')}</h4><p>{t('Learning Center • Industry Academy • Eco Camp • festival', 'Learning Center • Industry Academy • Eco Camp • festival')}</p></div>
              <div className="r-step reveal"><span className="rn">04</span><span className="rt">Position</span><h4>{t('Hub Penyangga IKN', 'IKN Support Hub')}</h4><p>{t('Jaringan kemitraan IKN & nasional • standar internasional', 'IKN & national network • international standards')}</p></div>
            </div>
            <div className="strip proof reveal">{t('🌱 FIRST PROOF: kelas conversation 90\' + 3–5 foto representatif + daftar hadir + catatan hasil', '🌱 FIRST PROOF: a 90-minute conversation class + 3–5 representative photos + attendance list + result notes')}</div>
          </div>
        </section>

        {/* MODEL OPERASI */}
        <section id="model">
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('09 // Model Operasi', '09 // Operating Model')}</span>
                <h2 className="st">
                  <span className="lm">{t('Kolaborasi', 'Multi-Stakeholder')} <span className="acc">{t('Multipihak', 'Collaboration')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.09 / SYNERGY.NET</span>
            </div>
            <div className="grid-4">
              <div className="card reveal"><span className="tag tg">Government</span><h3>{t('Pemerintah', 'Government')}</h3><p>{t('Arah kebijakan • fasilitasi • sinergi program.', 'Policy direction • facilitation • program synergy.')}</p></div>
              <div className="card reveal"><span className="tag tc">Education</span><h3>{t('Sekolah & Kampus', 'Schools & Universities')}</h3><p>{t('Peserta • tutor • akademisi • riset.', 'Participants • tutors • academics • research.')}</p></div>
              <div className="card reveal"><span className="tag td">Industry</span><h3>{t('Industri', 'Industry')}</h3><p>{t('Kebutuhan kompetensi • kemitraan • CSR/TJSL.', 'Competency needs • partnerships • CSR.')}</p></div>
              <div className="card reveal"><span className="tag tg">Community</span><h3>{t('Masyarakat', 'Community')}</h3><p>{t('Pelaksana lokal • UMKM • homestay • wisata.', 'Local implementers • MSMEs • homestays • tourism.')}</p></div>
            </div>
            <div className="strip reveal">{t('PRINSIP: swadaya & gotong royong ✦ terbuka sesuai kapasitas ✦ administrasi sederhana, transparan, dapat diperiksa', 'PRINCIPLES: self-reliance & mutual cooperation ✦ open within capacity ✦ simple, transparent, auditable administration')}</div>
          </div>
        </section>

        {/* GALERI / GALLERY */}
        <section id="galeri" style={{ background: 'var(--bg2)' }}>
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('10 // Galeri', '10 // Gallery')}</span>
                <h2 className="st">
                  <span className="lm">{t('Galeri', 'Activity')} <span className="acc">{t('Kegiatan', 'Gallery')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.10 / ARCHIVE.VISUAL</span>
            </div>
            <div className="filters reveal">
              <button className={`fbtn ${galleryFilter === 'all' ? 'active' : ''}`} onClick={() => setGalleryFilter('all')}>{t('Semua', 'All')}</button>
              <button className={`fbtn ${galleryFilter === 'belajar' ? 'active' : ''}`} onClick={() => setGalleryFilter('belajar')}>{t('Pembelajaran', 'Learning')}</button>
              <button className={`fbtn ${galleryFilter === 'wisata' ? 'active' : ''}`} onClick={() => setGalleryFilter('wisata')}>{t('Ekowisata', 'Eco-Tourism')}</button>
              <button className={`fbtn ${galleryFilter === 'industri' ? 'active' : ''}`} onClick={() => setGalleryFilter('industri')}>{t('Industri', 'Industry')}</button>
              <button className={`fbtn ${galleryFilter === 'komunitas' ? 'active' : ''}`} onClick={() => setGalleryFilter('komunitas')}>{t('Komunitas', 'Community')}</button>
            </div>
            <div className="gal">
              {filteredGallery.map((item, i) => (
                <figure key={i} className="gitem reveal" onClick={() => setLightbox({ open: true, src: item.img.replace('600/800', '1000/700'), meta: item.meta, title: lang === 'id' ? item.titleId : item.titleEn })}>
                  <img src={item.img} alt="" loading="lazy" />
                  <figcaption className="gcap">
                    <span className="gcat">{item.cat === 'belajar' ? t('Pembelajaran', 'Learning') : item.cat === 'wisata' ? t('Ekowisata', 'Eco-Tourism') : item.cat === 'industri' ? t('Industri', 'Industry') : t('Komunitas', 'Community')}</span>
                    <h4>{lang === 'id' ? item.titleId : item.titleEn}</h4>
                    <div className="gfile">{item.meta}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="gal-note reveal">{t('💡 Foto ilustrasi — ganti dengan dokumentasi asli.', '💡 Illustration photos — replace with real documentation.')}</p>
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section id="video">
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('10.5 // Video', '10.5 // Video')}</span>
                <h2 className="st">
                  <span className="lm">{t('Video', 'Video')} <span className="acc">{t('Profil Kampung Inggris', 'Kampung Inggris Profile')}</span></span>
                </h2>
                <p className="lead">{t('Saksikan potensi dan keindahan ekosistem Kampung Inggris Mangrove Margo Mulyo.', 'Witness the potential and beauty of the Kampung Inggris Mangrove Margo Mulyo ecosystem.')}</p>
              </div>
              <span className="sec-num">SEC.10.5 / MEDIA.PLAY</span>
            </div>
            <div className="video-grid reveal">
              <div className="video-card">
                <div className="video-wrapper">
                  <iframe
                    src="https://www.youtube.com/embed/videoseries?list=PLrAXtmRdnEtfMnRh1SNMnGQXOyBGGlMbH"
                    title={t('Video Profil Kampung Inggris Mangrove', 'Kampung Inggris Mangrove Profile Video')}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-info">
                  <h4>{t('Profil Kampung Inggris Mangrove Margo Mulyo', 'Kampung Inggris Mangrove Margo Mulyo Profile')}</h4>
                  <p>{t('Mengenal lebih dekat program, lokasi, dan visi pengembangan SDM di Balikpapan.', 'Get to know the program, location, and HR development vision in Balikpapan.')}</p>
                </div>
              </div>
              <div className="video-card">
                <div className="video-wrapper">
                  <iframe
                    src="https://www.youtube.com/embed/3JZ_D3ELwOQ"
                    title={t('Ekosistem Mangrove Balikpapan', 'Balikpapan Mangrove Ecosystem')}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-info">
                  <h4>{t('Ekosistem Mangrove Kalimantan', 'Kalimantan Mangrove Ecosystem')}</h4>
                  <p>{t('Keindahan dan pentingnya konservasi mangrove sebagai laboratorium lingkungan.', 'The beauty and importance of mangrove conservation as an environmental laboratory.')}</p>
                </div>
              </div>
            </div>
            <div className="video-highlights reveal">
              <div className="vh-item">
                <div className="vh-icon">🎬</div>
                <h5>{t('Dokumentasi Kegiatan', 'Activity Documentation')}</h5>
                <p>{t('Video pembelajaran, English Day, dan English Camp.', 'Learning videos, English Day, and English Camp.')}</p>
              </div>
              <div className="vh-item">
                <div className="vh-icon">🌿</div>
                <h5>{t('Eco-Tourism Mangrove', 'Eco-Tourism Mangrove')}</h5>
                <p>{t('Tur virtual kawasan mangrove dan edukasi lingkungan.', 'Virtual tour of the mangrove area and environmental education.')}</p>
              </div>
              <div className="vh-item">
                <div className="vh-icon">🎓</div>
                <h5>{t('Testimoni Peserta', 'Participant Testimonials')}</h5>
                <p>{t('Cerita sukses dan pengalaman belajar peserta program.', 'Success stories and learning experiences of program participants.')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* DOKUMEN / DOCUMENTS */}
        <section id="dokumen">
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('11 // Pustaka', '11 // Library')}</span>
                <h2 className="st">
                  <span className="lm">{t('Dokumen &', 'Documents &')} <span className="gold">{t('Publikasi Resmi', 'Official Publications')}</span></span>
                </h2>
                <p className="lead">{t('Baca langsung secara daring atau unduh dokumen resmi program dalam format PDF.', 'Read online or download the program\'s official documents in PDF format.')}</p>
              </div>
              <span className="sec-num">SEC.11 / DOCS.DB</span>
            </div>
            <div className="docs">
              <div className="doc reveal">
                <span className="dic">📊</span>
                <span className="dmeta">PDF · 9 Slides</span>
                <h3>{t('Pitch Deck Program', 'Program Pitch Deck')}</h3>
                <p>{t('Proposal strategis: peluang, solusi, target dampak, investasi & peta jalan.', 'Strategic proposal: opportunity, solution, impact, investment & roadmap.')}</p>
                <div className="dbtns">
                  <button className="btn btn-o btn-sm" onClick={() => setDocModal('pitch')}>{t('Baca Online', 'Read Online')}</button>
                </div>
              </div>
              <div className="doc reveal">
                <span className="dic">🌏</span>
                <span className="dmeta">PDF · ID–EN</span>
                <h3>{t('Kata Pengantar Bilingual', 'Bilingual Preface')}</h3>
                <p>{t('Visi Penggagas & Pendiri — edisi bilingual Indonesia–English.', 'The Founders\' vision — Indonesian–English bilingual edition.')}</p>
                <div className="dbtns">
                  <button className="btn btn-o btn-sm" onClick={() => setDocModal('preface')}>{t('Baca Online', 'Read Online')}</button>
                </div>
              </div>
              <div className="doc reveal">
                <span className="dic">📚</span>
                <span className="dmeta">PDF · 2026</span>
                <h3>{t('Modul Kegiatan & Administrasi', 'Activity & Administration Module')}</h3>
                <p>{t('Pedoman kegiatan, dokumentasi, pencatatan, dan administrasi kelompok.', 'Guidelines for activities, documentation, recording, and administration.')}</p>
                <div className="dbtns">
                  <button className="btn btn-o btn-sm" onClick={() => setDocModal('modul')}>{t('Baca Online', 'Read Online')}</button>
                </div>
              </div>
              <div className="doc reveal">
                <span className="dic">📜</span>
                <span className="dmeta">PDF · 2026</span>
                <h3>{t('Surat Pembentukan Kelompok', 'Group Establishment Decree')}</h3>
                <p>{t('Dasar pembentukan, struktur organisasi, aturan keanggotaan & iuran.', 'Establishment basis, structure, membership & dues rules.')}</p>
                <div className="dbtns">
                  <button className="btn btn-o btn-sm" onClick={() => setDocModal('kelompok')}>{t('Baca Online', 'Read Online')}</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KOMUNITAS / COMMUNITY */}
        <section id="komunitas" style={{ background: 'var(--bg2)' }}>
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('12 // Komunitas', '12 // Community')}</span>
                <h2 className="st">
                  <span className="lm">{t('Kelompok', 'The')} <span className="acc">English Swadaya</span></span>
                </h2>
                <p className="lead">{t('Embrio/pilot project Kampung Inggris — dibentuk melalui musyawarah warga, bersifat sosial, edukatif, mandiri, dan terbuka dengan semangat gotong royong.', 'The embryo/pilot project of Kampung Inggris — established through a community assembly; social, educational, independent, and open in the spirit of mutual cooperation.')}</p>
              </div>
              <span className="sec-num">SEC.12 / CORE.GROUP</span>
            </div>
            <div className="grid-2">
              <div className="card reveal">
                <h3 style={{ fontFamily: 'var(--disp)', fontSize: '16px', marginBottom: '6px' }}>{t('Modul 1: English Conversation Dasar', 'Module 1: Basic English Conversation')}</h3>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--dim)', marginBottom: '4px' }}>{t('TEMA: INTRODUCING YOURSELF & DAILY CONVERSATION · 90 MENIT · 2×/MINGGU', 'THEME: INTRODUCING YOURSELF & DAILY CONVERSATION · 90 MIN · 2×/WEEK')}</p>
                <table className="tbl">
                  <tbody>
                    <tr><th>{t('Tahap', 'Stage')}</th><th>{t('Durasi', 'Time')}</th><th>{t('Kegiatan', 'Activity')}</th></tr>
                    <tr><td>{t('Pembukaan', 'Opening')}</td><td>10'</td><td>{t('Salam, perkenalan tutor, kehadiran, tujuan', 'Greetings, tutor intro, attendance, objectives')}</td></tr>
                    <tr><td>{t('Pemanasan', 'Warm-up')}</td><td>10'</td><td>{t('Greeting & percakapan berpasangan', 'Greetings & paired conversation')}</td></tr>
                    <tr><td>{t('Materi', 'Material')}</td><td>20'</td><td>{t('Kosakata & pola kalimat perkenalan', 'Vocabulary & introduction patterns')}</td></tr>
                    <tr><td>{t('Praktik', 'Practice')}</td><td>20'</td><td>{t('Tanya jawab berpasangan', 'Paired Q&A')}</td></tr>
                    <tr><td>{t('Praktik Kelompok', 'Group Practice')}</td><td>20'</td><td>{t('Simulasi percakapan', 'Conversation simulation')}</td></tr>
                    <tr><td>{t('Penutup', 'Closing')}</td><td>10'</td><td>{t('Umpan balik, tugas, dokumentasi', 'Feedback, assignments, documentation')}</td></tr>
                  </tbody>
                </table>
                <div className="chips"><span>Greetings</span><span>Introduction</span><span>Questions</span><span>2–3 min conversation</span></div>
              </div>
              <div>
                <div className="card reveal">
                  <h3 style={{ fontFamily: 'var(--disp)', fontSize: '16px', marginBottom: '14px' }}>{t('Struktur Organisasi', 'Organizational Structure')}</h3>
                  <ul className="struct">
                    <li><span className="sn">①</span><span><b>{t('Penggagas/Inisiator', 'Initiators')}:</b> Saprani / Omar</span></li>
                    <li><span className="sn">②</span><span>{t('Pembina/Penasihat — tokoh masyarakat/pendidikan', 'Patron/Advisor — community/education figures')}</span></li>
                    <li><span className="sn">③</span><span>{t('Ketua & Wakil Ketua', 'Chairperson & Vice Chairperson')}</span></li>
                    <li><span className="sn">④</span><span>{t('Sekretaris & Bendahara', 'Secretary & Treasurer')}</span></li>
                    <li><span className="sn">⑤</span><span>{t('Koordinator Program Pembelajaran', 'Learning Program Coordinator')}</span></li>
                    <li><span className="sn">⑥</span><span>{t('Koordinator Tutor & Relawan', 'Tutors & Volunteers Coordinator')}</span></li>
                    <li><span className="sn">⑦</span><span>{t('Koordinator Kemitraan & Humas', 'Partnership & Public Relations Coordinator')}</span></li>
                    <li><span className="sn">⑧</span><span>{t('Koordinator Eco-English & Mangrove', 'Eco-English & Mangrove Coordinator')}</span></li>
                  </ul>
                </div>
                <div className="card reveal" style={{ marginTop: '20px', borderLeft: '2px solid var(--gold)' }}>
                  <h3 style={{ fontFamily: 'var(--disp)', fontSize: '15px', marginBottom: '12px' }}>{t('Kegiatan yang Tersedia', 'Available Activities')}</h3>
                  <div className="chips"><span>English Conversation</span><span>English for Work</span><span>English for Industry</span><span>Maritime English</span><span>English for Tourism</span><span>Eco-English</span><span>English Day</span><span>English Camp</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM / FOUNDERS */}
        <section id="tim" style={{ background: 'var(--bg2)' }}>
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('12.5 // Tim Penggagas', '12.5 // Founding Team')}</span>
                <h2 className="st">
                  <span className="lm">{t('Orang-Orang di Balik', 'The People Behind')} <span className="acc">{t('Gagasan Ini', 'This Vision')}</span></span>
                </h2>
                <p className="lead">{t('Tim kecil dengan visi besar untuk masa depan Balikpapan dan Kalimantan Timur.', 'A small team with a big vision for the future of Balikpapan and East Kalimantan.')}</p>
              </div>
              <span className="sec-num">SEC.12.5 / TEAM.SYS</span>
            </div>
            <div className="team-grid">
              <div className="team-card reveal">
                <div className="team-avatar">
                  <div className="team-initials">SP</div>
                  <div className="team-status"></div>
                </div>
                <div className="team-info">
                  <h4>Saprani</h4>
                  <span className="team-role">{t('Penggagas & Inisiator', 'Founder & Initiator')}</span>
                  <p>{t('Visioner di balik konsep Kampung Inggris Mangrove Margo Mulyo. Menghubungkan pendidikan, ekowisata, dan pemberdayaan masyarakat.', 'Visionary behind the Kampung Inggris Mangrove Margo Mulyo concept. Connecting education, eco-tourism, and community empowerment.')}</p>
                  <div className="team-links">
                    <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                    <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-card reveal">
                <div className="team-avatar">
                  <div className="team-initials">OM</div>
                  <div className="team-status"></div>
                </div>
                <div className="team-info">
                  <h4>Omar</h4>
                  <span className="team-role">{t('Co-Founder & Strategist', 'Co-Founder & Strategist')}</span>
                  <p>{t('Ahli strategi yang memastikan program berjalan efektif dan berkelanjutan untuk masyarakat.', 'Strategic expert ensuring the program runs effectively and sustainably for the community.')}</p>
                  <div className="team-links">
                    <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                    <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-card reveal">
                <div className="team-avatar team-avatar-open">
                  <i className="fas fa-plus"></i>
                </div>
                <div className="team-info">
                  <h4>{t('Posisi Terbuka', 'Open Position')}</h4>
                  <span className="team-role">{t('Ketua Kelompok', 'Group Chairperson')}</span>
                  <p>{t('Kami mencari pemimpin komunitas yang berdedikasi untuk memimpin program ini.', 'We are looking for a dedicated community leader to lead this program.')}</p>
                  <a href="#gabung" className="btn btn-o btn-sm">{t('Daftar Sekarang', 'Apply Now')}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimoni">
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('12.6 // Testimoni', '12.6 // Testimonials')}</span>
                <h2 className="st">
                  <span className="lm">{t('Kata Mereka', 'What People')} <span className="gold">{t('Tentang Kami', 'Say About Us')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.12.6 / VOICES.DB</span>
            </div>
            <div className="testimonials-grid">
              <div className="testimonial-card reveal">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t('Program ini memberikan harapan baru bagi anak-anak kami. Mereka sekarang lebih percaya diri berbicara Bahasa Inggris dan memiliki wawasan yang lebih luas tentang dunia kerja.', 'This program gives new hope for our children. They are now more confident speaking English and have broader insights about the world of work.')}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">HR</div>
                  <div>
                    <h5>Hj. Rahmawati</h5>
                    <span>{t('Tokoh Masyarakat Margo Mulyo', 'Community Leader, Margo Mulyo')}</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card reveal">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t('Sebagai pelaku UMKM, pelatihan digital marketing dan Bahasa Inggris sangat membantu kami menjangkau pasar yang lebih luas. Terima kasih Kampung Inggris!', 'As an MSME actor, the digital marketing and English training greatly helps us reach wider markets. Thank you, Kampung Inggris!')}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">BS</div>
                  <div>
                    <h5>Budi Santoso</h5>
                    <span>{t('Pelaku UMKM Kuliner', 'Culinary MSME Owner')}</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card reveal">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t('Konsep yang luar biasa! Menggabungkan pendidikan Bahasa Inggris dengan ekowisata mangrove adalah ide brilian yang bisa menjadi model nasional.', 'An extraordinary concept! Combining English education with mangrove eco-tourism is a brilliant idea that could become a national model.')}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">DP</div>
                  <div>
                    <h5>Dr. Ahmad Prasetyo</h5>
                    <span>{t('Akademisi Universitas Balikpapan', 'Academic, Balikpapan University')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section id="mitra" style={{ background: 'var(--bg2)' }}>
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('12.7 // Mitra', '12.7 // Partners')}</span>
                <h2 className="st">
                  <span className="lm">{t('Berkolaborasi untuk', 'Collaborating for')} <span className="acc">{t('Dampak Lebih Besar', 'Greater Impact')}</span></span>
                </h2>
                <p className="lead">{t('Bergabung dengan kami dalam membangun masa depan SDM Balikpapan.', 'Join us in building the future of Balikpapan\'s human resources.')}</p>
              </div>
              <span className="sec-num">SEC.12.7 / PARTNERS.NET</span>
            </div>
            <div className="partners-grid">
              <div className="partner-card reveal">
                <div className="partner-icon">🏛️</div>
                <h4>{t('Pemerintah', 'Government')}</h4>
                <p>{t('Pemerintah Kota Balikpapan, Provinsi Kaltim, Kementerian', 'Balikpapan City Gov, East Kalimantan Province, Ministries')}</p>
              </div>
              <div className="partner-card reveal">
                <div className="partner-icon">🎓</div>
                <h4>{t('Pendidikan', 'Education')}</h4>
                <p>{t('SMKN 7, Universitas, Lembaga Kursus', 'SMKN 7, Universities, Training Institutions')}</p>
              </div>
              <div className="partner-card reveal">
                <div className="partner-icon">🏭</div>
                <h4>{t('Industri', 'Industry')}</h4>
                <p>{t('Perusahaan Maritim, Logistik, Energi, Pariwisata', 'Maritime, Logistics, Energy, Tourism Companies')}</p>
              </div>
              <div className="partner-card reveal">
                <div className="partner-icon">🤝</div>
                <h4>{t('Komunitas', 'Community')}</h4>
                <p>{t('Komunitas Lokal, NGO, Relawan, Media', 'Local Communities, NGOs, Volunteers, Media')}</p>
              </div>
              <div className="partner-card reveal">
                <div className="partner-icon">💰</div>
                <h4>{t('CSR & Donor', 'CSR & Donors')}</h4>
                <p>{t('Program TJSL, Yayasan, Donatur Individual', 'CSR Programs, Foundations, Individual Donors')}</p>
              </div>
              <div className="partner-card reveal">
                <div className="partner-icon">🌐</div>
                <h4>{t('Internasional', 'International')}</h4>
                <p>{t('Organisasi Internasional, Kedutaan, Program Pertukaran', 'International Orgs, Embassies, Exchange Programs')}</p>
              </div>
            </div>
            <div className="partners-cta reveal">
              <p>{t('Tertarik menjadi mitra? Hubungi kami untuk diskusi kolaborasi.', 'Interested in becoming a partner? Contact us to discuss collaboration.')}</p>
              <a href="#kontak" className="btn btn-g">{t('Jadi Mitra', 'Become a Partner')} →</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('12.8 // FAQ', '12.8 // FAQ')}</span>
                <h2 className="st">
                  <span className="lm">{t('Pertanyaan', 'Frequently Asked')} <span className="acc">{t('yang Sering Diajukan', 'Questions')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.12.8 / FAQ.SYS</span>
            </div>
            <div className="faq-list">
              <FAQItem
                question={t('Apa itu Kampung Inggris Mangrove Margo Mulyo?', 'What is Kampung Inggris Mangrove Margo Mulyo?')}
                answer={t('Program pengembangan SDM berbasis edukasi, ekowisata, industri, dan pemberdayaan masyarakat di Balikpapan yang menggabungkan pembelajaran Bahasa Inggris dengan konservasi mangrove dan pelatihan industri.', 'An HR development program based on education, eco-tourism, industry, and community empowerment in Balikpapan that combines English learning with mangrove conservation and industrial training.')}
              />
              <FAQItem
                question={t('Siapa yang bisa bergabung?', 'Who can join?')}
                answer={t('Program terbuka untuk semua kalangan: pelajar, mahasiswa, pekerja, pelaku UMKM, dan masyarakat umum. Tidak ada batasan usia atau latar belakang pendidikan.', 'The program is open to everyone: students, workers, MSME owners, and the general public. There are no age or educational background restrictions.')}
              />
              <FAQItem
                question={t('Berapa biaya untuk bergabung?', 'How much does it cost to join?')}
                answer={t('Iuran ditetapkan melalui musyawarah anggota. Pelajar mendapat tarif khusus, tutor/relawan gratis, dan anggota dengan keterbatasan ekonomi dapat dibebaskan iuran berdasarkan kesepakatan pengurus.', 'Dues are set through member assemblies. Students get special rates, tutors/volunteers are free, and members with financial constraints can be exempted based on board agreement.')}
              />
              <FAQItem
                question={t('Di mana lokasi program?', 'Where is the program located?')}
                answer={t('Program berlokasi di Margo Mulyo, Kecamatan Balikpapan Barat, Kota Balikpapan, Kalimantan Timur. Kawasan ini dekat dengan wisata mangrove dan kawasan industri Kariangau.', 'The program is located in Margo Mulyo, West Balikpapan District, Balikpapan City, East Kalimantan. The area is close to mangrove tourism and the Kariangau industrial zone.')}
              />
              <FAQItem
                question={t('Apa saja kegiatan yang tersedia?', 'What activities are available?')}
                answer={t('English Conversation, English for Work/Industry, Maritime English, English for Tourism, Eco-English, English Day, English Camp, dan pelatihan UMKM & digital marketing.', 'English Conversation, English for Work/Industry, Maritime English, English for Tourism, Eco-English, English Day, English Camp, and MSME & digital marketing training.')}
              />
              <FAQItem
                question={t('Bagaimana cara mendaftar?', 'How to register?')}
                answer={t('Anda dapat mendaftar melalui formulir di website ini atau datang langsung ke lokasi program. Tim kami akan menghubungi Anda untuk informasi lebih lanjut.', 'You can register through the form on this website or visit the program location directly. Our team will contact you for further information.')}
              />
              <FAQItem
                question={t('Apakah ada sertifikasi?', 'Is there certification?')}
                answer={t('Ya, peserta yang menyelesaikan program tertentu akan mendapatkan sertifikat partisipasi. Kami juga bekerja sama dengan lembaga sertifikasi untuk TOEFL/IELTS dan kompetensi industri.', 'Yes, participants who complete certain programs will receive participation certificates. We also partner with certification bodies for TOEFL/IELTS and industrial competencies.')}
              />
              <FAQItem
                question={t('Bagaimana saya bisa berkontribusi?', 'How can I contribute?')}
                answer={t('Anda bisa berkontribusi sebagai tutor/relawan, mitra industri, donatur, atau mitra strategis. Hubungi kami melalui formulir kontak atau WhatsApp untuk diskusi lebih lanjut.', 'You can contribute as a tutor/volunteer, industry partner, donor, or strategic partner. Contact us through the contact form or WhatsApp for further discussion.')}
              />
            </div>
          </div>
        </section>

        {/* EVENTS / NEWS */}
        <section id="agenda" style={{ background: 'var(--bg2)' }}>
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('12.9 // Agenda & Berita', '12.9 // Events & News')}</span>
                <h2 className="st">
                  <span className="lm">{t('Kegiatan', 'Upcoming')} <span className="gold">{t('Mendatang', 'Events')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.12.9 / EVENTS.CALENDAR</span>
            </div>
            <div className="events-grid">
              <div className="event-card reveal">
                <div className="event-date">
                  <span className="event-day">15</span>
                  <span className="event-month">{t('JAN', 'JAN')}</span>
                </div>
                <div className="event-info">
                  <span className="event-tag">{t('Workshop', 'Workshop')}</span>
                  <h4>{t('Pelatihan English Conversation Dasar', 'Basic English Conversation Training')}</h4>
                  <p><i className="fas fa-map-marker-alt"></i> Margo Mulyo Community Hall</p>
                  <p><i className="fas fa-clock"></i> 09:00 - 12:00 WITA</p>
                </div>
              </div>
              <div className="event-card reveal">
                <div className="event-date">
                  <span className="event-day">22</span>
                  <span className="event-month">{t('JAN', 'JAN')}</span>
                </div>
                <div className="event-info">
                  <span className="event-tag">{t('English Day', 'English Day')}</span>
                  <h4>{t('English Day: Mangrove Tour', 'English Day: Mangrove Tour')}</h4>
                  <p><i className="fas fa-map-marker-alt"></i> Mangrove Margo Mulyo</p>
                  <p><i className="fas fa-clock"></i> 07:00 - 11:00 WITA</p>
                </div>
              </div>
              <div className="event-card reveal">
                <div className="event-date">
                  <span className="event-day">05</span>
                  <span className="event-month">{t('FEB', 'FEB')}</span>
                </div>
                <div className="event-info">
                  <span className="event-tag">{t('Seminar', 'Seminar')}</span>
                  <h4>{t('Seminar: Peluang Kerja di Sektor Maritim', 'Seminar: Job Opportunities in Maritime Sector')}</h4>
                  <p><i className="fas fa-map-marker-alt"></i> SMKN 7 Balikpapan</p>
                  <p><i className="fas fa-clock"></i> 13:00 - 16:00 WITA</p>
                </div>
              </div>
              <div className="event-card reveal">
                <div className="event-date">
                  <span className="event-day">18</span>
                  <span className="event-month">{t('FEB', 'FEB')}</span>
                </div>
                <div className="event-info">
                  <span className="event-tag">{t('Camp', 'Camp')}</span>
                  <h4>{t('Eco English Camp Weekend', 'Eco English Camp Weekend')}</h4>
                  <p><i className="fas fa-map-marker-alt"></i> Mangrove Margo Mulyo</p>
                  <p><i className="fas fa-clock"></i> 2 Hari (Sabtu-Minggu)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="kontak">
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('13 // Kontak', '13 // Contact')}</span>
                <h2 className="st">
                  <span className="lm">{t('Hubungi', 'Get in')} <span className="acc">{t('Kami', 'Touch')}</span></span>
                </h2>
                <p className="lead">{t('Kami siap menjawab pertanyaan Anda dan mendiskusikan peluang kolaborasi.', 'We are ready to answer your questions and discuss collaboration opportunities.')}</p>
              </div>
              <span className="sec-num">SEC.13 / CONTACT.PORTAL</span>
            </div>
            <div className="contact-grid">
              <div className="contact-info reveal">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>{t('Lokasi', 'Location')}</h4>
                    <p>Margo Mulyo, Balikpapan Barat<br/>Kota Balikpapan, Kalimantan Timur<br/>Indonesia</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>{t('Telepon / WhatsApp', 'Phone / WhatsApp')}</h4>
                    <p>+62 822-2397-2222</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h4>Email</h4>
                    <p>info@kimm-balikpapan.id</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">🕐</div>
                  <div>
                    <h4>{t('Jam Operasional', 'Operating Hours')}</h4>
                    <p>{t('Senin - Jumat: 08:00 - 17:00 WITA', 'Monday - Friday: 08:00 - 17:00 WITA')}<br/>{t('Sabtu: 08:00 - 12:00 WITA', 'Saturday: 08:00 - 12:00 WITA')}</p>
                  </div>
                </div>
                <div className="contact-social">
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                  <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                  <a href="#" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
                  <a href="https://wa.me/6282223972222" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
              <div className="contact-map reveal">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.123456789!2d116.8167!3d-1.2667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMargo+Mulyo+Balikpapan!5e0!3m2!1sen!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kampung Inggris Mangrove Margo Mulyo"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* PARALLAX IMAGE BANNER 2 */}
        <div className="parallax-banner" style={{ backgroundImage: `url('https://image.qwenlm.ai/generated-images/307c2d65-a3ff-4ef1-ad78-d0e9cd7815fe/_result.png')` }}>
          <div className="parallax-overlay">
            <h3 className="reveal">{t('Bergabung & Berdaya', 'Join & Empower')}</h3>
            <p className="reveal">{t('SATU KELAS · SATU PERCAKAPAN · SATU KETERAMPILAN · SATU PELUANG', 'ONE CLASS · ONE CONVERSATION · ONE SKILL · ONE OPPORTUNITY')}</p>
          </div>
        </div>

        {/* GABUNG / JOIN */}
        <section id="gabung">
          <div className="wrap">
            <div className="sec-top reveal">
              <div>
                <span className="eyebrow">{t('13 // Pendaftaran', '13 // Registration')}</span>
                <h2 className="st">
                  <span className="lm">{t('Bergabunglah', 'Join')} <span className="acc">{t('Bersama Kami', 'With Us')}</span></span>
                </h2>
              </div>
              <span className="sec-num">SEC.13 / ACCESS.PORTAL</span>
            </div>
            <div className="form-grid">
              <div className="reveal">
                <div className="price">
                  <h4>{t('Anggota Umum', 'General Member')}</h4>
                  <div className="pv">{t('Iuran Bulanan', 'Monthly Dues')}</div>
                  <p>{t('Besaran ditetapkan melalui musyawarah anggota', 'Amount set by members\' assembly')}</p>
                </div>
                <div className="price">
                  <h4>{t('Pelajar', 'Student')}</h4>
                  <div className="pv">{t('Iuran Ringan', 'Reduced Dues')}</div>
                  <p>{t('Tarif khusus pelajar/anak sekolah', 'Special rate for students')}</p>
                </div>
                <div className="price feat">
                  <span className="prb">{t('Dibutuhkan', 'Needed')}</span>
                  <h4>{t('Tutor / Relawan', 'Tutor / Volunteer')}</h4>
                  <div className="pv">{t('Gratis', 'Free')}</div>
                  <p>{t('Terbuka bagi relawan pengajar & profesional', 'Open to volunteer teachers & professionals')}</p>
                </div>
                <div className="price">
                  <h4>{t('Keterbatasan Ekonomi', 'Financial Hardship')}</h4>
                  <div className="pv">{t('Bebas Iuran', 'Dues Waived')}</div>
                  <p>{t('Berdasarkan kesepakatan pengurus', 'Subject to board agreement')}</p>
                </div>
              </div>
              <div className="form-box reveal">
                {!formSuccess ? (
                  <>
                    <h3>{t('Formulir Pendaftaran Anggota', 'Membership Registration Form')}</h3>
                    <p className="fsub">{t('Sesuai formulir resmi Kelompok English Swadaya.', 'Matches the official English Swadaya Group form.')}</p>
                    <form onSubmit={handleSubmit}>
                      <div className="frow">
                        <div className="field"><label>{t('Nama Lengkap *', 'Full Name *')}</label><input type="text" required /></div>
                        <div className="field"><label>{t('Tempat / Tanggal Lahir', 'Place / Date of Birth')}</label><input type="text" placeholder="Balikpapan, 01-01-2000" /></div>
                      </div>
                      <div className="field"><label>{t('Alamat *', 'Address *')}</label><input type="text" required /></div>
                      <div className="frow">
                        <div className="field"><label>{t('Nomor HP / WhatsApp *', 'Phone / WhatsApp *')}</label><input type="tel" required placeholder="08xxxxxxxxxx" /></div>
                        <div className="field"><label>{t('Pekerjaan / Status', 'Occupation / Status')}</label><input type="text" /></div>
                      </div>
                      <div className="field">
                        <label>{t('Kegiatan yang Diminati *', 'Preferred Activity *')}</label>
                        <select required>
                          <option value="">— {t('Pilih kegiatan', 'Choose activity')} —</option>
                          <option>English Conversation</option>
                          <option>English for Work / Industry</option>
                          <option>Maritime English</option>
                          <option>English for Tourism</option>
                          <option>Eco-English & Mangrove</option>
                          <option>English Day / English Camp</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>{t('Kategori Keanggotaan *', 'Membership Category *')}</label>
                        <div className="cats">
                          <label className="cat"><input type="radio" name="fCat" value="Umum" required /><span>{t('Umum', 'General')}</span></label>
                          <label className="cat"><input type="radio" name="fCat" value="Pelajar" /><span>{t('Pelajar', 'Student')}</span></label>
                          <label className="cat"><input type="radio" name="fCat" value="Tutor" /><span>Tutor</span></label>
                          <label className="cat"><input type="radio" name="fCat" value="Lainnya" /><span>{t('Lainnya', 'Other')}</span></label>
                        </div>
                      </div>
                      <label className="agree">
                        <input type="checkbox" required />
                        <span>{t('Saya bersedia mengikuti ketentuan Kelompok English Swadaya Kampung Inggris Mangrove Margo Mulyo.', 'I agree to follow the rules of the English Swadaya Group of Kampung Inggris Mangrove Margo Mulyo.')}</span>
                      </label>
                      <button type="submit" className="btn btn-g">{t('Daftar Sekarang', 'Register Now')} →</button>
                    </form>
                  </>
                ) : (
                  <div>
                    <h4 style={{ color: 'var(--green)', marginBottom: '12px' }}>{t('✅ Pendaftaran Berhasil!', '✅ Registration Successful!')}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px' }}>{t('Data Anda telah dicatat.', 'Your data has been recorded.')}</p>
                    <button className="btn btn-o" onClick={() => setFormSuccess(false)}>{t('Daftarkan Orang Lain', 'Register Another')}</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ASK / PARTNERSHIP */}
        <section id="kemitraan" className="ask">
          <div className="wrap">
            <span className="eyebrow reveal" style={{ justifyContent: 'center', display: 'inline-flex' }}>THE ASK // PARTNERSHIP</span>
            <h2 className="st reveal" dangerouslySetInnerHTML={{ __html: t('Mari Jadikan Margo Mulyo Titik Temu <span class="acc">Bahasa, Alam & Dunia Kerja</span>', 'Let\'s Make Margo Mulyo the Meeting Point of <span class="acc">Language, Nature & the World of Work</span>') }}></h2>
            <div className="ask-items">
              <div className="ask-it reveal"><span className="ai">🏛</span><p>{t('Sinergi kebijakan & kelembagaan', 'Policy & institutional synergy')}</p></div>
              <div className="ask-it reveal"><span className="ai">🔗</span><p>{t('Kemitraan sekolah–kampus–industri', 'School–university–industry partnerships')}</p></div>
              <div className="ask-it reveal"><span className="ai">💰</span><p>{t('Pendanaan fasilitas & pengembangan kawasan', 'Facility & area development funding')}</p></div>
              <div className="ask-it reveal"><span className="ai">🤝</span><p>{t('Dukungan program CSR / TJSL', 'CSR / TJSL program support')}</p></div>
            </div>
            <div className="ask-btns reveal">
              <a href="#gabung" className="btn btn-g">{t('Hubungi / Gabung', 'Contact / Join')}</a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-col">
              <img src="/kimm-logo.svg" alt="KIMM Logo" className="footer-logo" />
              <p>{t('Kampung Inggris Mangrove Margo Mulyo — Pusat pengembangan SDM berbasis edukasi, ekowisata, industri, dan pemberdayaan masyarakat.', 'Kampung Inggris Mangrove Margo Mulyo — Human resource development center based on education, eco-tourism, industry, and community empowerment.')}</p>
              <div className="footer-social">
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="#" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
                <a href="https://wa.me/6282223972222" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
            <div className="footer-col">
              <h4>{t('Navigasi', 'Navigation')}</h4>
              <a href="#tentang">{t('Tentang Kami', 'About Us')}</a>
              <a href="#program">{t('Program', 'Programs')}</a>
              <a href="#video">{t('Video', 'Video')}</a>
              <a href="#galeri">{t('Galeri', 'Gallery')}</a>
              <a href="#tim">{t('Tim', 'Team')}</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-col">
              <h4>{t('Program', 'Programs')}</h4>
              <a href="#program">English Day</a>
              <a href="#program">Industrial English Academy</a>
              <a href="#program">Maritime English Academy</a>
              <a href="#program">Eco English Camp</a>
              <a href="#program">Mangrove Festival</a>
              <a href="#program">IKN English Preparation</a>
            </div>
            <div className="footer-col">
              <h4>{t('Kontak', 'Contact')}</h4>
              <p>📍 Margo Mulyo, Balikpapan Barat</p>
              <p>📞 +62 822-2397-2222</p>
              <p>✉️ info@kimm-balikpapan.id</p>
              <div className="footer-newsletter">
                <h5>{t('Newsletter', 'Newsletter')}</h5>
                <form onSubmit={(e) => { e.preventDefault(); showToast(t('✅ Berhasil berlangganan!', '✅ Subscribed!')); }}>
                  <input type="email" placeholder={t('Email Anda', 'Your email')} required />
                  <button type="submit" className="btn btn-g btn-sm">{t('Subscribe', 'Subscribe')}</button>
                </form>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Kampung Inggris Mangrove Margo Mulyo · Balikpapan · Kalimantan Timur</p>
            <p>
              <a href="#home">KIMM.SYS</a> · {t('Program Strategis Daerah', 'Regional Strategic Program')} · {t('Belajar ✦ Berwisata ✦ Berkarya ✦ Berdaya', 'Learn ✦ Explore ✦ Create ✦ Empower')}
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <a className="fab fab-wa" href="https://wa.me/6282223972222" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 017 2.9 9.83 9.83 0 012.89 7c0 5.45-4.44 9.88-9.9 9.88zm8.42-18.3A11.8 11.8 0 0012.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.47-8.4z"></path></svg>
      </a>
      <button className={`fab fab-top ${showTop ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>

      {/* LIGHTBOX */}
      <div className={`lightbox ${lightbox.open ? 'open' : ''}`} onClick={() => setLightbox({ ...lightbox, open: false })}>
        <button className="lightbox-close" onClick={() => setLightbox({ ...lightbox, open: false })}>✕</button>
        {lightbox.open && <img src={lightbox.src} alt={lightbox.title} />}
        <div className="lightbox-meta">{lightbox.meta} — {lightbox.title}</div>
      </div>

      {/* DOC MODAL */}
      <div className={`doc-modal ${docModal ? 'open' : ''}`}>
        <div className="doc-modal-inner">
          <button className="close-doc" onClick={() => setDocModal(null)}>✕</button>
          {docModal === 'pitch' && <PitchDoc />}
          {docModal === 'preface' && <PrefaceDoc lang={lang} />}
          {docModal === 'modul' && <ModulDoc />}
          {docModal === 'kelompok' && <KelompokDoc />}
        </div>
      </div>

      {/* TOAST */}
      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </>
  );
}

// Clock component
function Clock() {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s} WITA`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return <>{time}</>;
}

// Document templates
function PitchDoc() {
  return (
    <>
      <span className="mmeta">PITCH DECK // 2026 // SAPRANI · OMAR</span>
      <h3>Kampung Inggris Mangrove Margo Mulyo</h3>
      <p><em>Pusat Bahasa Inggris Berbasis Kawasan Wisata dan Industri — Pusat pengembangan SDM berbasis edukasi, ekowisata dan industri.</em></p>
      <h4>01 — The Opportunity</h4>
      <p>Pertumbuhan IKN memperbesar kebutuhan SDM dengan komunikasi Bahasa Inggris praktis dan profesional.</p>
      <ul>
        <li><b>01 Kompetensi English praktis</b> — Masyarakat dan lulusan sekolah menengah di Balikpapan Barat masih membutuhkan English yang dekat dengan dunia kerja.</li>
        <li><b>02 Kebutuhan sektor strategis</b> — Industri maritim, logistik, energi, perdagangan, konstruksi, hotel dan pariwisata membutuhkan komunikasi global.</li>
        <li><b>03 Aset lokal belum terintegrasi</b> — Pendidikan vokasi, kawasan industri dan wisata mangrove berpotensi menjadi satu ekosistem pembelajaran.</li>
      </ul>
      <h4>02 — The Solution</h4>
      <ul>
        <li><b>01 English Learning Center</b> (Foundation) — General English, Conversation, Public Speaking, TOEFL/IELTS Preparation, English Camp.</li>
        <li><b>02 English for Industry Center</b> (Job Ready) — Logistics, Maritime, Port Operation, Shipyard, HSE, Business Communication.</li>
        <li><b>03 Mangrove Eco Education Park</b> (Eco-Learning) — English Mangrove Tour, Outdoor Speaking, Environmental Education, Conservation, Eco Camp.</li>
        <li><b>04 Creative Economy & UMKM Center</b> (Empowerment) — Pelatihan UMKM, Digital Marketing, Souvenir, Kuliner Lokal, Homestay.</li>
      </ul>
      <h4>03 — Signature Programs</h4>
      <ul>
        <li><b>01 English Day</b> — Satu hari khusus English di seluruh aktivitas kawasan.</li>
        <li><b>02 Industrial English Academy</b> — Pelatihan intensif English untuk siswa vokasi dan pekerja.</li>
        <li><b>03 Maritime English Academy</b> — English khusus pelabuhan, kebaharian dan galangan kapal.</li>
        <li><b>04 Eco English Camp</b> — Camp English yang memadukan aktivitas konservasi mangrove.</li>
        <li><b>05 International Mangrove Festival</b> — Festival untuk promosi wisata, budaya dan edukasi lingkungan.</li>
        <li><b>06 IKN English Preparation</b> — Percepatan kompetensi English bagi calon tenaga pendukung IKN.</li>
      </ul>
      <h4>04 — Investment Case</h4>
      <p>Kebutuhan investasi awal <b>Rp2,6 miliar</b> untuk fasilitas, digitalisasi, pengembangan mangrove, SDM dan operasi.</p>
      <h4>05 — Delivery Roadmap</h4>
      <p>① START → ② VALIDATE → ③ SCALE → ④ POSITION</p>
    </>
  );
}

function PrefaceDoc({ lang }: { lang: Lang }) {
  return (
    <>
      <span className="mmeta">KATA PENGANTAR / PREFACE // EDISI BILINGUAL // BALIKPAPAN, 2026</span>
      <h3>Kata Pengantar — Penggagas & Pendiri</h3>
      {lang === 'id' ? (
        <>
          <p>Assalamu'alaikum warahmatullahi wabarakatuh. Salam sejahtera bagi kita semua.</p>
          <p>Dengan memanjatkan puji syukur ke hadirat Tuhan Yang Maha Esa, saya, <b>Saprani</b>, sebagai perwakilan dari Penggagas dan Pendiri Kampung Inggris Mangrove Margo Mulyo, menyampaikan rasa syukur dan optimisme atas lahirnya sebuah gagasan yang kami pandang penting bagi masa depan Balikpapan dan kawasan penyangga Ibu Kota Nusantara (IKN).</p>
          <p>Program ini tidak kami hadirkan semata-mata sebagai tempat belajar Bahasa Inggris, melainkan sebagai ruang pertumbuhan manusia yang menghubungkan pendidikan, keterampilan kerja, ekowisata, industri, teknologi, dan pemberdayaan masyarakat.</p>
          <p>Bahasa Inggris dalam gagasan ini bukan tujuan akhir, melainkan jembatan menuju pengetahuan, peluang kerja, komunikasi internasional, teknologi, jejaring, dan kepercayaan diri.</p>
          <p><b>Dari Margo Mulyo untuk Balikpapan, dari Balikpapan untuk Kalimantan Timur, dan dari Kalimantan Timur untuk Indonesia.</b></p>
        </>
      ) : (
        <>
          <p>Assalamu'alaikum warahmatullahi wabarakatuh. Greetings and best wishes to us all.</p>
          <p>With gratitude to Almighty God, I, <b>Saprani</b>, as a representative of the Initiators and Founders of Kampung Inggris Mangrove Margo Mulyo, present this initiative with deep optimism for the future of Balikpapan and the areas supporting the Nusantara Capital (IKN).</p>
          <p>We do not envision this program merely as a place to learn English, but as a space for human growth connecting education, employability skills, eco-tourism, industry, technology, and community empowerment.</p>
          <p>In this vision, English is not the final destination; it is a bridge to knowledge, employment opportunities, international communication, technology, networks, and confidence.</p>
          <p><b>From Margo Mulyo for Balikpapan, from Balikpapan for East Kalimantan, and from East Kalimantan for Indonesia.</b></p>
        </>
      )}
      <p style={{ marginTop: '18px' }}><em>Balikpapan, 2026 — Perwakilan Penggagas dan Pendiri, SAPRANI</em></p>
    </>
  );
}

function ModulDoc() {
  return (
    <>
      <span className="mmeta">DOKUMEN OPERASIONAL AWAL // TAHUN 2026</span>
      <h3>Modul Kegiatan, Dokumentasi, Pencatatan & Administrasi</h3>
      <h4>A. Tujuan Modul</h4>
      <ul>
        <li>Menjadi pedoman pelaksanaan kegiatan English Swadaya secara tertib dan konsisten.</li>
        <li>Menjadi pedoman dokumentasi setiap kegiatan agar perkembangan kelompok dapat dibuktikan.</li>
        <li>Menjadi pedoman pencatatan peserta, kehadiran, kegiatan, keuangan, tutor, dan hasil belajar.</li>
      </ul>
      <h4>B. Prinsip Kegiatan</h4>
      <p>Swadaya dan gotong royong • berorientasi pada praktik komunikasi Bahasa Inggris • terbuka bagi masyarakat sesuai kapasitas kegiatan • administrasi sederhana, transparan, dan dapat diperiksa.</p>
      <h4>C. Modul Kegiatan 1 — English Conversation Dasar</h4>
      <p>Tema: <em>Introducing Yourself and Daily Conversation</em> • Sasaran: anggota/peserta pemula • Durasi: 90 menit • Frekuensi: 2 kali per minggu.</p>
      <table className="tbl">
        <tbody>
          <tr><th>Tahap</th><th>Durasi</th><th>Kegiatan</th></tr>
          <tr><td>Pembukaan</td><td>10 menit</td><td>Salam, perkenalan tutor, kehadiran, tujuan.</td></tr>
          <tr><td>Pemanasan</td><td>10 menit</td><td>Greeting dan percakapan berpasangan.</td></tr>
          <tr><td>Materi</td><td>20 menit</td><td>Kosakata dan pola kalimat perkenalan.</td></tr>
          <tr><td>Praktik</td><td>20 menit</td><td>Tanya jawab berpasangan.</td></tr>
          <tr><td>Praktik kelompok</td><td>20 menit</td><td>Simulasi percakapan.</td></tr>
          <tr><td>Penutup</td><td>10 menit</td><td>Umpan balik, tugas, dokumentasi.</td></tr>
        </tbody>
      </table>
      <h4>D. Dokumentasi Kegiatan</h4>
      <p>Minimal 3–5 foto representatif; format nama file: YYYY-MM-DD_NamaKegiatan_Lokasi_Nomor</p>
    </>
  );
}

function KelompokDoc() {
  return (
    <>
      <span className="mmeta">SURAT PEMBENTUKAN // NOMOR: ____/KES-KIMM/____/2026</span>
      <h3>Pembentukan Kelompok English Swadaya</h3>
      <p>Pada tahun 2026, bertempat di Margo Mulyo, Kelurahan Margo Mulyo, Kecamatan Balikpapan Barat, Kota Balikpapan, Kalimantan Timur, telah dilaksanakan musyawarah pembentukan Kelompok English Swadaya Kampung Inggris Mangrove Margo Mulyo.</p>
      <h4>Memutuskan</h4>
      <ul>
        <li><b>KESATU:</b> Kelompok bernama Kelompok English Swadaya Kampung Inggris Mangrove Margo Mulyo.</li>
        <li><b>KEDUA:</b> Kelompok bersifat sosial, edukatif, mandiri, terbuka.</li>
        <li><b>KETIGA:</b> Kelompok menjadi embrio/pilot project Kampung Inggris Mangrove Margo Mulyo.</li>
        <li><b>KEEMPAT:</b> Kegiatan awal meliputi English Conversation, English for Work, English for Industry, Maritime English, English for Tourism, Eco-English, English Day, dan English Camp.</li>
      </ul>
      <h4>Struktur Organisasi</h4>
      <table className="tbl">
        <tbody>
          <tr><th>Jabatan</th><th>Nama / Keterangan</th></tr>
          <tr><td>Pembina/Penasihat</td><td>Tokoh masyarakat/pendidikan</td></tr>
          <tr><td>Penggagas/Inisiator</td><td>SAPRANI / OMAR</td></tr>
          <tr><td>Ketua</td><td>—</td></tr>
          <tr><td>Wakil Ketua</td><td>—</td></tr>
          <tr><td>Sekretaris</td><td>—</td></tr>
          <tr><td>Bendahara</td><td>—</td></tr>
          <tr><td>Koordinator Program</td><td>—</td></tr>
          <tr><td>Koordinator Tutor</td><td>—</td></tr>
          <tr><td>Koordinator Kemitraan</td><td>—</td></tr>
          <tr><td>Koordinator Eco-English</td><td>—</td></tr>
        </tbody>
      </table>
    </>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

type Lang = 'id' | 'en';
