"use client";

import { useState } from "react";
import Reveal from "./ui/Reveal";
import ImageSlider from "./ui/ImageSlider";
import SectionLabel from "./ui/SectionLabel";

const caseStudies = [
  {
    tag: "Healthcare \u00B7 Digital",
    company: "Bupa Dental",
    role: "Senior Digital Product Manager",
    period: "2023 \u2014 Present",
    accent: "accent-gold",
    accentBorder: "border-accent-gold",
    accentBg: "bg-accent-gold",
    headline: "Tripled digital\u2019s share of a $500m+ dental business",
    challenge:
      "Bupa\u2019s dental digital channel was an afterthought \u2014 5% revenue share, poor conversion, no self-serve capability, and a team under restructure pressure.",
    approach: [
      "Defined a three-journey product strategy: discover, book, manage",
      "Built ROI-backed investment case to secure squad funding",
      "Launched self-serve portal with Tealium CDP personalisation",
      "Led AI Treatment Plan initiative to reduce patient drop-off",
    ],
    outcomes: [
      { value: "5\u219212%", label: "Digital revenue share" },
      { value: "+75%", label: "Conversion lift" },
      { value: "+31%", label: "NPS improvement" },
      { value: "3x", label: "Logged-in booking rate" },
    ],
    images: [
      { src: "/images/case-studies/bupa/strategy.png", alt: "Problems & opportunities across the dental digital funnel" },
      { src: "/images/case-studies/bupa/availability-filter.png", alt: "Availability filter & infrastructure upgrade detail" },
      { src: "/images/case-studies/bupa/booking-release.png", alt: "Dental digital release — availability filter UX" },
      { src: "/images/case-studies/bupa/portal-mockups.png", alt: "Dental portal mobile experience driving 3x bookings" },
      { src: "/images/case-studies/bupa/dashboard.png", alt: "Bupa Dental digital report — conversion, bookings, and CES" },
    ],
  },
  {
    tag: "Consumer \u00B7 AI/ML",
    company: "Momatu \u2192 Moments",
    role: "Product Lead",
    period: "2022 \u2014 2023",
    accent: "accent-purple",
    accentBorder: "border-accent-purple",
    accentBg: "bg-accent-purple",
    headline: "Pivoted a startup into an AI-powered photo experience",
    challenge:
      "An early-stage photo app struggling for product-market fit. No analytics, unclear value prop, and a CEO looking for a bold new direction.",
    approach: [
      "Defined 6-month outcome-driven strategy anchored to north star metric",
      "Ran JTBD surveys, fake door tests, and Van Westendorp pricing research",
      "Built ML-powered curation using ML Kit and Image Labelling API",
      "Created end-to-end product development lifecycle from scratch",
    ],
    outcomes: [
      { value: "+16%", label: "Weekly active uploaders" },
      { value: "+30pp", label: "New user activation" },
      { value: "12mo", label: "Funding secured" },
      { value: "0\u21921", label: "Analytics stack" },
    ],
    images: [
      { src: "/images/case-studies/momatu/curation.svg", alt: "ML-powered photo curation" },
      { src: "/images/case-studies/momatu/jtbd.svg", alt: "JTBD research findings" },
      { src: "/images/case-studies/momatu/activation.svg", alt: "New user activation funnel" },
    ],
  },
  {
    tag: "Mobility \u00B7 Scale-up",
    company: "TIER Mobility",
    role: "Product Manager",
    period: "2020 \u2014 2022",
    accent: "accent-teal",
    accentBorder: "border-accent-teal",
    accentBg: "bg-accent-teal",
    headline:
      "Built the loyalty engine for Europe\u2019s largest e-scooter operator",
    challenge:
      "TIER needed to prove that a loyalty program could materially shift ride frequency and retention \u2014 with no existing framework for testing at scale.",
    approach: [
      "Led 0\u21921 of TIER Miles across three experiment versions with rigorous A/B testing",
      "Designed experiment framework: control groups, enrolment variants, multi-city rollout",
      "Shaped pricing platform refactor supporting 15+ future use cases",
      "Led multi-modal GTM as TIER expanded to eMopeds",
    ],
    outcomes: [
      { value: "+10%", label: "PAYG rides" },
      { value: "+2pp", label: "M1 retention" },
      { value: "2x", label: "Referral growth" },
      { value: "\u20AC5.3m", label: "eMoped LTV" },
    ],
    images: [
      { src: "/images/case-studies/tier/loyalty.svg", alt: "TIER Miles loyalty program" },
      { src: "/images/case-studies/tier/experiment.svg", alt: "A/B test experiment framework" },
      { src: "/images/case-studies/tier/pricing.svg", alt: "Multi-modal revenue by vehicle type" },
    ],
  },
];

function CaseStudyCard({ study, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Reveal delay={index * 0.15}>
      <div
        className={`group border-l-4 ${study.accentBorder} bg-white rounded-lg border border-border
          shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              {study.tag}
            </span>
            <svg
              className={`w-5 h-5 text-text-muted transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <h3 className="font-sans text-lg font-semibold text-text mb-1">
            {study.company}
          </h3>
          <h4 className="font-display text-2xl md:text-3xl text-text mb-3">
            {study.headline}
          </h4>
          <p className="font-mono text-xs text-text-muted">
            {study.role} &middot; {study.period}
          </p>
        </div>

        {/* Expanded detail */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            expanded ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 md:px-8 pb-8 border-t border-border pt-6">
            <div className="mb-6">
              <h5 className="font-sans text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
                Challenge
              </h5>
              <p className="text-base text-text leading-relaxed">
                {study.challenge}
              </p>
            </div>

            <div className="mb-6">
              <h5 className="font-sans text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
                Approach
              </h5>
              <ul className="space-y-2">
                {study.approach.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-base text-text"
                  >
                    <span className="text-primary mt-1.5 text-xs">&#9679;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-sans text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
                Outcomes
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {study.outcomes.map((outcome, i) => (
                  <div
                    key={i}
                    className="bg-bg-soft rounded-lg p-4 text-center"
                  >
                    <div className="font-mono text-xl md:text-2xl font-semibold text-text">
                      {outcome.value}
                    </div>
                    <div className="font-mono text-xs text-text-muted mt-1">
                      {outcome.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image slider */}
            <ImageSlider images={study.images} accent={study.accentBg} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function CaseStudies() {
  return (
    <section id="work" className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>02 — Selected Work</SectionLabel>
        </Reveal>

        <div className="mt-12 flex flex-col gap-8">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.company} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
