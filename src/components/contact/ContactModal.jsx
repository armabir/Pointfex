import { useState, useEffect, useRef } from "react";
import { useContactModal } from "../../context/ContactModalContext";
import "./ContactModal.css";

const TIERS = [
  {
    id: "starter",
    title: "Starter",
    subtitle: "Basic Cuts & Edits",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: "pro",
    title: "Pro",
    subtitle: "High-Retention Motion",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
      </svg>
    ),
  },
  {
    id: "custom",
    title: "Custom",
    subtitle: "Dedicated Partnership",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
];

export default function ContactModal() {
  const { isOpen, selectedTier, setSelectedTier, closeContactModal } = useContactModal();
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const overlayRef = useRef(null);

  // Close on Escape key press & prevent background scroll
  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const viewport = window.visualViewport;
    let resizeFrame;

    const updateViewport = () => {
      if (!viewport) return;
      overlay.style.setProperty("--contact-viewport-height", `${viewport.height}px`);
      overlay.style.setProperty("--contact-viewport-top", `${viewport.offsetTop}px`);
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (overlay.contains(document.activeElement)) {
          document.activeElement.scrollIntoView({ block: "nearest" });
        }
      });
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeContactModal();
      }
      if (e.key === "Tab") {
        const focusable = [...overlay.querySelectorAll("button, input, textarea, a[href]")]
          .filter((element) => !element.disabled && element.getClientRects().length);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    overlay.querySelector(".contact-modal__close-btn")?.focus({ preventScroll: true });
    updateViewport();
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
      cancelAnimationFrame(resizeFrame);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && !previousFocus.closest("[inert]")) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen, closeContactModal]);

  if (!isOpen) return null;

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    try {
      const formEl = event.target;
      const formData = new FormData(formEl);
      formData.append("access_key", "9d52655e-6fe4-4514-87c5-ce4b49db1c00");
      formData.append("selected_tier", selectedTier.toUpperCase());
      formData.append("subject", `New Pointfex Project Inquiry [${selectedTier.toUpperCase()}]`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult("Success! We will get in touch with you shortly.");
        formEl.reset();
        setTimeout(() => {
          closeContactModal();
          setResult("");
        }, 3000);
      } else {
        setResult(data.message || "Error submitting form. Please try again.");
      }
    } catch {
      setResult("Network error. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="contact-modal-overlay"
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) closeContactModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="contact-modal">
        {/* Top-Right & Bottom-Left Dual Luminous Corner Glows (Like Pricing Cards) */}
        <div className="contact-modal__corner-glows" aria-hidden="true">
          {/* Top-Right Corner: Ambient Halo & Specular Core */}
          <div className="contact-modal__glow-blob contact-modal__glow-blob--tr-ambient" />
          <div className="contact-modal__glow-blob contact-modal__glow-blob--tr-core" />

          {/* Bottom-Left Corner: Ambient Halo & Specular Core */}
          <div className="contact-modal__glow-blob contact-modal__glow-blob--bl-ambient" />
          <div className="contact-modal__glow-blob contact-modal__glow-blob--bl-core" />
        </div>

        {/* Modal Header */}
        <div className="contact-modal__header">
          <div>
            <h2 id="contact-modal-title" className="contact-modal__title">
              Start a Project
            </h2>
            <p className="contact-modal__subtitle">
              Tell me about your vision and let&apos;s make it happen.
            </p>
          </div>
          <button
            type="button"
            className="contact-modal__close-btn"
            onClick={closeContactModal}
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Select Tier Section */}
        <div className="contact-modal__tier-section">
          <div className="contact-modal__tier-heading">
            <svg className="contact-modal__tier-heading-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span>Select Tier</span>
          </div>

          <div className="contact-modal__tier-grid">
            {TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  className={`contact-modal__tier-card ${isSelected ? "is-selected" : ""}`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {isSelected && <span className="contact-modal__tier-dot" />}
                  <div className="contact-modal__tier-icon-wrap">
                    {tier.icon}
                  </div>
                  <div className="contact-modal__tier-title">{tier.title}</div>
                  <div className="contact-modal__tier-sub">{tier.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Web3Forms Contact Form */}
        <form className="contact-modal__form" onSubmit={onSubmit}>
          {/* Row 1: Name and Email */}
          <div className="contact-modal__row">
            <div className="contact-modal__field">
              <label htmlFor="modal-name" className="contact-modal__label">
                Full Name <span className="contact-modal__asterisk">*</span>
              </label>
              <div className="contact-modal__input-wrap">
                <span className="contact-modal__input-icon" aria-hidden="true">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="modal-name"
                  type="text"
                  name="name"
                  required
                  placeholder="ARM Abir"
                  className="contact-modal__input"
                />
              </div>
            </div>

            <div className="contact-modal__field">
              <label htmlFor="modal-email" className="contact-modal__label">
                Email <span className="contact-modal__asterisk">*</span>
              </label>
              <div className="contact-modal__input-wrap">
                <span className="contact-modal__input-icon" aria-hidden="true">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="modal-email"
                  type="email"
                  name="email"
                  required
                  placeholder="hello@armabir.com"
                  className="contact-modal__input"
                />
              </div>
            </div>
          </div>

          {/* Row 2: WhatsApp / Phone */}
          <div className="contact-modal__field">
            <label htmlFor="modal-phone" className="contact-modal__label">
              WhatsApp / Phone
            </label>
            <div className="contact-modal__input-wrap">
              <span className="contact-modal__input-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <input
                id="modal-phone"
                type="tel"
                name="phone"
                placeholder="+880 1234 567890"
                className="contact-modal__input"
              />
            </div>
          </div>

          {/* Row 3: Message & Vision */}
          <div className="contact-modal__field">
            <label htmlFor="modal-message" className="contact-modal__label">
              Message & Vision <span className="contact-modal__asterisk">*</span>
            </label>
            <div className="contact-modal__input-wrap contact-modal__input-wrap--textarea">
              <span className="contact-modal__input-icon contact-modal__input-icon--textarea" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <textarea
                id="modal-message"
                name="message"
                required
                rows={3}
                placeholder="Tell me about your project, timeline, or requirements..."
                className="contact-modal__textarea"
              />
            </div>
          </div>

          {/* Form Actions & Status */}
          <div className="contact-modal__footer">
            {result && (
              <p
                className={`contact-modal__status ${
                  result.startsWith("Success")
                    ? "contact-modal__status--success"
                    : "contact-modal__status--error"
                }`}
              >
                {result}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-modal__submit-btn"
            >
              <span>{isSubmitting ? "Sending..." : "Send Inquiry"}</span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
