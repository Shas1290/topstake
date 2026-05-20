"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "Global Clients" },
  { value: 5, suffix: "+", label: "Years of Excellence" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const els = numberRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (els.length === 0) return;

      els.forEach((el, i) => {
        const stat = stats[i];
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate() {
            el.textContent = `${Math.round(proxy.val)}${stat.suffix}`;
          },
        });
      });

      /* Fade-up for each card */
      gsap.from(".stat-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0d0618 100%)",
      }}
    >
      {/* ── Gradient divider line ── */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #6366f1 25%, #a855f7 50%, #ec4899 75%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card flex flex-col items-center text-center"
            >
              <span
                ref={(el) => {
                  numberRefs.current[i] = el;
                }}
                className="font-extrabold leading-none tracking-tight text-white"
                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
              >
                0{stat.suffix}
              </span>

              <span className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
