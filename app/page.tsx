import { getAllProjects } from "@/lib/projects";
export default function Home() {
  return (
    <div className="min-h-screen paper-grid">
      <nav className="border-l-4 border-ledger pl-6 py-6 max-w-4xl mx-auto">
        <span className="font-display text-2xl">DevJournal</span>
      </nav>

      <main className="border-l-4 border-ledger pl-6 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl font-medium">
          Logbook shell — Phase 1
        </h1>
        <p className="font-body text-ink-faded mt-2">
          If this renders in warm cream with a serif heading and a red margin
          rule, the theme tokens are wired correctly.
        </p>
        <p className="font-mono text-sm mt-4 text-ink-faded">
          2026-08-06 · setup complete
        </p>
      </main>
    </div>
  );
}
