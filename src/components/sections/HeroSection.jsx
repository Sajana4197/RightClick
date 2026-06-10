// src/components/sections/HeroSection.jsx
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaShieldAlt,
  FaCloud,
  FaHeadset,
  FaChartLine,
} from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { HiStar } from "react-icons/hi";
import { BsArrowDownCircle } from "react-icons/bs";
import { scrollToSection } from "../../hooks/useLenis";
import { fadeInUp, staggerContainer } from "../../animations/variants";

const CARDS = [
  {
    id: "monitoring",
    icon: <MdMonitor className="text-brand-blue text-lg" />,
    title: "24/7 Monitoring",
    sub: "Always On. Always Secure.",
    position: "top-[8%] right-[8%]",
    delay: 0.5,
    floatDur: "5s",
  },
  {
    id: "cyber",
    icon: <FaShieldAlt className="text-brand-blue text-lg" />,
    title: "Cyber Security",
    sub: "Protecting What Matters.",
    position: "top-[32%] right-[2%]",
    delay: 0.7,
    floatDur: "6s",
  },
  {
    id: "cloud",
    icon: <FaCloud className="text-brand-blue text-lg" />,
    title: "Cloud Solutions",
    sub: "Scalable. Reliable. Secure.",
    position: "bottom-[28%] right-[4%]",
    delay: 0.9,
    floatDur: "5.5s",
  },
  {
    id: "support",
    icon: <FaHeadset className="text-brand-blue text-lg" />,
    title: "IT Support",
    sub: "Fast. Friendly. Reliable.",
    position: "bottom-[6%] right-[14%]",
    delay: 1.1,
    floatDur: "4.8s",
  },
];

const STATS = [
  { icon: <FaShieldAlt />, value: "99.9%", label: "System Uptime" },
  { icon: <FaHeadset />, value: "24/7", label: "Expert Support" },
  { icon: <FaChartLine />, value: "40%", label: "Lower IT Costs" },
  { icon: <HiStar />, value: "500+", label: "Businesses Trust Us" },
];

function FloatingCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: card.delay,
      }}
      className={`absolute ${card.position} z-20`}
      style={{
        animation: `float ${card.floatDur} ease-in-out ${card.delay * 0.5}s infinite`,
      }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 shadow-card backdrop-blur-md"
        style={{ background: "rgba(8,14,28,0.90)", minWidth: "185px" }}
      >
        <div className="w-9 h-9 rounded-lg bg-brand-blue/15 border border-brand-blue/25 flex items-center justify-center flex-shrink-0">
          {card.icon}
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-tight">
            {card.title}
          </p>
          <p className="text-neutral-400 text-[11px] leading-tight mt-0.5">
            {card.sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark-900"
      style={{ paddingTop: "72px" }}
    >
      {/* Background video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.75 }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(4,8,18,0.9) 0%, rgba(4,8,18,0.55) 35%, rgba(4,8,18,0.08) 75%, transparent 100%)",
          }}
        />
        {/* Blue radial glow top-right */}
        <div
          className="absolute top-0 right-0 w-[60%] h-[75%]"
          style={{
            background:
              "radial-gradient(ellipse at 75% 15%, rgba(30,144,255,0.12) 0%, transparent 65%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 w-full h-40"
          style={{
            background:
              "linear-gradient(to top, rgba(5,10,20,1) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[calc(100vh-72px)] py-16 lg:py-0">
          {/* Left */}
          <motion.div
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center order-2 lg:order-1"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 mb-5"
            >
              <HiStar className="text-brand-blue text-xs" />
              <span className="eyebrow text-[11px]">
                Your IT. Our Priority.
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-extrabold leading-[1.06] tracking-tight text-white mb-4"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
            >
              Managed IT.
              <br />
              Built for <span className="text-gradient-blue">Growth.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-neutral-300 text-base lg:text-lg leading-relaxed max-w-[440px] mb-8"
            >
              RightClicks delivers fully managed IT solutions that keep your
              business secure, productive, and always ahead.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-3 mb-12"
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="btn-primary"
              >
                Get a Free Consultation
                <FaArrowRight className="text-xs" />
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="btn-ghost"
              >
                Explore Services
                <FaArrowRight className="text-xs" />
              </button>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.08, 0)}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 border-t border-dark-400/40 pt-7"
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeInUp}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-brand-blue text-sm">{s.icon}</span>
                    <span className="text-2xl font-extrabold text-white tracking-tight leading-none">
                      {s.value}
                    </span>
                  </div>
                  <span className="text-neutral-400 text-[11px] leading-snug">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Floating cards only */}
          <div className="relative order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-auto lg:min-h-[560px]">
            {/* Desktop floating cards */}
            <div className="hidden lg:block absolute inset-0">
              {CARDS.map((card) => (
                <FloatingCard key={card.id} card={card} />
              ))}
            </div>

            {/* Mobile — stacked cards */}
            <div className="flex lg:hidden flex-col gap-3 w-full max-w-xs mx-auto pt-4">
              {CARDS.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: card.delay }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-md"
                  style={{ background: "rgba(8,14,28,0.88)" }}
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-blue/15 border border-brand-blue/25 flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">
                      {card.title}
                    </p>
                    <p className="text-neutral-400 text-[11px] leading-tight mt-0.5">
                      {card.sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 text-neutral-500 hover:text-brand-blue transition-colors duration-300"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <BsArrowDownCircle className="text-xl" />
        </motion.div>
      </motion.button>
    </section>
  );
}
