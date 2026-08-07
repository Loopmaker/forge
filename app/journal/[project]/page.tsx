import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ project: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen paper-grid">
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="border-l-4 border-ledger pl-6">
          <h1 className="font-display text-4xl font-medium">{project.title}</h1>
          <p className="font-mono text-xs text-ink-faded mt-2">
            {project.startDate} → {project.lastUpdated} · {project.status}
          </p>
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

        <article className="prose mt-8 pl-6 font-body">
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
