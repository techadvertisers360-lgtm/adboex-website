"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/**
 * Click-to-load embeds. Nothing from YouTube downloads until
 * the visitor clicks, keeping pages fast and cookie-free by default.
 */

export function YouTubeFacade({
  id,
  title,
  thumbnail,
  playLabel = "Play video",
}: {
  id: string;
  title: string;
  thumbnail: string;
  playLabel?: string;
}) {
  const [active, setActive] = useState(false);
  if (active) {
    return (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <button type="button" onClick={() => setActive(true)} className="group relative block aspect-video w-full overflow-hidden" aria-label={`${playLabel}: ${title}`}>
      <Image src={thumbnail} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      <span className="absolute inset-0 grid place-items-center bg-black/25">
        <span className="bg-brand grid size-16 place-items-center rounded-full text-ink shadow-xl transition-transform group-hover:scale-110">
          <Play aria-hidden="true" className="ml-1 size-6 fill-current" />
        </span>
      </span>
    </button>
  );
}
