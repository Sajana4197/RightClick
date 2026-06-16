// src/components/sections/ContactSection.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  viewportOnce,
} from "../../animations/variants";

const CONTACT_INFO = [
  {
    icon: <FaPhone />,
    label: "Call Us",
    value: "(281) 612-7292",
    href: "tel:+12816127292",
  },
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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
              {CONTACT_INFO.map((item) => (
                <motion.a
                  key={item.label}
                  variants={fadeInUp}
                  href={item.href}
                  target={item.label === "Office" ? "_blank" : undefined}
                  rel={
                    item.label === "Office" ? "noopener noreferrer" : undefined
                  }
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
                {submitted ? "Message Sent!" : "Send Message"}
                <FaPaperPlane className="text-sm" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
