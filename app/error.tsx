"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen paper-grid flex items-center justify-center">
      <div className="border-l-4 border-ledger pl-6 max-w-md">
        <p className="font-mono text-xs text-ink-faded uppercase tracking-widest">
          Error
        </p>
        <h1 className="font-display text-4xl font-medium mt-2">
          Something went wrong
        </h1>
        <p className="font-body text-ink-faded mt-3">
          The page hit an unexpected error. This has been logged — try again, or
          head back to the journal.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => reset()}
            className="font-mono text-xs uppercase tracking-widest px-4 py-2 border-2 border-ledger text-ledger rounded-sm hover:bg-ledger hover:text-cream transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/journal"
            className="font-mono text-xs uppercase tracking-widest px-4 py-2 text-ink-faded hover:text-ink"
          >
            Back to Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
