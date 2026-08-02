import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "menar_admin";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "menar2026";
}

function secret(): string {
  return process.env.ADMIN_SECRET || getAdminPassword();
}

function hash(value: string): string {
  return createHash("sha256").update(`${value}:${secret()}`).digest("hex");
}

export function sessionToken(): string {
  return hash("menar-admin-session");
}

function safeEqual(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a).digest();
  const bh = createHash("sha256").update(b).digest();
  return timingSafeEqual(ah, bh);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return false;
  return safeEqual(value, sessionToken());
}

export async function verifyPassword(password: string): Promise<boolean> {
  return safeEqual(hash(password), hash(getAdminPassword()));
}

export async function setAuthCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
