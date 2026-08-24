import "dotenv/config";
import pg from "pg";

const sourceUrl = process.env.SOURCE_DATABASE_URL || process.env.DATABASE_URL;
const targetUrl = process.env.SUPABASE_DATABASE_URL;

if (!sourceUrl || !targetUrl) {
  console.error("Missing SOURCE_DATABASE_URL (or DATABASE_URL) and/or SUPABASE_DATABASE_URL.");
  process.exit(1);
}
if (sourceUrl === targetUrl) {
  console.error("Source and target URLs must be different.");
  process.exit(1);
}

const { Client } = pg;
const source = new Client({ connectionString: sourceUrl });
const target = new Client({
  connectionString: targetUrl,
  ssl: { rejectUnauthorized: process.env.SUPABASE_SSL_REJECT_UNAUTHORIZED === "true" },
});

const tables = [
  { name: "products", columns: ["id", "slug", "name", "subtitle", "description", "usage", "ingredients", "volume", "category", "price", "image", "benefits", "stock", "featured", "created_at"] },
  { name: "drivers", columns: ["id", "name", "phone", "vehicle", "zone", "status", "username", "password_hash", "created_at"] },
  { name: "admin_users", columns: ["id", "name", "username", "password_hash", "role", "active", "must_change_password", "last_login_at", "created_at"] },
  { name: "orders", columns: ["id", "tracking_code", "confirmation_code", "customer_name", "customer_phone", "customer_email", "address", "city", "landmark", "notes", "latitude", "longitude", "payment_method", "payment_phone", "status", "driver_id", "subtotal", "delivery_fee", "discount", "total", "promo_code", "admin_notes", "created_at", "updated_at", "delivered_at"] },
  { name: "order_items", columns: ["id", "order_id", "product_id", "product_name", "product_image", "unit_price", "quantity"] },
  { name: "notifications", columns: ["id", "audience", "type", "title", "body", "order_id", "tracking_code", "read", "created_at"] },
  { name: "admin_audit_logs", columns: ["id", "actor_admin_id", "action", "entity_type", "entity_id", "description", "meta", "created_at"] },
  { name: "messages", columns: ["id", "name", "phone", "email", "kind", "content", "rating", "created_at"] },
  { name: "videos", columns: ["id", "slug", "title", "description", "category", "thumbnail", "video_url", "platform", "external_url", "duration", "views", "product_slug", "featured", "published", "created_at"] },
];

async function copyTable({ name, columns }) {
  const { rows } = await source.query(`select ${columns.join(", ")} from public.${name} order by id`);
  if (rows.length === 0) {
    console.log(`${name}: nothing to copy`);
    return;
  }

  const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");
  const updates = columns.filter((column) => column !== "id").map((column) => `${column} = excluded.${column}`).join(", ");
  const query = `insert into public.${name} (${columns.join(", ")}) values (${placeholders}) on conflict (id) do update set ${updates}`;

  for (const row of rows) {
    await target.query(query, columns.map((column) => row[column]));
  }
  await target.query(`select setval(pg_get_serial_sequence('public.${name}', 'id'), coalesce((select max(id) from public.${name}), 1), true)`);
  console.log(`${name}: ${rows.length} row(s) copied`);
}

try {
  await source.connect();
  await target.connect();
  await target.query("begin");
  for (const table of tables) await copyTable(table);
  await target.query("commit");
  console.log("Supabase data migration completed successfully.");
} catch (error) {
  await target.query("rollback").catch(() => undefined);
  console.error("Migration failed:", error);
  process.exitCode = 1;
} finally {
  await source.end().catch(() => undefined);
  await target.end().catch(() => undefined);
}
