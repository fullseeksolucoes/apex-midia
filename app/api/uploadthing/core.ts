import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  projectImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new UploadThingError("Não autenticado");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => ({
      uploadedBy: metadata.userId,
      url: file.ufsUrl,
    })),

  projectGallery: f({
    image: { maxFileSize: "8MB", maxFileCount: 20 },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new UploadThingError("Não autenticado");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => ({
      uploadedBy: metadata.userId,
      url: file.ufsUrl,
    })),

  brandLogo: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
    "image/svg+xml": { maxFileSize: "1MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new UploadThingError("Não autenticado");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => ({
      uploadedBy: metadata.userId,
      url: file.ufsUrl,
    })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
