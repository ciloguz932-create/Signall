"use client";

import { useState, useTransition, useId, cloneElement } from "react";
import { useRouter } from "next/navigation";
import { savePost } from "@/app/admin/actions";
import { slugify, type PostData } from "@/lib/content";

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

export default function PostForm({
  initial,
  initialDate = "",
}: {
  initial?: PostData;
  initialDate?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [id, setId] = useState(initial?.id ?? "");
  const [titleTr, setTitleTr] = useState(initial?.title.tr ?? "");
  const [titleEn, setTitleEn] = useState(initial?.title.en ?? "");
  const [tagTr, setTagTr] = useState(initial?.tag.tr ?? "");
  const [tagEn, setTagEn] = useState(initial?.tag.en ?? "");
  const [excerptTr, setExcerptTr] = useState(initial?.excerpt.tr ?? "");
  const [excerptEn, setExcerptEn] = useState(initial?.excerpt.en ?? "");
  const [link, setLink] = useState(
    initial?.link ?? "https://www.instagram.com/menar.official/"
  );
  const [date, setDate] = useState(initial?.date ?? initialDate ?? "");
  const [published, setPublished] = useState(initial?.published ?? true);

  const submit = () => {
    setError(null);
    startTransition(async () => {
      const res = await savePost({
        id: id || slugify(titleTr),
        title: { tr: titleTr, en: titleEn },
        tag: { tr: tagTr, en: tagEn },
        excerpt: { tr: excerptTr, en: excerptEn },
        link,
        date,
        published,
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.push("/admin/posts");
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      <Field label="Slug / ID (otomatik: TR başlık)">
        <input
          className="inp font-mono text-xs"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="dede-korkut"
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Başlık — TR">
          <input
            className="inp"
            value={titleTr}
            onChange={(e) => {
              setTitleTr(e.target.value);
              if (!initial) setId(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Title — EN">
          <input className="inp" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Etiket — TR">
          <input className="inp" value={tagTr} onChange={(e) => setTagTr(e.target.value)} />
        </Field>
        <Field label="Tag — EN">
          <input className="inp" value={tagEn} onChange={(e) => setTagEn(e.target.value)} />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Özet — TR">
          <textarea
            className="inp min-h-24 resize-y"
            value={excerptTr}
            onChange={(e) => setExcerptTr(e.target.value)}
          />
        </Field>
        <Field label="Excerpt — EN">
          <textarea
            className="inp min-h-24 resize-y"
            value={excerptEn}
            onChange={(e) => setExcerptEn(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Bağlantı (Instagram)">
          <input
            className="inp font-mono text-xs"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </Field>
        <Field label="Tarih">
          <input
            type="date"
            className="inp"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>
      </div>

      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 accent-[#c9a86a]"
        />
        <span className="text-sm font-medium text-brand-deep">
          Yayında (sitede görünür)
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button type="button" onClick={submit} disabled={pending} className="btn-gold disabled:opacity-60">
          {pending ? "Kaydediliyor…" : initial ? "Değişiklikleri Kaydet" : "Paylaşımı Oluştur"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-ghost"
        >
          Vazgeç
        </button>
      </div>
    </div>
  );
}
