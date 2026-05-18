import { createTRPCRouter } from "../trpc";
import { brandsRouter } from "./brands";
import { contactRouter } from "./contact";
import { portfolioRouter } from "./portfolio";

export const appRouter = createTRPCRouter({
  portfolio: portfolioRouter,
  brands: brandsRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
