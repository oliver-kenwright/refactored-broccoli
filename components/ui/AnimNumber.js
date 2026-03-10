"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimNumber({ value, prefix = "", suffix = "", duration = 1500 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue(0, value, duration);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  function animateValue(start, end, dur) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * (end - start) + start);
      setDisplay(current.toString());
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplay(end.toString());
      }
    }
    requestAnimationFrame(update);
  }

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}
