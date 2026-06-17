// src/components/sections/ContactSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaWhatsapp,
  FaTimes,
} from "react-icons/fa";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  viewportOnce,
} from "../../animations/variants";

// Two regional numbers — used for both "Call Us" display and WhatsApp routing
const REGIONS = [
  {
    id: "lk",
    label: "Sri Lanka",
    phoneDisplay: "+94 77 297 5000",
    phoneTel: "+94772975000",
    whatsapp: "94772975000",
    defaultMessage:
      "Hi RightClicks, I'd like to know more about your IT services.",
  },
  {
    id: "ca",
    label: "Canada",
    phoneDisplay: "+1 (250) 885-5678",
    phoneTel: "+12508855678",
    whatsapp: "12508855678",
    defaultMessage:
      "Hi RightClicks, I'd like to know more about your IT services.",
  },
];

const CONTACT_INFO_STATIC = [
  {
    icon: <FaEnvelope />,
    label: "Email Us",
    value: "info@RightClicks.lk",
    href: "mailto:info@rightclicks.lk",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic native validation already runs via required attrs on inputs.
    // Show the region picker so the visitor chooses where to send the message.
    setShowRegionPicker(true);
  };

  const sendToRegion = (regionId) => {
    const selectedRegion = REGIONS.find((r) => r.id === regionId) || REGIONS[0];

    const lines = [
      `New website inquiry`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.company ? `Company: ${form.company}` : null,
      ``,
      `Message:`,
      form.message,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/${selectedRegion.whatsapp}?text=${text}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setShowRegionPicker(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", phone: "", company: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="section-py bg-dark-900 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div
          className="absolute top-0 left-0 w-[55%] h-[60%] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 0% 0%, rgba(30,144,255,0.14) 0%, transparent 65%)",
          }}
        />
        {/* City skyline silhouette */}
        <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40 opacity-30 pointer-events-none">
          <svg
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <g fill="#1E90FF" fillOpacity="0.12">
              <rect x="0" y="60" width="60" height="100" />
              <rect x="70" y="30" width="50" height="130" />
              <rect x="130" y="80" width="40" height="80" />
              <rect x="180" y="20" width="55" height="140" />
              <rect x="245" y="55" width="45" height="105" />
              <rect x="300" y="40" width="35" height="120" />
              <rect x="345" y="70" width="60" height="90" />
              <rect x="415" y="15" width="50" height="145" />
              <rect x="475" y="50" width="40" height="110" />
              <rect x="525" y="35" width="55" height="125" />
              <rect x="590" y="65" width="45" height="95" />
              <rect x="645" y="25" width="50" height="135" />
              <rect x="705" y="55" width="40" height="105" />
              <rect x="755" y="40" width="60" height="120" />
              <rect x="825" y="70" width="35" height="90" />
              <rect x="870" y="20" width="55" height="140" />
              <rect x="935" y="55" width="45" height="105" />
              <rect x="990" y="35" width="50" height="125" />
              <rect x="1050" y="65" width="40" height="95" />
              <rect x="1100" y="45" width="55" height="115" />
              <rect x="1165" y="75" width="35" height="85" />
            </g>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16">
          {/* Left — heading + info */}
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p variants={fadeInUp} className="eyebrow mb-3">
              Contact Us
            </motion.p>
            <motion.h2 variants={fadeInUp} className="section-heading mb-5">
              Let's Build a Stronger,
              <br />
              More <span className="text-gradient-blue">Secure IT</span>{" "}
              Foundation
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="section-sub mb-10 max-w-md"
            >
              Ready to discuss your IT needs? Contact our team of experts today.
              We’re here to help you find the perfect technology solutions for
              your business.
            </motion.p>

            {/* Contact info cards */}
            <motion.div
              variants={staggerContainer(0.1, 0.1)}
              className="flex flex-col gap-5"
            >
              {/* Call Us — both regional numbers */}
              <motion.div
                variants={fadeInUp}
                className="flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-blue/12 border border-brand-blue/25 flex items-center justify-center text-brand-blue text-lg flex-shrink-0">
                  <FaPhone />
                </div>
                <div className="pt-1">
                  <p className="text-brand-blue text-xs font-semibold uppercase tracking-wider mb-1">
                    Call Us
                  </p>
                  {REGIONS.map((r) => (
                    <a
                      key={r.id}
                      href={`https://wa.me/${r.whatsapp}?text=${encodeURIComponent(r.defaultMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white text-sm sm:text-base font-medium leading-snug hover:text-brand-blue-light transition-colors duration-200"
                    >
                      <span className="text-neutral-500 text-xs font-normal w-16 flex-shrink-0">
                        {r.label}
                      </span>
                      {r.phoneDisplay}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Email + any other static items */}
              {CONTACT_INFO_STATIC.map((item) => (
                <motion.a
                  key={item.label}
                  variants={fadeInUp}
                  href={item.href}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-brand-blue/12 border border-brand-blue/25 flex items-center justify-center text-brand-blue text-lg flex-shrink-0 group-hover:bg-brand-blue/20 group-hover:shadow-blue-glow-sm transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="pt-1">
                    <p className="text-brand-blue text-xs font-semibold uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-white text-sm sm:text-base font-medium leading-snug group-hover:text-brand-blue-light transition-colors duration-200">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card p-7 sm:p-10 flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="bg-dark-600 border border-dark-400/60 rounded-lg px-5 py-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-dark-600 border border-dark-400/60 rounded-lg px-5 py-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="bg-dark-600 border border-dark-400/60 rounded-lg px-5 py-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={form.company}
                  onChange={handleChange}
                  className="bg-dark-600 border border-dark-400/60 rounded-lg px-5 py-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
                />
              </div>
              <textarea
                name="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
                rows={7}
                required
                className="bg-dark-600 border border-dark-400/60 rounded-lg px-5 py-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200 resize-none"
              />

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full justify-center mt-1 py-4 text-base"
              >
                Send via WhatsApp
                <FaWhatsapp className="text-base" />
              </motion.button>

              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm text-brand-blue-light"
                  >
                    WhatsApp opened — just hit send there to reach our team.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Region picker modal — appears after Send is clicked */}
      <AnimatePresence>
        {showRegionPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(5,10,20,0.75)" }}
            onClick={() => setShowRegionPicker(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-sm p-6 sm:p-7 relative"
            >
              <button
                onClick={() => setShowRegionPicker(false)}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-dark-400/60 flex items-center justify-center text-neutral-400 hover:text-white hover:border-brand-blue/50 transition-all duration-200"
              >
                <FaTimes className="text-sm" />
              </button>

              <h3 className="text-white font-bold text-lg mb-1.5">
                Choose a region
              </h3>
              <p className="text-neutral-400 text-sm mb-6">
                We'll open WhatsApp with your message ready to send.
              </p>

              <div className="flex flex-col gap-3">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => sendToRegion(r.id)}
                    className="flex items-center gap-3 w-full bg-dark-600 border border-dark-400/60 rounded-lg px-4 py-3.5 text-left hover:border-brand-blue/50 hover:bg-dark-500 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/12 border border-brand-blue/25 flex items-center justify-center text-brand-blue text-lg flex-shrink-0 group-hover:bg-brand-blue/20 transition-all duration-200">
                      <FaWhatsapp />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {r.label}
                      </p>
                      <p className="text-neutral-400 text-xs">
                        {r.phoneDisplay}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
