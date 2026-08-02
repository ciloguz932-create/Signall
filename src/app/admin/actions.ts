"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  clearAuthCookie,
  isAuthed,
  setAuthCookie,
  verifyPassword,
} from "@/lib/auth";
import {
  readData,
  writeData,
  slugify,
  type PostData,
  type SiteSettings,
} from "@/lib/store";

async function requireAuth(): Promise<boolean> {
  return isAuthed();
}

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function login(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { ok: false, error: "Şifre gerekli." };
  const valid = await verifyPassword(password);
  if (!valid) return { ok: false, error: "Şifre hatalı. Tekrar deneyin." };
  await setAuthCookie();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await clearAuthCookie();
  redirect("/admin/login");
}

export async function savePost(input: PostData): Promise<ActionResult> {
  if (!(await requireAuth())) return { ok: false, error: "Oturum geçersiz." };
  const id = slugify(input.id) || slugify(input.title.tr);
  if (!id) return { ok: false, error: "Geçerli bir id/slug gerekli." };
  if (!input.title.tr.trim() || !input.title.en.trim())
    return { ok: false, error: "Başlık (TR ve EN) zorunludur." };

  const data = await readData();
  const existing = data.posts.find((p) => p.id === id);
  const next: PostData = {
    ...input,
    id,
    title: { tr: input.title.tr.trim(), en: input.title.en.trim() },
    tag: {
      tr: input.tag.tr.trim() || "Genel",
      en: input.tag.en.trim() || "General",
    },
    excerpt: {
      tr: input.excerpt.tr.trim(),
      en: input.excerpt.en.trim(),
    },
    link: input.link.trim() || "https://www.instagram.com/menar.official/",
    date: input.date || new Date().toISOString().slice(0, 10),
    published: Boolean(input.published),
  };
  data.posts = existing
    ? data.posts.map((p) => (p.id === id ? next : p))
    : [next, ...data.posts];
  await writeData(data);
  revalidatePath("/", "layout");
  revalidatePath("/[lang]", "layout");
  return { ok: true };
}

export async function deletePost(id: string): Promise<ActionResult> {
  if (!(await requireAuth())) return { ok: false, error: "Oturum geçersiz." };
  const data = await readData();
  data.posts = data.posts.filter((p) => p.id !== id);
  await writeData(data);
  revalidatePath("/", "layout");
  revalidatePath("/[lang]", "layout");
  return { ok: true };
}

export async function saveSettings(
  settings: SiteSettings
): Promise<ActionResult> {
  if (!(await requireAuth())) return { ok: false, error: "Oturum geçersiz." };
  const data = await readData();
  data.settings = settings;
  await writeData(data);
  revalidatePath("/", "layout");
  revalidatePath("/[lang]", "layout");
  return { ok: true };
}
