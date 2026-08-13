// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";
import { useLenis, scrollToTop } from "./hooks/useLenis";
import { getLangFromPath } from "./hooks/useLangRoute";

function AppContent() {
  useLenis();
  const location = useLocation();
  const { i18n } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.Cursorly) {
      window.Cursorly.init({
        cursor: 16,
        effect: { name: "trail", color: "rainbow" },
      });
    }
  }, []);

  // Recalculate all ScrollTrigger positions once lazy sections have mounted.
  // Re-runs on every route change (not just the first mount) because switching
  // language ("/" <-> "/fr") unmounts/remounts Home's lazy sections with
  // differently-sized translated text, which shifts page layout and would
  // otherwise leave stale (pre-refresh) trigger positions like the pinned
  // ServicesSection stack until a full page reload.
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Keep i18next + <html lang> in sync with the active route's language tree
  // ("/fr..." => French, everything else => English).
  useEffect(() => {
    const lang = getLangFromPath(location.pathname);
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [location.pathname, i18n]);

  // Scroll to top + refresh ScrollTrigger on route change
  useEffect(() => {
    if (location.state?.scrollTop) {
      setTimeout(
        () => {
          scrollToTop(true);
        },

        200,
      );
    } else {
      scrollToTop(false);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Loading screen — only on first visit, not on route changes */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Skip link for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand-blue focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar />

      <div id="main-content">
        <Routes>
          {/* English tree — unprefixed, preserves existing SEO/indexing */}
          <Route path="/" element={<Home />} />
          <Route
            path="/careers"
            element={
              <>
                <Careers />
                <Footer />
              </>
            }
          />

          {/* French tree — mirrors the English routes under /fr */}
          <Route path="/fr" element={<Home />} />
          <Route
            path="/fr/careers"
            element={
              <>
                <Careers />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
