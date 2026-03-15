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
          <div className="mt-12 relative max-w-[1100px]">
            {/* Floating label */}
            <span
              className="absolute -top-[9px] left-4 px-2 font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary bg-background-secondary z-10"
            >
              01 — About
            </span>

            {/* Notebook card */}
            <div
              className="border-l-[3px] border-l-[#2B50FF] rounded-r-[6px] px-6 py-6 md:px-8 md:py-7"
              style={{
                borderTop: "0.5px solid var(--color-border-secondary)",
                borderRight: "0.5px solid var(--color-border-secondary)",
                borderBottom: "0.5px solid var(--color-border-secondary)",
                background: "var(--color-background-secondary)",
              }}
            >
              <p className="font-instrument text-[19px] leading-[1.75] text-text">
                Hi, I&apos;m Oli.{" "}
                <span className="tooltip-trigger">
                  Grew up in a UK countryside town
                  <span className="tooltip">You wouldn&apos;t have heard of it.</span>
                </span>
                . Detoured through{" "}
                <span className="tooltip-trigger">
                  Berlin
                  <span className="tooltip">Ja klar!</span>
                </span>
                . Now making things in Melbourne. Senior PM at Bupa, working
                across digital health, data, and AI. Always curious about
                what&apos;s next — in our technology, our cities, our
                decision-making.
              </p>
              <p className="font-instrument text-[19px] leading-[1.75] text-text mt-4">
                Currently: reading{" "}
                <span className="tooltip-trigger">
                  <em>Caledonian Road</em> by Andrew O&apos;Hagan
                  <span className="tooltip">Read for the many voices of London.</span>
                </span>
                , losing on{" "}
                <span className="tooltip-trigger">
                  Chess.com
                  <span className="tooltip">Elo 773. Peaked at 964. Don&apos;t ask.</span>
                </span>{" "}
                ♟️, perfecting{" "}
                <span className="tooltip-trigger">
                  pizza dough
                  <span className="tooltip">72h(flour + water) + fior di latte + tomato x 400°</span>
                </span>{" "}
                🍕, and often in the{" "}
                <span className="tooltip-trigger">
                  bike lane
                  <span className="tooltip">Commuting or procrastinating. Hard to tell.</span>
                </span>{" "}
                🚲 or{" "}
                <span className="tooltip-trigger">
                  swim lane
                  <span className="tooltip">Both kinds. Equally exhausting.</span>
                </span>{" "}
                🏊.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
