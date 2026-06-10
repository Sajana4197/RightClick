// src/components/sections/ServicesSection.jsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaDesktop, FaShieldAlt, FaCloud, FaServer, FaHeadset, FaChartLine } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fadeInUp, staggerContainer, viewportOnce } from '../../animations/variants'
import { scrollToSection } from '../../hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: <FaDesktop />,
    title: 'Managed IT Services',
    desc: 'Proactive monitoring, maintenance & support to keep you running.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Cybersecurity',
    desc: 'Advanced protection to defend your systems and data 24/7.',
  },
  {
    icon: <FaCloud />,
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure built for performance.',
  },
  {
    icon: <FaServer />,
    title: 'Server & Network Management',
    desc: 'Optimized, secure and reliable IT infrastructure.',
  },
  {
    icon: <FaHeadset />,
    title: 'Help Desk Support',
    desc: 'Fast, friendly support whenever your team needs it.',
  },
  {
    icon: <FaChartLine />,
    title: 'Strategic IT Consulting',
    desc: 'Technology roadmap aligned with your business goals.',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const pinRef     = useRef(null)
  const stackRef   = useRef(null)
  const cardsRef   = useRef([])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    const total = cards.length

    const ctx = gsap.context(() => {
      // Set initial state — cards start below, off-screen, full size, no rotation
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: window.innerHeight,
          scale: 1,
          rotate: 0,
          opacity: i === 0 ? 1 : 1,
          zIndex: i + 1,
        })
      })
      // First card starts already in place (it's the "current" one)
      gsap.set(cards[0], { y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${total * 500}`,
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
        },
      })

      // For each subsequent card, animate it sliding up to center & stacking
      for (let i = 1; i < total; i++) {
        // Slight stack offset so previous cards peek behind
        const stackOffset = i * 10
        const stackScale = 1 - i * 0.035

        tl.to(cards[i], {
          y: 0,
          duration: 1,
          ease: 'power2.out',
        }, i - 1)

        // Push previous cards back slightly (scale down + move up a touch) as new one arrives
        for (let j = 0; j < i; j++) {
          const depth = i - j
          tl.to(cards[j], {
            scale: 1 - depth * 0.025,
            y: -(depth * 12),
            duration: 1,
            ease: 'power2.out',
          }, i - 1)
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative bg-dark-900 overflow-hidden">
      <div ref={pinRef} className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div
            className="absolute top-0 left-0 w-[55%] h-[60%] opacity-20"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(30,144,255,0.14) 0%, transparent 65%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — Sticky text content */}
            <motion.div
              variants={staggerContainer(0.1, 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="order-1"
            >
              <motion.p variants={fadeInUp} className="eyebrow mb-3">Our Services</motion.p>
              <motion.h2 variants={fadeInUp} className="section-heading mb-5">
                Comprehensive IT{' '}
                <span className="text-gradient-blue">Solutions</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="section-sub mb-4 max-w-md">
                From proactive monitoring to strategic consulting, RightClicks delivers
                a full suite of managed IT services designed to keep your business secure,
                efficient, and ready to scale.
              </motion.p>
              <motion.p variants={fadeInUp} className="section-sub mb-8 max-w-md">
                Every service is backed by our expert team and a commitment to fast,
                transparent, and reliable support — so you can focus on growth while
                we handle your technology.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <button onClick={() => scrollToSection('contact')} className="btn-primary">
                  Get a Free Consultation <FaArrowRight className="text-xs" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right — Stacking cards */}
            <div
              ref={stackRef}
              className="relative order-2 h-[420px] sm:h-[460px] flex items-center justify-center"
              style={{ perspective: '1200px' }}
            >
              {SERVICES.map((service, i) => (
                <div
                  key={service.title}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="absolute w-full max-w-md"
                  style={{ willChange: 'transform' }}
                >
                  <ServiceCard service={service} index={i} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  return (
    <div
      className="w-full rounded-2xl border border-dark-400/60 p-6 sm:p-7"
      style={{
        background: '#0E1628',
        boxShadow: '0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(30,144,255,0.08)',
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-brand-blue/25"
          style={{ background: 'rgba(30,144,255,0.12)', boxShadow: '0 0 16px rgba(30,144,255,0.2)' }}
        >
          <span className="text-xl text-brand-blue">{service.icon}</span>
        </div>
        <span
          className="text-4xl font-black leading-none select-none ml-auto"
          style={{ color: 'rgba(30,144,255,0.15)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="text-white font-bold text-lg mb-2 leading-snug">{service.title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed mb-5">{service.desc}</p>

      <button
        onClick={() => {}}
        className="group flex items-center gap-2 text-brand-blue text-sm font-semibold"
      >
        Learn More
        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
      </button>

      <div
        className="absolute bottom-0 left-0 h-[2px] w-full rounded-b-2xl"
        style={{ background: 'linear-gradient(to right, #1E90FF, transparent 70%)' }}
      />
    </div>
  )
}
