import { createTRPCRouter } from "../trpc";
import { brandsRouter } from "./brands";
import { portfolioRouter } from "./portfolio";

export const appRouter = createTRPCRouter({
  portfolio: portfolioRouter,
  brands: brandsRouter,
});

export type AppRouter = typeof appRouter;
