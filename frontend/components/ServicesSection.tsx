"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Service Data ─────────────────────────────────────────────────────────── */

interface ServiceCard {
  index: string;
  title: string;
  description: string;
  tags: string[];
  accentGradient: string;
  accentGlow: string;
  icon: React.ReactNode;
}

const WebDevIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

const BrandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const MobileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const GrowthIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const services: ServiceCard[] = [
  {
    index: "01",
    title: "Web Development",
    description:
      "Blazing-fast, SEO-optimized web applications with Next.js & React — engineered for performance, scalability, and conversion.",
    tags: ["Next.js", "React", "TypeScript", "Performance"],
    accentGradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    accentGlow: "rgba(99,102,241,0.15)",
    icon: <WebDevIcon />,
  },
  {
    index: "02",
    title: "Brand Identity",
    description:
      "From logo systems to full brand guidelines — visual identities that resonate with your audience and stand the test of time.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    accentGradient: "linear-gradient(135deg, #d946ef, #ec4899)",
    accentGlow: "rgba(217,70,239,0.15)",
    icon: <BrandIcon />,
  },
  {
    index: "03",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile experiences built with React Native & Flutter — pixel-perfect on every device.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    accentGradient: "linear-gradient(135deg, #06b6d4, #14b8a6)",
    accentGlow: "rgba(6,182,212,0.15)",
    icon: <MobileIcon />,
  },
  {
    index: "04",
    title: "Growth Strategy",
    description:
      "Data-driven SEO, paid media, and digital marketing strategies that transform visibility into measurable, compounding growth.",
    tags: ["SEO", "Analytics", "Paid Media", "Strategy"],
    accentGradient: "linear-gradient(135deg, #f59e0b, #f97316)",
    accentGlow: "rgba(245,158,11,0.15)",
    icon: <GrowthIcon />,
  },
];

/* ─── Component ────────────────────────────────────────────────────────────── */

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* ── Header entrance ───────────────────────────────────────── */
      const headerEls = containerRef.current?.querySelectorAll(
        "[data-animate='header']"
      );
      if (headerEls?.length) {
        gsap.from(headerEls, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: headerEls[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      /* ── Horizontal rule reveals ───────────────────────────────── */
      const rules = containerRef.current?.querySelectorAll(
        "[data-animate='rule']"
      );
      if (rules?.length) {
        rules.forEach((rule) => {
          gsap.from(rule, {
            scaleX: 0,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: rule,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      /* ── Service row staggered entrance ────────────────────────── */
      const rows = containerRef.current?.querySelectorAll(
        "[data-animate='service-row']"
      );
      if (rows?.length) {
        rows.forEach((row, i) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          // Number
          tl.from(
            row.querySelector("[data-animate='index']"),
            {
              x: -30,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            0
          );

          // Icon
          tl.from(
            row.querySelector("[data-animate='icon']"),
            {
              scale: 0,
              opacity: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            0.1
          );

          // Title
          tl.from(
            row.querySelector("[data-animate='title']"),
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            0.15
          );

          // Description
          tl.from(
            row.querySelector("[data-animate='desc']"),
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            0.25
          );

          // Tags
          const tags = row.querySelectorAll("[data-animate='tag']");
          if (tags.length) {
            tl.from(
              tags,
              {
                y: 15,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
                stagger: 0.06,
              },
              0.35
            );
          }

          // Arrow
          tl.from(
            row.querySelector("[data-animate='arrow']"),
            {
              x: -20,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            0.3
          );
        });
      }

      /* ── Floating gradient orb – parallax drift ────────────────── */
      const orb = containerRef.current?.querySelector("[data-animate='orb']");
      if (orb) {
        gsap.to(orb, {
          y: -120,
          x: 60,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative overflow-hidden bg-[#050507] py-28 sm:py-36 lg:py-44"
    >
      {/* ── Ambient orbs ──────────────────────────────────────── */}
      <div
        data-animate="orb"
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,1) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-60 bottom-40 h-[500px] w-[500px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, rgba(217,70,239,1) 0%, transparent 70%)",
        }}
      />

      {/* ── Grain overlay ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="mb-20 max-w-3xl lg:mb-28">
          {/* Label */}
          <div data-animate="header" className="mb-6 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            <span className="block h-px w-8 bg-gradient-to-r from-indigo-500 to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              What We Do
            </span>
          </div>

          {/* Headline */}
          <h2
            data-animate="header"
            className="text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
          >
            Services crafted
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              for impact.
            </span>
          </h2>

          {/* Sub-copy */}
          <p
            data-animate="header"
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            From product strategy to full-stack engineering — we design and ship
            software that users love and businesses rely on.
          </p>
        </div>

        {/* ── Top rule ─────────────────────────────────────────── */}
        <div
          data-animate="rule"
          className="h-px w-full origin-left bg-gradient-to-r from-zinc-700/60 via-zinc-800/40 to-transparent"
        />

        {/* ── Service Rows ─────────────────────────────────────── */}
        <div className="flex flex-col">
          {services.map((service) => (
            <div key={service.index}>
              {/* Row */}
              <div
                data-animate="service-row"
                className="group relative grid grid-cols-1 items-center gap-6 py-10 sm:py-14 md:grid-cols-[auto_1fr_auto] md:gap-10 lg:gap-16 cursor-pointer"
              >
                {/* ── Left: Index + Icon ────────────────────────── */}
                <div className="flex items-center gap-5 md:gap-6">
                  {/* Numbered index */}
                  <span
                    data-animate="index"
                    className="font-mono text-sm font-medium text-zinc-600 transition-colors duration-500 group-hover:text-zinc-400"
                  >
                    {service.index}
                  </span>

                  {/* Icon container – uses a hidden gradient layer revealed on hover */}
                  <div
                    data-animate="icon"
                    className="service-icon-box relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]
                               text-zinc-400 transition-all duration-500 overflow-hidden
                               group-hover:border-white/[0.12] group-hover:text-white group-hover:shadow-lg"
                    style={{ "--icon-gradient": service.accentGradient, "--icon-glow": service.accentGlow } as React.CSSProperties}
                  >
                    {/* Gradient background – revealed on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: service.accentGradient }}
                    />
                    <span className="relative z-10">{service.icon}</span>
                  </div>
                </div>

                {/* ── Center: Title + Description + Tags ────────── */}
                <div className="flex flex-col gap-3">
                  <h3
                    data-animate="title"
                    className="text-2xl font-bold tracking-tight text-white transition-colors duration-500 sm:text-3xl lg:text-4xl group-hover:text-white/90"
                  >
                    {service.title}
                  </h3>
                  <p
                    data-animate="desc"
                    className="max-w-lg text-sm leading-relaxed text-zinc-500 transition-colors duration-500 sm:text-base group-hover:text-zinc-400"
                  >
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-1 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        data-animate="tag"
                        className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-xs font-medium text-zinc-500 transition-all duration-500
                                   group-hover:border-white/[0.1] group-hover:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Right: Arrow ──────────────────────────────── */}
                <div
                  data-animate="arrow"
                  className="hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02]
                             transition-all duration-500
                             group-hover:border-white/[0.15] group-hover:bg-white/[0.06] group-hover:translate-x-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-zinc-600 transition-all duration-500 group-hover:text-white group-hover:translate-x-0.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* ── Hover glow (behind row) ──────────────────── */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-4 inset-y-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse 50% 80% at 20% 50%, ${service.accentGlow}, transparent)`,
                  }}
                />
              </div>

              {/* ── Divider ────────────────────────────────────── */}
              <div
                data-animate="rule"
                className="h-px w-full origin-left bg-gradient-to-r from-zinc-700/60 via-zinc-800/40 to-transparent"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
