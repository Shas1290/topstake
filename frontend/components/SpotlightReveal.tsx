"use client";

import React, { useState, useRef, MouseEvent } from "react";

// ─── Videos ──────────────────────────────────────────────────────────────────
const VIDEOS = ["/video.mp4", "/video2.mp4", "/video4.mp4"];

// ─── Text pairs that cycle with each click ───────────────────────────────────
interface TextPair {
  top: string;
  bottom: string;
}

const TEXT_PAIRS: TextPair[] = [
  { top: "Website", bottom: "Development" },
  { top: "App", bottom: "Development" },
  { top: "Video", bottom: "Editing" },
];

// ─── Shared text classes ─────────────────────────────────────────────────────
const TEXT_BASE =
  "font-bold leading-[0.85] tracking-[-0.04em] select-none text-[clamp(4rem,15vw,13rem)] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]";
const TEXT_DARK = "text-white";
const TEXT_LIGHT = "text-gray-900";


export default function SpotlightReveal(): React.JSX.Element {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isExpanding, setIsExpanding] = useState<boolean>(false);

  // Text animation states
  const [textIndex, setTextIndex] = useState<number>(0);
  const [isTextExiting, setIsTextExiting] = useState<boolean>(false);
  const [isTextEntering, setIsTextEntering] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const nextVideoIndex = (currentIndex + 1) % VIDEOS.length;
  const nextTextIndex = (textIndex + 1) % TEXT_PAIRS.length;

  const currentText = TEXT_PAIRS[textIndex];
  const nextText = TEXT_PAIRS[nextTextIndex];

  // ── Mouse tracking ──────────────────────────────────────────────────────
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (!containerRef.current || isExpanding) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // ── Click handler — syncs video swap + text swap ────────────────────────
  const handleVideoClick = (): void => {
    if (isExpanding) return;

    // 1. Start circle expansion + text exit animation
    setIsExpanding(true);
    setIsTextExiting(true);

    // 2. Halfway through: swap text with enter animation
    setTimeout(() => {
      setTextIndex(nextTextIndex);
      setIsTextExiting(false);
      setIsTextEntering(true);
    }, 400);

    // 3. After full expansion: swap video + finish text enter
    setTimeout(() => {
      setCurrentIndex(nextVideoIndex);
      setIsExpanding(false);
    }, 700);

    // 4. Remove entering state after text settles
    setTimeout(() => {
      setIsTextEntering(false);
    }, 900);
  };

  // ── Animation classes ───────────────────────────────────────────────────
  const getTextClasses = (): string => {
    if (isTextExiting) {
      return "translate-y-[-40px] opacity-0 blur-[4px] scale-95";
    }
    if (isTextEntering) {
      return "translate-y-0 opacity-100 blur-0 scale-100";
    }
    return "translate-y-0 opacity-100 blur-0 scale-100";
  };

  // Initial state for entering text (set via inline style for the frame before transition)
  const getEnteringInitialStyle = (): React.CSSProperties => {
    if (isTextEntering) {
      return {}; // CSS transition takes over
    }
    return {};
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleVideoClick}
      className="relative w-full h-screen overflow-hidden bg-black cursor-pointer"
    >
      {/* ========================================== */}
      {/* 1. BOTTOM LAYER: The Main Background Video */}
      {/* ========================================== */}
      <div className="absolute inset-0">
        <video
          key={VIDEOS[currentIndex]}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          src={VIDEOS[currentIndex]}
        />

        {/* Bottom Text — muted layer */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 sm:px-10 md:px-16 pt-[100px] pb-10 md:pt-[120px] md:pb-14 pointer-events-none">
          <div className="flex items-start pt-2">
            <span
              className={`${TEXT_BASE} ${TEXT_DARK} drop-shadow-[0_4px_60px_rgba(0,0,0,0.4)] ${getTextClasses()}`}
              style={getEnteringInitialStyle()}
            >
              {currentText.top}
            </span>
          </div>
          <div className="flex items-end justify-end pb-2">
            <span
              className={`${TEXT_BASE} ${TEXT_DARK} drop-shadow-[0_4px_60px_rgba(0,0,0,0.4)] ${getTextClasses()}`}
              style={{
                ...getEnteringInitialStyle(),
                transitionDelay: isTextExiting ? "60ms" : isTextEntering ? "80ms" : "0ms",
              }}
            >
              {currentText.bottom}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 2. TOP LAYER: The "Loophole" Video         */}
      {/* ========================================== */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          clipPath: `circle(${isExpanding ? "3000px" : "150px"} at ${mousePosition.x}px ${mousePosition.y}px)`,
          transition: isExpanding
            ? "clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1)"
            : "none",
        }}
      >
        <video
          key={VIDEOS[nextVideoIndex]}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEOS[nextVideoIndex]}
        />

        {/* Top Text — bright layer (inside the loophole) */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 sm:px-10 md:px-16 pt-[100px] pb-10 md:pt-[120px] md:pb-14 pointer-events-none">
          <div className="flex items-start pt-2">
            <span
              className={`${TEXT_BASE} ${TEXT_DARK} drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)] ${getTextClasses()}`}
            >
              {/* The loophole always shows the NEXT text */}
              {nextText.top}
            </span>
          </div>
          <div className="flex items-end justify-end pb-2">
            <span
              className={`${TEXT_BASE} ${TEXT_DARK} drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)] ${getTextClasses()}`}
              style={{
                transitionDelay: isTextExiting ? "60ms" : isTextEntering ? "80ms" : "0ms",
              }}
            >
              {nextText.top === currentText.top ? nextText.bottom : nextText.bottom}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
