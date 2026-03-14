"use client";

import { useRef, useState, useEffect } from "react";

export default function ImageSlider({ images, accent = "bg-primary" }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState(new Set());
  const [allFailed, setAllFailed] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    function handleScroll() {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.offsetWidth;
      const index = Math.round(scrollLeft / slideWidth);
      setActiveIndex(index);
    }

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (images.length > 0 && failedImages.size === images.length) {
      setAllFailed(true);
    }
  }, [failedImages, images.length]);

  function scrollTo(index, e) {
    e.stopPropagation();
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * container.offsetWidth,
      behavior: "smooth",
    });
  }

  function handleImageError(index) {
    setFailedImages((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }

  if (images.length === 0 || allFailed) {
    return (
      <div className="mt-6 bg-bg-soft rounded-lg h-48 flex items-center justify-center border border-dashed border-border">
        <span className="font-mono text-sm text-text-muted">
          Screenshots coming soon
        </span>
      </div>
    );
  }

  return (
    <div className="mt-6 relative group" onClick={(e) => e.stopPropagation()}>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-lg"
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            className="flex-shrink-0 w-full snap-center bg-white rounded-lg h-80 md:h-[28rem] flex items-center justify-center"
          >
            {failedImages.has(i) ? (
              <span className="font-mono text-sm text-text-muted">
                Image coming soon
              </span>
            ) : (
              <img
                src={img.src}
                alt={img.alt}
                className="max-h-full max-w-full object-contain p-2"
                onError={() => handleImageError(i)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Arrow navigation — visible on hover, desktop */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => scrollTo(Math.max(0, activeIndex - 1), e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white disabled:opacity-0"
            disabled={activeIndex === 0}
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => scrollTo(Math.min(images.length - 1, activeIndex + 1), e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white disabled:opacity-0"
            disabled={activeIndex === images.length - 1}
            aria-label="Next image"
          >
            <svg className="w-4 h-4 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => scrollTo(i, e)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === activeIndex ? `${accent} w-4` : "bg-border w-1.5"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
