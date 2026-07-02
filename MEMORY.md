# Project memory

Durable decisions and lessons for future sessions. Newest first.

## Vertical video display + fullscreen (2026-07-02)

Vertical (9:16) videos displayed badly (pillarboxed) and fullscreen was buried/impossible. Two root causes + decisions:

- **Data was wrong, not just the render.** EVERY video `ProjectMedia` row was stored `1920×1080 / aspect "wide"` even for portrait videos (the client added them with the admin's default "Horizontal" toggle). The render (`VideoPlayer`) sizes purely from `ratio = width/height`, so vertical content pillarboxed in a 16:9 box. **The visible fix REQUIRES correcting the data** — merging render code alone changes nothing for existing rows.
- **Auto-correct aspect from oEmbed** (`lib/video-thumbnail.ts` `resolveVideoMedia`): the Vimeo oEmbed call (already used for posters) also returns true width/height → derive aspect (wide >1.2, tall <0.85, else square, matching `media-picker` `inferAspect`). `withResolvedPosters` now applies resolved width/height/aspect on create/update, oEmbed OVERRIDING stored dims for Vimeo (ground truth). Null-safe: on oEmbed failure it falls back to stored dims (`?? media.width`). YouTube/Panda/file are NOT auto-corrected (YT oEmbed reports the default 16:9 player, not true Shorts aspect) — they rely on the admin Horizontal/Vertical/Square toggle, which already writes correct dims.
- **Backfill existing rows**: `media.backfillVideoAspect` protected tRPC mutation, `dryRun` default true (mirrors `cleanupOrphans`). Resolves true dims per VIDEO row, updates width/height/aspect in a transaction, and `revalidatePath`s affected slugs — only on `dryRun:false`. Run it after deploying, dry-run first. This is the operational step that actually un-pillarboxes existing videos.
- **Fullscreen = app-level lightbox, not the provider button.** New `components/media/VideoLightbox.tsx`: a `role="dialog"` modal (`z-[60]`, above navbar `z-50`) that plays a CLEAN embed (`lightboxUrl` in `video-providers.ts` — YouTube WITHOUT `controls=0/fs=0/disablekb=1`, `allowFullScreen` for all providers) sized contain-fit up to 90vw×90vh, so a vertical video shows large and tall. Rationale: the inline grid deliberately hides YouTube chrome (`fs=0` + click-shield → provider fullscreen impossible) and Vimeo buries FS in its overflow on narrow players; a provider-agnostic modal solves both at once and works on iOS where element `requestFullscreen()` is flaky. The inline tile's minimal-chrome / YouTube click-shield behavior is unchanged; only the lightbox gets full controls. An `ExpandButton` ("Abrir em tela cheia") on the player opens it.
- **Inline sizing cap**: `VideoPlayer` inline box capped at `maxHeight: 70vh` so a correct tall video doesn't dominate the viewport; it still sizes from `ratio`.

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
