"use client";

import React from "react";
import Navbar from "./Navbar";

const LINES = [
  "TOPSTAKE",
  "PREMIUM",
  "DESIGN",
  "MODERN ","WEBSITE",
  "BRANDING",
  "BOLD",
  "APP",
  "DEVELOPMENT",
  "MOTION",
  "DIGITAL" ,"MARKETING",
  "PHOTOSHOP",
  "LOGO DESIGN",
  "VIDEO EDITING",
  "FUTURE",
];

export default function VerticalMarquee() {
  return (
    <>
      {/* 
        Scoped styles — keeps everything self-contained.
        The animation moves the inner wrapper upward by exactly 50%,
        which is the height of one duplicated text block.
      */}
      <Navbar />
      <style jsx>{`
        .marquee-viewport {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #0a0011;
          /* Subtle radial vignette so edges feel cinematic */
          background: radial-gradient(
            ellipse at 50% 40%,
            #1a0a2e 0%,
            #0a0011 70%
          );
        }

        .marquee-track {
          display: flex;
          flex-direction: column;
          animation: scroll-up 18s linear infinite;
          /* 
            will-change + translateZ force GPU compositing 
            for buttery-smooth 60 fps on all devices.
          */
          will-change: transform;
          transform: translateZ(0);
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .marquee-line {
          font-family: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: clamp(5rem, 12vw, 11rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: #ffffff;
          padding: 0.15em 0.4em;
          white-space: nowrap;
          user-select: none;
          text-transform: uppercase;
        }

        /* Alternate lines get a hollow / outline treatment */
        .marquee-line--outline {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.35);
        }

        /* Very subtle top + bottom fade masks */
        .marquee-viewport::before,
        .marquee-viewport::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 20%;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-viewport::before {
          top: 0;
          background: linear-gradient(
            to bottom,
            #0a0011 0%,
            transparent 100%
          );
        }
        .marquee-viewport::after {
          bottom: 0;
          background: linear-gradient(to top, #0a0011 0%, transparent 100%);
        }
      `}</style>

      <section className="marquee-viewport" aria-label="Scrolling text marquee">
        <div className="marquee-track">
          {/* ── First copy ── */}
          {LINES.map((text, i) => (
            <span
              key={`a-${i}`}
              className={`marquee-line ${
                i % 2 === 1 ? "marquee-line--outline" : ""
              }`}
            >
              {text}
            </span>
          ))}

          {/* ── Duplicate copy (seamless loop) ── */}
          {LINES.map((text, i) => (
            <span
              key={`b-${i}`}
              className={`marquee-line ${
                i % 2 === 1 ? "marquee-line--outline" : ""
              }`}
            >
              {text}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
