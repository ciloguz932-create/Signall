import Link from "next/link";
import { readData } from "@/lib/store";

export const dynamic = "force-dynamic";

function formatDate(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AdminDashboard() {
  const data = await readData();
  const published = data.posts.filter((p) => p.published).length;
  const drafts = data.posts.filter((p) => !p.published).length;
  const recent = [...data.posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  const stats = [
    { label: "Toplam Paylaşım", value: String(data.posts.length) },
    { label: "Yayında", value: String(published) },
    { label: "Taslak", value: String(drafts) },
    { label: "Dil", value: "TR / EN" },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-2 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-gold-dark uppercase">
            <span className="h-px w-8 bg-gold-dark/50" />
            Yönetim
          </span>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-brand-deep">
            Genel Bakış
          </h1>
        </div>
        <Link href="/admin/posts/new" className="btn-gold">
          + Yeni Paylaşım
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card-panel p-6">
            <span className="font-serif text-4xl font-semibold text-gold tabular-nums">
              {stat.value}
            </span>
            <p className="mt-1 text-sm text-brand-deep/55">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="card-panel p-6 md:p-8">
        <header className="mb-5 flex items-center justify-between border-b border-brand-deep/10 pb-4">
          <h2 className="font-serif text-xl font-semibold text-brand-deep">
            Son Paylaşımlar
          </h2>
          <Link
            href="/admin/posts"
            className="text-sm text-brand-light transition-colors hover:text-gold-dark"
          >
            Tümü →
          </Link>
        </header>
        <ul className="divide-y divide-brand-deep/10">
          {recent.map((post) => (
            <li key={post.id}>
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:bg-mist/60"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-brand-deep group-hover:text-brand-mid">
                    {post.title.tr}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] tracking-widest text-brand-deep/40 uppercase">
                    {post.id} · {formatDate(post.date, "tr-TR")}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-md px-2 py-1 font-mono text-[10px] tracking-widest uppercase ${
                    post.published
                      ? "bg-brand-deep text-gold-light"
                      : "bg-brand-deep/10 text-brand-deep/50"
                  }`}
                >
                  {post.published ? "Yayında" : "Taslak"}
                </span>
              </Link>
            </li>
          ))}
          {recent.length === 0 && (
            <li className="py-8 text-center text-sm text-brand-deep/50">
              Henüz paylaşım yok. İlk yazını oluştur.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
