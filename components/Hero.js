"use client";

import Reveal from "./ui/Reveal";
import AnimNumber from "./ui/AnimNumber";

const stats = [
  { value: 10, suffix: "+", label: "Years in product" },
  { value: 6, suffix: "", label: "Products shaped" },
  { value: 60, prefix: "$", suffix: "m+", label: "Revenue influenced" },
];

export default function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight max-w-4xl">
            I ship products people <span className="text-primary">trust</span> and actually <span className="text-primary">use</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-mono text-3xl md:text-4xl font-medium text-text">
                  <AnimNumber
                    value={stat.value}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix}
                  />
                </span>
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-3xl md:text-4xl font-medium text-text">
                &infin;
              </span>
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                Post-it notes retired
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-12 text-base md:text-lg text-text-muted max-w-2xl leading-relaxed">
            Senior PM at Bupa Health Services, Melbourne. I work at the
            intersection of product, data, and AI — always up for a good
            conversation about what&apos;s next.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
