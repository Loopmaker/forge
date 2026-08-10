"use client";

import { deleteProject } from "@/lib/actions";

export function DeleteButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deleteProject}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="font-mono text-xs uppercase tracking-widest text-ledger hover:text-ink"
      >
        Delete
      </button>
    </form>
  );
}
