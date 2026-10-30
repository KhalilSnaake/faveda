import {
  boolean,
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique("products_slug_key"),
  name: varchar("name", { length: 200 }).notNull(),
  subtitle: varchar("subtitle", { length: 240 }).notNull(),
  description: text("description").notNull(),
  usage: text("usage").notNull(),
  ingredients: text("ingredients").notNull(),
  volume: varchar("volume", { length: 80 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  price: integer("price").notNull(),
  image: varchar("image", { length: 300 }).notNull(),
  benefits: text("benefits").notNull().default("[]"),
  stock: integer("stock").notNull().default(40),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const drivers = pgTable("drivers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  vehicle: varchar("vehicle", { length: 80 }).notNull(),
  zone: varchar("zone", { length: 120 }).notNull(),
  status: varchar("status", { length: 30 }).notNull().default("available"),
  username: varchar("username", { length: 60 }).notNull().default(""),
  passwordHash: varchar("password_hash", { length: 200 }).notNull().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  trackingCode: varchar("tracking_code", { length: 20 }).notNull().unique("orders_tracking_code_key"),
  confirmationCode: varchar("confirmation_code", { length: 4 }).notNull(),
  customerName: varchar("customer_name", { length: 160 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 40 }).notNull(),
  customerEmail: varchar("customer_email", { length: 160 }),
  address: text("address").notNull(),
  city: varchar("city", { length: 120 }).notNull(),
  landmark: varchar("landmark", { length: 200 }),
  notes: text("notes"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  paymentMethod: varchar("payment_method", { length: 40 }).notNull(),
  paymentPhone: varchar("payment_phone", { length: 40 }),
  status: varchar("status", { length: 30 }).notNull().default("pending"),
  driverId: integer("driver_id").references(() => drivers.id),
  subtotal: integer("subtotal").notNull(),
  deliveryFee: integer("delivery_fee").notNull().default(1500),
  discount: integer("discount").notNull().default(0),
  total: integer("total").notNull(),
  promoCode: varchar("promo_code", { length: 40 }),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deliveredAt: timestamp("delivered_at"),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  email: varchar("email", { length: 160 }),
  kind: varchar("kind", { length: 30 }).notNull().default("contact"),
  content: text("content").notNull(),
  rating: integer("rating"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique("videos_slug_key"),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 60 }).notNull(),
  thumbnail: varchar("thumbnail", { length: 400 }).notNull(),
  videoUrl: varchar("video_url", { length: 400 }).notNull(),
  platform: varchar("platform", { length: 40 }).notNull().default("faveda"),
  externalUrl: varchar("external_url", { length: 400 }),
  duration: integer("duration").notNull().default(0),
  views: integer("views").notNull().default(0),
  productSlug: varchar("product_slug", { length: 120 }),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  audience: varchar("audience", { length: 20 }).notNull().default("admin"),
  type: varchar("type", { length: 40 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  body: text("body").notNull(),
  orderId: integer("order_id"),
  trackingCode: varchar("tracking_code", { length: 20 }),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  username: varchar("username", { length: 60 }).notNull().unique("admin_users_username_key"),
  passwordHash: varchar("password_hash", { length: 200 }).notNull(),
  role: varchar("role", { length: 30 }).notNull().default("manager"),
  active: boolean("active").notNull().default(true),
  mustChangePassword: boolean("must_change_password").notNull().default(false),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminAuditLogs = pgTable("admin_audit_logs", {
  id: serial("id").primaryKey(),
  actorAdminId: integer("actor_admin_id").references(() => adminUsers.id),
  action: varchar("action", { length: 80 }).notNull(),
  entityType: varchar("entity_type", { length: 40 }).notNull(),
  entityId: varchar("entity_id", { length: 80 }),
  description: text("description").notNull(),
  meta: text("meta"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  department: varchar("department", { length: 120 }).notNull(),
  location: varchar("location", { length: 120 }).notNull(),
  contract: varchar("contract", { length: 80 }).notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id, { onDelete: "set null" }),
  kind: varchar("kind", { length: 30 }).notNull().default("spontaneous"),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 160 }),
  phone: varchar("phone", { length: 40 }),
  city: varchar("city", { length: 120 }),
  experience: varchar("experience", { length: 120 }),
  profileLink: varchar("profile_link", { length: 300 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 30 }).notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  productName: varchar("product_name", { length: 200 }).notNull(),
  productImage: varchar("product_image", { length: 300 }).notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
});

export type Product = typeof products.$inferSelect;
export type Driver = typeof drivers.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Video = typeof videos.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
export type AdminAuditLog = typeof adminAuditLogs.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type Application = typeof applications.$inferSelect;
