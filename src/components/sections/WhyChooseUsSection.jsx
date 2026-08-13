// src/components/sections/WhyChooseUsSection.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaDollarSign,
  FaUsers,
  FaShieldAlt,
  FaClock,
  FaCheckSquare,
  FaListAlt,
  FaArrowRight,
} from "react-icons/fa";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
} from "../../animations/variants";
import { scrollToSection } from "../../hooks/useLenis";

const CARDS_META = [
  { id: "cost", icon: <FaDollarSign />, image: "/assets/images/why-1.webp" },
  { id: "uptime", icon: <FaClock />, image: "/assets/images/why-2.webp" },
  { id: "security", icon: <FaShieldAlt />, image: "/assets/images/why-3.webp" },
  { id: "support", icon: <FaUsers />, image: "/assets/images/why-4.webp" },
  { id: "scalable", icon: <FaCheckSquare />, image: "/assets/images/why-5.webp" },
  { id: "planning", icon: <FaListAlt />, image: "/assets/images/why-6.webp" },
];

// Custom "ease out expo-ish" curve from the reference codepen
const EASING =
  "linear(0 0%, 0.1538 4.09%, 0.2926 8.29%, 0.4173 12.63%, 0.5282 17.12%, 0.6255 21.77%, 0.7099 26.61%, 0.782 31.67%, 0.8425 37%, 0.8887 42.23%, 0.9257 47.79%, 0.9543 53.78%, 0.9752 60.32%, 0.9883 67.11%, 0.9961 75%, 1 100%)";
const SPEED = 0.6; // seconds

// The title renders as a single nowrap line (rotated 90deg when collapsed,
// horizontal when active) inside a fixed-size panel, so it has no natural
// wrapping fallback. Longer translations of the same label (French routinely
// runs 30-70% longer than English) can overflow that fixed space, so we
// shrink the font past a safe character count instead of clipping.
function titleFontSize(title, active) {
  const len = title.length;
  return active
    ? Math.max(14, 20 - Math.max(0, len - 38) * 0.35)
    : Math.max(11, 14 - Math.max(0, len - 46) * 0.15);
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  React.useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);
  return isMobile;
}

export default function WhyChooseUsSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);
  const isMobile = useIsMobile();

  const CARDS = CARDS_META.map((c) => ({
    ...c,
    title: t(`whyChooseUs.cards.${c.id}.title`),
    desc: t(`whyChooseUs.cards.${c.id}.desc`),
  }));

  return (
    <section
      id="why"
      className="section-py bg-dark-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[45%] h-[55%] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 85% 85%, rgba(30,144,255,0.14) 0%, transparent 65%)",
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
          className="text-center mb-14"
        >
          <motion.p variants={fadeInUp} className="eyebrow mb-3">
            {t("whyChooseUs.eyebrow")}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="section-heading">
            {t("whyChooseUs.headline")}{" "}
            <span className="text-gradient-blue">
              {t("whyChooseUs.headlineHighlight")}
            </span>
          </motion.h2>
        </motion.div>

        {/* Animated Hover Disclosure — CSS grid-template-columns approach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <ul
            ref={listRef}
            onPointerMove={(e) => {
              const li = e.target.closest("li[data-idx]");
              if (li) setActiveIndex(Number(li.dataset.idx));
            }}
            onClick={(e) => {
              const li = e.target.closest("li[data-idx]");
              if (li) setActiveIndex(Number(li.dataset.idx));
            }}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "12px",
              width: "100%",
              maxWidth: "1100px",
              height: isMobile ? "auto" : "clamp(320px, 46vw, 460px)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {CARDS.map((card, i) => {
              const activeSize = 60; // % taken by the active panel (desktop only)
              const remaining = 100 - activeSize;
              const inactiveSize = remaining / (CARDS.length - 1);
              const size = i === activeIndex ? activeSize : inactiveSize;

              return (
                <DisclosurePanel
                  key={card.id}
                  card={card}
                  index={i}
                  active={i === activeIndex}
                  size={size}
                  isMobile={isMobile}
                />
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function DisclosurePanel({ card, index, active, size, isMobile }) {
  const { t } = useTranslation();
  return (
    <li
      data-idx={index}
      data-active={active}
      tabIndex={0}
      style={{
        position: "relative",
        overflow: "hidden",
        flexGrow: isMobile ? 0 : size,
        flexShrink: 0,
        flexBasis: isMobile ? "auto" : 0,
        width: isMobile ? "auto" : 0,
        height: isMobile ? "auto" : "auto",
        minWidth: 0,
        minHeight: isMobile ? "64px" : 0,
        padding: isMobile ? "1rem 1.25rem" : 0,
        display: isMobile ? "flex" : "block",
        flexDirection: isMobile ? "column" : undefined,
        justifyContent: isMobile && !active ? "center" : undefined,
        borderRadius: "16px",
        border: "1px solid rgba(36,48,80,0.7)",
        background: "#0E1628",
        cursor: "pointer",
        outline: "none",
        transitionProperty: isMobile ? "min-height" : "flex-grow",
        transitionDuration: `${SPEED}s`,
        transitionTimingFunction: EASING,
      }}
      className="group focus-visible:ring-2 focus-visible:ring-brand-blue/60"
    >
      {/* Background image — grayscale + dim when collapsed, full color + brighter when active */}
      <img
        src={card.image}
        alt=""
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: active
            ? "grayscale(0) brightness(0.9)"
            : "grayscale(1) brightness(0.45)",
          transform: active ? "scale(1)" : "scale(1.08)",
          transitionProperty: "filter, transform",
          transitionDuration: `${SPEED * 1.2}s`,
          transitionTimingFunction: EASING,
          pointerEvents: "none",
        }}
      />

      {/* Top-to-bottom fade so text stays readable, image visible at top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(14,22,40,0) 0%, rgba(14,22,40,0.55) 45%, rgba(14,22,40,0.97) 80%)",
          pointerEvents: "none",
        }}
      />

      {/* Background glow — only on active, adds blue tint over image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: active ? 1 : 0,
          transitionProperty: "opacity",
          transitionDuration: `${SPEED * 1.2}s`,
          transitionTimingFunction: EASING,
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(30,144,255,0.22) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Title — vertical when collapsed on desktop, always horizontal on mobile */}
      <h3
        style={{
          position: isMobile ? "relative" : "absolute",
          top: isMobile ? "auto" : "1.1rem",
          left: isMobile ? "auto" : "1.25rem",
          right: "auto",
          transformOrigin: "0 50%",
          rotate: isMobile ? "0deg" : active ? "0deg" : "90deg",
          fontSize: isMobile
            ? "15px"
            : `${titleFontSize(card.title, active)}px`,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "inherit",
          color: "#FFFFFF",
          opacity: 1,
          transitionProperty: "rotate, font-size, color",
          transitionDuration: `${SPEED}s`,
          transitionTimingFunction: EASING,
          whiteSpace: isMobile ? "normal" : "nowrap",
          margin: 0,
          marginBottom: isMobile && active ? "0.6rem" : 0,
          pointerEvents: isMobile ? "auto" : "none",
          zIndex: 2,
          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
        }}
      >
        {card.title}
      </h3>

      {/* Icon — top-right, desktop only (mobile title spans full width) */}
      <div
        style={{
          display: isMobile ? "none" : "flex",
          position: "absolute",
          top: "1.25rem",
          right: "0.75rem",
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "rgba(30,144,255,0.12)",
          border: "1px solid rgba(30,144,255,0.25)",
          alignItems: "center",
          justifyContent: "center",
          color: "#1E90FF",
          fontSize: "16px",
          opacity: active ? 1 : 0.7,
          transitionProperty: "opacity",
          transitionDuration: `${SPEED * 1.2}s`,
          transitionTimingFunction: EASING,
          pointerEvents: "none",
        }}
      >
        {card.icon}
      </div>

      {/* Number watermark — only visible when active */}
      <span
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1.25rem",
          fontSize: "2.5rem",
          fontWeight: 900,
          color: "rgba(30,144,255,0.15)",
          opacity: active ? 1 : 0,
          transitionProperty: "opacity",
          transitionDuration: `${SPEED * 1.2}s`,
          transitionTimingFunction: EASING,
          transitionDelay: active ? `${SPEED * 0.25}s` : "0s",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Bottom content — description + CTA, fades in when active */}
      <div
        style={{
          position: isMobile ? "relative" : "absolute",
          left: isMobile ? "auto" : "1.5rem",
          right: isMobile ? "1.25rem" : "1.5rem",
          bottom: isMobile ? "auto" : "1.1rem",
          display: isMobile && !active ? "none" : "flex",
          flexDirection: "column",
          gap: "0.6rem",
          paddingBottom: isMobile ? "1rem" : 0,
          opacity: active ? 1 : 0,
          transitionProperty: "opacity",
          transitionDuration: `${SPEED * 1.2}s`,
          transitionTimingFunction: EASING,
          transitionDelay: active ? `${SPEED * 0.25}s` : "0s",
          pointerEvents: active ? "auto" : "none",
        }}
      >
        <p
          style={{
            fontSize: isMobile ? "14px" : "15px",
            lineHeight: 1.6,
            color: "#C8D4F0",
            margin: "0 1rem",
            textWrap: "balance",
            maxWidth: isMobile ? "100%" : "85%",
          }}
        >
          {card.desc}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            scrollToSection("contact");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#1E90FF",
            fontSize: "14px",
            fontWeight: 600,
            width: "fit-content",
            background: "none",
            border: "none",
            padding: "0 1rem",
            cursor: "pointer",
          }}
          className="hover:underline"
        >
          {t("whyChooseUs.learnMore")}{" "}
          <FaArrowRight style={{ fontSize: "10px" }} />
        </button>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: active ? "100%" : "0%",
          background: "linear-gradient(to right, #1E90FF, #4DAAFF)",
          transitionProperty: "width",
          transitionDuration: `${SPEED * 1.2}s`,
          transitionTimingFunction: EASING,
        }}
      />
    </li>
  );
}
