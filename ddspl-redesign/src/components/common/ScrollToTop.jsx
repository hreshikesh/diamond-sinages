// src/components/common/ScrollToTop/ScrollToTop.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Use `usePathname` from "next/navigation" if using Next.js App Router
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  
  // Track current route path
  const { pathname } = useLocation();

  // Auto-scroll to top and hide the button instantly on route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(false);
    setScrollProgress(0);
  }, [pathname]);

  // Track scroll position on current page
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      // Show button after scrolling down 300px
      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress percentage (0 - 100)
      if (totalHeight > 0) {
        const progress = (currentScroll / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG Circle calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[90] sm:bottom-8 sm:right-8"
        >
          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            whileHover={reduceMotion ? undefined : { y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-colors duration-300 hover:border-red-500/50 hover:bg-red-600 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] sm:h-14 sm:w-14"
          >
            {/* Circular Progress Ring (SVG) */}
            <svg
              className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none"
              viewBox="0 0 48 48"
            >
              {/* Background ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Animated Progress ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-red-500 transition-all duration-150 ease-out group-hover:stroke-white"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Bouncing Arrow Icon */}
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 flex items-center justify-center text-white"
            >
              <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
            </motion.span>

            {/* Hover Tooltip (Desktop) */}
            <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hidden md:block">
              Back to Top
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}