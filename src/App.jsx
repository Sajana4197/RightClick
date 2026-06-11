// src/App.jsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import { useLenis } from "./hooks/useLenis";

function AppContent() {
  useLenis();

  useEffect(() => {
    if (window.Cursorly) {
      const cursor = window.Cursorly.init({
        cursor: 0,
        effect: { name: "trail", color: "rainbow" },
      });
    }
  }, []);

  return (
    <>
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
          <Route path="/" element={<Home />} />
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
