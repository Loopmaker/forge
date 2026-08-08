import { TimelineEntry } from "@/lib/types";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  if (!entries || entries.length === 0) return null;

  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="relative pl-6">
      <div
        className="absolute left-0.75 top-1 bottom-1"
        style={{ borderLeft: "1px dashed var(--color-ink-faded)" }}
      />
      <ul className="space-y-6">
        {sorted.map((entry, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-6.75 top-1.5 w-2 h-2 rounded-full bg-ledger" />
            <p className="font-mono text-xs text-ink-faded">
              {entry.date.toISOString().split("T")[0]}
            </p>
            <p className="font-body text-ink mt-0.5">{entry.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
