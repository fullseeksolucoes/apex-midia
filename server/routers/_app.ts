import { createTRPCRouter } from "../trpc";
import { aboutGalleryRouter } from "./aboutGallery";
import { brandsRouter } from "./brands";
import { contactRouter } from "./contact";
import { mediaRouter } from "./media";
import { portfolioRouter } from "./portfolio";

export const appRouter = createTRPCRouter({
  portfolio: portfolioRouter,
  brands: brandsRouter,
  contact: contactRouter,
  aboutGallery: aboutGalleryRouter,
  media: mediaRouter,
});

export type AppRouter = typeof appRouter;
