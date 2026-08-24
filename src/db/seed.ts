import { count } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers, drivers, jobs, products, videos } from "@/db/schema";
import { catalogDrivers, catalogJobs, catalogProducts, catalogVideos } from "@/lib/catalog";
import { hashPassword } from "@/lib/auth";

export async function ensureSeeded() {
  const [productStats] = await db.select({ value: count() }).from(products);
  if ((productStats?.value ?? 0) === 0) {
    await db.insert(products).values(
      catalogProducts.map((product) => ({
        ...product,
        benefits: JSON.stringify(product.benefits),
      })),
    );
  }

  const [driverStats] = await db.select({ value: count() }).from(drivers);
  if ((driverStats?.value ?? 0) === 0) {
    await db.insert(drivers).values(
      catalogDrivers.map(({ password, ...driver }) => ({
        ...driver,
        passwordHash: hashPassword(password),
      })),
    );
  }

  const [videoStats] = await db.select({ value: count() }).from(videos);
  if ((videoStats?.value ?? 0) === 0) {
    await db.insert(videos).values(catalogVideos);
  }

  const [jobStats] = await db.select({ value: count() }).from(jobs);
  if ((jobStats?.value ?? 0) === 0) {
    await db.insert(jobs).values(catalogJobs);
  }

  const [adminStats] = await db.select({ value: count() }).from(adminUsers);
  if ((adminStats?.value ?? 0) === 0) {
    await db.insert(adminUsers).values({
      name: process.env.ADMIN_NAME || "Admin Faveda",
      username: process.env.ADMIN_USERNAME || "admin",
      passwordHash: hashPassword(process.env.ADMIN_PASSWORD || "faveda2026"),
      role: "owner",
      active: true,
      mustChangePassword: false,
    });
  }
}
