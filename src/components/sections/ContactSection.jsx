// src/components/sections/ContactSection.jsx
import { Fragment, Suspense, lazy, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaCommentDots,
  FaBolt,
  FaShieldAlt,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  viewportOnce,
} from "../../animations/variants";
import SendButton from "../SendButton";

// Leaflet is heavy — keep it out of this section's chunk
const ServiceAreaMap = lazy(() => import("../ServiceAreaMap"));

// Single WhatsApp/phone contact (Canada) — keep in sync with Navbar.jsx / Footer.jsx
const CONTACT = {
  phoneDisplay: "+1 (250) 885-5678",
  phoneTel: "+12508855678",
  whatsapp: "12508855678",
};

// Email address is not translated
const CONTACT_INFO_META = [
  {
    icon: <FaEnvelope />,
    value: "info@RightClicks.lk",
    href: "mailto:info@rightclicks.lk",
  },
];

// Floating trust/feature cards shown over the left-panel image
const HIGHLIGHTS_META = [
  { id: "fastResponse", icon: <FaBolt /> },
  { id: "secureConsultation", icon: <FaShieldAlt /> },
  { id: "globalSupport", icon: <FaGlobe /> },
];

// City names are proper nouns — only the group labels are translated
const SERVICE_AREAS = [
  {
    id: "britishColumbia",
    cities: [
      { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
      { name: "Richmond", lat: 49.1666, lng: -123.1336 },
      { name: "New Westminster", lat: 49.2057, lng: -122.911 },
      { name: "Surrey", lat: 49.1913, lng: -122.849 },
      { name: "Langley", lat: 49.1044, lng: -122.6603 },
      { name: "White Rock / South Surrey", lat: 49.0255, lng: -122.8029 },
    ],
  },
  {
    id: "victoria",
    cities: [
      { name: "Nanaimo", lat: 49.1659, lng: -123.9401 },
      { name: "Courtenay", lat: 49.6841, lng: -124.9936 },
      { name: "Campbell River", lat: 50.0244, lng: -125.2475 },
      { name: "Kamloops", lat: 50.6745, lng: -120.3273 },
      { name: "Merritt", lat: 50.1128, lng: -120.7862 },
      { name: "Kelowna", lat: 49.888, lng: -119.496 },
      { name: "Vernon", lat: 50.267, lng: -119.272 },
      { name: "Penticton", lat: 49.4991, lng: -119.5937 },
    ],
  },
];

const ALL_CITIES = SERVICE_AREAS.flatMap((area) => area.cities);

export default function ContactSection() {
  const { t } = useTranslation();
  const CONTACT_INFO_STATIC = CONTACT_INFO_META.map((c) => ({
    ...c,
    label: t("contact.emailUs"),
  }));
  const HIGHLIGHTS = HIGHLIGHTS_META.map((h) => ({
    ...h,
    title: t(`contact.highlights.${h.id}.title`),
    subtitle: t(`contact.highlights.${h.id}.subtitle`),
  }));

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
    // Basic native validation already runs via required attrs on inputs.
    const lines = [
      t("contact.whatsappMessage.inquiry"),
      `${t("contact.whatsappMessage.name")}: ${form.name}`,
      `${t("contact.whatsappMessage.email")}: ${form.email}`,
      form.phone ? `${t("contact.whatsappMessage.phone")}: ${form.phone}` : null,
      form.company
        ? `${t("contact.whatsappMessage.company")}: ${form.company}`
        : null,
      ``,
      `${t("contact.whatsappMessage.message")}:`,
      form.message,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${text}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

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
              src="/assets/videos/contact.mp4"
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
                {t("contact.eyebrow")}
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
                {t("contact.headlineLine1")}
                <br />
                {t("contact.headlineLine2")}{" "}
                <span className="text-gradient-blue">
                  {t("contact.headlineHighlight")}
                </span>{" "}
                {t("contact.headlineLine2Suffix")}
              </motion.h2>
              <motion.p variants={fadeInUp} className="section-sub max-w-md">
                {t("contact.paragraph")}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col gap-2.5 mt-5"
              >
                {HIGHLIGHTS.map((h) => (
                  <div
                    key={h.id}
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
                    placeholder={t("contact.form.namePlaceholder")}
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
                    placeholder={t("contact.form.emailPlaceholder")}
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
                    placeholder={t("contact.form.phonePlaceholder")}
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
                    placeholder={t("contact.form.companyPlaceholder")}
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
                  placeholder={t("contact.form.messagePlaceholder")}
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

              <div className="flex justify-center mt-1">
                <SendButton type="submit">{t("contact.form.sendButton")}</SendButton>
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm text-brand-blue-light"
                  >
                    {t("contact.form.submitted")}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-5">
              <span className="flex-1 h-px bg-dark-400/60" />
              <span className="text-[11px] tracking-widest text-neutral-500 uppercase whitespace-nowrap">
                {t("contact.divider")}
              </span>
              <span className="flex-1 h-px bg-dark-400/60" />
            </div>

            {/* Contact info row */}
            <div className="grid sm:grid-cols-2 gap-6 text-center">
              {/* Call Us */}
              <div className="flex flex-col items-center px-2 sm:border-r sm:border-dark-400/40 group">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/12 border border-brand-blue/25 flex items-center justify-center text-brand-blue text-lg mb-3 group-hover:bg-brand-blue/20 group-hover:shadow-blue-glow-sm transition-all duration-300">
                  <FaPhone />
                </div>
                <p className="text-brand-blue text-xs font-semibold uppercase tracking-wider mb-2">
                  {t("contact.callUs")}
                </p>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t("navbar.whatsappMessage"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold text-sm hover:text-brand-blue-light transition-colors duration-300"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center px-2">
                {CONTACT_INFO_STATIC.map((item) => (
                  <a
                    key={item.href}
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

            {/* Service areas */}
            <div className="mt-6 pt-5 border-t border-dark-400/40">
              <div className="flex items-center gap-2.5 mb-4">
                <FaMapMarkerAlt className="text-brand-blue text-xs flex-shrink-0" />
                <p className="text-brand-blue text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  {t("contact.serviceAreas.heading")}
                </p>
                <span className="flex-1 h-px bg-gradient-to-r from-brand-blue/30 to-transparent" />
              </div>

              <div className="grid lg:grid-cols-[1.15fr_1fr] gap-4 items-start">
                <div className="h-[260px] rounded-xl overflow-hidden border border-brand-blue/15">
                  <Suspense
                    fallback={<div className="w-full h-full bg-dark-900" />}
                  >
                    <ServiceAreaMap
                      cities={ALL_CITIES}
                      ariaLabel={t("contact.serviceAreas.mapLabel")}
                    />
                  </Suspense>
                </div>

                <div className="grid gap-4">
                  {SERVICE_AREAS.map((area) => (
                    <div
                      key={area.id}
                      className="border-l-2 border-brand-blue/40 pl-3.5"
                    >
                      <p className="text-white text-[13px] font-semibold mb-1.5">
                        {t(`contact.serviceAreas.groups.${area.id}`)}
                      </p>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        {area.cities.map((city, i) => (
                          <Fragment key={city.name}>
                            {i > 0 && (
                              <span className="text-brand-blue/50 mx-1.5">
                                ·
                              </span>
                            )}
                            {city.name}
                          </Fragment>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
