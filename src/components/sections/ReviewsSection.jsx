// src/components/sections/ReviewsSection.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
} from "../../animations/variants";

// Names are left untranslated (proper nouns); quote/role come from translations.
const REVIEWS_META = [
  { id: "jason", rating: 5 },
  { id: "melissa", rating: 5 },
  { id: "david", rating: 5 },
  { id: "angela", rating: 5 },
];

// Per-depth visual styles — depth 0 = front (active), higher = further back
const DEPTH_STYLES = [
  { x: 0, y: 0, scale: 1, blur: 0, opacity: 1, bg: "rgba(255,255,255,1)" },
  {
    x: 28,
    y: -50,
    scale: 0.97,
    blur: 0,
    opacity: 1,
    bg: "rgba(255,255,255,1)",
  },
  {
    x: 50,
    y: -98,
    scale: 0.94,
    blur: 1.5,
    opacity: 0.85,
    bg: "rgba(255,255,255,0.9)",
  },
  {
    x: 70,
    y: -142,
    scale: 0.91,
    blur: 3,
    opacity: 0.6,
    bg: "rgba(255,255,255,0.75)",
  },
];

// Smaller offsets on narrow screens so cards don't spill outside the viewport
const DEPTH_STYLES_MOBILE = [
  { x: 0, y: 0, scale: 1, blur: 0, opacity: 1, bg: "rgba(255,255,255,1)" },
  {
    x: 14,
    y: -28,
    scale: 0.97,
    blur: 0,
    opacity: 1,
    bg: "rgba(255,255,255,1)",
  },
  {
    x: 26,
    y: -52,
    scale: 0.94,
    blur: 1.5,
    opacity: 0.85,
    bg: "rgba(255,255,255,0.9)",
  },
  {
    x: 36,
    y: -74,
    scale: 0.91,
    blur: 3,
    opacity: 0.6,
    bg: "rgba(255,255,255,0.75)",
  },
];

const AUTO_ROTATE_INTERVAL = 3500;

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);
  return isMobile;
}

export default function ReviewsSection() {
  const { t } = useTranslation();
  const REVIEWS = REVIEWS_META.map((r) => ({
    ...r,
    quote: t(`reviews.items.${r.id}.quote`),
    name: t(`reviews.items.${r.id}.name`),
    role: t(`reviews.items.${r.id}.role`),
  }));

  // order[0] is the front-most (active) card index into REVIEWS
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [paused, setPaused] = useState(false);
  const isMobile = useIsMobile(1024);
  const depthStyles = isMobile ? DEPTH_STYLES_MOBILE : DEPTH_STYLES;

  // Auto-rotate: front card moves to back, next becomes front
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  const bringToFront = (reviewIndex) => {
    setOrder((prev) => {
      if (prev[0] === reviewIndex) return prev;
      const rest = prev.filter((i) => i !== reviewIndex);
      return [reviewIndex, ...rest];
    });
  };

  return (
    <section
      id="reviews"
      className="section-py bg-dark-800 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div
          className="absolute bottom-0 right-0 w-[50%] h-[50%] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 100% 100%, rgba(30,144,255,0.14) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="eyebrow mb-3">
            {t("reviews.eyebrow")}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="section-heading">
            {t("reviews.headline")}{" "}
            <span className="text-gradient-blue">
              {t("reviews.headlineHighlight")}
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Stacked deck */}
          <div
            className="relative mx-auto w-full flex justify-center lg:block"
            style={{ height: isMobile ? 280 : 320, maxWidth: 560 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="relative lg:absolute w-[88%] sm:w-[420px] lg:w-full max-w-[480px] lg:max-w-[480px] lg:left-0"
              style={{
                marginTop: isMobile ? 70 : 150,
              }}
            >
              {order.map((reviewIdx, depth) => {
                const review = REVIEWS[reviewIdx];
                const style =
                  depthStyles[depth] || depthStyles[depthStyles.length - 1];
                const isFront = depth === 0;

                return (
                  <motion.div
                    key={review.id}
                    onClick={() => bringToFront(reviewIdx)}
                    className="absolute left-0 top-0 w-full rounded-2xl p-5 cursor-pointer"
                    style={{ zIndex: REVIEWS.length - depth }}
                    initial={false}
                    animate={{
                      x: style.x,
                      y: style.y,
                      scale: style.scale,
                      opacity: style.opacity,
                      filter: `blur(${Math.max(style.blur, 0)}px)`,
                      backgroundColor: style.bg,
                      boxShadow: isFront
                        ? "0 20px 50px rgba(0,0,0,0.35)"
                        : "0 10px 30px rgba(0,0,0,0.25)",
                    }}
                    transition={{
                      default: { type: "spring", stiffness: 260, damping: 28 },
                      filter: { type: "tween", duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #1E90FF, #0C1424)",
                        }}
                      >
                        {review.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-dark-900 font-bold text-lg leading-tight truncate">
                          {review.name}
                        </p>
                        <p className="text-neutral-500 text-sm leading-tight mt-1 truncate">
                          {review.role}
                        </p>
                      </div>
                    </div>

                    {/* Extra content only on front card */}
                    <AnimatePresence>
                      {isFront && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, delay: 0.1 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-1 mt-3 mb-2">
                            {Array.from({ length: review.rating }).map(
                              (_, i) => (
                                <FaStar
                                  key={i}
                                  className="text-yellow-400 text-xs"
                                />
                              ),
                            )}
                          </div>
                          <p className="text-neutral-600 text-sm leading-relaxed">
                            {review.quote}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — supporting copy */}
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:pl-8 xl:pl-16"
          >
            <motion.p variants={fadeInUp} className="eyebrow mb-3">
              {t("reviews.sideEyebrow")}
            </motion.p>
            <motion.h3
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-white mb-5 leading-snug"
            >
              {t("reviews.sideHeadline")}{" "}
              <span className="text-gradient-blue">
                {t("reviews.sideHeadlineHighlight")}
              </span>
            </motion.h3>
            <motion.p variants={fadeInUp} className="section-sub mb-4 max-w-md">
              {t("reviews.paragraph")}
            </motion.p>

            {/* Aggregate rating */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 mt-8"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <span className="text-white font-bold text-lg">5.0</span>
              <span className="text-neutral-400 text-sm">
                {t("reviews.ratingSuffix")}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
