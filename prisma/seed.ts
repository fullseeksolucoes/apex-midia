import "dotenv/config";

import { PrismaNeon } from "@prisma/adapter-neon";

import { brandsData, projectsData } from "../content/projects";
import { PrismaClient } from "./generated/prisma/client";

import type { ProjectMedia } from "../types/project";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL não definido. Configure em .env e tente novamente.");
  process.exit(1);
}

const adapter = new PrismaNeon({ connectionString });
const db = new PrismaClient({ adapter });

const toDbCategory = (api: string) => {
  switch (api) {
    case "brand":
      return "BRAND" as const;
    case "fashion":
      return "FASHION" as const;
    case "shortFilm":
      return "SHORT_FILM" as const;
    case "commercial":
      return "COMMERCIAL" as const;
    case "music":
      return "MUSIC" as const;
    default:
      throw new Error(`Categoria desconhecida: ${api}`);
  }
};

const toDbMediaType = (api: ProjectMedia["type"]) =>
  api === "image" ? ("IMAGE" as const) : ("VIDEO" as const);

const toDbAspect = (api: ProjectMedia["aspect"]) => {
  if (api === "wide") return "WIDE" as const;
  if (api === "tall") return "TALL" as const;
  if (api === "square") return "SQUARE" as const;
  return null;
};

async function main() {
  console.log("→ Limpando tabelas existentes...");
  await db.projectCredit.deleteMany();
  await db.projectMedia.deleteMany();
  await db.project.deleteMany();
  await db.brand.deleteMany();

  console.log(`→ Importando ${projectsData.length} projetos...`);
  for (const p of projectsData) {
    await db.project.create({
      data: {
        slug: p.slug,
        title: p.title,
        client: p.client,
        year: p.year,
        category: toDbCategory(p.category),
        excerpt: p.excerpt,
        brief: p.brief,
        featured: p.featured ?? false,
        order: p.order ?? 0,
        media: {
          create: [
            {
              slot: "COVER",
              type: toDbMediaType(p.cover.type),
              src: p.cover.src,
              poster: p.cover.poster ?? null,
              caption: p.cover.caption ?? null,
              width: p.cover.width,
              height: p.cover.height,
              aspect: toDbAspect(p.cover.aspect),
              order: 0,
            },
            {
              slot: "HERO",
              type: toDbMediaType(p.hero.type),
              src: p.hero.src,
              poster: p.hero.poster ?? null,
              caption: p.hero.caption ?? null,
              width: p.hero.width,
              height: p.hero.height,
              aspect: toDbAspect(p.hero.aspect),
              order: 0,
            },
            ...p.gallery.map((m, i) => ({
              slot: "GALLERY" as const,
              type: toDbMediaType(m.type),
              src: m.src,
              poster: m.poster ?? null,
              caption: m.caption ?? null,
              width: m.width,
              height: m.height,
              aspect: toDbAspect(m.aspect),
              order: i,
            })),
          ],
        },
        credits: {
          create: p.credits.map((c, i) => ({
            role: c.role,
            name: c.name,
            order: i,
          })),
        },
      },
    });
    console.log(`  ✓ ${p.slug}`);
  }

  console.log(`→ Importando ${brandsData.length} brands...`);
  for (let i = 0; i < brandsData.length; i++) {
    const b = brandsData[i];
    await db.brand.create({
      data: {
        name: b.name,
        logo: b.logo,
        width: b.width,
        height: b.height,
        order: i,
      },
    });
    console.log(`  ✓ ${b.name}`);
  }

  console.log("✔ Seed concluído.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
