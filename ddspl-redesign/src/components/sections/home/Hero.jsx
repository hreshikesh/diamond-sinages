// src/components/sections/Hero/Hero.jsx
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import hero1 from "../../../assets/images/hero/hero1.webp";
import hero2 from "../../../assets/images/hero/hero2.webp";
import hero3 from "../../../assets/images/hero/hero3.webp";
import hero4 from "../../../assets/images/hero/hero4.webp";

const IMAGES = [hero1, hero2, hero3, hero4];
const UNSPLASH_BG =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80";

const MARQUEE_WORDS = [
  "IN-STORE BRANDING",
  "SIGNAGE SOLUTIONS",
  "RETAIL FIXTURES",
  "DIGITAL DISPLAYS",
  "WAYFINDING SYSTEMS",
  "CUSTOM FABRICATION",
  "ARCHITECTURAL IDENTITY",
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const revealVariants = {
  hidden: { y: "120%", opacity: 0, rotateZ: 3 },
  visible: {
    y: "0%",
    opacity: 1,
    rotateZ: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ---------------------------------------
   BOTTOM MARQUEE
--------------------------------------- */
const TickerMarquee = ({ scrollSpring }) => {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  const marqueeOpacity = useTransform(scrollSpring, [0, 0.9], [1, 0]);
  const marqueeY = useTransform(scrollSpring, [0, 1], ["0%", "-30%"]);

  return (
    <motion.div
      style={{ opacity: marqueeOpacity, y: marqueeY }}
      className="relative z-20 flex w-full overflow-hidden border-t border-red-500/20 bg-[#0a0a0a]/90 py-3.5 backdrop-blur-md sm:py-4"
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        className="flex w-max items-center whitespace-nowrap"
      >
        {words.map((word, i) => (
          <div key={i} className="flex items-center">
            <span className="mx-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 sm:mx-8 sm:text-xs">
              {word}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.9)]" />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

/* ---------------------------------------
   VERTICAL CAROUSEL
--------------------------------------- */
const VerticalCarousel = ({ scrollSpring }) => {
  const [isPaused, setIsPaused] = useState(false);

  const col1 = [...IMAGES, ...IMAGES, ...IMAGES];
  const col2 = [...IMAGES]
    .reverse()
    .concat([...IMAGES].reverse(), [...IMAGES].reverse());
  const col3 = [...IMAGES, ...IMAGES, ...IMAGES];

  const rotateX = useTransform(scrollSpring, [0, 1], [14, 40]);
  const rotateZ = useTransform(scrollSpring, [0, 1], [-12, -5]);
  const yShift = useTransform(scrollSpring, [0, 1], ["0%", "25%"]);

  return (
    <div
      className="relative flex h-full min-h-[380px] w-full items-center justify-center overflow-hidden py-4 sm:min-h-[440px] lg:min-h-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[120px]" />

      <motion.div
        className="relative flex items-center justify-center will-change-transform"
        style={{
          rotateX,
          rotateZ,
          y: yShift,
          skewX: 8,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
          gap: "clamp(12px, 1.8vw, 22px)",
        }}
      >
        <motion.div
          animate={{ y: ["0%", "-33.333%"] }}
          transition={{
            duration: isPaused ? 0 : 22,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex w-[120px] flex-col gap-4 sm:w-[155px] md:w-[185px] lg:w-[170px] xl:w-[205px]"
        >
          {col1.map((src, i) => (
            <CarouselCard key={i} src={src} aspect="4/3" delay={i * 0.03} />
          ))}
        </motion.div>

        <motion.div
          animate={{ y: ["-33.333%", "0%"] }}
          transition={{
            duration: isPaused ? 0 : 28,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex w-[120px] flex-col gap-4 sm:w-[155px] md:w-[185px] lg:w-[170px] xl:w-[205px]"
        >
          {col2.map((src, i) => (
            <CarouselCard
              key={i}
              src={src}
              aspect="3/4"
              delay={0.08 + i * 0.03}
            />
          ))}
        </motion.div>

        <motion.div
          animate={{ y: ["0%", "-33.333%"] }}
          transition={{
            duration: isPaused ? 0 : 34,
            ease: "linear",
            repeat: Infinity,
          }}
          className="hidden w-[100px] flex-col gap-4 md:flex lg:w-[130px] xl:w-[155px]"
        >
          {col3.map((src, i) => (
            <CarouselCard
              key={i}
              src={src}
              aspect="4/5"
              delay={0.15 + i * 0.03}
              dimmed
            />
          ))}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent sm:h-36" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent sm:h-36" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050505] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050505] to-transparent sm:w-20" />
    </div>
  );
};

function CarouselCard({ src, aspect, delay, dimmed }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: dimmed ? 0.4 : 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className="group relative w-full overflow-hidden rounded-xl border border-white/5 bg-zinc-900 shadow-[0_12px_35px_rgba(0,0,0,0.65)]"
      style={{ aspectRatio: aspect }}
    >
      <img
        src={src}
        alt="DDSPL showcase"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_0_1px_rgba(239,68,68,0.6),0_0_20px_rgba(239,68,68,0.3)] transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}

/* ---------------------------------------
   MAIN HERO
--------------------------------------- */
export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.5,
  });

  const bgScale = useTransform(smoothProgress, [0, 1], [1.05, 1.25]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#050505] pt-10"
    >
      {/* Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ scale: bgScale }}
      >
        <img
          src={UNSPLASH_BG}
          alt=""
          className="h-full w-full object-cover opacity-20 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/75 to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(220,38,38,0.12),transparent_55%)]" />
      </motion.div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:grid lg:grid-cols-12 lg:items-center">
        {/* LEFT COPY */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative flex flex-col justify-center px-5 pb-8 pt-24 sm:px-10 lg:col-span-7 lg:px-8 xl:px-12"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <div className="mb-5 overflow-hidden sm:mb-6">
              <motion.div
                variants={revealVariants}
                className="flex items-center gap-3"
              >
                <span className="h-px w-8 bg-red-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                  Diamond Display Solutions · Est. 1998
                </span>
              </motion.div>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[clamp(1.9rem,4.2vw,3.8rem)] font-bold leading-[1.06] tracking-tight text-white">
              <span className="block overflow-hidden py-0.5">
                <motion.span variants={revealVariants} className="block">
                  Transforming
                </motion.span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <motion.span variants={revealVariants} className="block">
                  Spaces Into
                </motion.span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  variants={revealVariants}
                  className="inline-block bg-gradient-to-r from-red-500 via-red-600 to-red-400 bg-clip-text text-transparent"
                >
                  Brand Experiences.
                </motion.span>
              </span>
            </h1>

            {/* Body */}
            <div className="mt-5 overflow-hidden sm:mt-6">
              <motion.p
                variants={revealVariants}
                className="max-w-md text-[clamp(0.9rem,1vw,1.05rem)] leading-relaxed text-zinc-300"
              >
                Pioneers in high-quality signage, retail fixtures, and in-store
                branding. Over two decades of excellence across India.
              </motion.p>
            </div>

            {/* CTAs — About Us + Products */}
            <div className="mt-8 overflow-hidden sm:mt-10">
              <motion.div
                variants={revealVariants}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                {/* Primary: About Us */}
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_0_0_rgba(220,38,38,0)] transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_28px_rgba(220,38,38,0.55)] sm:px-7 sm:text-sm"
                >
                  About Us
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={14} strokeWidth={2.2} />
                  </span>
                </Link>

                {/* Secondary: Products */}
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-white/[0.08] sm:px-7 sm:text-sm"
                >
                  Products
                  <ArrowRight
                    size={14}
                    strokeWidth={2.2}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </div>

            {/* Mini trust strip */}
           
          </motion.div>
        </motion.div>

        {/* RIGHT CAROUSEL */}
        <div className="relative h-[380px] w-full sm:h-[440px] lg:col-span-5 lg:h-[520px] xl:h-[560px]">
          <VerticalCarousel scrollSpring={smoothProgress} />
        </div>
      </div>

      <TickerMarquee scrollSpring={smoothProgress} />
    </section>
  );
}