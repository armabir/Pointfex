import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroPanel from "./IntroPanel";
import ProjectCard from "./ProjectCard";
import { showcaseIntro, projectsData } from "../data/projects";
import "./ProjectShowcase.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * ProjectShowcase Component
 * 
 * Section 01 of Pointfex.com: Horizontal Project Showcase.
 * - Framed by cinematic glowing lens-flare beams above and below.
 * - Desktop: Reduced section height with pinned horizontal scrolling.
 * - Mobile/Tablet: Native touch-optimized swipeable row with CSS scroll-snap.
 * - Respects prefers-reduced-motion.
 */
export default function ProjectShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // GSAP MatchMedia for responsive behavior & accessibility
    const mm = gsap.matchMedia();

    // Use native scrolling on small or short screens and for reduced motion.
    mm.add("(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Calculate total horizontal travel distance based on real DOM measurements
      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      // Set up pinned horizontal scroll animation synchronized with Lenis smooth scroll
      const scrollTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none", // Direct linear pacing (eliminates slow crawl at start and end)
        scrollTrigger: {
          trigger: section,
          pin: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.6, // Snappy yet silky sync with Lenis smooth scroll
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Recalculate dimensions when images finish loading
      const handleImageLoad = () => {
        ScrollTrigger.refresh();
      };

      const images = track.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", handleImageLoad, { once: true });
        }
      });

      window.addEventListener("resize", handleImageLoad);

      // Force refresh on next animation frame after layout settles
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        scrollTween.kill();
        images.forEach((img) => img.removeEventListener("load", handleImageLoad));
        window.removeEventListener("resize", handleImageLoad);
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="selected-projects"
      ref={sectionRef}
      className="showcase-section"
      aria-label="Selected Projects Showcase"
    >
      {/* Stage: Horizontally moving track container */}
      <div className="showcase-stage">
        <div ref={trackRef} className="showcase-track">
          {/* Introductory Moving Panel */}
          <IntroPanel intro={showcaseIntro} />

          <div className="showcase-projects" role="region" aria-label="Project gallery">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}

            <div className="showcase-track__end-buffer" aria-hidden="true" />
          </div>
        </div>
      </div>
      <p className="showcase-swipe-hint" aria-hidden="true">Swipe to explore <span>→</span></p>
    </section>
  );
}
