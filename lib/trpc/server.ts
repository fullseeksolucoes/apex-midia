import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { appRouter } from "@/server/routers/_app";
import { createTRPCContext } from "@/server/trpc";

const getContext = cache(async () => {
  const h = new Headers(await headers());
  h.set("x-trpc-source", "rsc");
  return createTRPCContext({ headers: h });
});

export const api = appRouter.createCaller(getContext);
