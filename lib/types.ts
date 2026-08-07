export type ProjectStatus = "draft" | "published";

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  status: ProjectStatus;
  tags: string[];
  startDate: string;
  lastUpdated: string;
  summary: string;
}

export interface Project extends ProjectFrontmatter {
  content: string;
}
