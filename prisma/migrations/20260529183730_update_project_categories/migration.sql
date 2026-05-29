-- Replace SHORT_FILM and COMMERCIAL with CAR, EVENT, INSTITUTIONAL and OTHER.
-- Existing rows on the removed values are remapped to OTHER so the type swap
-- does not fail on in-use enum members.
BEGIN;

CREATE TYPE "ProjectCategory_new" AS ENUM ('BRAND', 'FASHION', 'MUSIC', 'CAR', 'EVENT', 'INSTITUTIONAL', 'OTHER');

ALTER TABLE "Project"
  ALTER COLUMN "category" TYPE "ProjectCategory_new"
  USING (
    CASE "category"::text
      WHEN 'SHORT_FILM' THEN 'OTHER'
      WHEN 'COMMERCIAL' THEN 'OTHER'
      ELSE "category"::text
    END::"ProjectCategory_new"
  );

DROP TYPE "ProjectCategory";

ALTER TYPE "ProjectCategory_new" RENAME TO "ProjectCategory";

COMMIT;
