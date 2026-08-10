import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { getAllProjects } from "@/lib/projects";
import { Stamp } from "@/components/Stamp";
import { DeleteButton } from "@/components/DeleteButton";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const projects = await getAllProjects();

  return (
    <div className="min-h-screen paper-grid">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-medium">Dashboard</h1>
          <div className="flex items-center gap-4">
            <a
              href="/dashboard/new"
              className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 border-2 border-ledger text-ledger rounded-sm whitespace-nowrap"
            >
              <span className="sm:hidden">+</span>
              <span className="hidden sm:inline">+ New Entry</span>
            </a>
            <UserButton />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-l-4 border-ledger pl-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-lg">{project.title}</span>
                <Stamp status={project.status} />
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`/dashboard/${project.slug}/edit`}
                  className="font-mono text-xs uppercase tracking-widest text-ink-faded hover:text-ink"
                >
                  Edit
                </a>
                <DeleteButton id={project.id} title={project.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
