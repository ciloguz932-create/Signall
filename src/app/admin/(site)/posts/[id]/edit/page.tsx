import { notFound } from "next/navigation";
import { readData } from "@/lib/store";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const data = await readData();
  const post = data.posts.find((p) => p.id === id);
  if (!post) notFound();

  return (
    <div className="space-y-8">
      <header>
        <span className="mb-2 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-gold-dark uppercase">
          <span className="h-px w-8 bg-gold-dark/50" />
          Yazılar
        </span>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-brand-deep">
          Paylaşımı Düzenle
        </h1>
        <p className="mt-2 font-mono text-xs text-brand-deep/45">/ {post.id}</p>
      </header>
      <section className="card-panel p-6 md:p-8">
        <PostForm initial={post} />
      </section>
    </div>
  );
}
