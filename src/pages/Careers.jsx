// src/pages/Careers.jsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaChartLine,
  FaAward,
  FaLaptopHouse,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaBriefcase,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  viewportOnce,
} from "../animations/variants";
import { scrollToSection } from "../hooks/useLenis";

// ── Data ──────────────────────────────────────────────────────────────────
const DEPARTMENTS = [
  "All",
  "Engineering",
  "Support",
  "Sales",
  "Operations",
  "Security",
];

const JOBS = [
  {
    id: 1,
    title: "Senior Network Engineer",
    department: "Engineering",
    location: "Katy, TX",
    type: "Full-time",
    remote: "Hybrid",
    desc: "Design, implement, and maintain client network infrastructure including routing, switching, firewalls, and VPNs.",
    requirements: [
      "5+ years in network engineering or related field",
      "CCNA/CCNP certification preferred",
      "Experience with Cisco, Fortinet, or Meraki hardware",
      "Strong troubleshooting and documentation skills",
    ],
  },
  {
    id: 2,
    title: "Help Desk Technician (Tier 1)",
    department: "Support",
    location: "Katy, TX",
    type: "Full-time",
    remote: "On-site",
    desc: "Be the first point of contact for client IT issues — triaging tickets, resolving common problems, and escalating when needed.",
    requirements: [
      "1+ years in a help desk or IT support role",
      "Familiarity with Windows, macOS, and Microsoft 365",
      "Excellent communication and customer service skills",
      "CompTIA A+ a plus",
    ],
  },
  {
    id: 3,
    title: "Cybersecurity Analyst",
    department: "Security",
    location: "Remote (US)",
    type: "Full-time",
    remote: "Remote",
    desc: "Monitor client environments for threats, respond to incidents, and help harden security postures across our managed clients.",
    requirements: [
      "3+ years in a SOC or security analyst role",
      "Experience with SIEM tools and EDR platforms",
      "Security+ or equivalent certification",
      "Knowledge of compliance frameworks (HIPAA, PCI-DSS) a plus",
    ],
  },
  {
    id: 4,
    title: "Account Executive — IT Services",
    department: "Sales",
    location: "Katy, TX",
    type: "Full-time",
    remote: "Hybrid",
    desc: "Build relationships with local businesses, identify their IT pain points, and present RightClicks managed service solutions.",
    requirements: [
      "2+ years of B2B sales experience",
      "Understanding of managed IT services a plus",
      "Strong presentation and negotiation skills",
      "Self-motivated with a track record of hitting quota",
    ],
  },
  {
    id: 5,
    title: "Cloud Solutions Architect",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    remote: "Remote",
    desc: "Design and oversee migrations to Azure and AWS for clients, optimizing cost, performance, and security.",
    requirements: [
      "4+ years designing cloud infrastructure",
      "Azure or AWS certification required",
      "Experience with IaC (Terraform, ARM, CloudFormation)",
      "Client-facing communication experience",
    ],
  },
  {
    id: 6,
    title: "IT Operations Coordinator",
    department: "Operations",
    location: "Katy, TX",
    type: "Part-time",
    remote: "On-site",
    desc: "Support the operations team with scheduling, vendor coordination, inventory tracking, and ticket workflow management.",
    requirements: [
      "1+ years in an operations or admin support role",
      "Highly organized with strong attention to detail",
      "Comfortable with ticketing systems (ConnectWise, Autotask, etc.)",
      "Proficiency with Microsoft Office / Google Workspace",
    ],
  },
];

const BENEFITS = [
  {
    icon: <FaUsers />,
    title: "Collaborative Culture",
    desc: "Work with talented professionals in a supportive, inclusive environment.",
    image: "../../assets/images/medical.jpg",
  },
  {
    icon: <FaChartLine />,
    title: "Career Growth",
    desc: "Clear advancement paths and opportunities to take on new challenges.",
    image: "../../assets/images/401k.jpg",
  },
  {
    icon: <FaAward />,
    title: "Recognition",
    desc: "Your contributions are valued and rewarded through various recognition programs.",
    image: "../../assets/images/flexible-work.jpg",
  },
  {
    icon: <FaLaptopHouse />,
    title: "Remote Flexibility",
    desc: "Work from anywhere with our flexible remote-first policies.",
    image: "../../assets/images/growth.jpg",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────
export default function Careers() {
  const [activeDept, setActiveDept] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const deptMatch = activeDept === "All" || job.department === activeDept;
      const searchMatch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.department.toLowerCase().includes(search.toLowerCase());
      return deptMatch && searchMatch;
    });
  }, [activeDept, search]);

  return (
    <main className="bg-dark-900">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-[90vh] flex items-center">
        {/* Background image */}
        <img
          src="../../assets/images/career.png"
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.85)" }}
        />

        <div className="absolute inset-0 pointer-events-none">
          {/* Dark gradient overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,10,20,0.35) 0%, rgba(5,10,20,0.55) 50%, rgba(5,10,20,0.95) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-2 mb-5"
            >
              <FaBriefcase className="text-brand-blue text-sm" />
              <span className="eyebrow text-[11px]">
                Careers at RightClicks
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="font-extrabold leading-[1.08] tracking-tight text-white mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
            >
              Build Your Career.
              <br />
              Build Something{" "}
              <span className="text-gradient-blue">That Matters.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="section-sub max-w-2xl mx-auto mb-10"
            >
              Build the future of IT services with us. We're looking for
              passionate professionals who want to make a difference in how
              businesses leverage technology.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button
                onClick={() => scrollToSection("open-roles")}
                className="btn-primary"
              >
                View Open Roles <FaArrowRight className="text-xs" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="section-py bg-dark-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-dots opacity-25" />
          <div
            className="absolute bottom-0 left-0 w-[50%] h-[55%] opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 15% 85%, rgba(30,144,255,0.14) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute top-0 right-0 w-[40%] h-[45%] opacity-15"
            style={{
              background:
                "radial-gradient(ellipse at 90% 0%, rgba(30,144,255,0.18) 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="eyebrow mb-3">
              Why Work Here
            </motion.p>
            <motion.h2 variants={fadeInUp} className="section-heading">
              Benefits That Have{" "}
              <span className="text-gradient-blue">Your Back</span>
            </motion.h2>
          </motion.div>

          <FannedBenefitCards />
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section
        id="open-roles"
        className="section-py bg-dark-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-dots opacity-30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <motion.p variants={fadeInUp} className="eyebrow mb-3">
              Open Positions
            </motion.p>
            <motion.h2 variants={fadeInUp} className="section-heading">
              Find Your <span className="text-gradient-blue">Next Role</span>
            </motion.h2>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roles..."
                className="w-full bg-dark-600 border border-dark-400/60 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
              />
            </div>

            {/* Department chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all duration-200 ${
                    activeDept === dept
                      ? "bg-brand-blue text-white border-brand-blue shadow-blue-glow-sm"
                      : "bg-dark-600 text-neutral-300 border-dark-400/60 hover:border-brand-blue/40 hover:text-white"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job list */}
          <motion.div
            variants={staggerContainer(0.06, 0)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedJob(job)}
                    className="glass-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:border-brand-blue/40 transition-colors duration-300 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue bg-brand-blue/10 border border-brand-blue/20 rounded-full px-2.5 py-1">
                          {job.department}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 bg-dark-600 border border-dark-400/50 rounded-full px-2.5 py-1">
                          {job.remote}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-lg leading-snug mb-1.5">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 text-neutral-400 text-xs">
                        <span className="flex items-center gap-1.5">
                          <FaMapMarkerAlt className="text-brand-blue/70" />{" "}
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaClock className="text-brand-blue/70" /> {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-brand-blue text-sm font-semibold flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200">
                      View Details <FaArrowRight className="text-xs" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-neutral-400 text-sm mb-2">
                    No roles match your search right now.
                  </p>
                  <p className="text-neutral-500 text-xs">
                    Don't see the right fit? Send your resume to{" "}
                    <a
                      href="mailto:info@rightclicks.com"
                      className="text-brand-blue hover:underline"
                    >
                      info@rightclicks.com
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-py bg-dark-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-dots opacity-25" />
          <div
            className="absolute top-0 right-0 w-[50%] h-[50%] opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 85% 15%, rgba(30,144,255,0.14) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[45%] h-[50%] opacity-15"
            style={{
              background:
                "radial-gradient(ellipse at 10% 100%, rgba(30,144,255,0.16) 0%, transparent 65%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2 variants={fadeInUp} className="section-heading mb-4">
              Don't See the Right Role?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="section-sub mb-8 max-w-md mx-auto"
            >
              We're always looking for talented people. Send us your resume and
              tell us how you'd like to contribute.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a href="mailto:info@rightclicks.com" className="btn-primary">
                Email Your Resume <FaArrowRight className="text-xs" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Job Detail Modal ── */}
      <AnimatePresence>
        {selectedJob && (
          <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

// ── Job detail modal ─────────────────────────────────────────────────────
function JobModal({ job, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(5,10,20,0.75)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 rounded-lg border border-dark-400/60 flex items-center justify-center text-neutral-400 hover:text-white hover:border-brand-blue/50 transition-all duration-200"
        >
          <FaTimes className="text-sm" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue bg-brand-blue/10 border border-brand-blue/20 rounded-full px-2.5 py-1">
            {job.department}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 bg-dark-600 border border-dark-400/50 rounded-full px-2.5 py-1">
            {job.remote}
          </span>
        </div>

        <h2 className="text-white font-bold text-2xl leading-snug mb-3 pr-10">
          {job.title}
        </h2>

        <div className="flex items-center gap-5 text-neutral-400 text-sm mb-6">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-brand-blue/70" /> {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <FaClock className="text-brand-blue/70" /> {job.type}
          </span>
        </div>

        <p className="text-neutral-300 text-sm leading-relaxed mb-6">
          {job.desc}
        </p>

        <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
          What You'll Bring
        </h3>
        <ul className="flex flex-col gap-2.5 mb-8">
          {job.requirements.map((req) => (
            <li
              key={req}
              className="flex items-start gap-2.5 text-neutral-400 text-sm leading-relaxed"
            >
              <span className="text-brand-blue mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
              {req}
            </li>
          ))}
        </ul>

        <a
          href={`mailto:info@rightclicks.com?subject=Application: ${encodeURIComponent(job.title)}`}
          className="btn-primary w-full justify-center"
        >
          Apply for This Role <FaArrowRight className="text-xs" />
        </a>
      </motion.div>
    </motion.div>
  );
}

// ── Fanned Cards with Hover Effect (Why Work Here) ──────────────────────
function FannedBenefitCards() {
  const n = BENEFITS.length;
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = width < 768;

  // ── Mobile: plain stacked cards, no fan effect ──────────────────────────
  if (isMobile) {
    return (
      <motion.div
        variants={staggerContainer(0.08, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {BENEFITS.map((b) => (
          <motion.div
            key={b.title}
            variants={fadeInUp}
            className="relative rounded-2xl overflow-hidden border border-dark-400/60"
            style={{ height: "180px" }}
          >
            <img
              src={b.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.7)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(14,22,40,0) 0%, rgba(14,22,40,0.6) 45%, rgba(14,22,40,0.97) 85%)",
              }}
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-end gap-1.5 z-10">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-brand-blue text-base mb-1"
                style={{
                  background: "rgba(30,144,255,0.18)",
                  border: "1px solid rgba(30,144,255,0.3)",
                }}
              >
                {b.icon}
              </div>
              <h3
                className="text-white font-bold text-[15px]"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
              >
                {b.title}
              </h3>
              <p className="text-neutral-300 text-[12.5px] leading-snug">
                {b.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // ── Desktop / Tablet: fanned cards ───────────────────────────────────────
  const spread = width < 1024 ? 44 : 52;
  const step = spread / (n - 1);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex items-center justify-center w-full"
      style={{
        minHeight: "460px",
        paddingTop: "50px",
        overflow: "hidden",
      }}
    >
      <div
        className="hand"
        style={{
          display: "flex",
          gap: 0,
          transition: "300ms ease-out",
        }}
      >
        {BENEFITS.map((b, i) => {
          const rotate = i * step - spread / 2;
          return (
            <div
              key={b.title}
              className="fan-card"
              style={{ "--i": i, "--rot": `${rotate}deg` }}
            >
              <div className="fan-card-inner">
                {/* Background image — fades top to bottom */}
                <img
                  src={b.image}
                  alt=""
                  loading="lazy"
                  className="fan-card-img"
                />
                <div className="fan-card-img-fade" />

                {/* Content */}
                <div className="fan-card-content">
                  <div className="fan-card-icon">{b.icon}</div>
                  <h3 className="fan-card-title">{b.title}</h3>
                  <p className="fan-card-desc">{b.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .hand {
          counter-set: card 0;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          justify-content: center;
          flex-wrap: nowrap;
          overflow: visible;
        }
        .fan-card {
          position: relative;
          height: 290px;
          width: 0;
          flex-shrink: 0;
          counter-increment: card;
        }
        .fan-card-inner {
          top: 0;
          left: 50%;
          width: 180px;
          height: 280px;
          transform-origin: 50% 100%;
          transform: translateX(-50%) rotate(var(--rot));
          position: absolute;
          border-radius: 16px;
          border: 1px solid rgba(36,48,80,0.7);
          overflow: hidden;
          background: #0E1628;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
          transition: 300ms ease-out;
          cursor: default;
        }
        .fan-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(0.5) brightness(0.6);
          transform: scale(1.05);
          transition: filter 300ms ease-out, transform 300ms ease-out;
        }
        .fan-card-img-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(14,22,40,0) 0%, rgba(14,22,40,0.55) 45%, rgba(14,22,40,0.97) 85%);
        }
        .fan-card-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 0.7rem;
          padding: 1.25rem;
        }
        .fan-card-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(30,144,255,0.18);
          border: 1px solid rgba(30,144,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #005ce6;
          font-size: 18px;
          opacity: 0.6;
          transition: opacity 300ms ease-out;
        }
        .fan-card-title {
          font-size: 15px;
          font-weight: 700;
          color: #FFFFFF;
          opacity: 0.55;
          transition: opacity 300ms ease-out;
          margin: 0;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }
        .fan-card-desc {
          font-size: 12.5px;
          line-height: 1.5;
          color: #C8D4F0;
          opacity: 0;
          transition: opacity 300ms ease-out;
          margin: 0;
        }

        /* On hand hover — fan all cards out flat, fit within container width */
        .hand:hover {
          gap: 18px;
        }

        .hand:hover .fan-card {
          width: calc(100% / ${n});
        }
        .hand:hover .fan-card-inner {
          transform:
          translateX(-50%)
          rotate(0deg)
          translateY(-2%);
        }
        .hand:hover .fan-card-icon,
        .hand:hover .fan-card-title {
          opacity: 1;
        }
        .hand:hover .fan-card-img {
          filter: grayscale(0) brightness(0.75);
        }

        /* Individual card hover — lift up and reveal description */
        .hand:hover .fan-card:hover .fan-card-inner {
          transform: translateX(-50%) rotate(0deg) translateY(-18%) scale(1.03);
          border-color: rgba(30,144,255,0.5);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 24px rgba(30,144,255,0.25);
        }
        .hand:hover .fan-card:hover .fan-card-img {
          filter: grayscale(0) brightness(0.95);
          transform: scale(1);
        }
        .hand:hover .fan-card:hover .fan-card-desc {
          opacity: 1;
        }

        @media (max-width: 1200px) {
          .hand {
    gap: 6px !important;
    transform: scale(0.92);
    transform-origin: center;
  }

        }

        /* Tablet */
        @media (max-width: 1024px) {
          .fan-card { height: 264px; }
          .fan-card-inner { width: 140px; height: 210px; }
          .fan-card-content { padding: 1rem; gap: 0.5rem; }
          .fan-card-icon { width: 36px; height: 36px; font-size: 15px; }
          .fan-card-title { font-size: 13px; }
          .fan-card-desc { font-size: 11.5px; }
        }
          
        @media (max-width: 992px) {
          .hand {
    gap: 2px !important;
    transform: scale(0.82);
  }
        }
          
        @media (max-width: 768px) {

  .hand {

    gap: 0 !important;

    transform: scale(0.72);

    min-height: 420px;

    justify-content: center;

  }

  .fan-card {
    width: calc(100% / ${n}) !important;
  }

}
      `}</style>
    </motion.div>
  );
}
