import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="space-y-8">
      <header>
        <span className="mb-2 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-gold-dark uppercase">
          <span className="h-px w-8 bg-gold-dark/50" />
          Yazılar
        </span>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-brand-deep">
          Yeni Paylaşım
        </h1>
      </header>
      <section className="card-panel p-6 md:p-8">
        <PostForm initialDate={today} />
      </section>
    </div>
  );
}
