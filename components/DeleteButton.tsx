"use client";

import { useState } from "react";
import { deleteProject } from "@/lib/actions";

export function DeleteButton({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-mono text-xs uppercase tracking-widest text-ledger hover:text-ink"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 bg-ink/40 flex items-center justify-center z-50">
          <div className="bg-cream border-2 border-ledger rounded-sm max-w-sm w-full mx-4 p-6">
            <h2 className="font-display text-xl">Delete entry?</h2>
            <p className="font-body text-ink-faded mt-2">
              This will permanently delete{" "}
              <span className="text-ink font-medium">{title}</span>. This
              can&apos;t be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-widest px-4 py-2 text-ink-faded hover:text-ink"
              >
                Cancel
              </button>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="font-mono text-xs uppercase tracking-widest px-4 py-2 border-2 border-ledger text-ledger rounded-sm hover:bg-ledger hover:text-cream transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
