export function formatCfa(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value) + " F CFA";
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function generateTrackingCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `FAV-${suffix}`;
}

export function generateConfirmationCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function parseJsonList(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function estimateDelivery(createdAt: string | Date) {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + 2);
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(date);
}
