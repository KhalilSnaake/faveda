import { cookies } from "next/headers";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";

const COOKIE_NAME = "faveda_admin";

// The current Faveda deployment intentionally runs without login screens.
// Set APP_AUTH_ENABLED=true later to re-enable the cookie-based system.
export const authenticationEnabled = process.env.APP_AUTH_ENABLED === "true";

function secret() {
  return process.env.ADMIN_SECRET || "faveda-admin-secret";
}

export function signAdminToken(adminId: number) {
  const payload = String(adminId);
  const signature = createHmac("sha256", secret()).update(`admin:${payload}`).digest("hex");
  return `${payload}.${signature}`;
}

export function verifyAdminToken(token: string | undefined): number | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", secret()).update(`admin:${payload}`).digest("hex");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return null;
  if (!timingSafeEqual(left, right)) return null;
  const id = Number(payload);
  return Number.isFinite(id) ? id : null;
}

export async function getAuthenticatedAdminId() {
  if (!authenticationEnabled) return null;
  const store = await cookies();
  return verifyAdminToken(store.get(COOKIE_NAME)?.value);
}

export async function isAdminAuthenticated() {
  return !authenticationEnabled || (await getAuthenticatedAdminId()) !== null;
}

export function adminCookieName() {
  return COOKIE_NAME;
}

/* ---------- Driver authentication ---------- */

const DRIVER_COOKIE_NAME = "faveda_driver";

export function signDriverToken(driverId: number) {
  const payload = String(driverId);
  const signature = createHmac("sha256", secret()).update(`driver:${payload}`).digest("hex");
  return `${payload}.${signature}`;
}

export function verifyDriverToken(token: string | undefined): number | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", secret()).update(`driver:${payload}`).digest("hex");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return null;
  if (!timingSafeEqual(left, right)) return null;
  const id = Number(payload);
  return Number.isFinite(id) ? id : null;
}

export async function getAuthenticatedDriverId() {
  if (!authenticationEnabled) return null;
  const store = await cookies();
  return verifyDriverToken(store.get(DRIVER_COOKIE_NAME)?.value);
}

export function driverCookieName() {
  return DRIVER_COOKIE_NAME;
}

/* ---------- Password hashing (scrypt) ---------- */

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string) {
  if (!stored || !stored.includes(":")) return false;
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const derived = scryptSync(password, salt, 64).toString("hex");
  const left = Buffer.from(key);
  const right = Buffer.from(derived);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}
