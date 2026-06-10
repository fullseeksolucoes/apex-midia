import { z } from "zod";

import { isHttpUrl } from "@/lib/video-providers";

export const httpUrl = z.url().refine(isHttpUrl, {
  message: "A URL precisa começar com http:// ou https://.",
});
