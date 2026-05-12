import { brandsData } from "@/content/projects";
import type { Brand } from "@/types/project";

export async function getBrands(): Promise<Brand[]> {
  return brandsData;
}
