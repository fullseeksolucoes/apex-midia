import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { toApiProject, toApiProjectWithId, toDbAspect, toDbCategory, toDbMediaType } from "@/lib/portfolio-mapper";
import {
  projectCategorySchema,
  projectInputSchema,
} from "@/lib/portfolio-schemas";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import type { ProjectInput } from "@/lib/portfolio-schemas";
import type { MediaSlot } from "@/prisma/generated/prisma/enums";

const projectInclude = {
  media: true,
  credits: true,
} as const;

const buildMediaCreate = (input: ProjectInput) => {
  const items: Array<{
    slot: MediaSlot;
    type: "IMAGE" | "VIDEO";
    src: string;
    poster: string | null;
    caption: string | null;
    width: number;
    height: number;
    aspect: ReturnType<typeof toDbAspect>;
    order: number;
  }> = [
    {
      slot: "COVER",
      type: toDbMediaType(input.cover.type),
      src: input.cover.src,
      poster: input.cover.poster ?? null,
      caption: input.cover.caption ?? null,
      width: input.cover.width,
      height: input.cover.height,
      aspect: toDbAspect(input.cover.aspect),
      order: 0,
    },
    {
      slot: "HERO",
      type: toDbMediaType(input.hero.type),
      src: input.hero.src,
      poster: input.hero.poster ?? null,
      caption: input.hero.caption ?? null,
      width: input.hero.width,
      height: input.hero.height,
      aspect: toDbAspect(input.hero.aspect),
      order: 0,
    },
    ...input.gallery.map((m, i) => ({
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
  ];

  return items;
};

const buildCreditsCreate = (input: ProjectInput) =>
  input.credits.map((c, i) => ({
    role: c.role,
    name: c.name,
    order: i,
  }));

export const portfolioRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.project.findMany({
      include: projectInclude,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return rows.map(toApiProject);
  }),

  listAdmin: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.project.findMany({
      include: projectInclude,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return rows.map(toApiProjectWithId);
  }),

  featured: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.project.findMany({
      where: { featured: true },
      include: projectInclude,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return rows.map(toApiProject);
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const row = await ctx.db.project.findUnique({
        where: { slug: input.slug },
        include: projectInclude,
      });
      return row ? toApiProject(row) : null;
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const row = await ctx.db.project.findUnique({
        where: { id: input.id },
        include: projectInclude,
      });
      if (!row) throw new TRPCError({ code: "NOT_FOUND" });
      return toApiProjectWithId(row);
    }),

  related: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        limit: z.number().int().min(1).max(12).default(3),
      }),
    )
    .query(async ({ ctx, input }) => {
      const current = await ctx.db.project.findUnique({
        where: { slug: input.slug },
        select: { id: true, category: true },
      });
      if (!current) return [];

      const sameCategory = await ctx.db.project.findMany({
        where: { id: { not: current.id }, category: current.category },
        include: projectInclude,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });

      let pool = sameCategory;
      if (pool.length < input.limit) {
        const fallback = await ctx.db.project.findMany({
          where: {
            id: { not: current.id },
            category: { not: current.category },
          },
          include: projectInclude,
          orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });
        pool = [...sameCategory, ...fallback];
      }

      return pool.slice(0, input.limit).map(toApiProject);
    }),

  categories: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.project.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    return rows.map((r) => {
      const map = {
        BRAND: "brand",
        FASHION: "fashion",
        SHORT_FILM: "shortFilm",
        COMMERCIAL: "commercial",
        MUSIC: "music",
      } as const;
      return map[r.category];
    });
  }),

  slugs: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.project.findMany({ select: { slug: true } });
    return rows.map((r) => r.slug);
  }),

  create: protectedProcedure
    .input(projectInputSchema)
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.project.findUnique({
        where: { slug: input.slug },
        select: { id: true },
      });
      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Já existe um projeto com este slug.",
        });
      }
      const row = await ctx.db.project.create({
        data: {
          slug: input.slug,
          title: input.title,
          client: input.client,
          year: input.year,
          category: toDbCategory(input.category),
          excerpt: input.excerpt,
          brief: input.brief,
          featured: input.featured,
          order: input.order,
          media: { create: buildMediaCreate(input) },
          credits: { create: buildCreditsCreate(input) },
        },
        include: projectInclude,
      });
      return toApiProjectWithId(row);
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string().min(1), data: projectInputSchema }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.project.findUnique({
        where: { id: input.id },
        select: { id: true },
      });
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });

      const slugConflict = await ctx.db.project.findFirst({
        where: { slug: input.data.slug, id: { not: input.id } },
        select: { id: true },
      });
      if (slugConflict) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Outro projeto já usa este slug.",
        });
      }

      const row = await ctx.db.$transaction(async (tx) => {
        await tx.projectMedia.deleteMany({ where: { projectId: input.id } });
        await tx.projectCredit.deleteMany({ where: { projectId: input.id } });
        return tx.project.update({
          where: { id: input.id },
          data: {
            slug: input.data.slug,
            title: input.data.title,
            client: input.data.client,
            year: input.data.year,
            category: toDbCategory(input.data.category),
            excerpt: input.data.excerpt,
            brief: input.data.brief,
            featured: input.data.featured,
            order: input.data.order,
            media: { create: buildMediaCreate(input.data) },
            credits: { create: buildCreditsCreate(input.data) },
          },
          include: projectInclude,
        });
      });

      return toApiProjectWithId(row);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.project.delete({ where: { id: input.id } });
      return { ok: true };
    }),

  byCategory: publicProcedure
    .input(z.object({ category: projectCategorySchema }))
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.project.findMany({
        where: { category: toDbCategory(input.category) },
        include: projectInclude,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
      return rows.map(toApiProject);
    }),
});
