// src/components/sections/SpecialtiesMarquee/SpecialtiesMarquee.jsx
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Container from "../../common/Container";

/* ---------------------------------------
   CONTENT: SPECIALIZED SIGNS
--------------------------------------- */
const SIGNS_DATA = [
  {
    title: "BACKLIT SIGNS",
    image:
      "https://res.cloudinary.com/k4uklwi4/image/upload/v1788254816/1_hqxra4.jpg",
    label: "Illuminated",
  },
  {
    title: "3D ILLUMINATED",
    image:
      "https://res.cloudinary.com/k4uklwi4/image/upload/v1788254816/2_trbqrp.jpg",
    label: "Dimensional",
  },
  {
    title: "ROOFTOP SIGNS",
    image:
      "https://res.cloudinary.com/k4uklwi4/image/upload/v1788254816/5_qh4fd9.jpg",
    label: "Skyline",
  },
  {
    title: "ACP SIGNS",
    image:
      "https://res.cloudinary.com/k4uklwi4/image/upload/v1788254816/2_trbqrp.jpg",
    label: "Structural",
  },
  {
    title: "STAINLESS STEEL",
    image:
      "https://res.cloudinary.com/k4uklwi4/image/upload/v1788254816/Screenshot_2026-09-01_145614_mutcrk.jpg",
    label: "Premium",
  },
];

/* ---------------------------------------
   REEL ROW COMPONENT
--------------------------------------- */
function ReelRow({ items, direction = "left", duration = 50, scrollOffset }) {
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  // Quadruple items to ensure a seamless infinite scroll across ultra-wide monitors
  const loop = [...items, ...items, ...items, ...items];

  return (
    <motion.div
      className="relative flex items-center gap-4 sm:gap-6"
      style={{ x: scrollOffset }}
    >
      <motion.div
        className="flex w-max items-center gap-4 sm:gap-6 touch-pan-x"
        animate={
          reduceMotion || isPaused
            ? undefined
            : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {loop.map((item, i) => (
          <motion.div
            key={`${item.title}-${i}`}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group relative aspect-[4/3] w-[260px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl transition-shadow duration-300 hover:shadow-red-950/40 active:border-red-500/50 sm:w-[340px] md:w-[400px] lg:aspect-[16/10] lg:w-[480px]"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-110 group-active:scale-105"
            />

            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70 group-active:opacity-80" />
            <div className="absolute inset-0 bg-red-900/20 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-red-600 transition-all duration-300 group-hover:w-10 group-active:w-8" />
                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-red-500 shadow-black drop-shadow-md sm:text-[9px]">
                  {item.label}
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-white shadow-black drop-shadow-lg sm:text-2xl lg:text-3xl">
                {item.title}
              </h3>
            </div>

            {/* Subtle Inner Ring */}
            <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-white/5 transition-colors duration-500 group-hover:border-white/20 group-active:border-red-500/30" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------
   MAIN COMPONENT
--------------------------------------- */
export default function SpecialtiesMarquee() {
  const sectionRef = useRef(null);

  // Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });

  // Parallax glides for the rows
  const glideRight = useTransform(smoothProgress, [0, 1], ["-10%", "5%"]);
  const glideLeft = useTransform(smoothProgress, [0, 1], ["5%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#020202] py-2 text-white sm:py-8 lg:py-6"
    >
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,28,28,0.1),transparent_70%)]" />

      {/* HEADER */}
      <Container className="relative z-20">
        <div className="mb-16 flex flex-col items-center text-center sm:mb-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-red-600" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">
              Expertise
            </span>
            <span className="h-px w-8 bg-red-600" />
          </div>

          <h2 className="mt-6 font-display text-[clamp(2.2rem,4vw,3.8rem)] font-bold leading-[1.0] tracking-tight">
            Specialized Sign <br className="sm:hidden" />
            <span className="text-red-600">Manufacturing.</span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
            From skyline-defining rooftop letters to precision stainless steel
            finishes. Engineered in-house by DDSPL.
          </p>
        </div>
      </Container>

      {/* TILTED REEL GALLERY */}
      <div className="relative flex w-full flex-col items-center justify-center">
        {/* Tilted Stage */}
        <div
          className="relative flex w-[120vw] -translate-x-[10vw] flex-col gap-4 sm:gap-6"
          style={{
            transform: "rotate(-6deg) scale(1.05)",
            transformOrigin: "center center",
          }}
        >
          {/* Row 1 */}
          <ReelRow
            items={SIGNS_DATA}
            direction="left"
            duration={45}
            scrollOffset={glideLeft}
          />

          {/* Row 2 (Reversed content) */}
          <ReelRow
            items={[...SIGNS_DATA].reverse()}
            direction="right"
            duration={55}
            scrollOffset={glideRight}
          />
        </div>

        {/* Edge Shadows to blend the reels into the dark background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#020202] via-[#020202]/80 to-transparent sm:w-48 lg:w-64" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#020202] via-[#020202]/80 to-transparent sm:w-48 lg:w-64" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#020202] to-transparent sm:h-32" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#020202] to-transparent sm:h-32" />
      </div>

      {/* FOOTER CTA */}
      <Container className="relative z-20 mt-16 sm:mt-24">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/40 sm:text-left sm:text-xs">
            Delivering spatial identity since 1998
          </p>

          <a
            href="/products"
            className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-red-500"
          >
            View all products
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all group-hover:border-red-500 group-hover:bg-red-600 group-active:scale-90">
              <ArrowUpRight size={16} />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}