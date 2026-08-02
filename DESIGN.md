# DESIGN.md — Menar

## 1. Visual Theme & Atmosphere
Zümrüt & Şampanya Altını — "editör dergisi" havası. Koyu zümrüt zemin + beyaz ferahlık + şampanya altını vurgu. Bilgi, bilim, felsefe içeriklerine yakışan sakin, derin, akademik ama premium bir ton. Hero koyu, içerik bölümleri açık. Film grain dokusu, ghost tipografi ve hairline'lar tüm sayfada tutarlıdır.

## 2. Color Palette & Roles
```css
--color-brand-deep: #0a2b20;   /* koyu zümrüt — hero, footer, kart rozetleri */
--color-brand: #0f3d2e;        /* ana marka yeşili */
--color-brand-mid: #145c42;    /* orta yeşil — hover */
--color-brand-light: #2e8b5f;  /* parlak yeşil — linkler */
--color-mist: #eef4f0;         /* açık yeşil zemin — posts bölümü */
--color-sage: #a8c7b5;         /* açık yeşil çizgi/gölge */
--color-gold: #c9a86a;         /* şampanya altını — ana aksan */
--color-gold-light: #e6d3a3;   /* açık altın — koyu zeminde metin/çizgi */
--color-gold-dark: #8a6d3b;    /* koyu altın — altın üstünde metin, shimmer uçları */
```
- Tek aksan: şampanya altını. Yeşil yalnızca marka zemini ve bağlantı renklerinde.
- Seçim rengi: gold zemin + brand-deep metin.

## 3. Typography Rules
- Google Fonts: Geist (sans), Geist Mono (mono), Playfair Display (serif başlıklar)
- H1: Playfair Display 5xl–7xl, tracking-tight, leading 1.08; vurgu satırı italic + shimmer
- H2: Playfair Display 4xl–5xl, tracking-tight
- Body: Geist 17-18px, line-height 1.7
- Eyebrow/etiket: font-mono, 10–11px, letter-spacing 0.3em, uppercase
- Bölüm index'leri: "01 / 02 / 03" mono + hairline (sol veya orta)
- Ghost kelime: Playfair italic, -webkit-text-stroke 1.5px gold/18, text-transparent
- Sayılar: tabular-nums; başlıklarda text-wrap: balance

## 4. Component Stylings
- **Buton (primary)**: altın gradient (gold-dark → gold → gold-dark), metin brand-deep, `.btn-sheen` parıltı süpürmesi; hover: translateY(-2px) + glow
- **Buton (secondary)**: border gold/40, metin gold-light; hover: bg gold/10
- **Kart**: beyaz zemin, ring brand-deep/10 (border yok), radius 16px, zümrüt-tonlu gölge; hover: translateY(-6px) + ring-gold/60 + SpotlightCard
- **Öne çıkan kart (posts ilk)**: md:col-span-2, yatay editoryal düzen, dev ghost numara ("01")
- **Rozet**: kare (rounded-md), bg-brand-deep, metin gold-light, mono uppercase
- **Nav link**: "01 Paylaşımlar" — mono superscript index + altın underline animasyonu; aktif bölüm: gold + tam underline
- **SectionHeader**: index + hairline + serif başlık (+ opsiyonel alt metin)
- **Link**: altta çizgi animasyonu; hover: gold-dark

## 5. Layout Principles
- Container: max-w-5xl, px-6
- Bölümler: py-28 → md:py-32; asimetri öncelikli (tam ortalama sadece hero/contact)
- Grid: posts md:grid-cols-2, ilk kart md:col-span-2
- Hero: min-h-[calc(100dvh-4rem)], ghost kelime sağda
- Section header'lar solda hizalı (contact ortalanmış)

## 6. Depth & Elevation
- Hero/contact: blur-3xl ışık blob'ları (gold/20 + brand-light), nokta deseni opacity 0.04
- Aurora: altın + zümrüt tonlu (dark: gold-light/38 + brand/50; light: gold/28 + sage/45)
- Kartlar: renkli gölge `rgba(10,43,32,…)` — siyah gölge yok
- Grain: sabit SVG feTurbulence katmanı, opacity 0.04, z-70

## 7. Animation & Interaction (L2 — Signature 6)
- **Hero H1**: text-shimmer (altın-beyaz gradient akışı) + serif italic vurgu
- **Section H2**: scroll-reveal (IntersectionObserver + translateY fade) — `@media (scripting: enabled)` ile no-JS güvenli
- **Body**: scroll-reveal satır bazlı; ilk paragrafta altın drop cap
- **CTA**: magnet hover + `.btn-sheen` parıltı süpürmesi
- **Cards**: SpotlightCard (altın radyal gradient, mouse-follow) + hover ring
- **Nav**: scroll progress çubuğu (altın gradient, scaleX) + bölüm scrollspy
- **Background**: SoftAurora; hero altında marquee (SVG sparkle ayraçlı)
- **CountUp**: about istatistiklerinde (altın, tabular-nums)
- `prefers-reduced-motion` ile tüm animasyonlar kapatılır

## 8. Do's and Don'ts
- ✅ CSS animasyon + IntersectionObserver öncelikli (performans)
- ✅ tüm animasyonlarda prefers-reduced-motion düşüşü
- ✅ pointermove rAF throttle
- ✅ focus-visible: 2px altın outline tüm interaktif öğelerde
- ✅ skip-to-content link'i
- ❌ hareketli öğelerde filter: blur() (opacity+scale)
- ❌ 12+ öğede aynı anda will-change
- ❌ scroll-jacking / Lenis — sadece native smooth scroll
- ❌ emoji / dingbat karakter (✦ vb.) — inline SVG (Sparkle)
- ❌ pill rozetler — kare rozetler
- ❌ `100vh` — `100dvh`
- ❌ `<p>` içinde `<p>` (hydration hatası) — Reveal'in `as` prop'uyla tek etiket

## 9. Responsive Behavior
- Desktop ≥ sm: nav görünür, 2 kolon grid, ghost kelimeler görünür
- Mobile: nav gizli (çizgi), tek kolon, min touch 44px
- Hero: text-5xl → lg:text-7xl; ghost kelime < sm gizli
- < 640px: aurora static gradient, marquee hızı sabit
