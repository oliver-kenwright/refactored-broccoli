"use client";

import Reveal from "./ui/Reveal";

const milestones = [
  { year: "2015", company: "Zalando", role: "Marketing Intern" },
  { year: "2016", company: "Omio", role: "Marketing Manager" },
  { year: "2017", company: "EMPAUA", role: "Growth Manager" },
  { year: "2019", company: "Circ", role: "Growth PM" },
  { year: "2020", company: "TIER", role: "Product Manager" },
  { year: "2022", company: "Momatu", role: "Product Lead" },
  { year: "2023", company: "Bupa", role: "Senior Digital PM" },
];

const domains = [
  "Healthcare",
  "Micro-mobility",
  "Consumer AI/ML",
  "Travel",
  "E-commerce",
  "SaaS",
  "Mental Health",
];

export default function Timeline() {
  return (
    <section id="experience" className="py-20 md:py-28 px-6 bg-bg-soft">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
            Career Arc
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-text mt-4">
            Marketing &rarr; Growth &rarr; Product
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-base md:text-lg text-text-muted max-w-3xl leading-relaxed">
            Started in retail and brand — learning how consumers think and what
            makes them act. Moved into growth — where data replaced instinct and
            every funnel told a story. Then into product — where I could finally
            build the thing, not just optimise around it.
          </p>
          <p className="mt-4 text-base md:text-lg text-text font-semibold max-w-3xl leading-relaxed">
            Now I bring all three lenses: the commercial acumen of a marketer,
            the rigour of a growth operator, and the craft of a product builder.
          </p>
        </Reveal>

        {/* Desktop horizontal timeline */}
        <Reveal delay={0.3}>
          <div className="mt-16 hidden md:block">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />

              <div className="flex justify-between">
                {milestones.map((m, i) => (
                  <div key={m.year} className="relative flex flex-col items-center">
                    {/* Dot */}
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-white z-10" />
                    <div className="mt-4 text-center">
                      <span className="font-mono text-xs text-primary font-semibold">
                        {m.year}
                      </span>
                      <p className="font-sans text-sm font-semibold text-text mt-1">
                        {m.company}
                      </p>
                      <p className="font-mono text-xs text-text-muted mt-0.5">
                        {m.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mobile vertical timeline */}
        <div className="mt-12 md:hidden">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-border" />

            <div className="flex flex-col gap-8">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.1}>
                  <div className="relative">
                    {/* Dot */}
                    <div className="absolute -left-[1.625rem] top-1 w-3 h-3 rounded-full bg-primary border-2 border-white z-10" />
                    <span className="font-mono text-xs text-primary font-semibold">
                      {m.year}
                    </span>
                    <p className="font-sans text-sm font-semibold text-text mt-1">
                      {m.company}
                    </p>
                    <p className="font-mono text-xs text-text-muted">
                      {m.role}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Domain tags */}
        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-wrap gap-2">
            {domains.map((domain) => (
              <span
                key={domain}
                className="font-mono text-xs px-3 py-1.5 bg-white rounded-full border border-border text-text-muted"
              >
                {domain}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
