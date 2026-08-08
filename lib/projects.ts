import { prisma } from "./prisma";
import { Project } from "./types";

export async function getAllProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
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
