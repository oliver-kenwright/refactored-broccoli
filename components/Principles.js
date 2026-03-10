"use client";

import Reveal from "./ui/Reveal";

const principles = [
  {
    number: "01",
    title: "Insight before instinct",
    description:
      "Pull the threads together \u2014 data, research, commercial context \u2014 before drawing the line. Strategy that isn\u2019t grounded in evidence is just a hunch with a slide deck.",
  },
  {
    number: "02",
    title: "Conviction through evidence",
    description:
      "Validate before you scale. Fake doors, prototypes, A/B tests \u2014 build just enough to learn, then ship with confidence. Every feature earns its place.",
  },
  {
    number: "03",
    title: "Clarity creates momentum",
    description:
      "When teams know what matters, why it matters, and what\u2019s next \u2014 they move. Cut scope ruthlessly, define success early, and make the path from discovery to delivery obvious.",
  },
  {
    number: "04",
    title: "Customer-first, team-powered",
    description:
      "Obsess over the customer problem, then empower the people around you to solve it. The best products come from diverse perspectives, honest challenge, and shared ownership.",
  },
];

export default function Principles() {
  return (
    <section id="approach" className="py-20 md:py-28 px-6 bg-bg-soft">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
            How I Work
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-text mt-4">
            Four principles I come back to
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.1}>
              <div className="bg-white rounded-lg p-6 md:p-8 border border-border h-full">
                <span className="font-mono text-sm text-primary font-semibold">
                  {p.number}
                </span>
                <h3 className="font-sans text-xl font-semibold text-text mt-3 mb-3">
                  {p.title}
                </h3>
                <p className="text-base text-text-muted leading-relaxed">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
