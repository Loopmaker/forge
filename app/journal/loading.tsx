export default function Loading() {
  return (
    <div className="min-h-screen paper-grid">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="h-10 w-32 bg-cream-dim rounded animate-pulse" />
        <div className="mt-8 space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-l-4 border-ledger pl-6 py-2 space-y-2"
            >
              <div className="h-7 w-48 bg-cream-dim rounded animate-pulse" />
              <div className="h-4 w-full max-w-md bg-cream-dim rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
