"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/app/admin/actions";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`"${id}" silinsin mi? Bu işlem geri alınamaz.`))
          return;
        startTransition(async () => {
          await deletePost(id);
          router.refresh();
        });
      }}
      className="rounded-md px-2.5 py-1 font-mono text-[10px] tracking-widest text-red-700 uppercase transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? "Siliniyor…" : "Sil"}
    </button>
  );
}
