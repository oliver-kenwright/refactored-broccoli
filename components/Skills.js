"use client";

import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";

const skillClusters = [
  {
    title: "Strategy & Vision",
    skills: [
      "Product strategy",
      "Roadmapping",
      "Investment cases",
      "Market positioning",
      "Vision narratives",
      "Stakeholder alignment",
    ],
  },
  {
    title: "Discovery & Research",
    skills: [
      "User interviews",
      "JTBD",
      "Fake door tests",
      "UX audits",
      "Surveys",
      "Journey mapping",
      "Van Westendorp",
    ],
  },
  {
    title: "Data & Experimentation",
    skills: [
      "A/B testing",
      "Funnel analysis",
      "Cohort segmentation",
      "SQL",
      "Impact forecasting",
      "Experiment design",
      "KPI frameworks",
    ],
  },
  {
    title: "Delivery & Ops",
    skills: [
      "Sprint planning",
      "Dependency mapping",
      "RACI",
      "Risk logs",
      "Release coordination",
      "Tech discovery",
      "QA processes",
    ],
  },
  {
    title: "Growth & Monetisation",
    skills: [
      "Retention strategy",
      "CRM lifecycle",
      "Referral loops",
      "Pricing models",
      "Loyalty programs",
      "Activation flows",
      "GTM",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Figma",
      "Amplitude",
      "Mixpanel",
      "Jira",
      "ADO",
      "Power BI",
      "Tealium CDP",
      "Claude",
      "Claude Code",
    ],
  },
];

export default function Skills() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>04 — Skill Set</SectionLabel>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillClusters.map((cluster, i) => (
            <Reveal key={cluster.title} delay={i * 0.1}>
              <div className="bg-bg-soft rounded-lg p-6 border border-border h-full">
                <h3 className="font-sans text-base font-semibold text-text mb-4">
                  {cluster.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cluster.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-3 py-1.5 bg-white rounded-full border border-border text-text-muted
                        hover:border-primary hover:text-primary transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
