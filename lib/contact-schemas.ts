import { z } from "zod";

import type { ProjectType } from "@/types/contact";

export const contactProjectTypeSchema = z.enum([
  "brand",
  "commercial",
  "fashion",
  "music",
  "documentary",
  "other",
]) satisfies z.ZodType<ProjectType>;

export const contactStatusSchema = z.enum([
  "new",
  "contacted",
  "qualified",
  "archived",
]);

export type ContactStatus = z.infer<typeof contactStatusSchema>;

export const contactAttributionSchema = z.object({
  utmSource: z.string().max(500).optional(),
  utmMedium: z.string().max(500).optional(),
  utmCampaign: z.string().max(500).optional(),
  utmTerm: z.string().max(500).optional(),
  utmContent: z.string().max(500).optional(),
  gclid: z.string().max(500).optional(),
  fbclid: z.string().max(500).optional(),
  msclkid: z.string().max(500).optional(),
  ttclid: z.string().max(500).optional(),
  referrer: z.string().max(2048).optional(),
  landingPage: z.string().max(2048).optional(),
  userAgent: z.string().max(500).optional(),
});

export const contactSubmitSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(240),
  company: z.string().trim().max(200).optional(),
  projectType: contactProjectTypeSchema,
  message: z.string().trim().min(5).max(4000),
  attribution: contactAttributionSchema.optional(),
});

export type ContactSubmitInput = z.infer<typeof contactSubmitSchema>;

const PROJECT_TYPE_TO_DB: Record<ProjectType, string> = {
  brand: "BRAND",
  commercial: "COMMERCIAL",
  fashion: "FASHION",
  music: "MUSIC",
  documentary: "DOCUMENTARY",
  other: "OTHER",
};

const PROJECT_TYPE_FROM_DB: Record<string, ProjectType> = {
  BRAND: "brand",
  COMMERCIAL: "commercial",
  FASHION: "fashion",
  MUSIC: "music",
  DOCUMENTARY: "documentary",
  OTHER: "other",
};

const STATUS_TO_DB: Record<ContactStatus, string> = {
  new: "NEW",
  contacted: "CONTACTED",
  qualified: "QUALIFIED",
  archived: "ARCHIVED",
};

const STATUS_FROM_DB: Record<string, ContactStatus> = {
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  ARCHIVED: "archived",
};

export const projectTypeToDb = (v: ProjectType) => PROJECT_TYPE_TO_DB[v];
export const projectTypeFromDb = (v: string): ProjectType =>
  PROJECT_TYPE_FROM_DB[v] ?? "other";
export const statusToDb = (v: ContactStatus) => STATUS_TO_DB[v];
export const statusFromDb = (v: string): ContactStatus =>
  STATUS_FROM_DB[v] ?? "new";
