import PlasmaStream, { CreativeInputs } from "./PlasmaStream";
import ConveyorTrack from "./ConveyorTrack";
import TransformationChamber from "./TransformationChamber";
import "./HeroSection.css";

/**
 * HeroSection Component
 * 
 * 2-Tier Composition:
 * - A. Glowing Plasma Stream & Continuous Polished Conveyor.
 * - B. Editorial Headline & Sub-description.
 */
export default function HeroSection() {
  return (
    <section id="hero" className="hero-section" aria-label="Hero Section">
      {/* The Conveyor & Transformation Engine (Main Visual) */}
      <div className="hero-conveyor-wrap">
        {/* Glowing Plasma Stream: Coming from Left to the Middle falling onto the Machine */}
        <PlasmaStream />

        <CreativeInputs />

        {/* Continuous Horizontal Conveyor: Emerging on Right */}
        <ConveyorTrack />

        {/* Center Soft-Aesthetic Transformation Chamber */}
        <TransformationChamber />
      </div>

      {/* Tier C: Editorial Headline & Sub-description */}
      <div className="hero-editorial">
        <div className="hero-editorial__container">
          {/* Main Headline */}
          <h1 className="hero-editorial__headline">
            From great ideas to aesthetic, high-performance digital solution.
          </h1>

          {/* Sub-description */}
          {/* <p className="hero-editorial__description">
            Bespoke web architecture, sub-second loading speeds, and unforgettable editorial motion design engineered to establish category leadership.
          </p> */}
        </div>
      </div>
    </section>
  );
}
