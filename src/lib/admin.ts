import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminAuditLogs, adminUsers } from "@/db/schema";
import { authenticationEnabled, getAuthenticatedAdminId, hashPassword } from "@/lib/auth";

export async function ensureDefaultAdminUser() {
  const existing = await db.select().from(adminUsers).limit(1);
  if (existing.length > 0) return;

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "faveda2026";
  const name = process.env.ADMIN_NAME || "Admin Faveda";

  await db.insert(adminUsers).values({
    name,
    username,
    passwordHash: hashPassword(password),
    role: "owner",
    active: true,
    mustChangePassword: false,
  });
}

/**
 * In direct-access mode, administrative actions are attributed to the primary
 * active owner profile. When APP_AUTH_ENABLED=true, the signed cookie is used.
 */
export async function getAuthenticatedAdmin() {
  await ensureDefaultAdminUser();
  const adminId = await getAuthenticatedAdminId();
  if (adminId) {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.id, adminId)).limit(1);
    if (admin?.active) return admin;
    return null;
  }

  if (!authenticationEnabled) {
    const users = await db.select().from(adminUsers);
    return users.find((user) => user.active && user.role === "owner") ?? users.find((user) => user.active) ?? null;
  }
  return null;
}

export async function requireAuthenticatedAdmin() {
  return getAuthenticatedAdmin();
}

export async function logAdminAction(input: {
  actorAdminId?: number | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  description: string;
  meta?: Record<string, unknown> | null;
}) {
  try {
    await db.insert(adminAuditLogs).values({
      actorAdminId: input.actorAdminId ?? null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      description: input.description,
      meta: input.meta ? JSON.stringify(input.meta) : null,
    });
  } catch {
    // Never block main flows because of audit logging
  }
}
