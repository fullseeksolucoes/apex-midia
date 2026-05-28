-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "featuredOnAbout" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Project_featuredOnAbout_idx" ON "Project"("featuredOnAbout");
