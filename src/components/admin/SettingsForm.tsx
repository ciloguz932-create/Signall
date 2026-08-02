"use client";

import { useState, useTransition, useId, cloneElement } from "react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/app/admin/actions";
import type { SiteSettings, Bilingual } from "@/lib/content";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactElement<{ id?: string }>;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="lbl">
        {label}
      </label>
      {cloneElement(children, { id })}
    </div>
  );
}

function BiInputs({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: Bilingual<string>;
  onChange: (v: Bilingual<string>) => void;
  textarea?: boolean;
}) {
  const cls = textarea ? "inp min-h-24 resize-y" : "inp";
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label={`${label} — TR`}>
        {textarea ? (
          <textarea className={cls} value={value.tr} onChange={(e) => onChange({ ...value, tr: e.target.value })} />
        ) : (
          <input className={cls} value={value.tr} onChange={(e) => onChange({ ...value, tr: e.target.value })} />
        )}
      </Field>
      <Field label={`${label} — EN`}>
        {textarea ? (
          <textarea className={cls} value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        ) : (
          <input className={cls} value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        )}
      </Field>
    </div>
  );
}

function Card({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-panel p-6 md:p-8">
      <header className="mb-6 flex items-center gap-3 border-b border-brand-deep/10 pb-4">
        <span className="font-mono text-xs text-gold">{num}</span>
        <h2 className="font-serif text-xl font-semibold text-brand-deep">{title}</h2>
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export default function SettingsForm({
  initial,
}: {
  initial: SiteSettings;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [s, setS] = useState<SiteSettings>(initial);

  const set = (patch: Partial<SiteSettings>) => setS((prev) => ({ ...prev, ...patch }));

  return (
    <div className="space-y-8">
      <Card num="01" title="Üst Menü (Nav)">
        <BiInputs label="Paylaşımlar" value={s.nav.posts} onChange={(v) => set({ nav: { ...s.nav, posts: v } })} />
        <BiInputs label="Hakkımda" value={s.nav.about} onChange={(v) => set({ nav: { ...s.nav, about: v } })} />
        <BiInputs label="İletişim" value={s.nav.contact} onChange={(v) => set({ nav: { ...s.nav, contact: v } })} />
      </Card>

      <Card num="02" title="Hero Bölümü">
        <BiInputs label="Rozet" value={s.hero.badge} onChange={(v) => set({ hero: { ...s.hero, badge: v } })} />
        <BiInputs label="Ana başlık" value={s.hero.title} onChange={(v) => set({ hero: { ...s.hero, title: v } })} />
        <BiInputs label="Vurgu satırı" value={s.hero.titleAccent} onChange={(v) => set({ hero: { ...s.hero, titleAccent: v } })} />
        <BiInputs label="Ghost kelime" value={s.hero.ghost} onChange={(v) => set({ hero: { ...s.hero, ghost: v } })} />
        <BiInputs label="Alt metin" value={s.hero.subtitle} textarea onChange={(v) => set({ hero: { ...s.hero, subtitle: v } })} />
        <BiInputs label="Birincil buton" value={s.hero.ctaPrimary} onChange={(v) => set({ hero: { ...s.hero, ctaPrimary: v } })} />
        <BiInputs label="İkincil buton" value={s.hero.ctaSecondary} onChange={(v) => set({ hero: { ...s.hero, ctaSecondary: v } })} />
      </Card>

      <Card num="03" title="Kayan Bant (Marquee)">
        <Field label="Kelimeler (virgülle ayır)">
          <input
            className="inp"
            value={s.marquee.tr.join(", ")}
            onChange={(e) =>
              set({
                marquee: {
                  ...s.marquee,
                  tr: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                },
              })
            }
          />
        </Field>
        <Field label="Words (comma separated)">
          <input
            className="inp"
            value={s.marquee.en.join(", ")}
            onChange={(e) =>
              set({
                marquee: {
                  ...s.marquee,
                  en: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                },
              })
            }
          />
        </Field>
      </Card>

      <Card num="04" title="Hakkımda">
        <BiInputs label="Başlık" value={s.about.title} onChange={(v) => set({ about: { ...s.about, title: v } })} />
        <BiInputs label="Ghost kelime" value={s.about.ghost} onChange={(v) => set({ about: { ...s.about, ghost: v } })} />
        <Field label="Paragraflar (TR — boş satırla ayır)">
          <textarea
            className="inp min-h-28 resize-y"
            value={s.about.body.tr.join("\n\n")}
            onChange={(e) => set({ about: { ...s.about, body: { ...s.about.body, tr: e.target.value.split(/\n\s*\n/).filter(Boolean) } } })}
          />
        </Field>
        <Field label="Paragraphs (EN — blank line separated)">
          <textarea
            className="inp min-h-28 resize-y"
            value={s.about.body.en.join("\n\n")}
            onChange={(e) => set({ about: { ...s.about, body: { ...s.about.body, en: e.target.value.split(/\n\s*\n/).filter(Boolean) } } })}
          />
        </Field>
        <div className="space-y-4">
          <p className="lbl !mb-0">İstatistikler</p>
          {s.about.stats.map((stat, i) => (
            <div key={i} className="grid gap-3 rounded-xl border border-brand-deep/10 bg-white p-4 md:grid-cols-[1fr_1fr_90px_auto]">
              <input
                className="inp"
                placeholder="Etiket TR"
                value={stat.label.tr}
                onChange={(e) => {
                  const stats = [...s.about.stats];
                  stats[i] = { ...stat, label: { ...stat.label, tr: e.target.value } };
                  set({ about: { ...s.about, stats } });
                }}
              />
              <input
                className="inp"
                placeholder="Label EN"
                value={stat.label.en}
                onChange={(e) => {
                  const stats = [...s.about.stats];
                  stats[i] = { ...stat, label: { ...stat.label, en: e.target.value } };
                  set({ about: { ...s.about, stats } });
                }}
              />
              <input
                type="number"
                className="inp"
                value={stat.value}
                onChange={(e) => {
                  const stats = [...s.about.stats];
                  stats[i] = { ...stat, value: Number(e.target.value) || 0 };
                  set({ about: { ...s.about, stats } });
                }}
              />
              <input
                className="inp"
                placeholder="+"
                value={stat.suffix}
                onChange={(e) => {
                  const stats = [...s.about.stats];
                  stats[i] = { ...stat, suffix: e.target.value };
                  set({ about: { ...s.about, stats } });
                }}
              />
              <button
                type="button"
                className="btn-ghost !px-3 !py-2 text-xs"
                onClick={() =>
                  set({ about: { ...s.about, stats: s.about.stats.filter((_, j) => j !== i) } })
                }
              >
                Sil
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-ghost text-xs"
            onClick={() =>
              set({
                about: {
                  ...s.about,
                  stats: [
                    ...s.about.stats,
                    { label: { tr: "", en: "" }, value: 0, suffix: "+" },
                  ],
                },
              })
            }
          >
            + İstatistik Ekle
          </button>
        </div>
      </Card>

      <Card num="05" title="Paylaşımlar Bölümü">
        <BiInputs label="Başlık" value={s.postsSection.title} onChange={(v) => set({ postsSection: { ...s.postsSection, title: v } })} />
        <BiInputs label="Alt metin" value={s.postsSection.subtitle} onChange={(v) => set({ postsSection: { ...s.postsSection, subtitle: v } })} />
        <BiInputs label="Devam et metni" value={s.postsSection.readMore} onChange={(v) => set({ postsSection: { ...s.postsSection, readMore: v } })} />
      </Card>

      <Card num="06" title="İletişim">
        <BiInputs label="Başlık" value={s.contact.title} onChange={(v) => set({ contact: { ...s.contact, title: v } })} />
        <BiInputs label="Ghost kelime" value={s.contact.ghost} onChange={(v) => set({ contact: { ...s.contact, ghost: v } })} />
        <BiInputs label="Alt metin" value={s.contact.subtitle} onChange={(v) => set({ contact: { ...s.contact, subtitle: v } })} />
        <BiInputs label="Buton metni" value={s.contact.instagram} onChange={(v) => set({ contact: { ...s.contact, instagram: v } })} />
        <Field label="Instagram bağlantısı">
          <input
            className="inp font-mono text-xs"
            value={s.contact.instagramUrl}
            onChange={(e) => set({ contact: { ...s.contact, instagramUrl: e.target.value } })}
          />
        </Field>
      </Card>

      <Card num="07" title="Alt Bilgi (Footer)">
        <BiInputs label="Slogan" value={s.footer.tagline} onChange={(v) => set({ footer: { ...s.footer, tagline: v } })} />
        <BiInputs label="Haklar metni" value={s.footer.rights} onChange={(v) => set({ footer: { ...s.footer, rights: v } })} />
      </Card>

      {error && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setError(null);
            startTransition(async () => {
              const res = await saveSettings(s);
              if (!res.ok) {
                setError(res.error);
                return;
              }
              router.refresh();
            });
          }}
          className="btn-gold disabled:opacity-60"
        >
          {pending ? "Kaydediliyor…" : "Ayarları Kaydet"}
        </button>
        <a href="/tr" target="_blank" rel="noopener noreferrer" className="btn-ghost">
          Önizle →
        </a>
      </div>
    </div>
  );
}
