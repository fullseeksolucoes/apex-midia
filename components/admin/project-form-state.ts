import type { Project, ProjectCategory } from "@/types/project";

export type MediaState = {
  src: string;
  width: number;
  height: number;
  poster?: string;
  caption?: string;
  aspect?: "wide" | "tall" | "square";
};

export type CreditState = { role: string; name: string };

export type FormState = {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: ProjectCategory;
  excerpt: string;
  brief: string;
  featured: boolean;
  featuredOnAbout: boolean;
  order: number;
  cover: MediaState | null;
  hero: MediaState | null;
  gallery: MediaState[];
  credits: CreditState[];
};

export const emptyFormState = (): FormState => ({
  slug: "",
  title: "",
  client: "",
  year: new Date().getFullYear(),
  category: "brand",
  excerpt: "",
  brief: "",
  featured: false,
  featuredOnAbout: false,
  order: 0,
  cover: null,
  hero: null,
  gallery: [],
  credits: [],
});

export const fromProject = (p: Project): FormState => ({
  slug: p.slug,
  title: p.title,
  client: p.client,
  year: p.year,
  category: p.category,
  excerpt: p.excerpt,
  brief: p.brief,
  featured: p.featured ?? false,
  featuredOnAbout: p.featuredOnAbout ?? false,
  order: p.order ?? 0,
  cover: {
    src: p.cover.src,
    width: p.cover.width,
    height: p.cover.height,
    poster: p.cover.poster,
    caption: p.cover.caption,
    aspect: p.cover.aspect,
  },
  hero: {
    src: p.hero.src,
    width: p.hero.width,
    height: p.hero.height,
    poster: p.hero.poster,
    caption: p.hero.caption,
    aspect: p.hero.aspect,
  },
  gallery: p.gallery.map((m) => ({
    src: m.src,
    width: m.width,
    height: m.height,
    poster: m.poster,
    caption: m.caption,
    aspect: m.aspect,
  })),
  credits: p.credits.map((c) => ({ role: c.role, name: c.name })),
});

export const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: "brand", label: "Marca" },
  { value: "fashion", label: "Moda" },
  { value: "shortFilm", label: "Curta" },
  { value: "commercial", label: "Comercial" },
  { value: "music", label: "Música" },
];
