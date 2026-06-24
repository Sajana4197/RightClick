// src/components/LoadingScreen.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Simulate progress that accelerates toward end
    // Real asset loading happens in background during this time
    const steps = [
      { target: 30, duration: 400 },
      { target: 60, duration: 500 },
      { target: 80, duration: 400 },
      { target: 95, duration: 600 },
      { target: 100, duration: 300 },
    ];

    let current = 0;
    let timeoutIds = [];

    const runStep = (index, currentProgress) => {
      if (index >= steps.length) return;
      const step = steps[index];
      const increment = (step.target - currentProgress) / 20;
      let val = currentProgress;

      const intervalId = setInterval(() => {
        val += increment;
        if (val >= step.target) {
          val = step.target;
          clearInterval(intervalId);

          if (index === steps.length - 1) {
            setProgress(100);
            const t = setTimeout(() => {
              setDone(true);
              setTimeout(() => onComplete?.(), 600);
            }, 200);
            timeoutIds.push(t);
          } else {
            const t = setTimeout(() => {
              runStep(index + 1, step.target);
            }, 80);
            timeoutIds.push(t);
          }
        }
        setProgress(Math.floor(val));
      }, step.duration / 20);
    };

    runStep(0, 0);

    return () => timeoutIds.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#050A14",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <img
              src="/Logo.webp"
              alt="RightClicks"
              style={{ width: "52px", height: "52px", objectFit: "contain" }}
            />
            <span
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Right<span style={{ color: "#1E90FF" }}>Clicks</span>
            </span>
          </motion.div>

          {/* Progress bar container */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              width: "220px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "3px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "99px",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: "99px",
                  background: "linear-gradient(to right, #1E90FF, #4DAAFF)",
                  boxShadow: "0 0 10px rgba(30,144,255,0.6)",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "linear" }}
              />
            </div>

            {/* Percentage */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "Inter, system-ui, sans-serif",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Loading
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#1E90FF",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {progress}%
              </span>
            </div>
          </motion.div>

          {/* Animated dots below the bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ display: "flex", gap: "6px" }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#1E90FF",
                  display: "block",
                }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
