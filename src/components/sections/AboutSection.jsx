// src/components/sections/AboutSection.jsx
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  viewportOnce,
} from "../../animations/variants";
import { scrollToSection } from "../../hooks/useLenis";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-py bg-dark-800 relative overflow-hidden"
    >
      {/* Subtle bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[50%] h-[60%] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(30,144,255,0.15) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p variants={fadeInUp} className="eyebrow mb-4">
              About Us
            </motion.p>
            <motion.h2 variants={fadeInUp} className="section-heading mb-6">
              We Make Technology
              <br />
              Work for <span className="text-gradient-blue">You</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-sub mb-4 max-w-md">
              We've been helping businesses leverage technology to grow,
              innovate, and stay competitive in an ever-evolving digital
              landscape.
            </motion.p>
            <motion.p variants={fadeInUp} className="section-sub mb-8 max-w-md">
              At RightClicks, we are a rapidly growing IT support and service
              company dedicated to delivering fully managed IT solutions
              tailored to meet the unique needs of your business. With a strong
              presence in Sri Lanka, Maldives, and Canada, we proudly offer
              worldwide support and services that keep your technology running
              smoothly and securely, no matter where you are.
            </motion.p>
          </motion.div>

          {/* Right — image composition */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            {/* Main image card */}
            <div
              className="relative rounded-2xl overflow-hidden border border-dark-400/50 shadow-card"
              style={{ aspectRatio: "4/3" }}
            >
              {/* Real image */}
              <img
                src="../../assets/images/about-us.png"
                alt="RightClicks IT team collaborating in a modern office with global network visualization"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Subtle dark vignette over image */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(5,10,20,0.15) 0%, rgba(5,10,20,0.45) 100%)",
                }}
              />

              {/* RightClicks branding overlay */}
              <Logo3DBadge />

              {/* Years badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-6 left-6 bg-brand-blue rounded-xl px-5 py-4 shadow-blue-glow"
              >
                <p className="text-white text-3xl font-extrabold leading-none">
                  15+
                </p>
                <p className="text-white/80 text-xs mt-1 leading-tight">
                  Years of
                  <br />
                  Experience
                </p>
              </motion.div>
            </div>

            {/* 500+ businesses card — bottom right, overlapping */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={viewportOnce}
              transition={{
                delay: 0.7,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute -bottom-5 -right-4 sm:-right-6 bg-white rounded-xl px-5 py-4 shadow-card-hover flex items-center gap-3"
              style={{ minWidth: "170px" }}
            >
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                <FaUsers className="text-brand-blue text-lg" />
              </div>
              <div>
                <p className="text-dark-900 text-2xl font-extrabold leading-none">
                  500+
                </p>
                <p className="text-neutral-500 text-xs mt-0.5 leading-tight">
                  Businesses
                  <br />
                  Supported
                </p>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Logo3DBadge() {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 22 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-16, 16]);

  const sheenAngle = useTransform(springX, [-0.5, 0.5], [105, 145]);
  const sheenOpacity = useTransform([springX, springY], ([x, y]) =>
    Math.min(1, Math.hypot(x, y) * 2.2),
  );

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="absolute top-4 right-4"
      style={{ perspective: "500px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex items-center justify-center bg-dark-800/85 backdrop-blur-sm p-2 rounded-lg border border-brand-blue/30 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: sheenOpacity,
            background: useTransform(
              sheenAngle,
              (angle) =>
                `linear-gradient(${angle}deg, rgba(255,255,255,0.25) 0%, transparent 55%)`,
            ),
          }}
        />

        <div
          className="relative w-14 h-14 flex items-center justify-center overflow-hidden rounded-md"
          style={{ transform: "translateZ(10px)" }}
        >
          <img
            src="/Logo.png"
            alt="RightClicks logo"
            className="w-14 h-14 object-contain"
            style={{ filter: "drop-shadow(0 2px 6px rgba(30,144,255,0.5))" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
