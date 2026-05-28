import { z } from "zod";

export const projectCategorySchema = z.enum([
  "brand",
  "fashion",
  "shortFilm",
  "commercial",
  "music",
]);

export const mediaTypeSchema = z.enum(["image", "video"]);
export const mediaAspectSchema = z.enum(["wide", "tall", "square"]);

export const projectMediaSchema = z.object({
  type: mediaTypeSchema,
  src: z.url(),
  poster: z.url().optional(),
  caption: z.string().max(280).optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  aspect: mediaAspectSchema.optional(),
});

export const projectCreditSchema = z.object({
  role: z.string().min(1).max(120),
  name: z.string().min(1).max(120),
});

const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Use apenas letras minúsculas, números e hífens.",
  });

export const projectInputSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1).max(160),
  client: z.string().min(1).max(160),
  year: z.number().int().min(1900).max(2100),
  category: projectCategorySchema,
  excerpt: z.string().min(1).max(280),
  brief: z.string().min(1).max(4000),
  featured: z.boolean().default(false),
  featuredOnAbout: z.boolean().default(false),
  order: z.number().int().min(0).max(9999).default(0),
  cover: projectMediaSchema,
  hero: projectMediaSchema,
  gallery: z.array(projectMediaSchema).max(40).default([]),
  credits: z.array(projectCreditSchema).max(40).default([]),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;

export const brandInputSchema = z.object({
  name: z.string().min(1).max(160),
  logo: z.string().min(1),
  width: z.number().int().positive().max(2000),
  height: z.number().int().positive().max(2000),
  order: z.number().int().min(0).max(9999).default(0),
});

export type BrandInput = z.infer<typeof brandInputSchema>;
