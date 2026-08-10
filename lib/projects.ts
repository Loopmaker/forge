import { prisma } from "./prisma";
import { Project } from "./types";

export async function getAllProjects(filters?: {
  tag?: string;
  query?: string;
}): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    where: {
      ...(filters?.tag ? { tags: { has: filters.tag } } : {}),
      ...(filters?.query
        ? {
            OR: [
              { title: { contains: filters.query, mode: "insensitive" } },
              { summary: { contains: filters.query, mode: "insensitive" } },
              { content: { contains: filters.query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { timeline: true },
    orderBy: { lastUpdated: "desc" },
  });

  return projects as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { timeline: true },
  });

  return project as Project | null;
}
