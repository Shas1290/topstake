"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import styles from "./blog.module.css";
import Navbar from "@/components/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ─── Data ──────────────────────────────────────────────────────────
const POSTS = [
  {
    id: 1,
    title: "The Future of Web Development in 2026",
    excerpt: "Explore the latest trends, from AI-driven development to the evolution of edge computing and what it means for modern applications.",
    category: "Technology",
    date: "May 20, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Mastering Micro-Animations in React",
    excerpt: "How to use subtle animations to create premium, engaging user experiences that delight your users without overwhelming them.",
    category: "Design",
    date: "May 18, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Architecting Scalable Next.js Applications",
    excerpt: "A comprehensive guide to structuring your Next.js App Router projects for maximum performance and maintainability.",
    category: "Engineering",
    date: "May 12, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Glassmorphism: A Deep Dive",
    excerpt: "Understanding the principles of frosted glass aesthetics in UI design and how to implement them perfectly with modern CSS.",
    category: "Design",
    date: "May 05, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Optimizing Core Web Vitals",
    excerpt: "Practical strategies to improve your LCP, INP, and CLS scores for better SEO and user retention across your sites.",
    category: "Performance",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "The Rise of AI Coding Assistants",
    excerpt: "How tools like Antigravity are reshaping the way developers write, test, and ship beautiful code in record time.",
    category: "AI",
    date: "Apr 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
  },
];

const CATEGORIES = ["All", "Technology", "Design", "Engineering", "Performance", "AI"];

export default function BlogClient() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = POSTS.filter(
    (post) => activeCategory === "All" || post.category === activeCategory
  );

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      /* ── Background Parallax ── */
      const blobs = container.querySelectorAll("[data-animate='blob']");
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          y: (i % 2 === 0 ? -1 : 1) * 200,
          x: (i % 2 === 0 ? 1 : -1) * 100,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      /* ── Hero Animation ── */
      const title = container.querySelector("[data-animate='title']") as HTMLElement;
      const subtitle = container.querySelector("[data-animate='subtitle']") as HTMLElement;
      const filters = container.querySelector("[data-animate='filters']") as HTMLElement;

      if (title && subtitle) {
        const titleSplit = SplitText.create(title, { type: "chars" });
        const subSplit = SplitText.create(subtitle, { type: "words" });

        const tl = gsap.timeline();

        // Title chars animate in with 3D rotation
        tl.fromTo(
          titleSplit.chars,
          { opacity: 0, y: 80, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.7)",
            delay: 0.2,
          }
        );

        // Subtitle words blur and fade in
        tl.fromTo(
          subSplit.words,
          { opacity: 0, y: 20, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.02,
            ease: "power3.out",
          },
          "-=0.4"
        );

        // Filters fade in
        if (filters) {
          tl.fromTo(
            filters.children,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }
      }

      /* ── Cards Scroll Stagger ── */
      const cards = container.querySelectorAll("[data-animate='card']");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [activeCategory] } // Re-run animation when category changes
  );

  return (
    <main ref={containerRef} className={styles.container}>
      <Navbar />

      {/* Background Ambient Orbs */}
      <div className={`${styles.bgBlob} ${styles.blob1}`} data-animate="blob" />
      <div className={`${styles.bgBlob} ${styles.blob2}`} data-animate="blob" />
      <div className={`${styles.bgBlob} ${styles.blob3}`} data-animate="blob" />

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle} data-animate="title">
          Insights &amp; Ideas.
        </h1>
        <p className={styles.heroSubtitle} data-animate="subtitle">
          Discover the latest thinking on web development, modern design systems, and artificial intelligence from the TopStake team.
        </p>

        {/* Category Filters */}
        <div className={styles.filters} data-animate="filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${
                activeCategory === cat ? styles.filterBtnActive : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className={styles.grid}>
        {filteredPosts.map((post, index) => {
          // Make the first post featured
          const isFeatured = index === 0;

          return (
            <Link
              href={`/blog/${post.id}`}
              key={post.id}
              data-animate="card"
              className={`${styles.card} ${isFeatured ? styles.cardFeatured : ""}`}
            >
              <div className={styles.cardGlow} />
              
              <div className={styles.imageContainer}>
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.cardImage}
                  loading={isFeatured ? "eager" : "lazy"}
                />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.categoryWrapper}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.date}>{post.date}</span>
                </div>
                
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>

                <div className={styles.cardFooter}>
                  <span className={styles.readTime}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {post.readTime}
                  </span>
                  <span className={styles.readMore}>
                    Read Article <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
