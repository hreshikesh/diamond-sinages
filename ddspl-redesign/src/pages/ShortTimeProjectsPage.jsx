// src/pages/ShortTimeProjectsPage/ShortTimeProjectsPage.jsx
import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { Zap, TrendingUp, ArrowUpRight } from "lucide-react";
import Container from "../components/common/Container";

/* ---------------------------------------
   MINIMAL PROJECT DATA
--------------------------------------- */
const PROJECTS = [
  {
    id: "megamart",
    brand: "Mega Mart",
    outlets: 108,
    days: 90,
    color: "from-red-600 to-red-800",
    image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340871/megamart_liztga.jpg",
  },
  {
    id: "renault",
    brand: "Renault",
    outlets: 92,
    days: 365,
    color: "from-red-500 to-red-700",
    image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340872/renault_da5nom.jpg",
  },
  {
    id: "honda",
    brand: "Honda 2 Wheeler",
    outlets: 35,
    days: 30,
    color: "from-red-700 to-red-900",
    image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340869/honda2wheeler_tvdzem.jpg",
  },
  {
    id: "fiat",
    brand: "Fiat",
    outlets: 22,
    days: 60,
    color: "from-red-600 to-red-800",
    image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340867/fiat_dpztvy.jpg",
  },
];

/* ---------------------------------------
   TOTALS
--------------------------------------- */
const TOTALS = {
  outlets: PROJECTS.reduce((sum, p) => sum + p.outlets, 0),
  days: PROJECTS.reduce((sum, p) => sum + p.days, 0),
  brands: PROJECTS.length,
};

/* ---------------------------------------
   ANIMATED COUNTER HOOK
--------------------------------------- */
function AnimatedCounter({ from = 0, to, duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (val) => Math.round(val).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
      return () => controls.stop();
    }
  }, [inView, to, count, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/* ---------------------------------------
   HIGH-VISIBILITY PROJECT CARD
--------------------------------------- */
function ProjectCard({ project, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-[0_12px_24px_rgba(220,38,38,0.25)]"
    >
      {/* Clear Image Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50 sm:aspect-[16/10]">
        <img
          src={project.image}
          alt={project.brand}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle bottom gradient to blend image into card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
        
        {/* Index Tag */}
        <div className="absolute top-2 left-2 rounded-md bg-black/60 px-2 py-0.5 backdrop-blur-md">
          <span className="font-mono text-[9px] font-bold text-red-400 sm:text-xs">
            0{index + 1}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-4">
        <h3 className="line-clamp-1 font-display text-xs font-bold text-white sm:text-base lg:text-lg">
          {project.brand}
        </h3>

        {/* Stats Grid */}
        <div className="mt-3 grid grid-cols-2 gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-center sm:p-2">
          <div>
            <p className="text-[7px] font-medium uppercase tracking-wider text-white/40 sm:text-[9px]">
              Outlets
            </p>
            <p className="font-display text-xs font-black text-red-500 sm:text-lg">
              <AnimatedCounter to={project.outlets} duration={1.5} />
            </p>
          </div>
          <div>
            <p className="text-[7px] font-medium uppercase tracking-wider text-white/40 sm:text-[9px]">
              Days
            </p>
            <p className="font-display text-xs font-black text-white sm:text-lg">
              <AnimatedCounter to={project.days} duration={1.5} />
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------
   MAIN PAGE
--------------------------------------- */
export default function ShortTimeProjectsPage() {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-[#050505] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(220,38,38,0.1),transparent_55%)]" />

      {/* HERO SECTION */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1">
                <Zap size={10} className="animate-pulse text-red-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-red-400 sm:text-[10px]">
                  Rapid Rollouts
                </span>
              </div>
            </div>

            <h1 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              High-Velocity Execution <br />
              <span className="italic text-red-500">In Record Time.</span>
            </h1>

            <p className="mt-3 max-w-xl text-xs text-white/60 sm:text-sm lg:text-base">
              Nationwide brand identity rollouts delivered under aggressive timelines without compromising build quality.
            </p>
          </motion.div>
        </Container>
      </section>

  
      {/* PROJECT CARDS GRID (3 Columns on Mobile, 4 Columns on Desktop) */}
      <section className="relative py-6 sm:py-10">
        <Container>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative border-t border-white/10 py-10 sm:py-14">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="font-display text-lg font-bold text-white sm:text-2xl">
              Delivered <span className="italic text-red-500">257+ outlets</span> under strict deadlines.
            </h3>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-red-500"
            >
              Discuss Your Project
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}