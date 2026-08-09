import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createProject } from "@/lib/actions";

export default async function NewEntryPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen paper-grid">
      <div className="max-w-2xl mx-auto py-12 px-6">
        <h1 className="font-display text-4xl font-medium mb-8">New Entry</h1>

        <form action={createProject} className="space-y-6">
          <div>
            <label className="font-mono text-xs text-ink-faded uppercase">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full mt-1 px-3 py-2 bg-cream-dim border border-ink-faded rounded font-body"
            />
          </div>

          <div>
            <label className="font-mono text-xs text-ink-faded uppercase">
              Status
            </label>
            <select
              name="status"
              defaultValue="draft"
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
              placeholder="React, Node, PostgreSQL"
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
              className="w-full mt-1 px-3 py-2 bg-cream-dim border border-ink-faded rounded font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            className="font-mono text-xs uppercase tracking-widest px-4 py-2 border-2 border-ledger text-ledger rounded-sm"
          >
            Create Entry
          </button>
        </form>
      </div>
    </div>
  );
}
