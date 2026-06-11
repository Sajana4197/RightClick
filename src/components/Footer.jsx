// src/components/Footer.jsx
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { scrollToSection } from '../hooks/useLenis'

const SERVICES = [
  'Managed IT Services',
  'Cybersecurity',
  'Cloud Solutions',
  'Server Management',
  'Help Desk Support',
  'IT Consulting',
]

const COMPANY = [
  { label: 'About Us', id: 'about' },
  { label: 'Careers', id: 'careers' },
  { label: 'Why RightClicks', id: 'why' },
  { label: 'News & Insights', id: 'reviews' },
]

const SUPPORT = [
  { label: 'Contact Us', id: 'contact' },
  { label: 'FAQ', id: 'contact' },
  { label: 'Case Studies', id: 'reviews' },
  { label: 'Resources', id: 'services' },
]

const SOCIALS = [
  { icon: <FaFacebookF />, href: '#' },
  { icon: <FaLinkedinIn />, href: '#' },
  { icon: <FaInstagram />, href: '#' },
  { icon: <FaYoutube />, href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-dark-900 border-t border-dark-400/40 relative overflow-hidden">
      {/* World map dot pattern background */}
      <div className="absolute bottom-0 right-0 w-[45%] h-[70%] opacity-[0.06] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(rgba(30,144,255,1) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
            maskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2.5 mb-4"
            >
              <div className="w-8 h-8 rounded-md bg-brand-blue flex items-center justify-center shadow-blue-glow-sm">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 2h6v6H2zM10 2h6v4h-6zM10 8h6v8h-6zM2 10h6v6H2z" fill="white"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Right<span className="text-brand-blue">Clicks</span>
              </span>
            </button>
            <p className="text-neutral-400 text-sm leading-relaxed mb-5 max-w-xs">
              RightClicks is a leading managed IT service provider helping businesses
              stay secure, productive, and prepared for the future.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-lg border border-dark-400/60 flex items-center justify-center text-neutral-400 hover:text-white hover:border-brand-blue/50 hover:bg-brand-blue/10 transition-all duration-300 text-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-neutral-400 text-sm hover:text-brand-blue transition-colors duration-200 text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {COMPANY.map((c) => (
                <li key={c.label}>
                  <button
                    onClick={() => scrollToSection(c.id)}
                    className="text-neutral-400 text-sm hover:text-brand-blue transition-colors duration-200 text-left"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">Support</h4>
            <ul className="flex flex-col gap-2.5">
              {SUPPORT.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className="text-neutral-400 text-sm hover:text-brand-blue transition-colors duration-200 text-left"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">Contact Us</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <FaPhone className="text-brand-blue text-xs mt-1 flex-shrink-0" />
                <a href="tel:+12816127292" className="text-neutral-400 text-sm hover:text-brand-blue transition-colors duration-200">
                  (281) 612-7292
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaEnvelope className="text-brand-blue text-xs mt-1 flex-shrink-0" />
                <a href="mailto:info@rightclicks.com" className="text-neutral-400 text-sm hover:text-brand-blue transition-colors duration-200 break-all">
                  info@rightclicks.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-brand-blue text-xs mt-1 flex-shrink-0" />
                <span className="text-neutral-400 text-sm leading-relaxed">
                  24043 Katy Fwy, Suite 200,<br />Katy, TX 77494
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-dark-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs">
            © {year} RightClicks. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-neutral-500 text-xs hover:text-brand-blue transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-500 text-xs hover:text-brand-blue transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
