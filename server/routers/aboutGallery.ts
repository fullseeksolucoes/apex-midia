import { revalidatePath } from "next/cache";

import { aboutGallerySaveSchema } from "@/lib/about-gallery-schemas";
import {
  toApiAboutGalleryLayout,
  toDbAboutGalleryLayout,
} from "@/lib/about-gallery-mapper";
import { defaultAboutGalleryConfig } from "@/services/aboutGallery";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const aboutGalleryRouter = createTRPCRouter({
  getAdmin: protectedProcedure.query(async ({ ctx }) => {
    const row = await ctx.db.aboutGallery.findFirst({
      include: { images: { orderBy: { order: "asc" } } },
    });
    if (!row) return defaultAboutGalleryConfig;

    return {
      layout: toApiAboutGalleryLayout(row.layout),
      visibleCount: row.visibleCount,
      images: row.images.map((image) => ({
        src: image.src,
        width: image.width,
        height: image.height,
        caption: image.caption ?? undefined,
        visible: image.visible,
      })),
    };
  }),

  save: protectedProcedure
    .input(aboutGallerySaveSchema)
    .mutation(async ({ ctx, input }) => {
      const data = {
        layout: toDbAboutGalleryLayout(input.layout),
        visibleCount: input.visibleCount,
        images: {
          create: input.images.map((image, index) => ({
            src: image.src,
            width: image.width,
            height: image.height,
            caption: image.caption ?? null,
            visible: image.visible,
            order: index,
          })),
        },
      };

      const existing = await ctx.db.aboutGallery.findFirst({
        select: { id: true },
      });

      if (existing) {
        await ctx.db.$transaction(async (tx) => {
          await tx.aboutGalleryImage.deleteMany({
            where: { galleryId: existing.id },
          });
          await tx.aboutGallery.update({ where: { id: existing.id }, data });
        });
      } else {
        await ctx.db.aboutGallery.create({ data });
      }

      revalidatePath("/sobre");
      return { ok: true as const };
    }),
});
