import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import {
  defaultPosts,
  defaultSettings,
  mergeData,
  toPageDict,
  toPagePost,
  slugify,
  type Locale,
  type PageData,
  type PostData,
  type SiteData,
  type SiteSettings,
  type Bilingual,
  type PageDict,
  type Stat,
} from "@/lib/content";

export type {
  Locale,
  PageData,
  PostData,
  SiteData,
  SiteSettings,
  Bilingual,
  PageDict,
  Stat,
};

export { defaultPosts, defaultSettings, mergeData, toPageDict, slugify };

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "site.json");

export async function readData(): Promise<SiteData> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<SiteData>;
    return mergeData({ posts: defaultPosts, settings: defaultSettings }, parsed);
  } catch {
    return { posts: defaultPosts, settings: defaultSettings };
  }
}

export async function writeData(data: SiteData): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function loadPageData(locale: Locale): Promise<PageData> {
  const data = await readData();
  return {
    dict: toPageDict(data.settings, locale),
    posts: data.posts
      .filter((p) => p.published)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map((p) => toPagePost(p, locale)),
  };
}
