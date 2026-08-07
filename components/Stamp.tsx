import { ProjectStatus } from "@/lib/types";

export function Stamp({ status }: { status: ProjectStatus }) {
  const isPublished = status === "published";

  return (
    <span
      className={`inline-block font-mono text-xs uppercase tracking-widest px-3 py-1 border-2 rounded-sm select-none ${
        isPublished
          ? "border-ledger text-ledger"
          : "border-ink-faded text-ink-faded"
      }`}
      style={{ transform: "rotate(-4deg)" }}
    >
      {status}
    </span>
  );
}
