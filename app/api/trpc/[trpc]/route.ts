import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server/routers/_app";
import { createTRPCContext } from "@/server/trpc";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ headers: req.headers }),
    onError({ error, path }) {
      if (process.env.NODE_ENV !== "production") {
        // biome-ignore lint: dev-only log
        console.error(`tRPC error on ${path ?? "<unknown>"}:`, error);
      }
    },
  });

export { handler as GET, handler as POST };
