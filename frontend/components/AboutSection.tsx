"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── About Section ───────────────────────────────────────────────────────────
export default function AboutSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gradientRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Section label + decorative dot ────────────────────────────────
      gsap.from(labelRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Headline line 1: "We don't just build websites." ──────────────
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Headline line 2: gradient text ────────────────────────────────
      gsap.from(gradientRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Expanding divider ─────────────────────────────────────────────
      gsap.from(dividerRef.current, {
        scaleX: 0,
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Staggered paragraphs ──────────────────────────────────────────
      const paragraphs = paragraphsRef.current?.querySelectorAll(".about-para");
      if (paragraphs?.length) {
        gsap.from(paragraphs, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: paragraphsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] overflow-hidden"
    >
      {/* ── Ambient glow — decorative background radial ── */}
      <div
        className="pointer-events-none absolute -top-[30%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, rgba(129,90,213,1) 0%, transparent 70%)",
        }}
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 md:px-16 py-28 md:py-40 flex flex-col gap-16 md:gap-20">
        {/* ── Section Label with glowing accent dot ── */}
        <div ref={labelRef} className="flex items-center gap-3">
          {/* Glowing dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-500" />
          </span>
          {/* Accent line */}
          <span className="block h-px w-8 bg-gradient-to-r from-indigo-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            About Us
          </span>
        </div>

        {/* ── Headlines ── */}
        <div className="flex flex-col gap-2">
          <h2
            ref={headlineRef}
            className="text-white font-extrabold leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,5.5vw,4.5rem)]"
          >
            We don&apos;t just build websites.
          </h2>
          <span
            ref={gradientRef}
            className="block font-extrabold leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,5.5vw,4.5rem)] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            We build experiences.
          </span>
        </div>

        {/* ── Expanding divider ── */}
        <div
          ref={dividerRef}
          className="h-px w-full origin-left bg-gradient-to-r from-indigo-500/60 via-purple-500/40 to-transparent"
        />

        {/* ── Paragraphs ── */}
        <div
          ref={paragraphsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          <p className="about-para text-zinc-400 text-base md:text-lg leading-relaxed font-light">
            TopStake is a cutting-edge digital agency born at the intersection of
            design and technology. We craft immersive digital products that
            captivate audiences and elevate brands beyond the ordinary — from
            pixel-perfect interfaces to systems that scale.
          </p>
          <p className="about-para text-zinc-400 text-base md:text-lg leading-relaxed font-light">
            Our approach blends meticulous design thinking with bold creative
            vision. Every project is an opportunity to push boundaries — delivering
            premium web experiences, strategic branding, and full-stack development
            that turns ambition into impact.
          </p>
          <p className="about-para text-zinc-400 text-base md:text-lg leading-relaxed font-light md:col-span-2 max-w-3xl">
            We partner with forward-thinking founders and global brands who refuse
            to settle. If you&apos;re ready to stand out in a sea of sameness,
            you&apos;re in the right place.
          </p>
        </div>
      </div>

      {/* ── Bottom decorative accent line ── */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
}
