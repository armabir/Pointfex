import { useState, useEffect, useRef } from "react";
import { useContactModal } from "../../context/ContactModalContext";

/**
 * Navigation Items matching the exact sections of the website:
 * - Home: Conveyor Transformation Chamber & Editorial Header (#hero)
 * - Services: Interlocking bespoke service cards (#services)
 * - Work: Pinned horizontal portfolio showcase (#selected-projects)
 * - Pricing: Transparent asymmetric folder-tab cards (#pricing)
 * - Contact: Interactive particle text matrix & footer form (#contact)
 */
const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "Services", id: "services" },
  { label: "Work", id: "selected-projects" },
  { label: "Pricing", id: "pricing", hasDot: true },
  { label: "Contact", id: "contact" },
];

/**
 * Navbar Component (Floating Glass Island)
 * 
 * Features:
 * - Floating glassmorphic island capsule with 50px backdrop-blur & 1px specular rim.
 * - Left: Official Pointfex brand mark & typography.
 * - Center: Real website section navigation links with tactile glass hover & active scroll spy.
 * - Right: High-contrast white "Let's Talk!" CTA pill button.
 * - Mobile: Responsive hamburger toggle with animated icon and sliding glass drawer.
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { openContactModal } = useContactModal();

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 961px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setMobileOpen(false);
    };
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setMobileOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mobileOpen]);

  // Scroll spy to highlight the current section as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      // 1. Very top of page -> Home
      if (window.scrollY < 180) {
        setActiveSection("hero");
        return;
      }

      // 2. Near bottom of page -> Contact
      const scrollHeight = document.documentElement.scrollHeight;
      if (window.innerHeight + window.scrollY >= scrollHeight - 80) {
        setActiveSection("contact");
        return;
      }

      // 3. Focal point in the upper-middle third of the viewport
      const focalPoint = window.scrollY + window.innerHeight * 0.35;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (focalPoint >= top) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    if (!id || id === "#" || id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("hero");
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <header ref={headerRef} className="header-section">
      <div className="navbar-container">
        <div className="na-outer-border">
          <div className="nav-inner-wrap">
            <div className="nav-inner">
              {/* Brand Logo Link */}
              <a
                href="#"
                onClick={(e) => scrollTo(e, "#")}
                className="brand-logo-link"
                aria-label="Pointfex Home"
              >
                <img
                  src="/logo.png"
                  alt="Pointfex Logo"
                  className="brand-logo-img"
                />
                <span className="brand-logo-text">POINTFEX</span>
              </a>

              {/* Desktop Navigation Links */}
              <nav className="nav-menu-2" aria-label="Main Navigation">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollTo(e, item.id)}
                      className={`nav-link-2 ${isActive ? "is-active" : ""} ${
                        item.hasDot ? "nav-link-2--pricing" : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.hasDot && (
                        <span className="pricing-logo" aria-hidden="true" />
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Desktop CTA Button */}
              <div className="nav-button-wrap desktop-only">
                <button
                  type="button"
                  onClick={() => openContactModal()}
                  className="button-03"
                  aria-label="Let's Talk"
                >
                  <div className="button-text-wrapper">
                    <div className="button-text-wrap">
                      <span className="paragraph-02-m">Let&apos;s Talk!</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                className="menu-button-2"
                ref={menuButtonRef}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                <div className={`hamburger ${mobileOpen ? "is-open" : ""}`}>
                  <span className="hamburger-line-top" />
                  <span className="hamburger-line-middle" />
                  <span className="hamburger-line-bottom" />
                </div>
              </button>
            </div>

            {/* Mobile Navigation Drawer */}
            <nav
              id="mobile-navigation"
              className={`mobile-nav-drawer ${mobileOpen ? "is-open" : ""}`}
              aria-label="Mobile navigation"
              inert={!mobileOpen}
              data-lenis-prevent
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollTo(e, item.id)}
                    className={`mobile-nav-link ${isActive ? "is-active" : ""}`}
                  >
                    <span>{item.label}</span>
                    {item.hasDot && (
                      <span className="pricing-logo" aria-hidden="true" />
                    )}
                  </a>
                );
              })}
              <div className="mobile-nav-cta">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openContactModal();
                  }}
                  className="button-03"
                  style={{ width: "100%" }}
                >
                  <div className="button-text-wrapper">
                    <span className="paragraph-02-m">Let&apos;s Talk!</span>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
