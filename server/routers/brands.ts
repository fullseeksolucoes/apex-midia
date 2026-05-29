import { revalidatePath } from "next/cache";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { brandInputSchema } from "@/lib/portfolio-schemas";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const revalidatePublicBrandPages = () => {
  revalidatePath("/");
};

export const brandsRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.brand.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return rows.map((b) => ({
      name: b.name,
      logo: b.logo,
      width: b.width,
      height: b.height,
      order: b.order,
    }));
  }),

  listAdmin: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.brand.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const row = await ctx.db.brand.findUnique({ where: { id: input.id } });
      if (!row) throw new TRPCError({ code: "NOT_FOUND" });
      return row;
    }),

  create: protectedProcedure
    .input(brandInputSchema)
    .mutation(async ({ ctx, input }) => {
      const row = await ctx.db.brand.create({ data: input });
      revalidatePublicBrandPages();
      return row;
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string().min(1), data: brandInputSchema }))
    .mutation(async ({ ctx, input }) => {
      const row = await ctx.db.brand.update({
        where: { id: input.id },
        data: input.data,
      });
      revalidatePublicBrandPages();
      return row;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.brand.delete({ where: { id: input.id } });
      revalidatePublicBrandPages();
      return { ok: true };
    }),
});
