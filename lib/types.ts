export type ProjectStatus = "draft" | "published";

export interface TimelineEntry {
  date: string;
  label: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  status: ProjectStatus;
  tags: string[];
  startDate: string;
  lastUpdated: string;
  summary: string;
  timeline: TimelineEntry[];
}

export interface Project extends ProjectFrontmatter {
  content: string;
}
