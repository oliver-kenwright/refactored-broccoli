"use client";

import { useState } from "react";
import Image from "next/image";

export default function PhotoGallery({ photos }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <PhotoCard key={photo.src} photo={photo} />
      ))}
    </div>
  );
}

function PhotoCard({ photo }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div>
        <div className="aspect-[3/4] rounded-lg bg-bg-soft border border-border flex flex-col items-center justify-center text-center">
          <svg
            className="w-8 h-8 text-text-muted/40 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-mono text-xs text-text-muted/60">Coming soon</span>
        </div>
        <p className="mt-2 font-sans text-sm text-text-muted">{photo.caption}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-bg-soft">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={400}
          height={533}
          className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
          onError={() => setImgError(true)}
        />
      </div>
      <p className="mt-2 font-sans text-sm text-text-muted">{photo.caption}</p>
    </div>
  );
}
