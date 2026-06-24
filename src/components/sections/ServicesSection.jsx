// src/components/sections/ServicesSection.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaDesktop,
  FaHeadset,
  FaCloud,
  FaServer,
  FaUserTie,
  FaShieldAlt,
  FaGraduationCap,
  FaNetworkWired,
  FaDatabase,
  FaRobot,
  FaCogs,
  FaLaptopCode,
  FaArrowRight,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeInUp, staggerContainer } from "../../animations/variants";
import { scrollToSection } from "../../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: <FaDesktop />,
    title: "Managed IT Services",
    desc: "As a proud partner of FullyManagedIT.com, our Managed IT Services take the hassle out of technology management. From proactive maintenance to expert support, we ensure your IT infrastructure runs smoothly, allowing you to focus on growing your business without disruptions.",
  },
  {
    icon: <FaHeadset />,
    title: "Help Desk Support — 24/7 (Remote / On-Site)",
    desc: "Our Help Desk Support provides quick, reliable assistance to keep your technology performing at its best, minimizing downtime and ensuring your business stays on track at all times.",
  },
  {
    icon: <FaUserTie />,
    title:
      "IT Consulting — Tailored IT Consulting to Drive Your Business Forward",
    desc: "We provide expert IT consulting and strategic guidance to help align your technology with your business objectives, ensuring maximum efficiency, innovation, and long-term growth.",
  },
  {
    icon: <FaServer />,
    title: "Server Management & Cloud Migrations",
    desc: "Migrating to the cloud can be daunting, but with our expert assistance, we ensure a seamless transition of key processes, applications, or infrastructure. Unlock cloud technology’s full potential to boost efficiency and drive business growth.",
  },
  {
    icon: <FaUserTie />,
    title: "Virtual IT Manager",
    desc: "Supercharge your business with our Virtual IT Manager service. Gain access to an experienced IT leader who streamlines your operations and handles all IT management tasks. Using ISO 20000 certification and the ITIL framework, we optimize your systems for security, cost-efficiency, and performance, so you can concentrate on scaling your business.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Cyber Security Assessments",
    desc: "Identify vulnerabilities before they’re exploited. Our comprehensive Cyber Security Assessments thoroughly evaluate your systems, pinpoint weaknesses, and simulate potential cyber attacks to strengthen your defenses and enhance your cyber resilience.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Employee Training & Compliance",
    desc: "Equip your team with the latest IT skills and ensure adherence to industry regulations through targeted training programs designed to empower your workforce and maintain compliance standards.",
  },
  {
    icon: <FaNetworkWired />,
    title: "Network Monitoring & Cyber Security",
    desc: "Protect your business from evolving cyber threats with proactive monitoring and comprehensive security management. We continuously safeguard your network to ensure data integrity and business continuity.",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Services & Data Management",
    desc: "Leverage the power of cloud computing with seamless migration, management, and disaster recovery solutions. Unlock flexibility and scalability to accelerate your business success.",
  },
  {
    icon: <FaRobot />,
    title: "Business Analyst with AI",
    desc: "Gain actionable insights and improve decision-making with AI-powered business analytics. Transform raw data into strategic intelligence to drive growth and efficiency.",
  },
  {
    icon: <FaCogs />,
    title: "Business Automation",
    desc: "Streamline operations by automating repetitive tasks, reducing errors, and saving time. Increase productivity and focus on high-value business activities.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Custom Web, Mobile Apps",
    desc: "Build web and mobile applications tailored to meet your unique business needs and improve user experience with scalable, secure, and modern solutions.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const stackRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const total = cards.length;

    const ctx = gsap.context(() => {
      // Set initial state — cards start below, off-screen, full size, no rotation
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: window.innerHeight,
          scale: 1,
          rotate: 0,
          opacity: i === 0 ? 1 : 1,
          zIndex: i + 1,
        });
      });
      // First card starts already in place (it's the "current" one)
      gsap.set(cards[0], { y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackRef.current,
          start: "center center",
          end: () => `+=${total * 500}`,
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // For each subsequent card, animate it sliding up to center & stacking
      for (let i = 1; i < total; i++) {
        // Slight stack offset so previous cards peek behind
        const stackOffset = i * 10;
        const stackScale = 1 - i * 0.035;

        tl.to(
          cards[i],
          {
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          i - 1,
        );

        // Push previous cards back slightly (scale down + move up a touch) as new one arrives
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cards[j],
            {
              scale: 1 - depth * 0.025,
              y: -(depth * 12),
              duration: 1,
              ease: "power2.out",
            },
            i - 1,
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-dark-900 overflow-hidden"
    >
      <div
        ref={pinRef}
        className="
    relative
    min-h-screen
    flex
    items-center
    overflow-hidden
    pt-12
    sm:pt-16
    lg:pt-0
  "
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Sticky text content */}
            <motion.div
              variants={staggerContainer(0.1, 0.05)}
              initial="hidden"
              animate="visible"
              className="order-1"
            >
              <motion.p variants={fadeInUp} className="eyebrow mb-3">
                Our Services
              </motion.p>
              <motion.h2 variants={fadeInUp} className="section-heading mb-5">
                Comprehensive IT{" "}
                <span className="text-gradient-blue">Solutions</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="section-sub mb-4 max-w-md"
              >
                From proactive monitoring to strategic consulting, RightClicks
                delivers a full suite of managed IT services designed to keep
                your business secure, efficient, and ready to scale.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="section-sub mb-8 max-w-md"
              >
                Every service is backed by our expert team and a commitment to
                fast, transparent, and reliable support — so you can focus on
                growth while we handle your technology.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="btn-primary"
                >
                  Get a Free Consultation <FaArrowRight className="text-xs" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right — Stacking cards */}
            <div
              ref={stackRef}
              className="
relative
order-2
h-[500px]
sm:h-[560px]
lg:h-[460px]
flex
items-center
justify-center
"
              style={{ perspective: "1200px" }}
            >
              {SERVICES.map((service, i) => (
                <div
                  key={service.title}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="absolute w-full max-w-md"
                  style={{ willChange: "transform" }}
                >
                  <ServiceCard service={service} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  return (
    <div
      className="w-full rounded-2xl border border-dark-400/60 p-6 sm:p-7"
      style={{
        background: "#0E1628",
        boxShadow:
          "0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(30,144,255,0.08)",
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-brand-blue/25"
          style={{
            background: "rgba(30,144,255,0.12)",
            boxShadow: "0 0 16px rgba(30,144,255,0.2)",
          }}
        >
          <span className="text-xl text-brand-blue">{service.icon}</span>
        </div>
        <span
          className="text-4xl font-black leading-none select-none ml-auto"
          style={{ color: "rgba(30,144,255,0.15)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-white font-bold text-lg mb-2 leading-snug">
        {service.title}
      </h3>
      <p className="text-neutral-400 text-sm leading-relaxed mb-5">
        {service.desc}
      </p>

      <div
        className="absolute bottom-0 left-0 h-[2px] w-full rounded-b-2xl"
        style={{
          background: "linear-gradient(to right, #1E90FF, transparent 70%)",
        }}
      />
    </div>
  );
}
