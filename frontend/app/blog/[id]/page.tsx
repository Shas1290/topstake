"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import styles from "./post.module.css";

// ─── Blog Data ─────────────────────────────────────────────────────────
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  authorAvatar: string;
  content: string[];
}

const POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development in 2026",
    excerpt:
      "Explore the latest trends, from AI-driven development to the evolution of edge computing and what it means for modern applications.",
    category: "Technology",
    date: "May 20, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
    author: "Shashank Gupta",
    authorAvatar: "SG",
    content: [
      "The web development landscape in 2026 has undergone a remarkable transformation. With the rise of AI-powered development tools, edge computing, and advanced rendering strategies, building for the web has never been more exciting — or more complex.",
      "One of the most significant shifts we've seen is the move towards AI-driven development workflows. Tools like intelligent code assistants are now capable of understanding entire codebases, suggesting architectural improvements, and even generating production-ready components from natural language descriptions. This has dramatically reduced the time from concept to deployment.",
      "Edge computing has matured significantly, with platforms now offering sub-10ms response times globally. This means that server-side rendering, API calls, and even database queries can happen at the edge, closer to your users than ever before. The result? Applications that feel instantaneous, regardless of where your users are located.",
      "The component ecosystem has also evolved. We're seeing a convergence of design systems and code, where designers and developers work in the same medium. Tools that generate accessible, performant components from design files have become the norm, not the exception.",
      "WebAssembly continues to push the boundaries of what's possible in the browser. From running machine learning models client-side to powering complex 3D visualizations, WASM is enabling experiences that were previously only possible in native applications.",
      "Looking ahead, the trend is clear: the line between web and native applications is disappearing. Progressive Web Apps with full hardware access, real-time collaboration features built on CRDTs, and AI-native interfaces are shaping the next chapter of the web. The question is no longer 'can we build this on the web?' but rather 'how fast can we ship it?'",
    ],
  },
  {
    id: 2,
    title: "Mastering Micro-Animations in React",
    excerpt:
      "How to use subtle animations to create premium, engaging user experiences that delight your users without overwhelming them.",
    category: "Design",
    date: "May 18, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop",
    author: "Shashank Gupta",
    authorAvatar: "SG",
    content: [
      "Micro-animations are the secret weapon of premium user interfaces. They're the subtle transitions, hover effects, and feedback loops that transform a functional application into a delightful experience. In React, mastering these animations requires understanding both the technical tools and the design principles behind them.",
      "The key principle of effective micro-animations is purpose. Every animation should serve a function: guiding attention, providing feedback, or maintaining spatial context. A button that subtly scales on press tells the user 'I heard you.' A card that smoothly expands into a detail view maintains the user's mental model of the interface.",
      "In React, we have several powerful tools at our disposal. Framer Motion provides a declarative API that makes complex animations surprisingly simple. GSAP offers unmatched performance for timeline-based animations. And CSS transitions, when used thoughtfully, can handle most micro-interactions with zero JavaScript overhead.",
      "One pattern I've found particularly effective is the 'spring' animation model. Unlike linear or eased animations, spring physics create movement that feels natural and alive. A modal that bounces slightly when it appears, or a toggle that overshoots before settling — these tiny details signal quality and care.",
      "Performance is critical. Animations that cause layout shifts or trigger expensive repaints will do more harm than good. Stick to animating `transform` and `opacity` whenever possible — these properties can be handled entirely by the GPU, ensuring buttery-smooth 60fps performance even on mobile devices.",
      "The best micro-animations are the ones users don't consciously notice. They simply make the experience feel 'right.' This is achieved through careful timing (200-400ms for most transitions), appropriate easing curves, and restraint. Not every element needs to animate — save the motion for moments that truly matter.",
    ],
  },
  {
    id: 3,
    title: "Architecting Scalable Next.js Applications",
    excerpt:
      "A comprehensive guide to structuring your Next.js App Router projects for maximum performance and maintainability.",
    category: "Engineering",
    date: "May 12, 2026",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    author: "Shashank Gupta",
    authorAvatar: "SG",
    content: [
      "Building a Next.js application is easy. Building one that scales — in terms of codebase size, team collaboration, and production performance — requires deliberate architectural decisions from day one. In this guide, we'll explore patterns that have proven effective in large-scale Next.js App Router projects.",
      "The foundation of a scalable Next.js architecture is a clear separation between server and client code. The App Router's default of Server Components is a powerful paradigm shift. Reserve 'use client' for components that genuinely need interactivity — forms, modals, and dynamic UI elements. Everything else should leverage the server for data fetching and rendering.",
      "Feature-based directory structure outperforms type-based organization at scale. Instead of grouping all components, hooks, and utilities separately, co-locate related files by feature. A 'checkout' feature should contain its own components, hooks, types, and tests in one directory. This approach reduces cognitive load and makes code ownership clear.",
      "Data fetching patterns deserve special attention. Avoid prop drilling by fetching data as close to where it's needed as possible. Server Components can fetch data directly, eliminating the need for client-side state management in many cases. For client-side state, prefer lightweight solutions like Zustand over heavier alternatives.",
      "Caching and revalidation strategies can make or break your application's performance. Next.js provides multiple layers of caching — request deduplication, data cache, and full route cache. Understanding when to use `revalidatePath`, `revalidateTag`, or time-based revalidation is essential for balancing freshness with performance.",
      "Finally, invest in your build pipeline early. Set up path aliases, configure ESLint with strict rules, implement Husky for pre-commit hooks, and create a comprehensive testing strategy that covers unit tests (Vitest), integration tests (Testing Library), and E2E tests (Playwright). These investments compound over time and prevent technical debt from accumulating.",
    ],
  },
  {
    id: 4,
    title: "Glassmorphism: A Deep Dive",
    excerpt:
      "Understanding the principles of frosted glass aesthetics in UI design and how to implement them perfectly with modern CSS.",
    category: "Design",
    date: "May 05, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop",
    author: "Shashank Gupta",
    authorAvatar: "SG",
    content: [
      "Glassmorphism has evolved from a trendy buzzword into a mature design language. Rooted in depth, transparency, and light, it creates interfaces that feel layered and tangible. But implementing it well requires more than just slapping a `backdrop-filter: blur()` on a div.",
      "The core visual elements of glassmorphism are transparency, blur, and subtle borders. The background should be semi-transparent (typically 10-30% opacity) with a backdrop blur between 10-20px. A thin, light border (1px at 10-20% white opacity) creates the edge-catching effect of real glass.",
      "Color plays a crucial role. Glassmorphic elements work best against colorful or gradient backgrounds that bleed through the frosted layer. A glass card floating over a dark background with vibrant accent blobs creates depth and visual interest that flat design simply cannot achieve.",
      "Accessibility is a real concern with glassmorphism. Text rendered over semi-transparent backgrounds can suffer from poor contrast ratios. The solution is layering: use a slightly more opaque background for content areas, or add a subtle dark overlay behind text. Always test your contrast ratios against WCAG guidelines.",
      "Performance considerations are important too. `backdrop-filter` can be expensive on lower-end devices. Use `will-change: transform` to hint to the browser, and consider providing a solid-color fallback for users who prefer reduced motion or transparency. The `@supports` rule lets you progressively enhance with glassmorphism.",
      "When done right, glassmorphism creates a sense of hierarchy and elegance that enhances the user experience. The key is subtlety — the best glass effects are the ones that create atmosphere without drawing attention to themselves.",
    ],
  },
  {
    id: 5,
    title: "Optimizing Core Web Vitals",
    excerpt:
      "Practical strategies to improve your LCP, INP, and CLS scores for better SEO and user retention across your sites.",
    category: "Performance",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    author: "Shashank Gupta",
    authorAvatar: "SG",
    content: [
      "Core Web Vitals have become the definitive benchmark for web performance. Google uses these metrics — Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) — as ranking signals. But beyond SEO, they directly correlate with user satisfaction and business outcomes.",
      "LCP measures how quickly the largest visible element renders. The most impactful optimization is often the simplest: ensure your hero image or primary content block loads fast. Use `priority` (Next.js) or `fetchpriority='high'` on your LCP element, serve images in modern formats (AVIF/WebP), and eliminate render-blocking resources.",
      "INP replaced FID in 2024 and measures responsiveness more comprehensively. It captures the latency of all interactions, not just the first one. The biggest INP killers are long JavaScript tasks that block the main thread. Break up heavy computations with `requestIdleCallback` or `scheduler.yield()`, and defer non-critical JavaScript.",
      "CLS is about visual stability. Nothing frustrates users more than clicking a button only to have the page shift and hit something else. Reserve explicit dimensions for images and embeds, avoid dynamically injecting content above the fold, and use CSS `contain` to isolate layout changes.",
      "Beyond the Big Three, don't neglect Time to First Byte (TTFB). A slow server response delays everything downstream. Use a CDN, implement edge caching, and optimize your server-side rendering pipeline. In Next.js, leverage ISR and streaming to deliver fast initial responses while loading dynamic content progressively.",
      "Monitoring is just as important as optimization. Set up real-user monitoring (RUM) with tools like web-vitals.js to track performance in the field, not just in synthetic lab tests. Your users' devices and network conditions vary wildly — lab scores alone won't tell the full story.",
    ],
  },
  {
    id: 6,
    title: "The Rise of AI Coding Assistants",
    excerpt:
      "How tools like Antigravity are reshaping the way developers write, test, and ship beautiful code in record time.",
    category: "AI",
    date: "Apr 15, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop",
    author: "Shashank Gupta",
    authorAvatar: "SG",
    content: [
      "The emergence of AI coding assistants represents the most significant shift in software development since the introduction of integrated development environments. These tools don't just autocomplete code — they understand context, reason about architecture, and collaborate with developers as genuine partners.",
      "Modern AI assistants like Antigravity go far beyond simple code generation. They can analyze entire codebases, understand the relationships between components, and suggest refactoring patterns that improve maintainability. They catch bugs before they reach production, write tests that cover edge cases developers might miss, and even explain complex code to new team members.",
      "The impact on developer productivity has been staggering. Studies show that developers using AI assistants ship features 40-60% faster, with fewer bugs reaching production. But the real value isn't just speed — it's the democratization of expertise. Junior developers can leverage AI to learn best practices in context, accelerating their growth dramatically.",
      "One of the most exciting developments is the ability of AI assistants to work with natural language specifications. Describing what you want in plain English and receiving production-quality code isn't science fiction anymore. This is particularly powerful for prototyping, where the speed from idea to working implementation has collapsed from days to minutes.",
      "However, AI assistants are tools, not replacements. The developers who thrive are those who use AI to amplify their judgment, not substitute for it. Understanding fundamentals — algorithms, system design, security principles — remains essential. AI helps you move faster, but knowing where to go is still a uniquely human skill.",
      "Looking forward, we'll see AI assistants become even more deeply integrated into the development lifecycle. From automated code review to intelligent deployment strategies, the AI-augmented developer will be the standard, not the exception. The question isn't whether to adopt these tools, but how to use them most effectively.",
    ],
  },
];

// ─── Component ─────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const params = useParams();
  const postId = Number(params.id);
  const post = POSTS.find((p) => p.id === postId);
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const totalHeight = el.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <main className={styles.container}>
        <Navbar />
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>404</h1>
          <p className={styles.notFoundText}>
            This article doesn't exist or may have been moved.
          </p>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={articleRef} className={styles.container}>
      <Navbar />

      {/* Reading Progress Bar */}
      <div
        className={styles.progressBar}
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Background Ambient Orbs */}
      <div className={`${styles.bgBlob} ${styles.blob1}`} />
      <div className={`${styles.bgBlob} ${styles.blob2}`} />

      {/* Hero Section */}
      <header className={styles.hero}>
        <Link href="/blog" className={styles.backBtn}>
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5m7-7-7 7 7 7"
            />
          </svg>
          Back to Blog
        </Link>

        <div className={styles.metaRow}>
          <span className={styles.category}>{post.category}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.date}>{post.date}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.readTime}>{post.readTime}</span>
        </div>

        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.excerpt}>{post.excerpt}</p>

        {/* Author */}
        <div className={styles.authorRow}>
          <div className={styles.authorAvatar}>{post.authorAvatar}</div>
          <div>
            <p className={styles.authorName}>{post.author}</p>
            <p className={styles.authorRole}>Founder, TopStake</p>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className={styles.heroImageWrapper}>
        <img
          src={post.image}
          alt={post.title}
          className={styles.heroImage}
        />
        <div className={styles.heroImageOverlay} />
      </div>

      {/* Article Body */}
      <article className={styles.article}>
        {post.content.map((paragraph, i) => (
          <p key={i} className={styles.paragraph}>
            {i === 0 && (
              <span className={styles.dropCap}>{paragraph.charAt(0)}</span>
            )}
            {i === 0 ? paragraph.slice(1) : paragraph}
          </p>
        ))}
      </article>

      {/* Bottom CTA / Share */}
      <footer className={styles.articleFooter}>
        <div className={styles.dividerLine} />

        <div className={styles.shareSection}>
          <p className={styles.shareLabel}>Enjoyed this article?</p>
          <div className={styles.shareButtons}>
            <button className={styles.shareBtn} aria-label="Share on Twitter">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button className={styles.shareBtn} aria-label="Share on LinkedIn">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
            <button
              className={styles.shareBtn}
              aria-label="Copy link"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
          </div>
        </div>

        <Link href="/blog" className={styles.bottomBack}>
          ← Browse all articles
        </Link>
      </footer>
    </main>
  );
}
