// src/components/sections/ProcessSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaSearch,
  FaClipboardList,
  FaRocket,
  FaCog,
  FaChartLine,
} from "react-icons/fa";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
} from "../../animations/variants";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    icon: <FaSearch />,
    title: "Discover",
    desc: "We learn about your business and goals.",
  },
  {
    num: "02",
    icon: <FaClipboardList />,
    title: "Plan",
    desc: "We design a custom IT strategy for you.",
  },
  {
    num: "03",
    icon: <FaRocket />,
    title: "Deploy",
    desc: "We implement with minimum disruption.",
  },
  {
    num: "04",
    icon: <FaCog />,
    title: "Manage",
    desc: "We proactively monitor and support your IT.",
  },
  {
    num: "05",
    icon: <FaChartLine />,
    title: "Optimize",
    desc: "We continuously improve and scale as you grow.",
  },
];

const CIRCLE_SIZE = 88; // px — diameter of each circle

function StepNode({ step, index, total }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center flex-1 relative">
      {/* Circle — sits exactly on the line (line is centered through this) */}
      <motion.div
        className="relative z-10 cursor-default"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={hovered ? { scale: 1.18 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
      >
        {/* Outer pulse ring — always subtle, amplified on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border border-brand-blue/40"
          animate={
            hovered ? { scale: 1.35, opacity: 0 } : { scale: 1, opacity: 0.4 }
          }
          transition={
            hovered ? { duration: 0.55, ease: "easeOut" } : { duration: 0.4 }
          }
        />

        {/* Secondary pulse ring on hover */}
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-full border border-brand-blue/25"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        )}

        {/* Main circle */}
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          animate={
            hovered
              ? {
                  backgroundColor: "rgba(14,36,80,1)",
                  borderColor: "rgba(30,144,255,0.9)",
                  boxShadow:
                    "0 0 0 4px rgba(30,144,255,0.18), 0 0 28px rgba(30,144,255,0.55)",
                }
              : {
                  backgroundColor: "rgba(12,20,36,1)",
                  borderColor: "rgba(30,144,255,0.45)",
                  boxShadow:
                    "0 0 0 4px rgba(30,144,255,0.06), 0 0 12px rgba(30,144,255,0.18)",
                }
          }
          transition={{ duration: 0.3 }}
          style={{
            border: "2px solid",
          }}
        >
          {/* Icon */}
          <motion.span
            className="text-2xl"
            animate={{ color: hovered ? "#ffffff" : "#1E90FF" }}
            transition={{ duration: 0.25 }}
          >
            {step.icon}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Step number + title */}
      <div className="flex items-center gap-1.5 mt-5 mb-2">
        <span className="text-brand-blue text-xs font-bold tracking-wider">
          {step.num}
        </span>
        <motion.span
          className="font-bold text-[15px]"
          animate={{ color: hovered ? "#ffffff" : "#e2e8f8" }}
          transition={{ duration: 0.2 }}
        >
          {step.title}
        </motion.span>
      </div>

      {/* Description */}
      <p className="text-neutral-400 text-[13px] leading-relaxed text-center max-w-[155px]">
        {step.desc}
      </p>

      {/* Mobile connector (shown only on small screens) */}
      {index < total - 1 && (
        <div className="lg:hidden w-px h-8 bg-brand-blue/25 mt-5" />
      )}
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 1.2,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-py bg-dark-800 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] opacity-15"
          style={{
            background:
              "radial-gradient(ellipse, rgba(30,144,255,0.12) 0%, transparent 70%)",
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
            Our Process
          </motion.p>
          <motion.h2 variants={fadeInUp} className="section-heading">
            A Proven Process. Transparent{" "}
            <span className="text-gradient-blue">Results.</span>
          </motion.h2>
        </motion.div>

        {/* ── Timeline (desktop) ── */}
        <div className="hidden lg:block relative">
          {/*
            The horizontal line must pass through the exact vertical center of the circles.
            Circle height = CIRCLE_SIZE (88px).
            So the line top = 88/2 = 44px from the top of this container.
            We use absolute positioning with top set to half the circle height.
          */}
          <div
            className="absolute left-0 right-0 z-0"
            style={{
              top: CIRCLE_SIZE / 2,
              height: "2px",
              transform: "translateY(-50%)",
            }}
          >
            {/* Track */}
            <div className="absolute inset-0 bg-dark-400/50" />
            {/* Animated fill */}
            <div
              ref={lineRef}
              className="absolute inset-0 origin-left"
              style={{
                background: "linear-gradient(to right, #1E90FF, #4DAAFF)",
                boxShadow: "0 0 8px rgba(30,144,255,0.55)",
              }}
            />
          </div>

          {/* Steps — flex row, each takes equal width */}
          <div className="flex items-start">
            {STEPS.map((step, i) => (
              <StepNode
                key={step.num}
                step={step}
                index={i}
                total={STEPS.length}
              />
            ))}
          </div>
        </div>

        {/* ── Timeline (mobile — vertical) ── */}
        <div className="flex lg:hidden flex-col items-center gap-0">
          {STEPS.map((step, i) => (
            <StepNode
              key={step.num}
              step={step}
              index={i}
              total={STEPS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
