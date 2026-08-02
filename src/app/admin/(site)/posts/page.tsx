import Link from "next/link";
import { readData } from "@/lib/store";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AdminPostsPage() {
  const data = await readData();
  const posts = [...data.posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-2 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-gold-dark uppercase">
            <span className="h-px w-8 bg-gold-dark/50" />
            Yazılar
          </span>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-brand-deep">
            Paylaşımlar
          </h1>
        </div>
        <Link href="/admin/posts/new" className="btn-gold">
          + Yeni Paylaşım
        </Link>
      </header>

      <section className="card-panel overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-brand-deep/10 bg-mist/60">
              <th className="px-5 py-3 font-mono text-[10px] tracking-[0.2em] text-brand-deep/50 uppercase">
                Başlık
              </th>
              <th className="hidden px-5 py-3 font-mono text-[10px] tracking-[0.2em] text-brand-deep/50 uppercase md:table-cell">
                Etiket
              </th>
              <th className="hidden px-5 py-3 font-mono text-[10px] tracking-[0.2em] text-brand-deep/50 uppercase sm:table-cell">
                Tarih
              </th>
              <th className="px-5 py-3 font-mono text-[10px] tracking-[0.2em] text-brand-deep/50 uppercase">
                Durum
              </th>
              <th className="px-5 py-3 text-right font-mono text-[10px] tracking-[0.2em] text-brand-deep/50 uppercase">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-deep/10">
            {posts.map((post) => (
              <tr key={post.id} className="group transition-colors hover:bg-mist/60">
                <td className="max-w-md px-5 py-4">
                  <p className="truncate font-medium text-brand-deep">
                    {post.title.tr}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[10px] tracking-widest text-brand-deep/40 uppercase">
                    {post.id}
                  </p>
                </td>
                <td className="hidden px-5 py-4 md:table-cell">
                  <span className="rounded-md bg-brand-deep/10 px-2 py-1 font-mono text-[10px] tracking-widest text-brand-deep/70 uppercase">
                    {post.tag.tr}
                  </span>
                </td>
                <td className="hidden px-5 py-4 font-mono text-xs text-brand-deep/60 sm:table-cell">
                  {formatDate(post.date)}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-md px-2 py-1 font-mono text-[10px] tracking-widest uppercase ${
                      post.published
                        ? "bg-brand-deep text-gold-light"
                        : "bg-brand-deep/10 text-brand-deep/50"
                    }`}
                  >
                    {post.published ? "Yayında" : "Taslak"}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="rounded-md px-2.5 py-1 font-mono text-[10px] tracking-widest text-brand-light uppercase transition-colors hover:bg-gold/10 hover:text-gold-dark"
                    >
                      Düzenle
                    </Link>
                    <DeleteButton id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-brand-deep/50">
                  Henüz paylaşım yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
