import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const requireAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new UploadThingError("Não autenticado");
  return { userId };
};

export const ourFileRouter = {
  projectImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(requireAuth)
    .onUploadComplete(async ({ metadata, file }) => ({
      uploadedBy: metadata.userId,
      url: file.ufsUrl,
    })),

  projectGallery: f({
    image: { maxFileSize: "8MB", maxFileCount: 20 },
  })
    .middleware(requireAuth)
    .onUploadComplete(async ({ metadata, file }) => ({
      uploadedBy: metadata.userId,
      url: file.ufsUrl,
    })),

  brandLogo: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
    "image/svg+xml": { maxFileSize: "1MB", maxFileCount: 1 },
  })
    .middleware(requireAuth)
    .onUploadComplete(async ({ metadata, file }) => ({
      uploadedBy: metadata.userId,
      url: file.ufsUrl,
    })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
