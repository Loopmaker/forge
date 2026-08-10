"use client";

import { useRouter } from "next/navigation";

export function TagPills({ tags }: { tags: string[] }) {
  const router = useRouter();

  return (
    <div className="flex gap-2 mt-2">
      {tags.map((t) => (
        <button
          key={t}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/journal?tag=${t}`);
          }}
          className="font-mono text-xs px-2 py-0.5 bg-cream-dim text-ink-faded rounded hover:text-ledger"
        >
          {t}
        </button>
      ))}
    </div>
  );
}
