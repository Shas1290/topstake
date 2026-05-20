"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Headline: scale from 0.8 → 1 + fade in
      tl.from(headlineRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Paragraph fade in
      tl.from(
        paragraphRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Buttons stagger in from below
      if (buttonsRef.current) {
        tl.from(
          buttonsRef.current.children,
          {
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* ── Dot grid pattern ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Radial gradient glow ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2
          ref={headlineRef}
          className="font-bold leading-[1.05] tracking-tight text-white"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        >
          Ready to elevate
          <br />
          your brand?
        </h2>

        <p
          ref={paragraphRef}
          className="mx-auto mt-6 max-w-lg text-lg text-zinc-400 md:text-xl"
        >
          Let&apos;s create something extraordinary together.
        </p>

        <div
          ref={buttonsRef}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary button */}
          <button
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40"
          >
            Start a Project
          </button>

          {/* Secondary button */}
          <button
            className="rounded-xl border border-white/20 bg-transparent px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-white/40"
          >
            View Our Work&nbsp;&rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
