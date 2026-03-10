import Link from "next/link";

export const metadata = {
  title: "Playground — Oliver Kenwright",
  description: "Interactive experiments built with Claude Code.",
};

const experiments = [
  {
    title: "Drum Machine",
    description: "Interactive beat maker",
    href: "/playground/drum-machine",
    ready: false,
  },
  {
    title: "Reaction Time Game",
    description: "Test your reflexes",
    href: "/playground/reaction-game",
    ready: false,
  },
];

export default function PlaygroundIndex() {
  return (
    <div className="min-h-screen bg-bg pt-32 px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="font-mono text-sm text-primary hover:text-primary-dark transition-colors"
        >
          &larr; Back to home
        </Link>
        <h1 className="font-display text-4xl md:text-5xl text-text mt-8">
          Playground
        </h1>
        <p className="mt-4 text-base text-text-muted max-w-xl">
          Interactive experiments built with Claude Code. Some polished, some
          rough — all proof that PMs can build.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map((exp) => (
            <div
              key={exp.title}
              className="bg-bg-soft rounded-lg p-6 border border-border opacity-60"
            >
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                Coming soon
              </span>
              <h3 className="font-sans text-lg font-semibold text-text mt-2 mb-1">
                {exp.title}
              </h3>
              <p className="font-mono text-sm text-text-muted">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
