"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalMarqueeProps {
  text?: string;
  direction?: "left" | "right";
  speed?: number;
}

export default function HorizontalMarquee({
  text = "TOPSTAKE",
  direction = "left",
  speed = 1,
}: HorizontalMarqueeProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current || !containerRef.current) return;

      // Scroll-linked horizontal movement
      const distance = direction === "left" ? -300 * speed : 300 * speed;

      gsap.to(trackRef.current, {
        x: distance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef }
  );

  // Repeat text enough times to fill the screen
  const items = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-8 md:py-12 bg-[#050507] border-y border-white/[0.04]"
    >
      <div ref={trackRef} className="flex items-center gap-4 md:gap-8 whitespace-nowrap">
        {items.map((i) => (
          <div key={i} className="flex items-center gap-4 md:gap-8 shrink-0">
            <span
              className={[
                "text-[clamp(3rem,10vw,8rem)] font-black tracking-[-0.04em] leading-none select-none uppercase",
                i % 2 === 0
                  ? "text-white/[0.08]"
                  : "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.12)]",
              ].join(" ")}
            >
              {text}
            </span>
            {/* Decorative dot between words */}
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-indigo-500/30 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
