// src/components/sections/AwardsHighlight/AwardsHighlight.jsx
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Trophy, Award, ArrowUpRight } from "lucide-react";

import Container from "../../common/Container";
import awardImage from "../../../assets/images/award/award.webp";
import martImage from "../../../assets/images/award/martaward.webp";
import allenImage from "../../../assets/images/award/allensolly.webp";
import titanImage from "../../../assets/images/award/titan.webp";
import peterImage from "../../../assets/images/award/peter.webp";

const AWARD_TITLE = "Award Winning Signage Excellence";

/* ---------------------------------------
   CONTENT
--------------------------------------- */
const AWARD_SIGNS = [
  {
    number: "01",
    title: "Mega Mart",
    metric: "2010",
    image: martImage,
  },
  {
    number: "02",
    title: "Titan",
    metric: "2011",
    image: titanImage,
  },
  {
    number: "03",
    title: "Allen Solly",
    metric: "2012",
    image: allenImage,
  },
  {
    number: "04",
    title: "Peter England",
    metric: "2013",
    image: peterImage,
  },
];

/* ---------------------------------------
   AWARD CARD (Taskello Style)
--------------------------------------- */
function AwardCard({ card, index, reduceMotion }) {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setIsTapped((prev) => !prev)}
      className="group relative aspect-[3/4] w-full cursor-pointer sm:aspect-square"
      style={{ perspective: "1200px" }}
    >
      {/* Outer card wrapper */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-[18px] border sm:rounded-[24px] bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-red-500/50 group-hover:shadow-[0_30px_60px_rgba(220,38,38,0.25)] ${
          isTapped ? "border-red-500/50 shadow-[0_30px_60px_rgba(220,38,38,0.25)]" : "border-white/10"
        }`}
      >
        {/* IMAGE HALF — top portion */}
        <div className="relative h-[55%] w-full overflow-hidden bg-black">
          <img
            src={card.image}
            alt={card.title}
            draggable={false}
            className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
              isTapped ? "scale-110" : ""
            }`}
          />
          {/* Subtle vignette for edge blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#610d0d] via-black/10 to-transparent opacity-80" />
        </div>

        {/* RED TEXT BODY — bottom portion */}
        <div className="relative flex h-[45%] flex-col justify-between p-3.5 sm:p-6 bg-gradient-to-b from-[#610d0d] to-[#2b0404]">
          {/* Notch cutout at top-left matching the red body */}
          <div
            className="absolute -top-6 left-0 flex flex-col justify-end rounded-tr-[16px] sm:rounded-tr-[24px] bg-[#610d0d] px-3.5 pb-1.5 pt-3 sm:-top-7 sm:px-6 sm:pb-2 sm:pt-4"
            style={{ minWidth: "75%" }}
          >
            <h3 className="font-syne text-sm font-bold leading-tight tracking-tight text-white sm:text-xl">
              {card.title}
            </h3>
          </div>

          {/* Bottom row: Number + Metric */}
          <div className="mt-auto flex items-end justify-between">
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="font-syne text-2xl font-bold leading-none text-white sm:text-5xl">
                {card.number}
              </span>
              <span className="font-outfit text-[10px] font-medium text-white/60 sm:text-xs">
                Award
              </span>
            </div>
            <div className="flex items-center gap-1 font-outfit text-[11px] font-semibold text-white/90 sm:gap-1.5 sm:text-xs">
              <span className="text-sm sm:text-lg">{card.metric}</span>
              <span className="text-[8px] uppercase tracking-widest text-white/50 sm:text-[9px]">
                Won
              </span>
            </div>
          </div>
        </div>

        {/* HOVER / TAP OVERLAY — FULL IMAGE POP OUT */}
        <div
          className={`pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[18px] sm:rounded-[24px] transition-opacity duration-500 group-hover:opacity-100 ${
            isTapped ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={card.image}
            alt=""
            className={`absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-100 ${
              isTapped ? "scale-100" : ""
            }`}
          />
          {/* Dark gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-between p-3.5 sm:p-6">
            <div className="flex justify-end">
              <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 font-outfit text-[8px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:px-3 sm:py-1 sm:text-[10px]">
                {card.metric}
              </span>
            </div>

            <div>
              <span className="font-syne text-3xl font-bold text-white/20 sm:text-5xl">
                {card.number}
              </span>
              <h3 className="font-syne text-lg font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-3xl">
                {card.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Corner ticks */}
        <span
          className={`pointer-events-none absolute left-3 top-3 z-30 h-2.5 w-2.5 border-l-2 border-t-2 border-white/50 transition-opacity duration-500 group-hover:opacity-100 sm:left-4 sm:top-4 sm:h-3 sm:w-3 ${
            isTapped ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          className={`pointer-events-none absolute bottom-3 right-3 z-30 h-2.5 w-2.5 border-b-2 border-r-2 border-white/50 transition-opacity duration-500 group-hover:opacity-100 sm:bottom-4 sm:right-4 sm:h-3 sm:w-3 ${
            isTapped ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </motion.div>
  );
}

/* ---------------------------------------
   MAIN COMPONENT
--------------------------------------- */
export default function AwardsHighlight() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.4,
  });

  // Long image parallax
  const heroY = useTransform(smoothProgress, [0, 1], ["5%", "-5%"]);
  const heroScale = useTransform(smoothProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-red-600/[0.06] blur-[150px]" />

      <Container>
        {/* HEADER & HERO IMAGE */}
        <div className="relative pt-24 sm:pt-32 lg:pt-40">
          <div className="mb-10 flex flex-col justify-between gap-8 sm:mb-14 lg:flex-row lg:items-end">
            <div>
              <div className="mb-1 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-red-600" />
                <span className="font-outfit text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Hall of Fame
                </span>
              </div>

              <motion.h2
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap gap-x-4 font-syne text-[clamp(2.5rem,7vw,6.5rem)] font-extrabold uppercase leading-none tracking-tight sm:gap-x-6"
              >
                <span className="text-white drop-shadow-lg">Award</span>
                <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                  Winning.
                </span>
              </motion.h2>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-8 lg:pb-2"
            >
              <div className="flex items-center gap-4">
                <Trophy size={28} className="text-red-500" />
                <div>
                  <div className="font-syne text-3xl font-bold sm:text-4xl">04</div>
                  <div className="font-outfit text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Awards Won
                  </div>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex items-center gap-4">
                <Award size={28} className="text-red-500" />
                <div>
                  <div className="font-syne text-3xl font-bold sm:text-4xl">25+</div>
                  <div className="font-outfit text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Years Legacy
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={reduceMotion ? undefined : { y: heroY, scale: heroScale }}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] sm:aspect-[21/9] lg:aspect-[24/9]"
          >
            <img
              src={awardImage}
              alt={AWARD_TITLE}
              className="block h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

            <motion.div
              className="absolute left-0 top-0 h-px w-full bg-red-600 shadow-[0_0_15px_rgba(215,25,32,0.9)]"
              animate={reduceMotion ? undefined : { y: ["0%", "8000%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <span className="font-outfit text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
                  Trophy
                </span>
                <p className="mt-1 font-syne text-xl font-bold text-white sm:text-2xl">
                  Signage Excellence
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
                <ArrowUpRight size={20} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2 CARDS PER ROW ON MOBILE, 4 ON DESKTOP */}
        <div className="relative py-14 sm:py-28">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-6">
            {AWARD_SIGNS.map((card, i) => (
              <AwardCard
                key={card.number}
                card={card}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}