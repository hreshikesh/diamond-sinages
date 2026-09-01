// src/components/sections/About/AboutIntro.jsx
import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-16 ${className}`}>
    {children}
  </div>
);

/* ---------------------------------------
   SCROLL-SCRUBBED TEXT (Apple Style Reveal)
--------------------------------------- */
const ScrubText = ({ text }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 55%"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] text-[clamp(1.05rem,1.5vw,1.65rem)] font-medium leading-relaxed"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        const color = useTransform(scrollYProgress, [start, end], ["#52525b", "#ffffff"]);

        return (
          <motion.span key={i} style={{ opacity, color }} className="relative inline-block">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

/* ---------------------------------------
   MAGNETIC BUTTON (GSAP Physics)
--------------------------------------- */
const MagneticButton = ({ children, href }) => {
  const btnRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const txt = textRef.current;
    if (!btn || !txt) return;

    const move = (e) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.4;
      const y = (e.clientY - top - height / 2) * 0.4;
      gsap.to(btn, { x, y, duration: 0.6, ease: "power3.out" });
      gsap.to(txt, { x: x * 0.5, y: y * 0.5, duration: 0.6, ease: "power3.out" });
    };

    const leave = () => {
      gsap.to([btn, txt], { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <a href={href} className="group inline-flex items-center gap-4 sm:gap-5">
      <div
        ref={btnRef}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/30 bg-black/50 backdrop-blur-md transition-colors duration-500 group-hover:border-red-600 group-hover:bg-red-600 sm:h-16 sm:w-16"
      >
        <span ref={textRef} className="text-red-500 transition-colors group-hover:text-white">
          <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
        </span>
      </div>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition-colors group-hover:text-white sm:tracking-[0.25em]">
        {children}
      </span>
    </a>
  );
};

/* ---------------------------------------
   MAIN ABOUT SECTION
--------------------------------------- */
export default function AboutIntro() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  const isHeadlineInView = useInView(headlineRef, { once: true, margin: "-10%" });

  // Section-wide Parallax (Controlled range to avoid overlap on stacked mobile views)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yearY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const headlineLines = [
    { text: "SIGNAGE", style: "text-white" },
    { text: "BUILT FROM", style: "text-zinc-600" },
    { text: "IDENTITY.", style: "text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-6 sm:py-4 lg:py-15 xl:py-44"
    >
      {/* Background Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -left-[10%] top-[30%] h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px] sm:h-[600px] sm:w-[600px] sm:blur-[150px]" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 xl:gap-24">
          {/* LEFT: Parallax Year */}
          <motion.div style={{ y: yearY }} className="flex flex-col justify-start">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="h-[2px] w-6 bg-red-600 sm:w-8" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 sm:tracking-[0.3em]">
                Who We Are
              </span>
            </div>

            <div className="group mt-6 cursor-pointer sm:mt-10 lg:mt-12" style={{ perspective: "1000px" }}>
              <motion.div
                className="font-display text-[clamp(4rem,10vw,11rem)] font-bold leading-none tracking-tighter text-red-600"
                whileHover={{ rotateY: 15, rotateX: 10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                1998
              </motion.div>
              <div className="mt-4 flex items-center gap-2.5 sm:mt-6 sm:gap-3">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-400 sm:tracking-[0.3em]">
                  Legacy of Excellence
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Headline, Scrub Text & Magnetic Button */}
          <div className="pt-2 lg:pt-4">
            <h2
              ref={headlineRef}
              className="font-display text-[clamp(2.3rem,5.5vw,6.5rem)] font-bold leading-[0.9] tracking-tight"
            >
              {headlineLines.map((line, i) => (
                <div key={i} className="overflow-hidden pb-1 sm:pb-2">
                  <motion.div
                    initial={{ y: "100%", rotate: 4 }}
                    animate={isHeadlineInView ? { y: "0%", rotate: 0 } : {}}
                    transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className={`block ${line.style} origin-bottom-left`}
                  >
                    {line.text}
                  </motion.div>
                </div>
              ))}
            </h2>

            <div className="mt-8 max-w-2xl sm:mt-12 lg:mt-14">
              {/* Apple-style Scrub Text Reveal */}
              <ScrubText text="Diamond Display Solutions has been delivering premium architectural signage and spatial identity solutions since 1998. Our capabilities span from technical design engineering through to custom fabrication and pan-India erection." />

              <div className="mt-10 sm:mt-14 lg:mt-16">
                <MagneticButton href="/about">Discover DDSPL</MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: 3D Scroll-Flip Cards (3 in a row on mobile & up) */}
        <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-6 lg:mt-20 lg:gap-8" style={{ perspective: "1500px" }}>
          {[
            { title: "Core Expertise", desc: "Architectural Signage" },
            { title: "Project Scope", desc: "Design to Erection" },
            { title: "Experience", desc: "25+ Years Legacy" },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateX: -30, y: 40 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.7, delay: i * 0.12, type: "spring", bounce: 0.3 }}
              className="group relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-3 sm:rounded-2xl sm:p-7 lg:p-8 backdrop-blur-sm transition-all hover:border-red-500/40 hover:bg-zinc-900/80"
              style={{ transformOrigin: "bottom" }}
            >
              <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-red-500 sm:text-[10px] sm:tracking-[0.25em]">
                {card.title}
              </span>
              <p className="mt-1.5 text-xs font-medium leading-snug text-white sm:mt-5 sm:text-xl">
                {card.desc}
              </p>
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-600/10 blur-3xl transition-all duration-500 group-hover:bg-red-600/30" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}