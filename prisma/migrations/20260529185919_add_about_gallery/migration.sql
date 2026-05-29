-- CreateEnum
CREATE TYPE "AboutGalleryLayout" AS ENUM ('STAGGERED', 'MOSAIC', 'DUO', 'FILMSTRIP');

-- CreateTable
CREATE TABLE "AboutGallery" (
    "id" TEXT NOT NULL,
    "layout" "AboutGalleryLayout" NOT NULL DEFAULT 'STAGGERED',
    "visibleCount" INTEGER NOT NULL DEFAULT 6,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutGalleryImage" (
    "id" TEXT NOT NULL,
    "galleryId" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "caption" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AboutGalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AboutGalleryImage_galleryId_idx" ON "AboutGalleryImage"("galleryId");

-- AddForeignKey
ALTER TABLE "AboutGalleryImage" ADD CONSTRAINT "AboutGalleryImage_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "AboutGallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
