"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "./ui/Reveal";
import PhotoGallery from "./ui/PhotoGallery";

const experiments = [
  { title: "Drum Machine", description: "Interactive beat maker", href: "/playground/drum-machine" },
  { title: "Reaction Time Game", description: "Test your reflexes" },
  { title: "Data Analysis Notebook", description: "Interactive data viz" },
];

const handsPhotos = [
  { src: "/images/hands/pizza-1.jpg", alt: "Neapolitan pizza from scratch", caption: "Neapolitan pizza" },
  { src: "/images/hands/garden-1.jpg", alt: "Vegetable garden harvest", caption: "Garden harvest" },
  { src: "/images/hands/pizza-2.jpg", alt: "Pizza dough stretching", caption: "Dough day" },
  { src: "/images/hands/garden-2.jpg", alt: "Herb garden in sunlight", caption: "Morning herbs" },
  { src: "/images/hands/photo-1.jpg", alt: "Street photography", caption: "Melbourne streets" },
  { src: "/images/hands/pizza-3.jpg", alt: "Wood-fired oven pizza", caption: "Wood-fired" },
];

export default function Playground() {
  const [activeTab, setActiveTab] = useState("ai");
  const [transitioning, setTransitioning] = useState(false);

  function handleToggle(tab) {
    if (tab === activeTab) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTransitioning(false);
    }, 200);
  }

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
            Playground
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-text mt-4">
            {activeTab === "ai"
              ? "Building stuff"
              : "Things I\u2019ve built with my hands"}
          </h2>
          <p className="mt-3 text-base text-text-muted max-w-xl">
            {activeTab === "ai"
              ? "Interactive experiments built with Claude Code. Some polished, some rough \u2014 all proof that PMs can build."
              : "Pizza, gardening, photography \u2014 the things that keep me grounded offline."}
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex rounded-lg border border-border p-1 bg-bg-soft">
            <button
              onClick={() => handleToggle("ai")}
              className={`px-5 py-2 rounded-md text-sm font-sans font-medium transition-all duration-200 ${
                activeTab === "ai"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Built with AI
            </button>
            <button
              onClick={() => handleToggle("hands")}
              className={`px-5 py-2 rounded-md text-sm font-sans font-medium transition-all duration-200 ${
                activeTab === "hands"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Built with my hands
            </button>
          </div>
        </Reveal>

        {/* Content area with transition */}
        <div
          className={`mt-12 transition-all duration-200 ${
            transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {activeTab === "ai" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experiments.map((exp) => {
                const isLive = !!exp.href;
                const Wrapper = isLive ? Link : "div";
                const wrapperProps = isLive ? { href: exp.href } : {};
                return (
                  <Wrapper
                    key={exp.title}
                    {...wrapperProps}
                    className={`bg-bg-soft rounded-lg p-6 border border-border transition-all duration-200 ${
                      isLive
                        ? "hover:shadow-md hover:-translate-y-1 cursor-pointer"
                        : "opacity-60 cursor-default"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {isLive ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
                          <span className="font-mono text-xs text-accent-teal uppercase tracking-wider">
                            Live
                          </span>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                    <h3 className="font-sans text-lg font-semibold text-text mb-1">
                      {exp.title}
                    </h3>
                    <p className="font-mono text-sm text-text-muted">
                      {exp.description}
                    </p>
                  </Wrapper>
                );
              })}
            </div>
          ) : (
            <PhotoGallery photos={handsPhotos} />
          )}
        </div>
      </div>
    </section>
  );
}
