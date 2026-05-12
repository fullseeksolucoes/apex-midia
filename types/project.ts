export type ProjectCategory =
  | "brand"
  | "fashion"
  | "shortFilm"
  | "commercial"
  | "music";

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption?: string;
  width: number;
  height: number;
  aspect?: "wide" | "tall" | "square";
}

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: ProjectCategory;
  excerpt: string;
  brief: string;
  cover: ProjectMedia;
  hero: ProjectMedia;
  gallery: ProjectMedia[];
  credits: ProjectCredit[];
  featured?: boolean;
  order?: number;
}

export interface Brand {
  name: string;
  logo: string;
  width: number;
  height: number;
}
