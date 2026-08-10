import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen paper-grid flex items-center justify-center">
      <div className="border-l-4 border-ledger pl-6 max-w-md">
        <p className="font-mono text-xs text-ink-faded uppercase tracking-widest">
          404
        </p>
        <h1 className="font-display text-4xl font-medium mt-2">
          Page not found
        </h1>
        <p className="font-body text-ink-faded mt-3">
          This entry doesn&apos;t exist — maybe it was never published, or the
          link&apos;s out of date.
        </p>
        <Link
          href="/journal"
          className="inline-block mt-6 font-mono text-xs uppercase tracking-widest px-4 py-2 border-2 border-ledger text-ledger rounded-sm hover:bg-ledger hover:text-cream transition-colors"
        >
          Back to Journal
        </Link>
      </div>
    </div>
  );
}
