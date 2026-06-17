// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FaWhatsapp, FaChevronDown } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useScrolled } from "../hooks/useScrolled";
import { scrollToSection } from "../hooks/useLenis";

// Two regional WhatsApp numbers — keep in sync with ContactSection.jsx / Footer.jsx
const REGIONS = [
  {
    id: "lk",
    label: "Sri Lanka",
    phoneDisplay: "+94 77 297 5000",
    whatsapp: "94772975000",
    defaultMessage:
      "Hi RightClicks, I'd like to know more about your IT services.",
  },
  {
    id: "ca",
    label: "Canada",
    phoneDisplay: "+1 (250) 885-5678",
    whatsapp: "12508855678",
    defaultMessage:
      "Hi RightClicks, I'd like to know more about your IT services.",
  },
];

function whatsappHref(region) {
  return `https://wa.me/${region.whatsapp}?text=${encodeURIComponent(region.defaultMessage)}`;
}

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Services", id: "services" },
  // { label: "Reviews", id: "reviews" },
  { label: "Contact Us", id: "contact" },
  { label: "Careers", path: "/careers" },
];

// Section ids tracked for scroll-spy (in document order)
const SECTION_IDS = [
  "home",
  "about",
  "why",
  "process",
  "services",
  "reviews",
  "contact",
];

export default function Navbar() {
  const scrolled = useScrolled(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [callMenuOpen, setCallMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const callMenuRef = useRef(null);

  // Close the call dropdown when clicking outside it
  useEffect(() => {
    if (!callMenuOpen) return;
    const handleClick = (e) => {
      if (callMenuRef.current && !callMenuRef.current.contains(e.target)) {
        setCallMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [callMenuOpen]);

  // Scroll-spy — highlight the nav link for the section currently in view
  useEffect(() => {
    if (location.pathname !== "/") return;

    let observer;
    let retryTimeout;
    let cancelled = false;

    const setup = (attempt = 0) => {
      const sections = SECTION_IDS.map((id) =>
        document.getElementById(id),
      ).filter(Boolean);

      // Below-the-fold sections are lazy-loaded; retry until they've mounted
      if (sections.length < SECTION_IDS.length && attempt < 20) {
        retryTimeout = setTimeout(() => setup(attempt + 1), 150);
        return;
      }
      if (sections.length === 0 || cancelled) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-30% 0px -60% 0px",
          threshold: 0,
        },
      );

      sections.forEach((sec) => observer.observe(sec));
    };

    setup();

    return () => {
      cancelled = true;
      clearTimeout(retryTimeout);
      if (observer) observer.disconnect();
    };
  }, [location.pathname]);

  const handleNav = (link) => {
    setMobileOpen(false);

    // Route-based link (e.g. Careers page)
    if (link.path) {
      navigate(link.path);
      return;
    }

    // Section-based link — navigate home first if on another page
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(link.id), 100);
    } else {
      scrollToSection(link.id);
    }
  };

  // Determine if a link should appear "active"
  const isActive = (link) => {
    if (link.path) return location.pathname === link.path;
    if (location.pathname !== "/") return false;
    // "Why Choose Us" and "Process" sections fall under the "About Us" / "Services" nav items visually,
    // but we map them to the nearest nav link for highlighting purposes
    if (
      link.id === "about" &&
      (activeSection === "about" || activeSection === "why")
    )
      return true;
    if (
      link.id === "services" &&
      (activeSection === "services" || activeSection === "process")
    )
      return true;
    return activeSection === link.id;
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark-900/95 backdrop-blur-md border-b border-dark-400/50 shadow-[0_4px_20px_rgba(30,144,255,0.25)]"
            : "bg-transparent"
        }`}
        style={{ height: "72px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav({ id: "home" })}
            className="flex items-center gap-2.5 focus:outline-none group"
          >
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-md">
              <img
                src="/Logo.png"
                alt="RightClicks logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Right<span className="text-brand-blue">Clicks</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link)}
                  className={`relative px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    active ? "text-white" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {/* Hover/active background pill */}
                  <span
                    className={`absolute inset-0 rounded-md transition-all duration-200 ${
                      active
                        ? "bg-brand-blue/15 border border-brand-blue/30"
                        : "bg-transparent border border-transparent hover:bg-white/[0.06] hover:border-white/10"
                    }`}
                  />
                  <span className="relative z-10">{link.label}</span>
                  {/* Active underline indicator */}
                  {active && (
                    <motion.span
                      layoutId="navActiveIndicator"
                      className="absolute left-3.5 right-3.5 -bottom-[1px] h-[2px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(to right, #1E90FF, #4DAAFF)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA button — WhatsApp region picker */}
          <div
            className="hidden lg:flex items-center relative"
            ref={callMenuRef}
          >
            <button
              onClick={() => setCallMenuOpen((v) => !v)}
              className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-light text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-all duration-300 shadow-blue-glow-sm hover:shadow-blue-glow"
            >
              <FaWhatsapp className="text-sm" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-normal opacity-80">
                  Call Us
                </span>
                <span className="text-xs font-bold">WhatsApp</span>
              </div>
              <FaChevronDown
                className={`text-[10px] ml-1 transition-transform duration-200 ${callMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {callMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full right-0 mt-2 w-60 bg-dark-700 border border-dark-400/60 rounded-lg shadow-card overflow-hidden"
                >
                  {REGIONS.map((r) => (
                    <a
                      key={r.id}
                      href={whatsappHref(r)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setCallMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-dark-600 transition-colors duration-150"
                    >
                      <div className="w-8 h-8 rounded-md bg-brand-blue/12 border border-brand-blue/25 flex items-center justify-center text-brand-blue text-sm flex-shrink-0">
                        <FaWhatsapp />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold leading-tight">
                          {r.label}
                        </p>
                        <p className="text-neutral-400 text-xs leading-tight mt-0.5">
                          {r.phoneDisplay}
                        </p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-dark-800/98 backdrop-blur-md border-b border-dark-400/50 lg:hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link)}
                    className={`text-left px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-between ${
                      active
                        ? "text-white bg-brand-blue/15 border border-brand-blue/30"
                        : "text-neutral-200 hover:text-white hover:bg-dark-600 border border-transparent"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    )}
                  </button>
                );
              })}
              <div className="flex flex-col gap-2 mt-2">
                {REGIONS.map((r) => (
                  <a
                    key={r.id}
                    href={whatsappHref(r)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-brand-blue rounded-lg text-white text-sm font-semibold"
                  >
                    <FaWhatsapp className="text-xs" />
                    <span>
                      {r.label}: {r.phoneDisplay}
                    </span>
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
