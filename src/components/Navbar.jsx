// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useScrolled } from "../hooks/useScrolled";
import { scrollToSection } from "../hooks/useLenis";

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
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

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
            <div className="w-8 h-8 rounded-md bg-brand-blue flex items-center justify-center shadow-blue-glow-sm group-hover:shadow-blue-glow transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M2 2h6v6H2zM10 2h6v4h-6zM10 8h6v8h-6zM2 10h6v6H2z"
                  fill="white"
                />
              </svg>
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

          {/* CTA button */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+12816127292"
              className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-light text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-all duration-300 shadow-blue-glow-sm hover:shadow-blue-glow"
            >
              <FaPhone className="text-xs" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-normal opacity-80">
                  Call Us
                </span>
                <span className="text-xs font-bold">(281) 612-7292</span>
              </div>
            </a>
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
              <a
                href="tel:+12816127292"
                className="flex items-center gap-2 mt-2 px-4 py-3 bg-brand-blue rounded-lg text-white text-sm font-semibold"
              >
                <FaPhone className="text-xs" />
                <span>(281) 612-7292</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
