import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { Stamp } from "@/components/Stamp";
import { Timeline } from "@/components/Timeline";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}): Promise<Metadata> {
  const { project: slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || project.status !== "published") {
    return { title: "Not found" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ project: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || project.status !== "published") {
    notFound();
  }

  return (
    <div className="min-h-screen paper-grid">
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="border-l-4 border-ledger pl-6">
          <h1 className="font-display text-4xl font-medium">{project.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="font-mono text-xs text-ink-faded">
              {project.startDate.toISOString().split("T")[0]} →{" "}
              {project.lastUpdated.toISOString().split("T")[0]}
            </p>
            <Stamp status={project.status} />
          </div>
          <div className="flex gap-2 mt-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5 bg-cream-dim text-ink-faded rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {project.timeline?.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-xl mb-4">Build Log</h2>
            <Timeline entries={project.timeline} />
          </div>
        )}
        <article className="case-study mt-8 pl-6">
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
