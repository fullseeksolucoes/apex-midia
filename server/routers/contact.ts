import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  contactStatusSchema,
  contactSubmitSchema,
  projectTypeFromDb,
  projectTypeToDb,
  statusFromDb,
  statusToDb,
} from "@/lib/contact-schemas";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

type ContactRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  projectType: string;
  message: string;
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  ttclid: string | null;
  referrer: string | null;
  landingPage: string | null;
  userAgent: string | null;
};

const serialize = (c: ContactRow) => ({
  id: c.id,
  name: c.name,
  email: c.email,
  company: c.company,
  projectType: projectTypeFromDb(c.projectType),
  message: c.message,
  status: statusFromDb(c.status),
  notes: c.notes,
  createdAt: c.createdAt,
  updatedAt: c.updatedAt,
  attribution: {
    utmSource: c.utmSource,
    utmMedium: c.utmMedium,
    utmCampaign: c.utmCampaign,
    utmTerm: c.utmTerm,
    utmContent: c.utmContent,
    gclid: c.gclid,
    fbclid: c.fbclid,
    msclkid: c.msclkid,
    ttclid: c.ttclid,
    referrer: c.referrer,
    landingPage: c.landingPage,
    userAgent: c.userAgent,
  },
});

export const contactRouter = createTRPCRouter({
  submit: publicProcedure
    .input(contactSubmitSchema)
    .mutation(async ({ ctx, input }) => {
      const { attribution, projectType, ...rest } = input;
      await ctx.db.contact.create({
        data: {
          ...rest,
          projectType: projectTypeToDb(projectType) as never,
          ...(attribution ?? {}),
        },
      });
      return { ok: true as const };
    }),

  list: protectedProcedure
    .input(
      z
        .object({
          status: contactStatusSchema.optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const rows = (await ctx.db.contact.findMany({
        where: input?.status
          ? { status: statusToDb(input.status) as never }
          : undefined,
        orderBy: { createdAt: "desc" },
      })) as ContactRow[];
      return rows.map(serialize);
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const row = (await ctx.db.contact.findUnique({
        where: { id: input.id },
      })) as ContactRow | null;
      if (!row) throw new TRPCError({ code: "NOT_FOUND" });
      return serialize(row);
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        status: contactStatusSchema,
        notes: z.string().max(4000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.contact.update({
        where: { id: input.id },
        data: {
          status: statusToDb(input.status) as never,
          ...(input.notes !== undefined ? { notes: input.notes } : {}),
        },
      });
      return { ok: true as const };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.contact.delete({ where: { id: input.id } });
      return { ok: true as const };
    }),

  stats: protectedProcedure.query(async ({ ctx }) => {
    const rows = (await ctx.db.contact.findMany({
      select: { status: true },
    })) as Array<{ status: string }>;
    const byStatus = rows.reduce<Record<string, number>>((acc, r) => {
      const key = statusFromDb(r.status);
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
    return { total: rows.length, byStatus };
  }),
});
