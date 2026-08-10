import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";
import { updateProject } from "@/lib/actions";

export default async function EditEntryPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { project: slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen paper-grid">
      <div className="max-w-2xl mx-auto py-12 px-6">
        <h1 className="font-display text-4xl font-medium mb-8">
          Edit: {project.title}
        </h1>

        <form action={updateProject} className="space-y-6">
          <input type="hidden" name="id" value={project.id} />

          <div>
            <label className="font-mono text-xs text-ink-faded uppercase">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={project.title}
              className="w-full mt-1 px-3 py-2 bg-cream-dim border border-ink-faded rounded font-body"
            />
          </div>

          <div>
            <label className="font-mono text-xs text-ink-faded uppercase">
              Status
            </label>
            <select
              name="status"
              defaultValue={project.status}
              className="w-full mt-1 px-3 py-2 bg-cream-dim border border-ink-faded rounded font-body"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <label className="font-mono text-xs text-ink-faded uppercase">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              defaultValue={project.tags.join(", ")}
              className="w-full mt-1 px-3 py-2 bg-cream-dim border border-ink-faded rounded font-body"
            />
          </div>

          <div>
            <label className="font-mono text-xs text-ink-faded uppercase">
              Summary
            </label>
            <textarea
              name="summary"
              required
              rows={2}
              defaultValue={project.summary}
              className="w-full mt-1 px-3 py-2 bg-cream-dim border border-ink-faded rounded font-body"
            />
          </div>

          <div>
            <label className="font-mono text-xs text-ink-faded uppercase">
              Content (Markdown)
            </label>
            <textarea
              name="content"
              required
              rows={16}
              defaultValue={project.content}
              className="w-full mt-1 px-3 py-2 bg-cream-dim border border-ink-faded rounded font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            className="font-mono text-xs uppercase tracking-widest px-4 py-2 border-2 border-ledger text-ledger rounded-sm"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
