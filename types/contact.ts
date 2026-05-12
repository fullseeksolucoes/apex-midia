export type ProjectType =
  | "brand"
  | "commercial"
  | "fashion"
  | "music"
  | "documentary"
  | "other";

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  projectType: ProjectType;
  message: string;
}

export type ContactResult =
  | { status: "success" }
  | { status: "error"; reason: string };
