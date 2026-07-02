# Project memory

Durable decisions and lessons for future sessions. Newest first.

## Image loading performance (2026-07-02)

Portfolio image speed is the site's primary quality signal (videomaker/photographer). Decisions made while optimizing it:

- **AVIF-first, WebP fallback** (`next.config.ts` `images.formats`). AVIF gives the largest byte savings. Verified locally: home hero LCP went from a 3.65 MB webp origin to ~68 KB AVIF at 1920w.
- **`images.qualities: [75, 82]`** (Next 15.3+/16 allowlist). Any `quality` used must be in this array — default 75 covers grids/heroes; `82` is used on closer-viewed surfaces (project gallery photos + video posters) to protect skin tones/gradients. If you add a new `quality={n}`, add `n` to this array or the build fails.
- **`minimumCacheTTL: 31536000` (1 year)** is safe ONLY because image URLs are content-unique: UploadThing mints a new key per upload (replacing an image yields a new URL → new optimizer cache key), and Vimeo/YouTube thumbnail URLs are stable per video. If a future flow ever reuses a stable URL for changed content, lower this.
- **Video poster hosts must be allowlisted in `remotePatterns`**: `*.ufs.sh`/`utfs.io` (UploadThing), `*.vimeocdn.com` (Vimeo oEmbed thumbnails), `i.ytimg.com` (YouTube). `VideoPlayer` posters dropped `unoptimized` and now go through the optimizer. If a poster ever renders broken, check its host is covered here.
- **Loading placeholder = SSR-safe CSS, not a DB `blurDataURL`**. `components/media/ImageFrame.tsx` reserves an `aspect-ratio` box (from stored width/height → zero CLS) and shows a subtle cream shimmer (`.image-placeholder` in `globals.css`, `bg-graphite-soft` = `#e5dfd6`) behind opaque photos. No `onLoad`/client component needed. A true per-image blur-up (nicer for photography) was deferred because it requires a Prisma column + backfill — see below.
- **Deferred**: true `blurDataURL` LQIP. Would need a nullable additive column on `ProjectMedia`/`Brand`/`AboutGalleryImage`, client-side blur generation at upload (mirror `probeImageSize`), and a backfill for existing rows. Additive/nullable → reversible, but it's a real prod Neon migration + backfill, so treat as its own reviewed change.
- **Origin banner hygiene**: `public/banner-home.webp` / `banner-about.webp` were 3.3–3.6 MB near-lossless webp; recompressed to webp q82 (~200 KB, native 2752×1536, visually verified no banding). Removed unreferenced dead banner assets (`banner1.jpeg/webp`, `banner2.png`, `banner3.png`, ~20 MB). Keep hero origins small; Next resizes per device but the origin still gates the largest variant.

## Storage / UploadThing (2026-07-01)

- Deleting a project/media now removes its files from UploadThing (`lib/uploadthing-cleanup.ts`, wired into `portfolio.update`/`delete`). Before this, deletes only removed DB rows and orphaned files accumulated.
- `media.cleanupOrphans` (protected tRPC) prunes UploadThing image files not referenced by any DB row (ProjectMedia src+poster, Brand logo, AboutGalleryImage src). Defaults to `dryRun: true` — always dry-run first. Referenced set must include ALL of those tables or it will delete live images.

## Rendering / revalidation (2026-07-01)

- Public project pages are statically generated (`generateStaticParams`, no time-based `revalidate`). Admin edits reach the site only via on-demand `revalidatePath` in the portfolio mutations — and the `[slug]` pattern alone does NOT invalidate pre-rendered routes, so mutations revalidate the resolved `/portfolio/<slug>` path (old + new on rename).
- Vimeo has no thumbnail from its URL; posters are resolved at save time via oEmbed (`lib/video-thumbnail.ts`) and stored in `ProjectMedia.poster`. YouTube derives its thumbnail from the URL. Video goes in the gallery, not the Hero (`ProjectHero` renders `hero.src` as a plain `<Image>` and would blank on a video).
