import { z } from "zod";

export const aboutGalleryLayoutSchema = z.enum([
  "staggered",
  "mosaic",
  "duo",
  "filmstrip",
]);

export type AboutGalleryLayout = z.infer<typeof aboutGalleryLayoutSchema>;

export const aboutGalleryImageSchema = z.object({
  src: z.url(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  caption: z.string().max(280).optional(),
  visible: z.boolean().default(true),
});

export type AboutGalleryImageInput = z.infer<typeof aboutGalleryImageSchema>;

export const aboutGallerySaveSchema = z.object({
  layout: aboutGalleryLayoutSchema,
  visibleCount: z
    .number()
    .int()
    .min(2)
    .max(12)
    .refine((n) => n % 2 === 0, { message: "Use um número par de fotos." }),
  images: z.array(aboutGalleryImageSchema).max(40).default([]),
});

export type AboutGallerySaveInput = z.infer<typeof aboutGallerySaveSchema>;

export const ABOUT_GALLERY_LAYOUTS: Array<{
  value: AboutGalleryLayout;
  label: string;
  description: string;
}> = [
  {
    value: "staggered",
    label: "Colunas deslocadas",
    description: "Três colunas em alturas alternadas, ritmo editorial.",
  },
  {
    value: "mosaic",
    label: "Mosaico",
    description: "Composição com tamanhos variados e foco central.",
  },
  {
    value: "duo",
    label: "Duplas",
    description: "Pares grandes lado a lado, leitura calma.",
  },
  {
    value: "filmstrip",
    label: "Faixa",
    description: "Rolagem horizontal contínua, sensação de película.",
  },
];

export const ABOUT_GALLERY_VISIBLE_OPTIONS = [2, 4, 6, 8, 10, 12] as const;
