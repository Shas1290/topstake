"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import styles from "./explore.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    Flip,
    SplitText,
    Draggable,
    InertiaPlugin,
    MotionPathPlugin,
    MorphSVGPlugin
  );
}

/* ─── Idea Data ─────────────────────────────────────────────── */
interface Idea {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  glow: string;
}

const IDEAS: Idea[] = [
  {
    title: "Spatial Computing Interfaces",
    description:
      "Bridging the physical and digital worlds with 3D interactions and immersive augmented reality elements embedded deeply within web apps.",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    glow: "rgba(99,102,241,0.25)",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Generative AI Workflows",
    description:
      "Integrating LLMs natively into user experiences to create highly context-aware, personalized, and predictive applications.",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
    glow: "rgba(236,72,153,0.25)",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Hyper-Personalization",
    description:
      "Using real-time behavioral analytics to adapt UI layouts, content, and themes instantly to individual user preferences.",
    gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
    glow: "rgba(20,184,166,0.25)",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Neuromorphic Design",
    description:
      "Interfaces that mimic human brain processes and natural responses, utilizing soft physics and organic micro-interactions.",
    gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
    glow: "rgba(245,158,11,0.25)",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 2a10 10 0 0 1 10 10H12V2z" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: "Edge Computing Apps",
    description:
      "Moving processing logic closer to the user to achieve zero-latency interactions in highly complex, interactive web platforms.",
    gradient: "linear-gradient(135deg, #a855f7, #7c3aed)",
    glow: "rgba(168,85,247,0.25)",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Eco-Conscious Architecture",
    description:
      "Optimizing code delivery and server utilization to drastically reduce the carbon footprint of massive global digital services.",
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    glow: "rgba(16,185,129,0.25)",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
];

/* ─── MorphSVG shape paths ─────────────────────────────────── */
const MORPH_SHAPES = [
  // Circle
  "M140,30 C200,30 250,80 250,140 C250,200 200,250 140,250 C80,250 30,200 30,140 C30,80 80,30 140,30 Z",
  // Star
  "M140,20 L170,100 L260,110 L190,165 L210,255 L140,210 L70,255 L90,165 L20,110 L110,100 Z",
  // Diamond
  "M140,20 L250,140 L140,260 L30,140 Z",
  // Hexagon
  "M140,25 L240,82 L240,198 L140,255 L40,198 L40,82 Z",
  // Blob
  "M140,30 C210,30 270,80 250,150 C230,220 200,260 140,260 C80,260 30,220 30,150 C30,80 70,30 140,30 Z",
];

const MORPH_LABELS = ["Circle", "Star", "Diamond", "Hexagon", "Blob"];
const MORPH_COLORS = [
  "url(#morphGrad1)",
  "url(#morphGrad2)",
  "url(#morphGrad3)",
  "url(#morphGrad4)",
  "url(#morphGrad5)",
];

/* ─── Draggable playground items ───────────────────────────── */
const DRAG_ITEMS = [
  { label: "GSAP", bg: "linear-gradient(135deg, #6366f1, #8b5cf6)", x: 40, y: 40 },
  { label: "React", bg: "linear-gradient(135deg, #06b6d4, #0ea5e9)", x: 180, y: 80 },
  { label: "Next", bg: "linear-gradient(135deg, #f59e0b, #f97316)", x: 320, y: 50 },
  { label: "TS", bg: "linear-gradient(135deg, #3b82f6, #2563eb)", x: 500, y: 100 },
  { label: "AI", bg: "linear-gradient(135deg, #ec4899, #f43f5e)", x: 650, y: 60 },
];

/* ═══════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════ */
export default function ExploreClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const morphShapeRef = useRef<SVGPathElement>(null);
  const morphLabelRef = useRef<HTMLDivElement>(null);
  const videoHeroRef = useRef<HTMLElement>(null);
  const videoTopTextRef = useRef<HTMLSpanElement>(null);
  const videoBottomTextRef = useRef<HTMLSpanElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const videoBadgeRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [morphIndex, setMorphIndex] = useState(0);
  const draggablesCreated = useRef(false);

  /* ═══ 1. GSAP ScrollTrigger + SplitText + MotionPath + MorphSVG ═══ */
  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      /* ─── VIDEO HERO: SplitText entrance + scroll parallax ── */
      const vhTopText = videoTopTextRef.current;
      const vhBottomText = videoBottomTextRef.current;
      const vhSection = videoHeroRef.current;
      const vhScrollHint = scrollHintRef.current;
      const vhBadge = videoBadgeRef.current;

      if (vhTopText && vhBottomText && vhSection) {
        // SplitText the video hero headlines into characters
        const topSplit = SplitText.create(vhTopText, { type: "chars" });
        const bottomSplit = SplitText.create(vhBottomText, { type: "chars" });

        // Entrance timeline — plays once on load
        const vhTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        vhTl
          .from(topSplit.chars, {
            y: 100,
            opacity: 0,
            rotateX: -60,
            duration: 0.9,
            stagger: 0.04,
            delay: 0.2,
          })
          .from(
            bottomSplit.chars,
            {
              y: 100,
              opacity: 0,
              rotateX: -60,
              duration: 0.9,
              stagger: 0.04,
            },
            "-=0.6"
          );

        if (vhScrollHint) {
          vhTl.from(
            vhScrollHint,
            { y: 20, opacity: 0, duration: 0.6 },
            "-=0.4"
          );
        }
        if (vhBadge) {
          vhTl.from(
            vhBadge,
            { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.5"
          );
        }

        // Scroll parallax — text layers drift at different speeds
        gsap.to(vhTopText, {
          yPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: vhSection,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(vhBottomText, {
          yPercent: -55,
          ease: "none",
          scrollTrigger: {
            trigger: vhSection,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ─── SPLITTEXT: Hero Title — char-by-char reveal ─────── */
      const heroTitle = container.querySelector(
        "[data-animate='hero-title']"
      ) as HTMLElement;
      const heroSubtitle = container.querySelector(
        "[data-animate='hero-subtitle']"
      ) as HTMLElement;
      const heroLine = container.querySelector(
        "[data-animate='hero-line']"
      ) as HTMLElement;
      const heroSection = container.querySelector(
        "[data-animate='hero']"
      ) as HTMLElement;

      if (heroTitle && heroSubtitle && heroSection) {
        // SplitText on the hero title into characters
        const titleSplit = SplitText.create(heroTitle, {
          type: "chars",
        });

        // SplitText on subtitle into words
        const subtitleSplit = SplitText.create(heroSubtitle, {
          type: "words",
        });

        // Set initial states
        gsap.set(titleSplit.chars, {
          opacity: 0,
          y: 80,
          rotateX: -90,
          scale: 0.6,
        });
        gsap.set(subtitleSplit.words, {
          opacity: 0,
          y: 30,
          filter: "blur(8px)",
        });
        gsap.set(heroLine, { scaleX: 0 });

        // SCROLLTRIGGER: Pin the hero and scrub the SplitText animation
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 0.6,
            pinSpacing: true,
          },
        });

        // Characters cascade in with 3D rotation
        heroTl.to(titleSplit.chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.08,
          stagger: 0.03,
          ease: "back.out(1.7)",
        });

        // Line draws in
        heroTl.to(
          heroLine,
          { scaleX: 1, duration: 0.15, ease: "power2.inOut" },
          0.3
        );

        // Subtitle words fade in with blur
        heroTl.to(
          subtitleSplit.words,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.06,
            stagger: 0.02,
            ease: "power3.out",
          },
          0.4
        );
      }

      /* ─── SCROLLTRIGGER: Parallax ambient blobs ─────────── */
      const blobs = container.querySelectorAll("[data-animate='blob']");
      blobs.forEach((blob, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.to(blob, {
          y: dir * -250,
          x: dir * 100,
          scale: 1 + i * 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2 + i * 0.4,
          },
        });
      });

      /* ─── SCROLLTRIGGER: Section header reveal ──────────── */
      const sectionHeaders = container.querySelectorAll(
        "[data-animate='section-header']"
      );
      sectionHeaders.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* ─── SCROLLTRIGGER: Cards stagger reveal ──────────── */
      const cards = container.querySelectorAll("[data-animate='card']");
      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
            rotateX: 12,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1,
            delay: (i % 3) * 0.12,
            ease: "power3.out",
          }
        );

        // Inner element staggers
        const icon = card.querySelector("[data-animate='card-icon']");
        const title = card.querySelector("[data-animate='card-title']");
        const desc = card.querySelector("[data-animate='card-desc']");
        const link = card.querySelector("[data-animate='card-link']");

        if (icon)
          tl.fromTo(
            icon,
            { scale: 0, rotate: -45 },
            { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2.5)" },
            0.15
          );
        if (title)
          tl.fromTo(
            title,
            { opacity: 0, x: -25 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
            0.25
          );
        if (desc)
          tl.fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            0.35
          );
        if (link)
          tl.fromTo(
            link,
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" },
            0.45
          );
      });

      /* ─── SCROLLTRIGGER: Divider line scrub ────────────── */
      container.querySelectorAll("[data-animate='divider']").forEach((div) => {
        gsap.fromTo(
          div,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: div,
              start: "top 90%",
              end: "top 55%",
              scrub: 0.5,
            },
          }
        );
      });

      /* ─── MOTIONPATH: Floating orbs along SVG curve ────── */
      const pathOrbs = container.querySelectorAll("[data-animate='path-orb']");
      const motionPath = container.querySelector("#motionCurve") as SVGPathElement;

      if (pathOrbs.length && motionPath) {
        pathOrbs.forEach((orb, i) => {
          gsap.to(orb, {
            motionPath: {
              path: motionPath,
              align: motionPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            duration: 6 + i * 2,
            repeat: -1,
            ease: "none",
            delay: i * 1.5,
          });
        });
      }

      // MotionPath section parallax reveal
      const mpSection = container.querySelector(
        "[data-animate='motionpath-section']"
      );
      if (mpSection) {
        gsap.fromTo(
          mpSection,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mpSection,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      /* ─── MORPHSVG: Shape morphing on scroll ───────────── */
      const morphShape = morphShapeRef.current;
      const morphSection = container.querySelector(
        "[data-animate='morph-section']"
      );

      if (morphShape && morphSection) {
        // Create a scrub-driven morph sequence through all shapes
        const morphTl = gsap.timeline({
          scrollTrigger: {
            trigger: morphSection,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
            onUpdate: (self) => {
              // Update label based on progress
              const idx = Math.min(
                Math.floor(self.progress * MORPH_SHAPES.length),
                MORPH_SHAPES.length - 1
              );
              if (idx !== morphIndex) {
                setMorphIndex(idx);
              }
            },
          },
        });

        // Chain morph through each shape
        MORPH_SHAPES.forEach((shape, i) => {
          if (i === 0) return; // Skip first, it's the starting shape
          morphTl.to(morphShape, {
            morphSVG: shape,
            duration: 1,
            ease: "power2.inOut",
          });
        });
      }

      /* ─── SCROLLTRIGGER: CTA reveal with SplitText ─────── */
      const ctaSection = container.querySelector("[data-animate='cta']");
      const ctaTitle = container.querySelector(
        "[data-animate='cta-title']"
      ) as HTMLElement;

      if (ctaSection && ctaTitle) {
        const ctaSplit = SplitText.create(ctaTitle, { type: "words" });

        gsap.fromTo(
          ctaSplit.words,
          { opacity: 0, y: 40, rotateX: -45 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: ctaSection,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const ctaSub = container.querySelector("[data-animate='cta-sub']");
      if (ctaSub) {
        gsap.fromTo(
          ctaSub,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaSub,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const ctaBtn = container.querySelector("[data-animate='cta-btn']");
      if (ctaBtn) {
        gsap.fromTo(
          ctaBtn,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ctaBtn,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  /* ═══ 2. DRAGGABLE + INERTIA ═══════════════════════════════ */
  useEffect(() => {
    if (draggablesCreated.current) return;
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll("[data-draggable='item']");
    const bounds = container.querySelector(
      "[data-draggable='bounds']"
    ) as HTMLElement;

    if (items.length && bounds) {
      draggablesCreated.current = true;

      items.forEach((item) => {
        Draggable.create(item, {
          type: "x,y",
          bounds: bounds,
          inertia: true,
          edgeResistance: 0.65,
          onDragStart: function () {
            gsap.to(this.target, {
              scale: 1.15,
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              duration: 0.3,
              ease: "power2.out",
            });
          },
          onDragEnd: function () {
            gsap.to(this.target, {
              scale: 1,
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              duration: 0.5,
              ease: "elastic.out(1, 0.5)",
            });
          },
          onThrowUpdate: function () {
            // Inertia momentum is active — subtle rotation
            gsap.to(this.target, {
              rotation: this.getDirection("velocity") === "left" ? -3 : 3,
              duration: 0.2,
              ease: "power1.out",
            });
          },
          onThrowComplete: function () {
            gsap.to(this.target, {
              rotation: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.3)",
            });
          },
        });
      });
    }
  }, []);

  /* ═══ 3. FLIP Layout Toggle ════════════════════════════════ */
  const handleCardFlip = useCallback((index: number) => {
    const grid = gridRef.current;
    if (!grid) return;

    // Capture layout state of all Flip targets
    const allCards = grid.querySelectorAll("[data-flip-id]");
    const state = Flip.getState(allCards);

    setExpandedIndex((prev) => (prev === index ? null : index));

    // Animate after React re-renders
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.8,
          ease: "power3.inOut",
          stagger: 0.04,
          absolute: true,
          scale: true,
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 0.5 }
            ),
          onLeave: (elements) =>
            gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.4 }),
        });
      });
    });
  }, []);

  /* ═══ MorphSVG click handler (manual morph cycle) ══════════ */
  const handleMorphClick = useCallback(() => {
    const shape = morphShapeRef.current;
    if (!shape) return;

    const nextIdx = (morphIndex + 1) % MORPH_SHAPES.length;
    setMorphIndex(nextIdx);

    gsap.to(shape, {
      morphSVG: MORPH_SHAPES[nextIdx],
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
    });
  }, [morphIndex]);

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */
  return (
    <div ref={containerRef} className={styles.container}>
      {/* Ambient Blobs — ScrollTrigger parallax */}
      <div className={`${styles.bgBlob} ${styles.blob1}`} data-animate="blob" />
      <div className={`${styles.bgBlob} ${styles.blob2}`} data-animate="blob" />
      <div className={`${styles.bgBlob} ${styles.blob3}`} data-animate="blob" />

      {/* Navigation */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>TopStake</Link>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/blog" className={styles.navLink}>Blog</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
        </div>
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VIDEO HERO — full-screen cinematic banner
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={videoHeroRef} className={styles.videoHero}>
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.videoHeroBg}
          src="/video.mp4"
        />

        {/* Gradient overlay — fades to page bg at bottom */}
        <div className={styles.videoHeroOverlay} />

        {/* Text Layer */}
        <div className={styles.videoHeroContent}>
          <div>
            <span ref={videoTopTextRef} className={styles.videoHeroTopText}>
              Explore
            </span>
          </div>
          <div>
            <span ref={videoBottomTextRef} className={styles.videoHeroBottomText}>
              the future
            </span>
          </div>
        </div>

        {/* Floating badge — center right */}
        <div ref={videoBadgeRef} className={styles.videoHeroBadge}>
          <div className={styles.videoBadgeThumb}>
            <video autoPlay muted loop playsInline src="/video2.mp4" />
          </div>
          <span className={styles.videoBadgeLabel}>
            TopStake is diving deep into the biggest ideas of our time &rarr;
          </span>
        </div>

        {/* Scroll-down indicator */}
        <div ref={scrollHintRef} className={styles.scrollHint}>
          <span className={styles.scrollHintArrow}>&darr;</span>
          Scroll
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — ScrollTrigger pin + SplitText char reveal
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className={styles.hero} data-animate="hero">
        <div className={styles.heroInner}>
          <h1 className={styles.title} data-animate="hero-title">
            Exploring Ideas.
          </h1>
          <div className={styles.heroLine} data-animate="hero-line" />
          <p className={styles.subtitle} data-animate="hero-subtitle">
            Dive into our latest concepts and experimental technologies that are
            shaping the future of web development, user experience, and digital
            design.
          </p>
        </div>
      </section>

      {/* ━━━ Section Label ━━━ */}
      <section className={styles.sectionLabel} data-animate="section-header">
        <div className={styles.labelDot}>
          <span className={styles.labelDotPing} />
          <span className={styles.labelDotCore} />
        </div>
        <span className={styles.labelLine} />
        <span className={styles.labelText}>Our Focus Areas</span>
      </section>

      <div className={styles.divider} data-animate="divider" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          IDEAS GRID — Flip layout + ScrollTrigger reveals
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        ref={gridRef}
        className={`${styles.ideasGrid} ${
          expandedIndex !== null ? styles.ideasGridExpanded : ""
        }`}
      >
        {IDEAS.map((idea, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              data-flip-id={`card-${idx}`}
              data-animate="card"
              className={`${styles.ideaCard} ${
                isExpanded ? styles.ideaCardExpanded : ""
              } ${
                expandedIndex !== null && !isExpanded
                  ? styles.ideaCardCollapsed
                  : ""
              }`}
              onClick={() => handleCardFlip(idx)}
              style={
                {
                  "--card-gradient": idea.gradient,
                  "--card-glow": idea.glow,
                } as React.CSSProperties
              }
            >
              {/* Drag handle indicator */}
              <div className={styles.dragHandle} title="Drag me">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <circle cx="4" cy="4" r="1.5" />
                  <circle cx="10" cy="4" r="1.5" />
                  <circle cx="4" cy="10" r="1.5" />
                  <circle cx="10" cy="10" r="1.5" />
                </svg>
              </div>

              {/* Inertia badge */}
              <div className={styles.inertiaBadge}>Inertia</div>

              {/* Glow effect */}
              <div className={styles.cardGlow} />
              <div className={styles.cardBorderGlow} />

              <div className={styles.cardContent}>
                <div
                  className={styles.iconWrapper}
                  data-animate="card-icon"
                  style={{ background: idea.gradient }}
                >
                  {idea.icon}
                </div>
                <h2 className={styles.ideaTitle} data-animate="card-title">
                  {idea.title}
                </h2>
                <p className={styles.ideaDescription} data-animate="card-desc">
                  {idea.description}
                </p>

                {/* Expanded content — shown after Flip */}
                {isExpanded && (
                  <div className={styles.expandedContent}>
                    <div className={styles.expandedDivider} />
                    <p className={styles.expandedText}>
                      Click to collapse and explore other concepts. This area
                      hosts deeper insights, case studies, and interactive demos
                      related to {idea.title.toLowerCase()}.
                    </p>
                    <div className={styles.expandedTags}>
                      <span className={styles.tag}>Research</span>
                      <span className={styles.tag}>Innovation</span>
                      <span className={styles.tag}>2026</span>
                    </div>
                  </div>
                )}

                <div className={styles.exploreLink} data-animate="card-link">
                  {isExpanded ? "Collapse" : "Learn more"}{" "}
                  <span
                    aria-hidden="true"
                    className={styles.exploreLinkArrow}
                    style={{
                      transform: isExpanded ? "rotate(90deg)" : "none",
                    }}
                  >
                    &rarr;
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <div className={styles.divider} data-animate="divider" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MOTIONPATH SECTION — orbs floating along SVG curve
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className={styles.motionPathSection}
        data-animate="motionpath-section"
      >
        <div className={styles.motionPathInner}>
          <div className={styles.motionPathVisual}>
            <svg
              className={styles.motionPathSvg}
              viewBox="0 0 600 400"
              fill="none"
            >
              {/* The motion curve */}
              <path
                id="motionCurve"
                d="M30,350 C100,50 200,300 300,100 C400,-100 500,350 570,50"
                stroke="url(#pathGradient)"
                strokeWidth="2"
                strokeDasharray="8 6"
                fill="none"
                opacity="0.4"
              />
              <defs>
                <linearGradient
                  id="pathGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#e879f9" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>

              {/* MotionPath orbs */}
              <circle
                data-animate="path-orb"
                className={styles.pathOrb}
                r="8"
                fill="#818cf8"
              />
              <circle
                data-animate="path-orb"
                className={styles.pathOrb}
                r="6"
                fill="#e879f9"
              />
              <circle
                data-animate="path-orb"
                className={styles.pathOrb}
                r="10"
                fill="#14b8a6"
              />
            </svg>
          </div>

          <div className={styles.motionPathContent}>
            <h2 className={styles.motionPathTitle} data-animate="section-header">
              MotionPath
            </h2>
            <p className={styles.motionPathDesc} data-animate="section-header">
              Watch elements glide effortlessly along complex SVG curves. GSAP
              MotionPath enables smooth, organic movement that follows any path
              you can draw — perfect for guiding user attention and creating
              captivating visual narratives.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.divider} data-animate="divider" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MORPHSVG SECTION — shape morphing on scroll + click
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className={styles.morphSection}
        data-animate="morph-section"
      >
        <h2 className={styles.morphTitle} data-animate="section-header">
          Shape Morphing
        </h2>
        <p className={styles.morphSubtitle} data-animate="section-header">
          Watch SVG shapes seamlessly morph between entirely different forms as you
          scroll. Click the shape to cycle manually.
        </p>

        <div className={styles.morphContainer} onClick={handleMorphClick}>
          <svg className={styles.morphSvg} viewBox="0 0 280 280">
            <defs>
              <linearGradient id="morphGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="morphGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
              <linearGradient id="morphGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="morphGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <linearGradient id="morphGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <path
              ref={morphShapeRef}
              d={MORPH_SHAPES[0]}
              fill={MORPH_COLORS[morphIndex]}
              opacity="0.9"
            />
          </svg>
        </div>

        <div className={styles.morphLabel} ref={morphLabelRef}>
          {MORPH_LABELS[morphIndex]}
        </div>
        <div className={styles.morphHint}>
          <span className={styles.morphDot} />
          Scroll or click to morph
        </div>
      </section>

      <div className={styles.divider} data-animate="divider" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DRAGGABLE + INERTIA SECTION — throwable elements
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className={styles.draggableSection} data-animate="section-header">
        <div className={styles.draggableHeader}>
          <h2 className={styles.draggableTitle}>Drag &amp; Throw</h2>
          <p className={styles.draggableSubtitle}>
            Grab any element below and throw it — momentum-based physics powered by
            GSAP Draggable + Inertia Plugin keeps the motion feeling natural and alive.
          </p>
        </div>

        <div className={styles.draggablePlayground} data-draggable="bounds">
          {/* Grid overlay */}
          <div className={styles.draggablePlaygroundGrid} />

          {/* Draggable items */}
          {DRAG_ITEMS.map((item, i) => (
            <div
              key={i}
              data-draggable="item"
              className={styles.draggableItem}
              style={{
                background: item.bg,
                left: item.x,
                top: item.y,
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.divider} data-animate="divider" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA — SplitText word reveal
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className={styles.ctaSection} data-animate="cta">
        <h2 className={styles.ctaTitle} data-animate="cta-title">
          Ready to explore?
        </h2>
        <p className={styles.ctaSubtitle} data-animate="cta-sub">
          Let&apos;s bring your next big idea to life with cutting-edge
          technology and stunning interactions.
        </p>
        <Link href="/contact" className={styles.ctaButton} data-animate="cta-btn">
          Get in touch
          <span className={styles.ctaButtonGlow} />
        </Link>
      </section>
    </div>
  );
}
