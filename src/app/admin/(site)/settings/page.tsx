import { readData } from "@/lib/store";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const data = await readData();

  return (
    <div className="space-y-10">
      <header>
        <span className="mb-2 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-gold-dark uppercase">
          <span className="h-px w-8 bg-gold-dark/50" />
          Ayarlar
        </span>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-brand-deep">
          Site Ayarları
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-deep/55">
          Hero, hakkımda, paylaşımlar, iletişim ve alt bilgi bölümlerindeki tüm
          metinleri iki dilde (TR / EN) düzenleyebilirsin. Değişiklikler{" "}
          <code className="rounded bg-brand-deep/5 px-1.5 py-0.5 font-mono text-xs">
            data/site.json
          </code>{" "}
          dosyasına kaydedilir ve sitede anında görünür.
        </p>
      </header>
      <SettingsForm initial={data.settings} />
    </div>
  );
}
