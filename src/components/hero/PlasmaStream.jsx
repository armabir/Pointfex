import React, { useId } from "react";

/**
 * PlasmaStream Component
 * 
 * Perfect plasma bar adapted directly from tuki-ai-landing,
 * horizontally flowing from left to right onto the central Transformation Chamber.
 * 
 * Structure:
 * 1. Deep atmospheric background ambient bloom (stable, non-breathing)
 * 2. Horizontal Light Beam Group:
 *    - Deep violet wide atmospheric wash (p-layer-deep-bloom)
 *    - Soft electric blue medium bloom (p-layer-mid-bloom)
 *    - Saturated electric blue / icy halo (p-layer-halo)
 *    - Permanent razor-sharp white-blue central core (p-layer-core)
 *    - Continuous Linear Rightward-Flowing Energy Stream System (fast, mid, slow tracks)
 *    - Soft atmospheric backing bloom for the flare (plasma-flare-aura)
 *    - Flared curved trumpet pedestal SVGs (outer, inner, core) where beam meets the machine
 * 3. Smooth, Blended Intersection Transition at the Machine Edge:
 *    - Vertical border luminous highlight (plasma-rim-border-blend)
 *    - Subtle diffuse junction glow (plasma-rim-diffuse-glow)
 *    - Continuous Up-and-Down energy dispersion along the machine border (p-channel-up, p-channel-down)
 */
export default function PlasmaStream() {
  const uid = useId();

  return (
    <div className="plasma-beam-track" aria-hidden="true">
      {/* 1. Deep atmospheric background ambient bloom (stable, non-breathing) */}
      <div className="plasma-ambient-bg" />

      {/* 2. Horizontal Light Beam Group (starts at left edge, flows to machine border) */}
      <div className="plasma-beam-group">
        {/* Deep violet wide atmosphere column */}
        <div className="p-layer p-layer-deep-bloom" />
        {/* Soft electric blue medium bloom */}
        <div className="p-layer p-layer-mid-bloom" />
        {/* Saturated electric blue halo */}
        <div className="p-layer p-layer-halo" />

        {/* Permanent luminous razor-sharp white-blue central core */}
        <div className="p-layer p-layer-core" />

        {/* Continuous Linear Rightward-Flowing Energy Stream System */}
        <div className="p-flow-container">
          {/* Primary stream: fast, sharp icy-white core highlights */}
          <div className="p-stream-track p-stream-fast" />
          {/* Secondary stream: medium electric-blue plasma packets */}
          <div className="p-stream-track p-stream-mid" />
          {/* Tertiary stream: soft luminous envelopes for organic depth */}
          <div className="p-stream-track p-stream-slow" />
        </div>

        {/* Soft atmospheric backing bloom for the flare */}
        <div className="plasma-flare-aura" />

        {/* Flared curved pedestal where the horizontal beam meets the machine frame */}
        <div className="plasma-curved-pedestal">
          {/* Outer Pedestal Flare */}
          <svg
            className="pedestal-flare-outer"
            viewBox="0 0 60 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`pedestalOuterGrad-${uid}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6555FF" stopOpacity="0" />
                <stop offset="35%" stopColor="#6555FF" stopOpacity="0.45" />
                <stop offset="75%" stopColor="#7E72FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#B2C2FF" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <path
              d="M 0 48 C 26 48 50 22 60 0 L 60 100 C 50 78 26 52 0 52 Z"
              fill={`url(#pedestalOuterGrad-${uid})`}
            />
          </svg>

          {/* Inner Pedestal Flare */}
          <svg
            className="pedestal-flare-inner"
            viewBox="0 0 60 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`pedestalInnerGrad-${uid}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#DCE5FF" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#B2C2FF" stopOpacity="0.75" />
                <stop offset="85%" stopColor="#EAF0FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M 0 49 C 30 49 52 30 60 14 L 60 86 C 52 70 30 51 0 51 Z"
              fill={`url(#pedestalInnerGrad-${uid})`}
            />
          </svg>

          {/* Core Specular Flare */}
          <svg
            className="pedestal-flare-core"
            viewBox="0 0 60 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`pedestalCoreGrad-${uid}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M 0 49.2 C 34 49.2 54 38 60 28 L 60 72 C 54 62 34 50.8 0 50.8 Z"
              fill={`url(#pedestalCoreGrad-${uid})`}
            />
          </svg>
        </div>
      </div>

      {/* 3. Smooth, High-Impact Intersection Transition at the Machine Edge */}
      <div className="plasma-rim-junction">
        {/* High-impact concentrated focal point bloom */}
        <div className="plasma-rim-impact-core" />
        {/* Vertical border luminous highlight on the machine's left edge */}
        <div className="plasma-rim-border-blend" />
        {/* Subtle diffuse optical scattering at the contact point */}
        <div className="plasma-rim-diffuse-glow" />

        {/* Continuous Up-and-Down Energy Dispersion along the machine border */}
        <div className="plasma-rim-dispersion">
          {/* Upward dispersing energy channel */}
          <div className="p-channel-up">
            <div className="p-dispersion-track p-track-up-1" />
            <div className="p-dispersion-track p-track-up-2" />
          </div>

          {/* Downward dispersing energy channel */}
          <div className="p-channel-down">
            <div className="p-dispersion-track p-track-down-1" />
            <div className="p-dispersion-track p-track-down-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Keep the inputs in their own layout area so they can wrap above the machine.
export function CreativeInputs() {
  return (
    <div className="plasma-idea-cards" aria-hidden="true">
      {/* Cards floating above the plasma beam */}
      <div className="plasma-idea-card plasma-idea-card--idea">
        <span className="plasma-idea-card__spark">✦</span>
        <span className="plasma-idea-card__text">Idea</span>
        <span className="plasma-idea-card__arrow">→</span>
      </div>

      <div className="plasma-idea-card plasma-idea-card--vision">
        <span className="plasma-idea-card__spark">✦</span>
        <span className="plasma-idea-card__text">Vision</span>
        <span className="plasma-idea-card__arrow">→</span>
      </div>

      <div className="plasma-idea-card plasma-idea-card--concept">
        <span className="plasma-idea-card__spark">✦</span>
        <span className="plasma-idea-card__text">Concept</span>
        <span className="plasma-idea-card__arrow">→</span>
      </div>

      {/* Cards floating below the plasma beam */}
      <div className="plasma-idea-card plasma-idea-card--inspiration">
        <span className="plasma-idea-card__spark">✦</span>
        <span className="plasma-idea-card__text">Inspiration</span>
        <span className="plasma-idea-card__arrow">→</span>
      </div>

      <div className="plasma-idea-card plasma-idea-card--strategy">
        <span className="plasma-idea-card__spark">✦</span>
        <span className="plasma-idea-card__text">Strategy</span>
        <span className="plasma-idea-card__arrow">→</span>
      </div>
    </div>
  );
}
