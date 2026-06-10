// src/components/sections/WhyChooseUsSection.jsx
import { motion } from 'framer-motion'
import {
  FaShieldAlt, FaUsers, FaBolt, FaDollarSign, FaChartLine,
} from 'react-icons/fa'
import { fadeInUp, staggerContainer, viewportOnce } from '../../animations/variants'

const CARDS = [
  {
    icon: <FaShieldAlt />,
    title: 'Proactive Approach',
    desc: 'We monitor and maintain your systems to prevent issues before they happen.',
  },
  {
    icon: <FaUsers />,
    title: 'Expert Team',
    desc: 'Certified professionals with years of experience in solving complex IT challenges.',
  },
  {
    icon: <FaBolt />,
    title: 'Fast Response',
    desc: 'Quick response times and real solutions when you need them most.',
  },
  {
    icon: <FaDollarSign />,
    title: 'Transparent Pricing',
    desc: 'No hidden fees. Just honest pricing and predictable monthly costs.',
  },
  {
    icon: <FaChartLine />,
    title: 'Your Success',
    desc: 'We align our IT solutions with your business goals to drive growth.',
  },
]

export default function WhyChooseUsSection() {
  return (
    <section id="why" className="section-py bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[45%] h-[55%] opacity-20"
          style={{ background: 'radial-gradient(ellipse at 85% 85%, rgba(30,144,255,0.14) 0%, transparent 65%)' }}
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
          <motion.p variants={fadeInUp} className="eyebrow mb-3">Why Choose Us</motion.p>
          <motion.h2 variants={fadeInUp} className="section-heading">
            IT Support That Goes{' '}
            <span className="text-gradient-blue">Beyond</span>
          </motion.h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {CARDS.map((card) => (
            <WhyCard key={card.title} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function WhyCard({ card }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="glass-card p-6 flex flex-col gap-4 group cursor-default hover:border-brand-blue/40 transition-colors duration-300"
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-lg bg-brand-blue/12 border border-brand-blue/20 flex items-center justify-center text-brand-blue text-lg group-hover:bg-brand-blue/20 group-hover:shadow-blue-glow-sm transition-all duration-300">
        {card.icon}
      </div>

      {/* Text */}
      <div>
        <h3 className="text-white font-semibold text-[15px] mb-2 leading-snug">{card.title}</h3>
        <p className="text-neutral-400 text-[13px] leading-relaxed">{card.desc}</p>
      </div>

      {/* Blue bottom accent */}
      <div className="divider-blue mt-auto" />
    </motion.div>
  )
}
