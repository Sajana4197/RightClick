// src/components/sections/ContactSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaWhatsapp,
  FaTimes,
  FaUser,
  FaBuilding,
  FaCommentDots,
  FaBolt,
  FaShieldAlt,
  FaGlobe,
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

// Floating trust/feature cards shown over the left-panel image
const HIGHLIGHTS = [
  {
    icon: <FaBolt />,
    title: "Fast Response",
    subtitle: "We reply within 24 hours",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Consultation",
    subtitle: "Your data and privacy are our priority",
  },
  {
    icon: <FaGlobe />,
    title: "Global Support",
    subtitle: "Serving clients across the globe",
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single outer card split into two zones: image/copy on the left, form+info on the right */}
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative rounded-[32px] border border-brand-blue/15 overflow-hidden grid lg:grid-cols-[0.62fr_1fr]"
          style={{
            background: "linear-gradient(180deg,#020816 0%,#031022 100%)",
          }}
        >
          {/* Left — image + heading + intro */}
          <motion.div
            variants={fadeInLeft}
            className="relative px-8 sm:px-10 pt-8 pb-8 flex flex-col justify-center overflow-hidden"
          >
            {/* Background image */}
            <video
              src="../../assets/videos/contact.mp4"
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover object-bottom opacity-95 pointer-events-none"
            />
            {/* Dark overlay for text readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, rgba(3,10,30,.15) 0%, rgba(3,10,30,.32) 35%, rgba(3,10,30,.88) 100%)`,
              }}
            />

            <div className="relative z-10 max-w-[420px]">
              <motion.p variants={fadeInUp} className="eyebrow mb-2">
                Contact Us
              </motion.p>
              <motion.span
                variants={fadeInUp}
                className="block w-9 h-[3px] rounded-full bg-brand-blue mb-5"
              />
              <motion.h2
                variants={fadeInUp}
                className="font-extrabold text-white mb-4"
                style={{ fontSize: "34px", lineHeight: 1.2 }}
              >
                Let's Build a Stronger,
                <br />
                More <span className="text-gradient-blue">Secure IT</span>{" "}
                Foundation
              </motion.h2>
              <motion.p variants={fadeInUp} className="section-sub max-w-md">
                Have questions or ready to get started? We're here to help.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col gap-2.5 mt-5"
              >
                {HIGHLIGHTS.map((h) => (
                  <div
                    key={h.title}
                    className="flex items-center gap-3 bg-dark-900/50 border border-brand-blue/15 rounded-xl px-4 py-2.5 backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center text-brand-blue text-base flex-shrink-0">
                      {h.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold leading-snug">
                        {h.title}
                      </p>
                      <p className="text-neutral-400 text-xs leading-snug">
                        {h.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right — form + contact info, in one card */}
          <motion.div
            variants={fadeInRight}
            className="relative m-3 lg:m-4 rounded-[26px] glass-card border border-brand-blue/10 backdrop-blur-xl p-5 sm:p-6 shadow-[0_0_40px_rgba(0,120,255,0.08)]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-600 border border-dark-400/60 rounded-lg pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-600 border border-dark-400/60 rounded-lg pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FaPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-dark-600 border border-dark-400/60 rounded-lg pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
                  />
                </div>
                <div className="relative">
                  <FaBuilding className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm" />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full bg-dark-600 border border-dark-400/60 rounded-lg pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="relative">
                <FaCommentDots className="pointer-events-none absolute left-4 top-4 text-neutral-500 text-sm" />
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handleChange}
                  onWheel={(e) => {
                    const el = e.currentTarget;

                    const canScroll = el.scrollHeight > el.clientHeight;

                    if (!canScroll) return;

                    const atTop = el.scrollTop <= 0;

                    const atBottom =
                      el.scrollTop + el.clientHeight >= el.scrollHeight;

                    if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
                      return;
                    }

                    e.stopPropagation();
                  }}
                  rows={5}
                  required
                  className="w-full bg-dark-600 border border-dark-400/60 rounded-lg pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200 resize-none overflow-y-auto overscroll-auto"
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-fit min-w-[260px] mx-auto justify-center mt-1 py-3.5 text-sm shadow-[0_0_30px_rgba(30,144,255,0.35)]"
              >
                Send Message
                <FaPaperPlane className="text-sm" />
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

            {/* Divider */}
            <div className="flex items-center gap-4 my-5">
              <span className="flex-1 h-px bg-dark-400/60" />
              <span className="text-[11px] tracking-widest text-neutral-500 uppercase whitespace-nowrap">
                Or contact us directly
              </span>
              <span className="flex-1 h-px bg-dark-400/60" />
            </div>

            {/* Contact info row */}
            <div className="grid sm:grid-cols-2 gap-6 text-center">
              {/* Call Us — both regional numbers */}
              <div className="flex flex-col items-center px-2 sm:border-r sm:border-dark-400/40 group">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/12 border border-brand-blue/25 flex items-center justify-center text-brand-blue text-lg mb-3 group-hover:bg-brand-blue/20 group-hover:shadow-blue-glow-sm transition-all duration-300">
                  <FaPhone />
                </div>
                <p className="text-brand-blue text-xs font-semibold uppercase tracking-wider mb-2">
                  Call Us
                </p>
                <div className="flex flex-col items-center gap-1.5">
                  {REGIONS.map((r) => (
                    <a
                      key={r.id}
                      href={`https://wa.me/${r.whatsapp}?text=${encodeURIComponent(r.defaultMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:translate-x-1 transition-all duration-300"
                    >
                      <span className="text-white font-semibold hover:text-brand-blue-light transition-colors duration-300S">
                        {r.phoneDisplay}
                      </span>

                      <span className="text-neutral-500 text-xs font-normal transition-colors duration-300S">
                        ({r.label})
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center px-2">
                {CONTACT_INFO_STATIC.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex flex-col items-center group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/12 border border-brand-blue/25 flex items-center justify-center text-brand-blue text-lg mb-3 group-hover:bg-brand-blue/20 group-hover:shadow-blue-glow-sm transition-all duration-300">
                      {item.icon}
                    </div>
                    <p className="text-brand-blue text-xs font-semibold uppercase tracking-wider mb-2">
                      {item.label}
                    </p>
                    <p className="text-white text-sm font-semibold leading-snug group-hover:text-brand-blue-light transition-colors duration-200 break-all">
                      {item.value}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
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
