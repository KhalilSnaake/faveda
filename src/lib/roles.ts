export type AdminRole = "owner" | "manager" | "support";
export type AdminCapability =
  | "manage_users"
  | "manage_drivers"
  | "manage_orders"
  | "reset_passwords";

const roleCapabilities: Record<AdminRole, AdminCapability[]> = {
  owner: ["manage_users", "manage_drivers", "manage_orders", "reset_passwords"],
  manager: ["manage_drivers", "manage_orders"],
  support: [],
};

export function roleCan(role: string, capability: AdminCapability) {
  return (roleCapabilities[role as AdminRole] ?? []).includes(capability);
}

export function roleLabel(role: string) {
  switch (role) {
    case "owner":
      return "Propriétaire";
    case "manager":
      return "Gestionnaire";
    default:
      return "Support";
  }
}

const palette = ["#4b613a", "#9c7d36", "#6d8558", "#354628", "#8a6d2f", "#5f7350"];

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function avatarColor(id: number) {
  return palette[Math.abs(id) % palette.length];
}
