// src/components/sections/AboutSection.jsx
import { motion } from 'framer-motion'
import { FaArrowRight, FaUsers } from 'react-icons/fa'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportOnce } from '../../animations/variants'
import { scrollToSection } from '../../hooks/useLenis'

export default function AboutSection() {
  return (
    <section id="about" className="section-py bg-dark-800 relative overflow-hidden">
      {/* Subtle bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[50%] h-[60%] opacity-20"
          style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(30,144,255,0.15) 0%, transparent 65%)' }}
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
            <motion.p variants={fadeInUp} className="eyebrow mb-4">About Us</motion.p>
            <motion.h2 variants={fadeInUp} className="section-heading mb-6">
              We Make Technology
              <br />
              Work for <span className="text-gradient-blue">You</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-sub mb-4 max-w-md">
              RightClicks is a leading managed IT service provider helping businesses
              stay secure, productive, and prepared for the future.
            </motion.p>
            <motion.p variants={fadeInUp} className="section-sub mb-8 max-w-md">
              We combine proactive monitoring, advanced security, and expert support to
              deliver IT solutions that drive growth and efficiency.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-ghost"
              >
                Learn More About Us <FaArrowRight className="text-xs" />
              </button>
            </motion.div>
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
              style={{ aspectRatio: '4/3' }}
            >
              {/* Dark placeholder that mimics the office/team photo */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #0c1a30 0%, #0a1020 50%, #06101e 100%)',
                }}
              />
              {/* Subtle blue tint overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{ background: 'linear-gradient(to bottom right, rgba(30,144,255,0.08), transparent 60%)' }}
              />

              {/* Simulated office scene with CSS */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full flex items-end justify-center pb-8">
                  {/* Desk silhouette */}
                  <div className="absolute bottom-0 left-0 right-0 h-[35%] rounded-b-2xl"
                    style={{ background: 'linear-gradient(to top, rgba(8,14,28,0.9) 0%, transparent 100%)' }} />
                  {/* Monitor shapes */}
                  {[0.25, 0.5, 0.72].map((x, i) => (
                    <div
                      key={i}
                      className="absolute bottom-[28%] rounded-sm border border-brand-blue/20"
                      style={{
                        left: `${x * 100}%`,
                        transform: 'translateX(-50%)',
                        width: `${14 + i * 2}%`,
                        height: `${18 + i}%`,
                        background: 'rgba(30,144,255,0.06)',
                        boxShadow: '0 0 12px rgba(30,144,255,0.15)',
                      }}
                    />
                  ))}
                  {/* People silhouettes */}
                  {[0.28, 0.5, 0.73].map((x, i) => (
                    <div key={i} className="absolute" style={{ left: `${x * 100}%`, bottom: '25%', transform: 'translateX(-50%)' }}>
                      <div className="rounded-full bg-neutral-600/40 border border-neutral-500/20"
                        style={{ width: `${28 + i * 4}px`, height: `${28 + i * 4}px` }} />
                      <div className="mx-auto mt-1 rounded-sm bg-neutral-700/30"
                        style={{ width: `${40 + i * 6}px`, height: `${30 + i * 4}px` }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* RightClicks branding overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-dark-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-dark-400/50">
                <div className="w-5 h-5 rounded bg-brand-blue flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 18 18" fill="none">
                    <path d="M2 2h6v6H2zM10 2h6v4h-6zM10 8h6v8h-6zM2 10h6v6H2z" fill="white"/>
                  </svg>
                </div>
                <span className="text-white text-xs font-bold">RightClicks</span>
              </div>

              {/* Years badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-6 left-6 bg-brand-blue rounded-xl px-5 py-4 shadow-blue-glow"
              >
                <p className="text-white text-3xl font-extrabold leading-none">15+</p>
                <p className="text-white/80 text-xs mt-1 leading-tight">Years of<br/>Experience</p>
              </motion.div>
            </div>

            {/* 500+ businesses card — bottom right, overlapping */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 -right-4 sm:-right-6 bg-white rounded-xl px-5 py-4 shadow-card-hover flex items-center gap-3"
              style={{ minWidth: '170px' }}
            >
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                <FaUsers className="text-brand-blue text-lg" />
              </div>
              <div>
                <p className="text-dark-900 text-2xl font-extrabold leading-none">500+</p>
                <p className="text-neutral-500 text-xs mt-0.5 leading-tight">Businesses<br/>Supported</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
