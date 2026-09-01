// src/components/sections/MoreWork/MoreWork.jsx
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import automobileImage from "../../../assets/images/morework/automobile.webp";
import project from "../../../assets/images/morework/project.webp";
import furniture from "../../../assets/images/morework/furniture.webp";
import Container from "../../common/Container";

const CustomArrow = () => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const WORK_CARDS = [
  {
    title: "Automobile Showroom Signs",
    href: "/automobilesigns",
    image: automobileImage,
  },
  {
    title: "Project In Short Times",
    href: "/short-time-projects",
    image: project,
  },
  {
    title: "Furniture & Fixtures",
    href: "/furniture-fix",
    image: furniture,
  },
];

export default function MoreWork() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 lg:py-16"
    >
      {/* Background Ambience */}
      <motion.div 
        style={reduceMotion ? undefined : { y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-red-600/[0.04] blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
        />
      </motion.div>

      <Container>
        {/* Header Section */}
        <motion.div 
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex flex-col items-center text-center sm:mb-14"
        >
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-red-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Discover More
            </span>
            <span className="h-[2px] w-8 bg-red-600" />
          </div>

          <h2 className="mt-4 font-display text-[clamp(1.85rem,3.6vw,3.35rem)] font-bold leading-none tracking-tight text-white">
            SEE MORE OF <br className="sm:hidden" />
            <span className="text-red-600">OUR WORK.</span>
          </h2>
        </motion.div>

        {/* 3 CARDS IN A SINGLE ROW ACROSS ALL SCREENS (MOBILE & DESKTOP) */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-5 md:gap-6">
          {WORK_CARDS.map((card, index) => {
            const isActive = activeCard === index;

            return (
              <motion.a
                key={index}
                href={card.href}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileTap={{ scale: 0.96 }}
                onTouchStart={() => setActiveCard(index)}
                onTouchEnd={() => setActiveCard(null)}
                className={`group relative flex aspect-[3/5] w-full flex-col overflow-hidden rounded-[1.5rem] bg-[#0d0d0d] shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:aspect-[3/4] sm:rounded-[2.5rem] ${
                  isActive ? "-translate-y-1" : ""
                }`}
              >
                {/* Outer Glow on Hover / Mobile Touch */}
                <div 
                  className={`pointer-events-none absolute -inset-px rounded-[1.5rem] bg-gradient-to-b from-white/10 to-transparent transition-opacity duration-500 sm:rounded-[2.5rem] ${
                    isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                  }`} 
                />
                <div 
                  className={`pointer-events-none absolute -inset-px rounded-[1.5rem] bg-gradient-to-b from-red-500/50 to-red-900/10 transition-opacity duration-500 sm:rounded-[2.5rem] ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`} 
                />

                {/* Top Image Section */}
                <div className="absolute inset-x-0 top-0 h-[62%] w-full overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className={`h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 ${
                      isActive ? "scale-110" : ""
                    }`}
                  />
                  
                  {/* Gradient overlay to blend into card body */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0d0d0d] to-transparent sm:h-32" />
                </div>

                {/* Bottom Content Section */}
                <div className="relative z-10 mt-auto flex flex-col items-center justify-end px-2 pb-3.5 pt-4 text-center sm:px-5 sm:pb-6 sm:pt-10">
                  <h3 className="font-display text-[11px] font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-lg md:text-xl">
                    {card.title}
                  </h3>
                  
                  {/* Pill Button */}
                  <div 
                    className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-white/10 py-2 text-[8px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all duration-300 sm:mt-6 sm:max-w-[200px] sm:gap-3 sm:py-3.5 sm:text-[10px] sm:tracking-[0.2em] ${
                      isActive 
                        ? "bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]" 
                        : "group-hover:bg-red-600 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                    }`}
                  >
                    <span>Explore</span>
                    <span className={`transition-transform duration-300 group-hover:translate-x-1 ${isActive ? "translate-x-1" : ""}`}>
                      <CustomArrow />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}