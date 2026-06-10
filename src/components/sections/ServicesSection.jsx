// src/components/sections/ServicesSection.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaDesktop, FaShieldAlt, FaCloud, FaServer, FaHeadset, FaChartLine } from 'react-icons/fa'
import { fadeInUp, staggerContainer, viewportOnce } from '../../animations/variants'
import { scrollToSection } from '../../hooks/useLenis'

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

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative glass-card p-6 flex flex-col gap-4 overflow-hidden group transition-all duration-300 hover:border-brand-blue/40"
      style={{
        boxShadow: hovered
          ? '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(30,144,255,0.2)'
          : '0 4px 24px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Hover bg glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(ellipse at 20% 20%, rgba(30,144,255,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Icon */}
      <div className="relative z-10">
        <motion.div
          animate={{
            backgroundColor: hovered ? 'rgba(30,144,255,0.2)' : 'rgba(30,144,255,0.1)',
            boxShadow: hovered ? '0 0 16px rgba(30,144,255,0.3)' : '0 0 0px rgba(30,144,255,0)',
          }}
          transition={{ duration: 0.3 }}
          className="w-12 h-12 rounded-xl border border-brand-blue/25 flex items-center justify-center"
        >
          <motion.span
            animate={{ color: hovered ? '#ffffff' : '#1E90FF' }}
            transition={{ duration: 0.25 }}
            className="text-xl"
          >
            {service.icon}
          </motion.span>
        </motion.div>
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col gap-2 flex-1">
        <h3 className="text-white font-semibold text-[15px] leading-snug">{service.title}</h3>
        <p className="text-neutral-400 text-[13px] leading-relaxed">{service.desc}</p>
      </div>

      {/* Arrow link */}
      <motion.button
        onClick={() => scrollToSection('contact')}
        animate={{ x: hovered ? 4 : 0, color: hovered ? '#4DAAFF' : '#1E90FF' }}
        transition={{ duration: 0.2 }}
        className="relative z-10 flex items-center gap-1.5 text-brand-blue text-xs font-semibold mt-auto w-fit"
      >
        Learn More <FaArrowRight className="text-[10px]" />
      </motion.button>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-blue-light"
        animate={{ width: hovered ? '100%' : '32px' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" className="section-py bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[50%] opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(30,144,255,0.12) 0%, transparent 65%)' }}
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
          <motion.p variants={fadeInUp} className="eyebrow mb-3">Our Services</motion.p>
          <motion.h2 variants={fadeInUp} className="section-heading">
            Comprehensive IT{' '}
            <span className="text-gradient-blue">Solutions</span>
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
