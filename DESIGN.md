# DESIGN.md — Menar

## 1. Visual Theme & Atmosphere
Zümrüt & Beyaz — "editör dergisi" havası. Karanlık zümrüt zemin + beyaz ferahlık + altın-yeşil vurgu. Bilgi, bilim, felsefe içeriklerine yakışan sakin, derin, akademik ama premium bir ton. Hero koyu, içerik bölümleri açık.

## 2. Color Palette & Roles
```css
--color-brand-deep: #0a2b20;   /* koyu zümrüt — hero, footer, kart rozetleri */
--color-brand: #0f3d2e;        /* ana marka yeşili */
--color-brand-mid: #145c42;    /* orta yeşil — hover */
--color-brand-light: #2e8b5f;  /* parlak yeşil — linkler, vurgular */
--color-gold: #2e8b5f;         /* vurgu (marka aksanı) */
--color-gold-light: #7fb89a;   /* açık yeşil — rozet metni, çizgiler */
--color-gold-dark: #145c42;    /* koyu vurgu */
--color-mist: #eef4f0;         /* açık yeşil zemin — posts bölümü */
--color-sage: #a8c7b5;         /* açık yeşil çizgi/gölge */
--color-background: #faf9f6;   /* sayfa zemin */
--color-foreground: #0a2b20;   /* metin */
```

## 3. Typography Rules
- Google Fonts: Geist (sans), Geist Mono (mono), Playfair Display (serif başlıklar)
- H1: Playfair Display italic, 4xl-6xl, gradient vurgulu
- H2: Playfair Display 3xl-4xl
- Body: Geist 17-18px, line-height 1.7, text-brand-deep/75
- Eyebrow: 12px, letter-spacing 0.2em, uppercase

## 4. Component Stylings
- **Buton (primary)**: gradient yeşil zemin, beyaz metin; hover: translateY(-2px) + glow shadow + bg position shift
- **Buton (secondary)**: border gold/40, metin gold-light; hover: bg gold/10 + border tam görünür
- **Kart**: beyaz zemin, border brand-deep/10, radius 16px; hover: translateY(-8px) + border gold/40 + shadow-2xl
- **Rozet**: bg-brand-deep, metin gold-light, radius pill
- **Link**: altta çizgi animasyonu (after: w-0 → w-full)

## 5. Layout Principles
- Container: max-w-5xl, px-6
- Bölümler: py-24
- Grid: posts sm:grid-cols-2
- Hizalama: hero ve contact ortalanmış; about/posts baştan hizalı

## 6. Depth & Elevation
- hover: shadow-2xl, shadow-gold/10
- Hero: blur-3xl ışık blob'ları (gold/20, brand-light/30)
- Kartlar: shadow-sm → hover shadow-2xl

## 7. Animation & Interaction (L2 — Signature 6)
- **Hero H1**: text-shimmer (gradient flow) — SplitText yerine GradientText
- **Section H2**: scroll-reveal (IntersectionObserver + translateY fade)
- **Body**: scroll-reveal satır bazlı
- **CTA**: magnet hover (translate scale + glow) — Magnet efekti
- **Cards**: SpotlightCard (mouse-follow radial gradient) + index numarası
- **Background**: SoftAurora (mobilde static gradient fallback)
- **Marquee**: yazı bandı (hero altı)
- **CountUp**: about istatistiklerinde
- `prefers-reduced-motion` ile tüm animasyonlar kapatılır

## 8. Do's and Don'ts
- ✅ CSS animasyon + IntersectionObserver öncelikli (performans)
- ✅ tüm animasyonlarda prefers-reduced-motion düşüşü
- ✅ pointermove rAF throttle
- ❌ hareketli öğelerde filter: blur() kullanma (opacity+scale)
- ❌ 12+ öğede aynı anda will-change
- ❌ scroll-jacking / Lenis — sadece native smooth scroll
- ❌ emoji ikon — inline SVG kullan
- ✅ her interaktif öğe hover + focus durumuna sahip

## 9. Responsive Behavior
- Desktop ≥ sm: nav görünür, 2 kolon grid
- Mobile: nav gizli (çizgi), tek kolon, min touch 44px
- Hero: text-4xl → sm:text-6xl
- < 640px: aurora static gradient, marquee hızı sabit
