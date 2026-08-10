import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { TagPills } from "@/components/TagPills";

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; q?: string }>;
}) {
  const { tag, q } = await searchParams;
  const projects = await getAllProjects({ tag, query: q });

  return (
    <div className="min-h-screen paper-grid">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="font-display text-4xl font-medium mb-8">Journal</h1>

        <form method="GET" className="mb-6">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search entries..."
            className="w-full px-3 py-2 bg-cream-dim border border-ink-faded rounded font-body"
          />
        </form>

        {tag && (
          <div className="mb-6 font-mono text-xs text-ink-faded">
            Filtering by: <span className="text-ledger">{tag}</span>{" "}
            <Link href="/journal" className="underline">
              clear
            </Link>
          </div>
        )}

        {projects.length === 0 ? (
          <p className="font-body text-ink-faded pl-6 border-l-4 border-ledger py-4">
            No entries found{q ? ` for "${q}"` : ""}.
          </p>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/journal/${project.slug}`}
                className="block border-l-4 border-ledger pl-6 py-2 hover:bg-cream-dim transition-colors"
              >
                <h2 className="font-display text-2xl">{project.title}</h2>
                <p className="font-body text-ink-faded mt-1">
                  {project.summary}
                </p>
                <TagPills tags={project.tags} />
                <p className="font-mono text-xs text-ink-faded mt-2">
                  {project.lastUpdated.toISOString().split("T")[0]} ·{" "}
                  {project.status}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
