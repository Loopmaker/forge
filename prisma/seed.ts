import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const prisma = new PrismaClient();

interface TimelineFrontmatterEntry {
  date: string;
  label: string;
}

async function main() {
  const projectsDirectory = path.join(process.cwd(), "content/projects");
  const filenames = fs.readdirSync(projectsDirectory);

  for (const filename of filenames) {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        status: data.status,
        tags: data.tags,
        startDate: new Date(data.startDate),
        summary: data.summary,
        content: content.trim(),
      },
    });

    const timeline: TimelineFrontmatterEntry[] = data.timeline ?? [];

    for (const entry of timeline) {
      await prisma.timelineEntry.create({
        data: {
          date: new Date(entry.date),
          label: entry.label,
          projectId: project.id,
        },
      });
    }

    console.log(`Seeded: ${data.title} (${timeline.length} timeline entries)`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
