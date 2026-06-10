// src/components/Navbar.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPhone } from 'react-icons/fa'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useScrolled } from '../hooks/useScrolled'
import { scrollToSection } from '../hooks/useLenis'

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Careers', id: 'careers' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Contact Us', id: 'contact' },
]

export default function Navbar() {
  const scrolled = useScrolled(20)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (id) => {
    setMobileOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-400/50 shadow-[0_2px_20px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
        style={{ height: '72px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-md bg-brand-blue flex items-center justify-center shadow-blue-glow-sm group-hover:shadow-blue-glow transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2h6v6H2zM10 2h6v4h-6zM10 8h6v8h-6zM2 10h6v6H2z" fill="white"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Right<span className="text-brand-blue">Clicks</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="nav-link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA button */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+12816127292"
              className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-light text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-all duration-300 shadow-blue-glow-sm hover:shadow-blue-glow"
            >
              <FaPhone className="text-xs" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-normal opacity-80">Call Us</span>
                <span className="text-xs font-bold">(281) 612-7292</span>
              </div>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-dark-800/98 backdrop-blur-md border-b border-dark-400/50 lg:hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="text-left px-4 py-3 text-neutral-200 hover:text-white hover:bg-dark-600 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="tel:+12816127292"
                className="flex items-center gap-2 mt-2 px-4 py-3 bg-brand-blue rounded-lg text-white text-sm font-semibold"
              >
                <FaPhone className="text-xs" />
                <span>(281) 612-7292</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
