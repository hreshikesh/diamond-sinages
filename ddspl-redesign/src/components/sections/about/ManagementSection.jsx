// src/components/sections/ManagementSection/ManagementSection.jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { User } from "lucide-react";
import Container from "../../common/Container";

const members = [
  {
    number: "01",
    name: "R.G. Venketesh",
    role: "Managing Director",
  },
  {
    number: "02",
    name: "Radhika Venketesh",
    role: "Finance Director",
  },
  {
    number: "03",
    name: "Shashi Kumar K K",
    role: "Chief Executive Officer",
  },
];

function LuminousCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative mx-auto flex w-full max-w-[280px] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080808] shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/12 sm:max-w-[300px] sm:rounded-[1.5rem]"
      style={{ aspectRatio: "3 / 3.6" }}
    >
      {/* HUD corners */}
      <span className="absolute left-2.5 top-2.5 h-3 w-3 rounded-tl-md border-l border-t border-white/25 transition-colors group-hover:border-red-500/70 sm:left-3.5 sm:top-3.5 sm:h-4 sm:w-4" />
      <span className="absolute right-2.5 top-2.5 h-3 w-3 rounded-tr-md border-r border-t border-white/25 transition-colors group-hover:border-red-500/70 sm:right-3.5 sm:top-3.5 sm:h-4 sm:w-4" />
      <span className="absolute bottom-2.5 left-2.5 h-3 w-3 rounded-bl-md border-b border-l border-white/25 transition-colors group-hover:border-red-500/70 sm:bottom-3.5 sm:left-3.5 sm:h-4 sm:w-4" />
      <span className="absolute bottom-2.5 right-2.5 h-3 w-3 rounded-br-md border-b border-r border-white/25 transition-colors group-hover:border-red-500/70 sm:bottom-3.5 sm:right-3.5 sm:h-4 sm:w-4" />

      {/* TOP: icon only */}
      <div className="relative z-20 flex flex-1 items-start justify-center pt-6 sm:pt-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md transition-all duration-500 group-hover:border-red-500/40 group-hover:bg-red-500/15 group-hover:shadow-[0_0_18px_rgba(220,38,38,0.35)] sm:h-10 sm:w-10">
          <User
            size={14}
            className="text-white/55 transition-colors group-hover:text-white sm:size-[16px]"
          />
        </div>
      </div>

      {/* MIDDLE: light bar + name sitting IN the light */}
      <div className="relative z-20 flex w-full flex-col items-center px-3 pb-6 sm:px-4 sm:pb-8">
        {/* Upward glow (behind name) */}
        <div className="pointer-events-none absolute bottom-[72%] left-[8%] h-16 w-[84%] bg-gradient-to-t from-red-600/35 via-red-500/10 to-transparent opacity-90 blur-md transition-all duration-500 group-hover:from-red-500/55 group-hover:opacity-100 sm:h-20" />

        {/* LED bar */}
        <div className="relative z-10 mx-auto h-[2px] w-[82%] rounded-full bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_-3px_12px_rgba(255,255,255,0.75)] transition-all duration-500 group-hover:via-red-100 group-hover:shadow-[0_-6px_20px_rgba(220,38,38,0.85)]" />

        {/* Hard shadow down */}
        <div className="pointer-events-none absolute left-0 top-[calc(28%+2px)] h-14 w-full bg-gradient-to-b from-black via-black/70 to-transparent sm:h-16" />

        {/* NAME — highlighted in the light zone */}
        <div className="relative z-20 mt-4 flex w-full flex-col items-center text-center sm:mt-5">
          <span className="mb-1.5 font-mono text-[8px] tracking-[0.22em] text-white/30 transition-colors group-hover:text-red-400/80 sm:text-[9px]">
            {member.number}
          </span>

          <h3
            className="font-display text-[clamp(0.7rem,2.1vw,1.15rem)] font-bold leading-tight tracking-tight text-white transition-all duration-500 group-hover:text-white"
            style={{
              textShadow:
                "0 0 24px rgba(255,255,255,0.35), 0 0 40px rgba(220,38,38,0.25)",
            }}
          >
            {member.name}
          </h3>

          {/* Designation under name */}
          <p className="mt-1.5 text-[clamp(0.55rem,1.1vw,0.7rem)] font-semibold uppercase tracking-[0.18em] text-white/45 transition-colors duration-500 group-hover:text-white/70">
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ManagementSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-16 text-white sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.07),transparent_50%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-7 bg-red-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">
              Leadership
            </span>
            <span className="h-[2px] w-7 bg-red-600" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-5 font-display text-[clamp(1.7rem,4.5vw,3.2rem)] font-bold uppercase leading-[0.92] tracking-tight"
          >
            The People <br />
            <span className="text-red-600">Behind DDSPL.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="mt-4 max-w-md text-xs leading-relaxed text-white/40 sm:text-sm"
          >
            Vision, experience, and a commitment to engineering standards behind
            every DDSPL solution.
          </motion.p>
        </div>

        {/* 3 cards — smaller, centered */}
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-2.5 sm:gap-5 lg:gap-7">
          {members.map((member, index) => (
            <LuminousCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}