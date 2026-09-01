// src/components/common/Preloader/Preloader.jsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoUrl from "../../assets/images/logo/logo.jpg";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | exit

  useEffect(() => {
    // Simulated progress (smooth, ease-out)
    const duration = 2200;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("exit");
        // Time to allow the red banner curtain opening animation to complete
        setTimeout(() => setLoading(false), 1100);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Ambient red glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[120px]" />

          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Corner marks */}
          <span className="absolute left-6 top-6 h-5 w-5 border-l border-t border-white/20 sm:left-10 sm:top-10" />
          <span className="absolute right-6 top-6 h-5 w-5 border-r border-t border-white/20 sm:right-10 sm:top-10" />
          <span className="absolute bottom-6 left-6 h-5 w-5 border-b border-l border-white/20 sm:bottom-10 sm:left-10" />
          <span className="absolute bottom-6 right-6 h-5 w-5 border-b border-r border-white/20 sm:bottom-10 sm:right-10" />

          {/* Top meta */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={phase === "exit" ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-6 top-6 flex items-center gap-3 sm:left-10 sm:top-10"
          >
            <span className="h-px w-6 bg-red-600" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
              Diamond Display Solutions
            </span>
          </motion.div>

          {/* Progress % top-right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute right-6 top-6 font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 sm:right-10 sm:top-10"
          >
            {String(progress).padStart(3, "0")}
          </motion.div>

          {/* CENTER CONTENT */}
          <div className="relative z-10 flex flex-col items-center px-6">
            {/* Logo mark with rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                phase === "exit"
                  ? { opacity: 0, scale: 0.9, y: -20 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8 flex h-24 w-24 items-center justify-center sm:mb-10 sm:h-28 sm:w-28"
            >
              {/* Outer dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-red-500/40"
              />
              {/* Soft pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.15, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-10px] rounded-full border border-red-500/20"
              />
              {/* Logo badge */}
              <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-[0_0_40px_rgba(220,38,38,0.25)] sm:h-20 sm:w-20 sm:rounded-3xl sm:p-2.5">
                <img
                  src={logoUrl}
                  alt="DDSPL"
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={
                phase === "exit"
                  ? { opacity: 0, y: -10 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-bold tracking-[-0.04em] text-white">
                DDSPL
              </h1>
              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.35em] text-white/40 sm:text-[10px]">
                Display · Signage · Identity
              </p>
            </motion.div>

            {/* Progress track */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={
                phase === "exit"
                  ? { opacity: 0 }
                  : { opacity: 1, width: "min(220px, 55vw)" }
              }
              transition={{ duration: 0.4 }}
              className="relative mt-10 h-[2px] overflow-hidden rounded-full bg-white/10 sm:mt-12"
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-700 via-red-500 to-red-400"
                style={{ width: `${progress}%` }}
              />
              <motion.div
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-400 shadow-[0_0_12px_rgba(239,68,68,0.9)]"
                style={{ left: `calc(${progress}% - 4px)` }}
              />
            </motion.div>

            {/* Status line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "exit" ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="mt-5 text-[9px] font-medium uppercase tracking-[0.28em] text-white/35"
            >
              {progress < 100 ? "Loading experience" : "Welcome"}
            </motion.p>
          </div>

          {/* Bottom strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 left-6 right-6 flex items-center justify-between sm:bottom-10 sm:left-10 sm:right-10"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
              Est. 1998 · Bangalore
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/30">
              v2.0
            </span>
          </motion.div>

          {/* RED BANNER SPLIT OPEN / CURTAIN EXIT ANIMATION */}
          <AnimatePresence>
            {phase === "exit" && (
              <>
                {/* Top Red Banner Panel (Slides UP) */}
                <motion.div
                  initial={{ y: "0%" }}
                  animate={{ y: "-100%" }}
                  transition={{
                    duration: 0.85,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.15,
                  }}
                  className="absolute inset-x-0 top-0 z-30 h-[50.5vh] bg-red-600 shadow-[0_10px_30px_rgba(220,38,38,0.5)]"
                />

                {/* Bottom Red Banner Panel (Slides DOWN) */}
                <motion.div
                  initial={{ y: "0%" }}
                  animate={{ y: "100%" }}
                  transition={{
                    duration: 0.85,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.15,
                  }}
                  className="absolute inset-x-0 bottom-0 z-30 h-[50.5vh] bg-red-600 shadow-[0_-10px_30px_rgba(220,38,38,0.5)]"
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}