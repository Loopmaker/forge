import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export default function JournalPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen paper-grid">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="font-display text-4xl font-medium mb-8">Journal</h1>

        <div className="space-y-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/journal/${project.slug}`}
              className="block border-l-4 border-ledger pl-6 py-2 hover:bg-cream-dim transition-colors"
            >
              <h2 className="font-display text-2xl">{project.title}</h2>
              <p className="font-body text-ink-faded mt-1">{project.summary}</p>
              <p className="font-mono text-xs text-ink-faded mt-2">
                {project.lastUpdated} · {project.status}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
