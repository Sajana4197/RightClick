// src/components/sections/ReviewsSection.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
} from "../../animations/variants";

const REVIEWS = [
  {
    quote:
      "RightClicks has been instrumental in keeping our systems secure and our team productive. Their response time is unmatched.",
    name: "Jason M.",
    role: "IT Director, Healthcare",
    rating: 5,
  },
  {
    quote:
      "Their proactive approach to IT management has saved us thousands in downtime and unexpected costs. Highly recommend!",
    name: "Melissa R.",
    role: "Operations Manager",
    rating: 5,
  },
  {
    quote:
      "RightClicks feels like an extension of our team. Reliable, knowledgeable, and always one step ahead.",
    name: "David T.",
    role: "CEO, Manufacturing",
    rating: 5,
  },
  {
    quote:
      "Switching to RightClicks was the best IT decision we made. Our infrastructure has never been more stable or secure.",
    name: "Angela P.",
    role: "Finance Director, Retail",
    rating: 5,
  },
];

// Per-depth visual styles — depth 0 = front (active), higher = further back
const DEPTH_STYLES = [
  { x: 0, y: 0, scale: 1, blur: 0, opacity: 1, bg: "rgba(255,255,255,1)" },
  {
    x: 36,
    y: -50,
    scale: 0.97,
    blur: 0,
    opacity: 1,
    bg: "rgba(255,255,255,1)",
  },
  {
    x: 64,
    y: -98,
    scale: 0.94,
    blur: 1.5,
    opacity: 0.85,
    bg: "rgba(255,255,255,0.9)",
  },
  {
    x: 88,
    y: -142,
    scale: 0.91,
    blur: 3,
    opacity: 0.6,
    bg: "rgba(255,255,255,0.75)",
  },
];

const AUTO_ROTATE_INTERVAL = 3500;

export default function ReviewsSection() {
  // order[0] is the front-most (active) card index into REVIEWS
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [paused, setPaused] = useState(false);

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
            Reviews
          </motion.p>
          <motion.h2 variants={fadeInUp} className="section-heading">
            Real Partners. Real{" "}
            <span className="text-gradient-blue">Results.</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Stacked deck */}
          <div
            className="relative mx-auto w-full"
            style={{ height: 360, maxWidth: 560 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="absolute"
              style={{
                left: "30%",
                top: "45%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                maxWidth: 560,
              }}
            >
              {order.map((reviewIdx, depth) => {
                const review = REVIEWS[reviewIdx];
                const style =
                  DEPTH_STYLES[depth] || DEPTH_STYLES[DEPTH_STYLES.length - 1];
                const isFront = depth === 0;

                return (
                  <motion.div
                    key={review.name}
                    onClick={() => bringToFront(reviewIdx)}
                    className="absolute left-0 top-0 w-full rounded-2xl p-5 cursor-pointer"
                    style={{ zIndex: REVIEWS.length - depth }}
                    initial={false}
                    animate={{
                      x: style.x,
                      y: style.y,
                      scale: style.scale,
                      opacity: style.opacity,
                      filter: `blur(${style.blur}px)`,
                      backgroundColor: style.bg,
                      boxShadow: isFront
                        ? "0 20px 50px rgba(0,0,0,0.35)"
                        : "0 10px 30px rgba(0,0,0,0.25)",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
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
              What Clients Say
            </motion.p>
            <motion.h3
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-white mb-5 leading-snug"
            >
              Trusted by businesses across{" "}
              <span className="text-gradient-blue">every industry.</span>
            </motion.h3>
            <motion.p variants={fadeInUp} className="section-sub mb-4 max-w-md">
              From healthcare to manufacturing, RightClicks partners with
              growing companies to keep their technology secure, reliable, and
              built for what's next.
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
                from 500+ businesses
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
