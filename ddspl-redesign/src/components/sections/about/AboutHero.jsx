// src/pages/About/AboutHero.jsx
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

import Container from "../../common/Container";
import aboutImage from "../../../assets/images/about/aboutImage.webp";

const STORY = [
  "Diamond Display Solutions Pvt. Ltd is a name synonymous with pioneering achievement in the Sign industries all over India.",
  "Established and commenced operations in 1998 with just 10 employees, driven by a mission to achieve excellence in sign fabrication. Today, the company employs over 250+ professionals and stands as a leading signage solutions provider across all segments.",
  "Our latest developments include specializations in sign fabrications for corporate identity elements in the automotive sector and international retail brands.",
  "DDSPL distinguishes itself in providing appropriate, lasting sign solutions—from simple to complex needs—covering everything from design to erection as per client requirements, dedicated to the highest standards of quality and installation services.",
  "We cater to varied requirements across sectors, ensuring quality products and services delivered with complete transparency and confidentiality. Our rigid approach toward quality standards has given us an edge over others in the market.",
  "Backed by the latest technology and machinery, we serve our clients with a superior range of products. It is the devotion and tireless efforts of our talented and experienced team of professionals that allow us to maintain exceptional quality standards.",
];

export default function AboutHero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
  });

  const imageY = useTransform(smooth, [0, 1], ["3%", "-3%"]);
  const imageScale = useTransform(smooth, [0, 0.5, 1], [1.03, 1, 1.02]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(220,38,38,0.09),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container>
        {/* ========================================
            1. TITLE LEFT + IMAGE RIGHT
        ======================================== */}
        <div className="grid items-center gap-10 pt-28 pb-14 sm:gap-12 sm:pt-36 sm:pb-16 lg:grid-cols-12 lg:gap-14 lg:pt-40 lg:pb-20">
          
          {/* LEFT — Title / Quote */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <span className="h-px w-8 bg-red-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">
                About DDSPL
              </span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              Our Philosophy
            </p>

            <h1 className="mt-4 font-display text-[clamp(2rem,4.2vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              We'll help you to
              <br />
              build your{" "}
              <span className="text-red-600">Brand.</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:mt-6 sm:text-[15px] sm:leading-7">
              Diamond Display Solutions Pvt. Ltd — pioneering achievement in the
              sign industries across India. From design to erection, lasting
              solutions with uncompromising quality.
            </p>

            {/* Compact trust chips */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              <span>
                <span className="text-red-500">25+</span> Years
              </span>
              <span className="text-white/15">·</span>
              <span>
                <span className="text-red-500">250+</span> Team
              </span>
              <span className="text-white/15">·</span>
              <span>
                <span className="text-red-500">5000+</span> Projects
              </span>
            </div>
          </motion.div>

          {/* RIGHT — Image */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <motion.div
              style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:aspect-[16/11] sm:rounded-3xl lg:aspect-[5/4]"
            >
              <img
                src={aboutImage}
                alt="Diamond Display Solutions"
                className="h-full w-full object-contain"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.14),transparent_45%)]" />

              {!reduceMotion && (
                <motion.div
                  className="absolute left-0 top-0 h-px w-full bg-red-600 shadow-[0_0_14px_rgba(220,38,38,0.85)]"
                  animate={{ y: ["0%", "6500%"] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
                />
              )}

              <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-white/30 sm:left-5 sm:top-5" />
              <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-white/30 sm:right-5 sm:top-5" />
              <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/30 sm:bottom-5 sm:left-5" />
              <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/30 sm:bottom-5 sm:right-5" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-red-400">
                  Bangalore, India
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Diamond Display Solutions Pvt. Ltd
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ========================================
            2. CONTENT — tighter paragraphs
        ======================================== */}
        <div className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Side label */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-3">
                  <span className="h-px w-7 bg-red-600" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                    The Story
                  </span>
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.35rem,2.2vw,1.85rem)] font-semibold leading-snug tracking-tight">
                  Who we are &{" "}
                  <span className="text-white/40">how we work.</span>
                </h2>
              </div>
            </div>

            {/* Dense story body */}
            <div className="lg:col-span-9">
              <div className="space-y-4 sm:space-y-5">
                {STORY.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.55,
                      delay: Math.min(i * 0.04, 0.2),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={
                      i === 0
                        ? "font-display text-[clamp(1.05rem,1.7vw,1.35rem)] font-medium leading-snug tracking-[-0.015em] text-white/85"
                        : "text-[13px] leading-6 text-white/55 sm:text-sm sm:leading-6.5"
                    }
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Closing line — compact */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-8 border-l-2 border-red-600 pl-4 sm:mt-10 sm:pl-5"
              >
                <p className="font-display text-base font-semibold tracking-tight text-white sm:text-lg">
                  We'll help you to build your{" "}
                  <span className="text-red-500">Brand.</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}