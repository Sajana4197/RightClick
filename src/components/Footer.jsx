// src/components/Footer.jsx
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { scrollToSection, scrollToTop } from "../hooks/useLenis";
import useLangRoute, { stripLangPrefix } from "../hooks/useLangRoute";

// Single WhatsApp contact (Canada) — keep in sync with Navbar.jsx / ContactSection.jsx
const CONTACT = {
  phoneDisplay: "+1 (250) 885-5678",
  whatsapp: "12508855678",
};

const COMPANY_LINKS = [
  { key: "about", id: "about" },
  { key: "why", id: "why" },
  { key: "careers", path: "/careers" },
  // { key: "insights", id: "reviews" },
];

const SUPPORT_LINKS = [
  { key: "contact", id: "contact" },
  { key: "faq", id: "contact" },
  // { key: "caseStudies", id: "reviews" },
  { key: "resources", id: "services" },
];

const SOCIALS = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaLinkedinIn />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaYoutube />, href: "#" },
];

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { buildPath } = useLangRoute();
  const canonicalPath = stripLangPrefix(location.pathname);

  const SERVICES = t("footer.services", { returnObjects: true });

  const handleFooterNav = (id) => {
    if (id === "home") {
      if (canonicalPath !== "/") {
        navigate(buildPath("/"));
        setTimeout(() => scrollToTop(), 150);
      } else {
        scrollToTop();
      }
      return;
    }
    if (canonicalPath !== "/") {
      navigate(buildPath("/"));
      setTimeout(() => scrollToSection(id), 300);
    } else {
      scrollToSection(id);
    }
  };
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="bg-dark-900 border-t border-dark-400/40 relative overflow-hidden"
    >
      {/* Bottom background image */}
      <img
        src="../../assets/images/footer.webp"
        alt=""
        loading="lazy"
        className="absolute bottom-0 left-0 w-full h-auto object-cover pointer-events-none opacity-40"
        style={{
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />

      {/* World map dot pattern background */}
      <div className="absolute bottom-0 right-0 w-[45%] h-[70%] opacity-[0.06] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(rgba(30,144,255,1) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
            maskImage:
              "radial-gradient(ellipse at 70% 50%, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 70% 50%, black 30%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <button
              onClick={() => handleFooterNav("home")}
              className="flex items-center gap-2.5 mb-4"
            >
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-md">
                <img
                  src="/Logo.webp"
                  alt="RightClicks logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Right<span className="text-brand-blue">Clicks</span>
              </span>
            </button>
            <p className="text-neutral-400 text-sm leading-relaxed mb-5 max-w-xs">
              {t("footer.tagline")}
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
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              {t("footer.servicesHeading")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => handleFooterNav("services")}
                    className="
        text-neutral-400
        text-sm
        hover:text-brand-blue
        transition-colors
        duration-200
        text-left
        "
                  >
                    {s}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => handleFooterNav("services")}
                  className="inline-flex items-center gap-2 text-brand-blue text-sm font-medium hover:translate-x-1 transition-all duration-300"
                >
                  {t("footer.seeMore")}
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              {t("footer.companyHeading")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((c) => (
                <li key={c.key}>
                  <button
                    onClick={() => {
                      if (c.path) {
                        navigate(
                          buildPath(c.path),

                          {
                            state: {
                              scrollTop: true,
                            },
                          },
                        );
                      } else {
                        handleFooterNav(c.id);
                      }
                    }}
                    className="text-neutral-400 text-sm hover:text-brand-blue transition-colors duration-200 text-left"
                  >
                    {t(`footer.company.${c.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              {t("footer.supportHeading")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SUPPORT_LINKS.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => handleFooterNav(s.id)}
                    className="text-neutral-400 text-sm hover:text-brand-blue transition-colors duration-200 text-left"
                  >
                    {t(`footer.support.${s.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              {t("footer.contactHeading")}
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <FaWhatsapp className="text-brand-blue text-xs mt-1 flex-shrink-0" />
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t("navbar.whatsappMessage"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 text-sm hover:text-brand-blue transition-colors duration-200"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaEnvelope className="text-brand-blue text-xs mt-1 flex-shrink-0" />
                <a
                  href="mailto:info@rightclicks.lk"
                  className="text-neutral-400 text-sm hover:text-brand-blue transition-colors duration-200 break-all"
                >
                  info@RightClicks.lk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-dark-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs">
            {t("footer.copyright", { year })}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-neutral-500 text-xs hover:text-brand-blue transition-colors duration-200"
            >
              {t("footer.privacyPolicy")}
            </a>
            <a
              href="#"
              className="text-neutral-500 text-xs hover:text-brand-blue transition-colors duration-200"
            >
              {t("footer.termsOfService")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
