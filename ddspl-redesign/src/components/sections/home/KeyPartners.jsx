// src/components/sections/KeyPartners/KeyPartners.jsx
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../../common/Container";

const partnerLogos = [
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253895/Screenshot_2026-09-01_140811_vqvg3s.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253895/Screenshot_2026-09-01_140903_ck7txh.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253896/Screenshot_2026-09-01_140936_js9qml.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253896/Screenshot_2026-09-01_141731_q5smik.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253896/Screenshot_2026-09-01_141700_f3cvpq.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253896/hyundai-logo-brand-symbol-with-name-white-design-south-korean-car-automobile-illustration-with-blue-background-free-vector_lnmant.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253896/Screenshot_2026-09-01_141013_ssn6il.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253896/Screenshot_2026-09-01_141105_louikd.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253896/Screenshot_2026-09-01_141135_ryvkiv.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253897/Screenshot_2026-09-01_141216_ww4yhr.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253897/Screenshot_2026-09-01_141819_rzcnc2.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253897/Screenshot_2026-09-01_141250_n7yhov.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253897/Screenshot_2026-09-01_142133_i5sgqw.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253897/Screenshot_2026-09-01_141930_gq0avs.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253897/Screenshot_2026-09-01_142007_g6tlgx.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253897/Screenshot_2026-09-01_142153_tqllb9.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253897/Screenshot_2026-09-01_141451_rhazhz.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253898/Screenshot_2026-09-01_141532_ga9nku.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253898/Screenshot_2026-09-01_142332_jga2an.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253898/Screenshot_2026-09-01_141332_osnswt.jpg",
  "https://res.cloudinary.com/k4uklwi4/image/upload/v1788253898/Screenshot_2026-09-01_142300_bubmwt.jpg",
];

// Split into 3 tracks of 7 logos each for balanced horizontal depth
const track1 = partnerLogos.slice(0, 7);
const track2 = partnerLogos.slice(7, 14);
const track3 = partnerLogos.slice(14, 21);

// Infinite Loop Row Component
const MarqueeRow = ({ items, direction = "left", speed = 25, startIndex = 1 }) => {
  const tripleItems = [...items, ...items, ...items]; // Ensures seamless infinite looping

  return (
    <div className="group flex overflow-hidden py-2 select-none">
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
        className="flex min-w-full shrink-0 gap-3 sm:gap-4 group-hover:[animation-play-state:paused]"
      >
        {tripleItems.map((logo, idx) => {
          const itemNumber = ((idx % items.length) + startIndex);
          return (
            <div
              key={idx}
              className="group/card relative flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-red-600/50 hover:bg-white/[0.05] hover:shadow-[0_10px_30px_rgba(220,38,38,0.18)] sm:h-28 sm:w-56"
            >
              {/* Partner Number Badge */}
              <span className="absolute left-3 top-2.5 font-mono text-[8px] tracking-widest text-white/20 transition-colors group-hover/card:text-red-400">
                {String(itemNumber).padStart(2, "0")}
              </span>

              {/* Logo Image */}
              <img
                src={logo}
                alt={`Partner ${itemNumber}`}
                loading="lazy"
                draggable={false}
                className="relative z-10 max-h-[50%] max-w-[75%] object-contain opacity-50 grayscale transition-all duration-500 group-hover/card:scale-105 group-hover/card:opacity-100 group-hover/card:grayscale-0"
              />

              {/* Red Hover Line Accent */}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-red-600 transition-all duration-300 group-hover/card:w-full" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default function KeyPartners() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-2 text-white sm:py-28 lg:py-10">
      
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <Container>
        {/* HEADER */}
        <div className="relative z-20 mb-12 flex flex-col items-center text-center sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-red-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
          Brand Trust
            </span>
            <span className="h-[2px] w-8 bg-red-600" />
          </div>

          <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tracking-tight">
            TRUSTED BY <br className="sm:hidden" />
            <span className="text-red-600">BRANDS.</span>
          </h2>
          
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/45 sm:text-[15px]">
            Delivering precision signage and spatial identity to leading manufacturers, retailers, and global institutions.
          </p>
        </div>
      </Container>

      {/* INFINITE MARQUEE STREAMS */}
      <div className="relative mx-auto flex w-full flex-col gap-2 overflow-hidden py-2">
        {/* Left & Right Edge Gradient Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#050505] to-transparent sm:w-32 lg:w-56" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#050505] to-transparent sm:w-32 lg:w-56" />

        {/* Row 1: Left */}
        <MarqueeRow items={track1} direction="left" speed={28} startIndex={1} />

        {/* Row 2: Right */}
        <MarqueeRow items={track2} direction="right" speed={34} startIndex={8} />

        {/* Row 3: Left */}
        <MarqueeRow items={track3} direction="left" speed={30} startIndex={15} />
      </div>

      
    </section>
  );
}