"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Config ──────────────────────────────────────────────────────────────────
interface VideoHeroProps {
  /** Path to the video file (relative to /public) */
  videoSrc?: string;
  /** Top-left headline word */
  topText?: string;
  /** Bottom-right headline word */
  bottomText?: string;
}

export default function VideoHero({
  videoSrc = "/video.mp4",
  topText = "Speak",
  bottomText = "volumes",
}: VideoHeroProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // ── Entrance timeline ───────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(topRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.3,
      })
        .from(
          bottomRef.current,
          {
            y: 80,
            opacity: 0,
            duration: 1,
          },
          "-=0.6"
        )
        .from(
          scrollHintRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          badgeRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );

      // ── Parallax on scroll ──────────────────────────────────────────────
      gsap.to(topRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(bottomRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* ── Background Video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
      />

      {/* ── Subtle overlay for text legibility ── */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* ── Text Layer ── */}
      <div className="relative z-10 flex flex-col justify-between h-full px-6 sm:px-10 md:px-16 py-10 md:py-14 pointer-events-none">
        {/* Top-left word */}
        <div className="flex items-start">
          <span
            ref={topRef}
            className={[
              "text-white font-bold leading-[0.85] tracking-[-0.04em] select-none",
              "text-[clamp(4rem,15vw,13rem)]",
              "drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)]",
            ].join(" ")}
          >
            {topText}
          </span>
        </div>

        {/* Bottom-right word */}
        <div className="flex items-end justify-end">
          <span
            ref={bottomRef}
            className={[
              "text-white font-bold leading-[0.85] tracking-[-0.04em] select-none",
              "text-[clamp(4rem,15vw,13rem)]",
              "drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)]",
            ].join(" ")}
          >
            {bottomText}
          </span>
        </div>
      </div>

      {/* ── Floating badge (center-right area) ── */}
      <div
        ref={badgeRef}
        className={[
          "absolute z-20 top-1/2 right-[8%] -translate-y-1/2",
          "hidden md:flex items-center gap-3",
          "pointer-events-auto cursor-pointer group",
        ].join(" ")}
      >
        {/* Thumbnail circle */}
        <div
          className={[
            "w-14 h-14 rounded-full overflow-hidden",
            "border-2 border-white/30",
            "shadow-[0_0_30px_rgba(0,0,0,0.4)]",
            "transition-transform duration-300 group-hover:scale-110",
          ].join(" ")}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src="/video2.mp4"
          />
        </div>

        {/* Label */}
        <span
          className={[
            "max-w-[180px] text-white/80 text-xs leading-snug font-medium",
            "drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]",
            "transition-colors duration-200 group-hover:text-white",
          ].join(" ")}
        >
          TopStake is diving deep into the biggest issues of our time →
        </span>
      </div>

      {/* ── Scroll-down hint (bottom-left) ── */}
      <div
        ref={scrollHintRef}
        className={[
          "absolute z-20 bottom-8 left-6 sm:left-10 md:left-16",
          "flex flex-col items-center gap-2",
          "text-white/50 text-xs font-medium tracking-wider uppercase",
          "animate-bounce",
        ].join(" ")}
      >
        <span className="text-lg leading-none">↓</span>
      </div>
    </section>
  );
}
