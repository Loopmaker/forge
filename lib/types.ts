export type ProjectStatus = "draft" | "published";

export interface TimelineEntry {
  id: string;
  date: Date;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  status: ProjectStatus;
  tags: string[];
  startDate: Date;
  lastUpdated: Date;
  summary: string;
  content: string;
  timeline: TimelineEntry[];
}
