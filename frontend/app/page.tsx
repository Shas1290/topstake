import Navbar from "@/components/Navbar";
import SpotlightReveal from "@/components/SpotlightReveal";
import HorizontalMarquee from "@/components/HorizontalMarquee";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import ParallaxImage from "@/components/ParallaxImage";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      {/* ── Smart Navbar ── */}
      <Navbar />

      {/* ── Hero: Interactive spotlight video reveal ── */}
      <SpotlightReveal />

      {/* ── Scrolling marquee divider ── */}
      <HorizontalMarquee text="TOPSTAKE" direction="left" speed={1.2} />

      {/* ── About TopStake ── */}
      <AboutSection />

      {/* ── Services ── */}
      <ServicesSection />

      {/* ── Scrolling marquee divider (reverse) ── */}
      <HorizontalMarquee text="DESIGN · DEVELOP · DELIVER" direction="right" speed={0.8} />

      {/* ── Stats / Numbers ── */}
      <StatsSection />

      {/* ── Parallax image break ── */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
        alt="Premium Architectural Shot"
        speed={1.5}
      />

      {/* ── Call to Action ── */}
      <CTASection />

    </main>
  );
}