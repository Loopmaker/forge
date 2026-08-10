import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen paper-grid">
      <nav className="border-l-4 border-ledger pl-6 py-6 max-w-4xl mx-auto">
        <span className="font-display text-2xl">Forge</span>
      </nav>

      <main className="max-w-4xl mx-auto">
        <div className="border-l-4 border-ledger pl-6 py-8">
          <h1 className="font-display text-5xl font-medium">
            Behind every build.
          </h1>
          <p className="font-body text-ink-faded mt-4 max-w-xl text-lg">
            A log of real projects — the architecture decisions, the trade-offs,
            the bugs that took too long to find, and what I&apos;d do
            differently next time.
          </p>
          <Link
            href="/journal"
            className="inline-block mt-6 font-mono text-xs uppercase tracking-widest px-4 py-2 border-2 border-ledger text-ledger rounded-sm hover:bg-ledger hover:text-cream transition-colors"
          >
            Read the Journal
          </Link>
        </div>

        <div className="mt-16 pl-6">
          <h2 className="font-display text-xl mb-6">Recent Entries</h2>
          <div className="space-y-6">
            {projects.slice(0, 3).map((project) => (
              <Link
                key={project.slug}
                href={`/journal/${project.slug}`}
                className="block border-l-4 border-ledger pl-6 py-2 hover:bg-cream-dim transition-colors"
              >
                <h3 className="font-display text-2xl">{project.title}</h3>
                <p className="font-body text-ink-faded mt-1">
                  {project.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
