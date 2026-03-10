"use client";

import Reveal from "./ui/Reveal";

const experiments = [
  { title: "Drum Machine", description: "Interactive beat maker" },
  { title: "Reaction Time Game", description: "Test your reflexes" },
  { title: "Data Analysis Notebook", description: "Interactive data viz" },
];

export default function Playground() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
            Playground
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-text mt-4">
            Things I&apos;ve built with AI
          </h2>
          <p className="mt-3 text-base text-text-muted max-w-xl">
            Interactive experiments built with Claude Code. Some polished, some
            rough — all proof that PMs can build.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiments.map((exp, i) => (
            <Reveal key={exp.title} delay={i * 0.1}>
              <div className="bg-bg-soft rounded-lg p-6 border border-border opacity-60 cursor-default">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    Coming soon
                  </span>
                </div>
                <h3 className="font-sans text-lg font-semibold text-text mb-1">
                  {exp.title}
                </h3>
                <p className="font-mono text-sm text-text-muted">
                  {exp.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
