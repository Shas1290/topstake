"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import styles from "./about.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const VALUES = [
  {
    num: "01",
    title: "Innovation First",
    description:
      "We constantly push boundaries, embracing new technologies to solve complex problems in elegant, scalable ways.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    glowColor: "99, 102, 241",
  },
  {
    num: "02",
    title: "Design Excellence",
    description:
      "Aesthetics matter. We believe beautiful design paired with intuitive UX creates unforgettable, premium digital products.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    glowColor: "236, 72, 153",
  },
  {
    num: "03",
    title: "User-Centric",
    description:
      "Our users are at the core of every decision. We build with deep empathy, listening closely to feedback to refine experiences.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #06b6d4, #14b8a6)",
    glowColor: "6, 182, 212",
  },
  {
    num: "04",
    title: "Relentless Quality",
    description:
      "Every pixel is intentional, every interaction is tested. We obsess over craft to deliver products that feel effortlessly polished.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
    glowColor: "245, 158, 11",
  },
  {
    num: "05",
    title: "Transparent Process",
    description:
      "No black boxes. We keep our clients in the loop with open communication, shared timelines, and honest progress updates.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    glowColor: "16, 185, 129",
  },
  {
    num: "06",
    title: "Future-Ready",
    description:
      "We architect for tomorrow. Our solutions are built on modern, scalable foundations that evolve with your business.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #a78bfa, #c084fc)",
    glowColor: "167, 139, 250",
  },
];

const TEAM = [
  {
    name: "Sarah Jenkins",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Marcus Chen",
    role: "Head of Engineering",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Elena Rodriguez",
    role: "Lead Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "David Kim",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  },
];

const MILESTONES = [
  { year: "2024", label: "Founded", desc: "TopStake was born from a vision to redefine digital craft." },
  { year: "2024", label: "First Client", desc: "Landed our first enterprise partner within 3 months." },
  { year: "2025", label: "Team of 20", desc: "Scaled to a full-stack agency with designers, engineers & strategists." },
  { year: "2026", label: "Global Reach", desc: "Delivering premium products to clients on 4 continents." },
];

/* ─── SplitText-like helper ─────────────────────────────────────────────────── */

function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={styles.splitChar}
          style={{ display: char === " " ? "inline" : "inline-block" }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className={styles.splitWord} style={{ display: "inline-block" }}>
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

/* ─── Morphing SVG Background ────────────────────────────────────────────── */

function MorphBlob() {
  const pathRef = useRef<SVGPathElement>(null);

  const paths = [
    "M44.2,-76.3C57.1,-69.6,67.7,-57.5,74.5,-43.8C81.3,-30.1,84.4,-15,84.1,-0.2C83.8,14.7,80,29.4,72.7,42.1C65.4,54.8,54.5,65.5,41.5,72.8C28.5,80.1,14.3,84,-1.3,86.2C-16.9,88.5,-33.8,89.1,-47.3,82.2C-60.8,75.3,-71,60.9,-77.1,45.3C-83.2,29.7,-85.2,12.8,-83.4,-3.1C-81.5,-19,-75.8,-33.9,-66.5,-45.5C-57.3,-57.1,-44.5,-65.3,-31,-71.7C-17.4,-78.1,-3.1,-82.7,10.7,-80C24.5,-77.3,31.3,-83,44.2,-76.3Z",
    "M39.5,-67.8C51.5,-61.3,61.8,-51.1,69.8,-38.8C77.8,-26.5,83.5,-13.3,83.7,0.1C83.9,13.5,78.6,27.1,70.3,38.2C62.1,49.3,50.8,57.9,38.2,65.2C25.5,72.5,11.5,78.5,-2.6,82.1C-16.7,85.7,-30.7,86.9,-43.3,81.1C-55.8,75.3,-66.8,62.5,-73.8,47.9C-80.8,33.3,-83.8,16.6,-82.8,0.6C-81.8,-15.5,-76.8,-31,-67.6,-43.1C-58.5,-55.2,-45.2,-63.9,-31.5,-69.5C-17.9,-75.1,-4,-77.5,9.5,-76.6C23,-75.7,27.5,-74.3,39.5,-67.8Z",
    "M43.8,-73.2C56.7,-68.7,67,-55.8,74.2,-41.6C81.4,-27.3,85.5,-11.7,84.1,3.2C82.8,18.1,76.1,32.3,66.2,43C56.3,53.7,43.2,61,29.7,66.8C16.2,72.7,2.3,77.1,-12.2,77.2C-26.7,77.3,-41.9,73.1,-53.5,64C-65.2,54.9,-73.3,41,-78.1,25.8C-82.9,10.7,-84.4,-5.7,-80.5,-20.4C-76.6,-35.1,-67.3,-48.2,-55,-57.1C-42.7,-65.9,-27.4,-70.6,-12.3,-73C2.8,-75.5,30.9,-77.7,43.8,-73.2Z",
  ];

  useEffect(() => {
    if (!pathRef.current) return;
    let i = 0;
    const morph = () => {
      i = (i + 1) % paths.length;
      gsap.to(pathRef.current, {
        attr: { d: paths[i] },
        duration: 4,
        ease: "power1.inOut",
        onComplete: morph,
      });
    };
    morph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg className={styles.morphBlob} viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(139,92,246,0.4)" />
          <stop offset="50%" stopColor="rgba(236,72,153,0.3)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0.2)" />
        </linearGradient>
      </defs>
      <path ref={pathRef} d={paths[0]} fill="url(#morphGrad)" transform="scale(0.9)" />
    </svg>
  );
}

/* ─── Floating Particle (MotionPath) ─────────────────────────────────────── */

function FloatingParticle({ delay, size, color }: { delay: number; size: number; color: string }) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current) return;
    gsap.set(dotRef.current, { opacity: 0 });
    gsap.to(dotRef.current, {
      opacity: 0.6,
      duration: 1,
      delay,
    });
    gsap.to(dotRef.current, {
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 100 + Math.random() * 200, y: -80 - Math.random() * 100 },
          { x: -50 + Math.random() * 150, y: -200 - Math.random() * 100 },
          { x: 50 + Math.random() * 100, y: -350 - Math.random() * 100 },
          { x: 0, y: -500 },
        ],
        curviness: 1.5,
      },
      duration: 8 + Math.random() * 6,
      repeat: -1,
      ease: "none",
      delay,
    });
  }, [delay]);

  return (
    <div
      ref={dotRef}
      className={styles.floatingParticle}
      style={{
        width: size,
        height: size,
        background: color,
      }}
    />
  );
}

/* ─── Draggable Badge ────────────────────────────────────────────────────── */

function DraggableBadge({ text, color }: { text: string; color: string }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
    if (badgeRef.current) {
      badgeRef.current.setPointerCapture(e.pointerId);
      gsap.to(badgeRef.current, { scale: 1.15, duration: 0.2 });
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !badgeRef.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    velocity.current = { x: dx, y: dy };
    currentPos.current.x += dx;
    currentPos.current.y += dy;
    lastPos.current = { x: e.clientX, y: e.clientY };
    gsap.set(badgeRef.current, {
      x: currentPos.current.x,
      y: currentPos.current.y,
    });
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current || !badgeRef.current) return;
    isDragging.current = false;
    // Inertia-like: throw with decaying velocity then snap back
    const throwX = currentPos.current.x + velocity.current.x * 8;
    const throwY = currentPos.current.y + velocity.current.y * 8;
    gsap.to(badgeRef.current, {
      x: throwX,
      y: throwY,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        // Snap back with elastic
        gsap.to(badgeRef.current, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
        });
        currentPos.current = { x: 0, y: 0 };
      },
    });
    gsap.to(badgeRef.current, { scale: 1, duration: 0.3 });
  }, []);

  return (
    <div
      ref={badgeRef}
      className={styles.draggableBadge}
      style={{ "--badge-color": color } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {text}
      <span className={styles.dragHint}>⟵ drag me</span>
    </div>
  );
}

/* ─── 3D Tilt Value Card ─────────────────────────────────────────────────── */

function ValueCard3D({
  value,
  index,
}: {
  value: (typeof VALUES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(cardRef.current, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      });

      // Move glow to cursor position
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={styles.valueCard}
      data-value-card
      style={
        {
          "--card-gradient": value.gradient,
          "--glow-rgb": value.glowColor,
          "--card-index": index,
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient border */}
      <div className={styles.cardBorderGlow} />

      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className={styles.cardCursorGlow}
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at center, rgba(${value.glowColor}, 0.15), transparent 70%)`,
        }}
      />

      {/* Card content */}
      <div className={styles.cardInner}>
        {/* Number + Icon row */}
        <div className={styles.cardTopRow}>
          <span className={styles.cardNum} data-value-num>
            {value.num}
          </span>
          <div
            className={styles.valueIcon}
            data-value-icon
            style={{ background: `rgba(${value.glowColor}, 0.1)` }}
          >
            {value.icon}
          </div>
        </div>

        {/* Title */}
        <h3 data-value-title>{value.title}</h3>

        {/* Description */}
        <p data-value-desc>{value.description}</p>

        {/* Bottom accent line */}
        <div
          className={styles.cardAccentBar}
          data-value-bar
          style={{ background: value.gradient }}
        />
      </div>

      {/* Shine sweep on hover */}
      <div className={styles.cardShine} />
    </div>
  );
}

/* ─── Stats Counter ──────────────────────────────────────────────────────── */

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 4, suffix: "", label: "Continents Reached" },
  { value: 24, suffix: "/7", label: "Dedicated Support" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const countRef = useRef({ val: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(countRef.current, {
          val: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (el) el.textContent = Math.round(countRef.current.val) + suffix;
          },
        });
      },
    });
    return () => trigger.kill();
  }, [value, suffix]);

  return <span ref={ref} className={styles.statValue}>0{suffix}</span>;
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // ── Flip-like state: toggle team layout ──
  const [teamLayout, setTeamLayout] = useState<"grid" | "row">("grid");

  useGSAP(
    () => {
      /* ═══════════════════════════════════════════════════════════════════
         HERO – SplitText-like character stagger + parallax
      ═══════════════════════════════════════════════════════════════════ */
      const heroChars = heroRef.current?.querySelectorAll(`.${styles.splitChar}`);
      if (heroChars?.length) {
        gsap.from(heroChars, {
          y: 80,
          opacity: 0,
          rotateX: -90,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(1.7)",
          delay: 0.3,
        });
      }

      const heroWords = heroRef.current?.querySelectorAll(`.${styles.splitWord}`);
      if (heroWords?.length) {
        gsap.from(heroWords, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 1.2,
        });
      }

      // Hero badge entrance
      const heroBadge = heroRef.current?.querySelector(`.${styles.heroBadge}`);
      if (heroBadge) {
        gsap.from(heroBadge, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
          delay: 0.1,
        });
      }

      // Parallax orbs on hero
      const heroOrbs = heroRef.current?.querySelectorAll(`.${styles.heroOrb}`);
      if (heroOrbs?.length) {
        heroOrbs.forEach((orb, i) => {
          gsap.to(orb, {
            yPercent: -30 * (i + 1),
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }

      // Hero video parallax
      const heroBgVideo = heroRef.current?.querySelector(`.${styles.heroBgVideo}`);
      if (heroBgVideo) {
        gsap.to(heroBgVideo, {
          yPercent: -20,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      /* ═══════════════════════════════════════════════════════════════════
         MISSION – Image reveal + text slide
      ═══════════════════════════════════════════════════════════════════ */
      const missionImg = missionRef.current?.querySelector(`.${styles.imageFrame}`);
      const missionText = missionRef.current?.querySelector(`.${styles.splitText}`);

      if (missionImg) {
        gsap.from(missionImg, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (missionText) {
        const missionEls = missionText.querySelectorAll("h2, p");
        gsap.from(missionEls, {
          x: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      /* ═══════════════════════════════════════════════════════════════════
         STATS – Counter + stagger
      ═══════════════════════════════════════════════════════════════════ */
      const statCards = statsRef.current?.querySelectorAll(`.${styles.statCard}`);
      if (statCards?.length) {
        gsap.from(statCards, {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      /* ═══════════════════════════════════════════════════════════════════
         VALUES – Cinematic entrance with per-card timelines
      ═══════════════════════════════════════════════════════════════════ */
      // Section heading stagger
      const valuesHeaderEls = valuesRef.current?.querySelectorAll(
        `.${styles.sectionTitle}, .${styles.sectionSubtitle}`
      );
      if (valuesHeaderEls?.length) {
        gsap.from(valuesHeaderEls, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Video background parallax
      const valuesBgVideo = valuesRef.current?.querySelector(`.${styles.valuesBgVideo}`);
      if (valuesBgVideo) {
        gsap.to(valuesBgVideo, {
          yPercent: -15,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Per-card cinematic timelines
      const valueCards = valuesRef.current?.querySelectorAll("[data-value-card]");
      if (valueCards?.length) {
        valueCards.forEach((card, i) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          // Card container entrance
          tl.from(card, {
            y: 120,
            opacity: 0,
            rotateX: -15,
            scale: 0.8,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.08,
          });

          // Number badge
          tl.from(
            card.querySelector("[data-value-num]"),
            {
              scale: 0,
              opacity: 0,
              duration: 0.5,
              ease: "back.out(3)",
            },
            "-=0.5"
          );

          // Icon bounce
          tl.from(
            card.querySelector("[data-value-icon]"),
            {
              scale: 0,
              rotation: -180,
              opacity: 0,
              duration: 0.7,
              ease: "back.out(2)",
            },
            "-=0.4"
          );

          // Title slide
          tl.from(
            card.querySelector("[data-value-title]"),
            {
              x: -30,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.4"
          );

          // Description fade
          tl.from(
            card.querySelector("[data-value-desc]"),
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.3"
          );

          // Accent bar draw
          tl.from(
            card.querySelector("[data-value-bar]"),
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.8,
              ease: "power2.inOut",
            },
            "-=0.3"
          );
        });
      }

      /* ═══════════════════════════════════════════════════════════════════
         TIMELINE – Motion path line draw + stagger
      ═══════════════════════════════════════════════════════════════════ */
      const timelineLine = timelineRef.current?.querySelector(`.${styles.timelineLine}`);
      if (timelineLine) {
        gsap.from(timelineLine, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 50%",
            scrub: 1,
          },
        });
      }

      const timelineItems = timelineRef.current?.querySelectorAll(`.${styles.timelineItem}`);
      if (timelineItems?.length) {
        timelineItems.forEach((item, i) => {
          const isLeft = i % 2 === 0;
          gsap.from(item, {
            x: isLeft ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      const timelineDots = timelineRef.current?.querySelectorAll(`.${styles.timelineDot}`);
      if (timelineDots?.length) {
        timelineDots.forEach((dot) => {
          gsap.from(dot, {
            scale: 0,
            duration: 0.5,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: dot,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      /* ═══════════════════════════════════════════════════════════════════
         TEAM – Stagger + hover ready
      ═══════════════════════════════════════════════════════════════════ */
      const teamTitle = teamRef.current?.querySelector(`.${styles.sectionTitle}`);
      if (teamTitle) {
        gsap.from(teamTitle, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const teamMembers = teamRef.current?.querySelectorAll(`.${styles.teamMember}`);
      if (teamMembers?.length) {
        gsap.from(teamMembers, {
          y: 80,
          opacity: 0,
          scale: 0.85,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      /* ═══════════════════════════════════════════════════════════════════
         CTA – Scale reveal
      ═══════════════════════════════════════════════════════════════════ */
      const ctaContent = ctaRef.current?.querySelector(`.${styles.ctaInner}`);
      if (ctaContent) {
        gsap.from(ctaContent, {
          scale: 0.8,
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: containerRef }
  );

  /* ═══════════════════════════════════════════════════════════════════
     FLIP-like layout transition for team
  ═══════════════════════════════════════════════════════════════════ */
  const handleFlipLayout = useCallback(() => {
    const members = teamRef.current?.querySelectorAll(`.${styles.teamMember}`);
    if (!members?.length) return;

    // Capture current positions
    const positions = Array.from(members).map((el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
    });

    // Toggle layout
    setTeamLayout((prev) => {
      const next = prev === "grid" ? "row" : "grid";

      // After state update & re-render, animate from old positions
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newMembers = teamRef.current?.querySelectorAll(`.${styles.teamMember}`);
          if (!newMembers?.length) return;

          newMembers.forEach((el, i) => {
            const newRect = (el as HTMLElement).getBoundingClientRect();
            const dx = positions[i].x - newRect.left;
            const dy = positions[i].y - newRect.top;
            const sw = positions[i].width / newRect.width;
            const sh = positions[i].height / newRect.height;

            gsap.from(el, {
              x: dx,
              y: dy,
              scaleX: sw,
              scaleY: sh,
              duration: 0.8,
              ease: "power3.out",
            });
          });
        });
      });

      return next;
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* ── Morphing SVG Background ── */}
      <MorphBlob />

      {/* ── Floating Particles (MotionPath) ── */}
      <div className={styles.particleField}>
        <FloatingParticle delay={0} size={4} color="rgba(139,92,246,0.5)" />
        <FloatingParticle delay={1.5} size={3} color="rgba(244,114,182,0.4)" />
        <FloatingParticle delay={3} size={5} color="rgba(56,189,248,0.4)" />
        <FloatingParticle delay={4.5} size={3} color="rgba(99,102,241,0.5)" />
        <FloatingParticle delay={6} size={4} color="rgba(236,72,153,0.3)" />
        <FloatingParticle delay={2} size={6} color="rgba(168,85,247,0.3)" />
      </div>

      {/* ── Navigation ── */}
      <Navbar />

      {/* ════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className={`${styles.section} ${styles.hero}`}>
        {/* Video background */}
        <div className={styles.heroBgWrapper}>
          <video
            className={styles.heroBgVideo}
            src="/video4.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className={styles.heroBgOverlay} />
          {/* Noise grain */}
          <div className={styles.heroNoise} />
          {/* Animated scan line */}
          <div className={styles.heroScanLine} />
        </div>

        {/* Parallax orbs */}
        <div className={`${styles.heroOrb} ${styles.heroOrb1}`} />
        <div className={`${styles.heroOrb} ${styles.heroOrb2}`} />

        {/* Badge */}
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot} />
          About Us
        </div>

        {/* Title with SplitText-like animation */}
        <h1 className={styles.title}>
          <SplitChars text="Designing" />
          <br />
          <SplitChars text="the Future." className={styles.titleGradient} />
        </h1>

        {/* Subtitle with word split */}
        <p className={styles.subtitle}>
          <SplitWords text="We are a team of passionate creators, engineers, and strategists building premium digital experiences that leave a lasting impact." />
        </p>

        {/* Draggable elements */}
        <div className={styles.draggableRow}>
          <DraggableBadge text="🚀 Innovation" color="rgba(99,102,241,0.25)" />
          <DraggableBadge text="🎨 Design" color="rgba(236,72,153,0.25)" />
          <DraggableBadge text="⚡ Performance" color="rgba(56,189,248,0.25)" />
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollDot} />
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          MISSION SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section ref={missionRef} className={styles.section}>
        <div className={styles.splitGrid}>
          <div className={styles.imageFrame}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Team collaborating in an office"
              loading="lazy"
            />
            <div className={styles.imageOverlay} />
          </div>
          <div className={styles.splitText}>
            <h2>Our Mission</h2>
            <p>
              At TopStake, we believe that software should be as beautiful as it is functional.
              Our mission is to bridge the gap between complex engineering and stunning, intuitive
              design, creating products that users genuinely love.
            </p>
            <p>
              Started in 2024, we have grown from a small passionate group of developers into a
              global agency trusted by leading startups and enterprises to shape their digital
              identity and drive innovation.
            </p>
            <div className={styles.missionAccent}>
              <span className={styles.accentLine} />
              <span className={styles.accentText}>Est. 2024 • Global Agency</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          STATS SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className={`${styles.section} ${styles.statsSection}`}>
        <div className={styles.statsGrid}>
          {STATS.map((stat, idx) => (
            <div key={idx} className={styles.statCard}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CORE VALUES – Cinematic with Video Background
      ════════════════════════════════════════════════════════════════ */}
      <section ref={valuesRef} className={`${styles.section} ${styles.valuesSection}`}>
        {/* Fullscreen video background */}
        <div className={styles.valuesBgWrapper}>
          <video
            className={styles.valuesBgVideo}
            src="/video2.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className={styles.valuesBgOverlay} />
          {/* Animated grid lines */}
          <div className={styles.valuesGridLines}>
            <div className={styles.gridLineV} />
            <div className={styles.gridLineV} />
            <div className={styles.gridLineV} />
            <div className={styles.gridLineH} />
            <div className={styles.gridLineH} />
          </div>
        </div>

        {/* Section Header */}
        <div className={styles.valuesSectionHeader}>
          <div className={styles.valuesLabel}>
            <span className={styles.valuesLabelDot} />
            <span className={styles.valuesLabelLine} />
            <span>Our DNA</span>
          </div>
          <h2 className={styles.sectionTitle}>Core Values</h2>
          <p className={styles.sectionSubtitle}>
            The principles that guide every pixel we push and every line of code we write.
          </p>
        </div>

        {/* Values Grid */}
        <div className={styles.valuesGrid}>
          {VALUES.map((value, idx) => (
            <ValueCard3D key={idx} value={value} index={idx} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          JOURNEY TIMELINE
      ════════════════════════════════════════════════════════════════ */}
      <section ref={timelineRef} className={`${styles.section} ${styles.timelineSection}`}>
        <h2 className={styles.sectionTitle}>Our Journey</h2>
        <p className={styles.sectionSubtitle}>From a bold idea to a global creative force.</p>
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {MILESTONES.map((m, idx) => (
            <div
              key={idx}
              className={`${styles.timelineItem} ${idx % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}
            >
              <div className={styles.timelineDot} />
              <div className={styles.timelineCard}>
                <span className={styles.timelineYear}>{m.year}</span>
                <h3>{m.label}</h3>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TEAM SECTION (with Flip-like layout toggle)
      ════════════════════════════════════════════════════════════════ */}
      <section ref={teamRef} className={`${styles.section} ${styles.teamSection}`}>
        <div className={styles.teamHeader}>
          <h2 className={styles.sectionTitle}>Meet the Team</h2>
          <button className={styles.flipToggle} onClick={handleFlipLayout}>
            {teamLayout === "grid" ? "⬌ Row View" : "⊞ Grid View"}
          </button>
        </div>
        <div
          className={
            teamLayout === "grid" ? styles.teamGrid : styles.teamRow
          }
        >
          {TEAM.map((member, idx) => (
            <div key={idx} className={styles.teamMember}>
              <div className={styles.avatar}>
                <img src={member.image} alt={member.name} loading="lazy" />
                <div className={styles.avatarGlow} />
              </div>
              <h3 className={styles.teamName}>{member.name}</h3>
              <span className={styles.teamRole}>{member.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CTA SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section ref={ctaRef} className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.ctaInner}>
          <h2>Ready to build something extraordinary?</h2>
          <p>Let&apos;s turn your vision into a premium digital experience.</p>
          <a href="/contact" className={styles.ctaButton}>
            <span>Get in Touch</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
