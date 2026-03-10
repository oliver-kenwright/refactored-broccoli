import Link from "next/link";

export const metadata = {
  title: "Drum Machine — Oliver Kenwright",
};

export default function DrumMachine() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="text-center">
        <Link
          href="/playground"
          className="font-mono text-sm text-primary hover:text-primary-dark transition-colors"
        >
          &larr; Back to playground
        </Link>
        <h1 className="font-display text-4xl text-text mt-8">Drum Machine</h1>
        <p className="mt-4 font-mono text-sm text-text-muted">
          Coming soon in Phase 2.
        </p>
      </div>
    </div>
  );
}
