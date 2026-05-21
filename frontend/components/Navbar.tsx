"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import VerticalMarquee from "./VerticalMarquee";

// ─── Constants ───────────────────────────────────────────────────────────────
const SCROLL_THRESHOLD = 50; // Ignore micro-scrolls / bounce
const THROTTLE_MS = 100; // Throttle interval for scroll handler

// ─── Nav links config ────────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Navbar(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  // Memoised scroll handler with built-in throttle via rAF + ticking flag
  const handleScroll = useCallback((): void => {
    if (ticking.current) return;

    ticking.current = true;

    setTimeout(() => {
      if (typeof window === "undefined") {
        ticking.current = false;
        return;
      }

      // Clamp to 0 for iOS / macOS bounce-scroll edge case
      const currentScrollY: number = Math.max(0, window.scrollY);
      const delta: number = currentScrollY - lastScrollY.current;

      // Toggle shadow state
      setHasScrolled(currentScrollY > 10);

      // Only act when scroll exceeds the threshold (avoids micro-bounces)
      if (Math.abs(delta) >= SCROLL_THRESHOLD) {
        if (delta > 0 && currentScrollY > SCROLL_THRESHOLD) {
          // Scrolling DOWN past threshold → hide
          setIsVisible(false);
        } else if (delta < 0) {
          // Scrolling UP → show
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
      }

      ticking.current = false;
    }, THROTTLE_MS);
  }, []);

  useEffect(() => {
    // SSR guard
    if (typeof window === "undefined") return;

    // Seed initial position
    lastScrollY.current = Math.max(0, window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      className={[
        // Layout
        "fixed top-0 left-0 w-full z-50",
        // Sizing
        "h-[72px] px-6 md:px-10",
        // Flex
        "flex items-center justify-between",
        // Glass background
        "bg-[rgba(10,10,10,0.72)] backdrop-blur-[18px] backdrop-saturate-[160%]",
        "border-b border-white/[0.06]",
        // Transition
        "transition-transform duration-300 ease-in-out",
        // Visibility toggle
        isVisible ? "translate-y-0" : "-translate-y-full",
        // Shadow when scrolled
        hasScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.45)]" : "",
      ].join(" ")}
    >
      {/* ── Logo ── */}
      <a href="#" className="group flex items-center gap-2.5 no-underline">
        <span
          className={[
            "w-9 h-9 rounded-[10px] grid place-items-center",
            "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
            "text-white text-sm font-extrabold",
            "shadow-[0_0_18px_rgba(99,102,241,0.45)]",
            "transition-all duration-300",
            "group-hover:rotate-[-8deg] group-hover:scale-110",
            "group-hover:shadow-[0_0_26px_rgba(168,85,247,0.6)]",
          ].join(" ")}
        >
          T
        </span>
        <span className="text-white font-bold text-lg tracking-tight">
          TopStake
        </span>
      </a>

      {/* ── Mobile Menu Toggle ── */}
      <button
        className="md:hidden p-2 text-[#a1a5b5] hover:text-white transition-colors ml-auto mr-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* ── Nav Links ── */}
      <ul
        className={[
          "flex flex-col md:flex-row items-center gap-4 md:gap-1 list-none m-0 p-6 md:p-0",
          "absolute md:static top-[72px] left-0 w-full md:w-auto",
          "bg-[rgba(10,10,10,0.95)] md:bg-transparent backdrop-blur-[18px] md:backdrop-blur-none",
          "border-b border-white/[0.06] md:border-none",
          "transition-all duration-300 ease-in-out origin-top",
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 md:scale-y-100 md:opacity-100",
        ].join(" ")}
      >
        {NAV_LINKS.map((link) => (
          <li key={link.href} className="w-full md:w-auto text-center">
            <a
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={[
                "relative inline-block px-4 py-2 rounded-lg w-full md:w-auto",
                "text-base md:text-sm font-medium text-[#a1a5b5] no-underline",
                "transition-colors duration-200",
                "hover:text-white hover:bg-white/[0.04]",
                // Animated underline
                "after:content-[''] after:absolute after:bottom-1 after:left-1/2",
                "after:w-0 after:h-0.5 after:rounded-full",
                "after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500",
                "after:transition-all after:duration-300",
                "hover:after:w-1/2 hover:after:left-1/4",
              ].join(" ")}
            >
              {link.label}
            </a>
          </li>
        ))}

        {/* CTA */}
        <li className="w-full md:w-auto text-center mt-2 md:mt-0 md:ml-2">
          <a
            href="/explore"
            onClick={() => setIsMobileMenuOpen(false)}
            className={[
              "inline-block px-5 py-3 md:py-2 rounded-lg w-[calc(100%-2rem)] md:w-auto",
              "bg-gradient-to-br from-indigo-500 to-purple-500",
              "text-white text-base md:text-sm font-semibold no-underline",
              "shadow-[0_0_20px_rgba(99,102,241,0.3)]",
              "transition-all duration-200",
              "hover:-translate-y-0.5",
              "hover:shadow-[0_6px_28px_rgba(99,102,241,0.5)]",
            ].join(" ")}
          >
            Get Started
          </a>
        </li>
      </ul>
    </nav>
  );
}
