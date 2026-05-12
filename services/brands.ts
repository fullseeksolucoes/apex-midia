import { db } from "@/lib/db";
import type { Brand } from "@/types/project";

export async function getBrands(): Promise<Brand[]> {
  const rows = await db.brand.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return rows.map(({ name, logo, width, height }) => ({
    name,
    logo,
    width,
    height,
  }));
}
