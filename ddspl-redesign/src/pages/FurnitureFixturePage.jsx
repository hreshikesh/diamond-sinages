// src/pages/FurnitureFixturePage/FurnitureFixturePage.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Pause,
  Play,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import Container from "../components/common/Container";

/* ---------------------------------------
   YOUR CLOUDINARY IMAGES
--------------------------------------- */
const ITEMS = [
  {
    id: "a1",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341126/a1_q0y2jf.jpg",
    title: "Retail Display Unit 01",
  },
  {
    id: "a2",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341128/a2_c7omxj.jpg",
    title: "Retail Display Unit 02",
  },
  {
    id: "a3",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341129/a3_nyrmgm.jpg",
    title: "Retail Display Unit 03",
  },
  {
    id: "a4",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341131/a4_n4ulza.jpg",
    title: "Retail Display Unit 04",
  },
  {
    id: "a5",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341133/a5_bfihln.jpg",
    title: "Retail Display Unit 05",
  },
  {
    id: "a6",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341135/a6_sk0iij.jpg",
    title: "Retail Display Unit 06",
  },
  {
    id: "a7",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341137/a7_noqrs3.jpg",
    title: "Retail Display Unit 07",
  },
  {
    id: "a8",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341139/a8_qqvndb.jpg",
    title: "Retail Display Unit 08",
  },
  {
    id: "a9",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341140/a9_es5rfw.jpg",
    title: "Retail Display Unit 09",
  },
  {
    id: "a10",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341141/a10_minu34.jpg",
    title: "Retail Display Unit 10",
  },
  {
    id: "a11",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341142/a11_rls1uk.jpg",
    title: "Retail Display Unit 11",
  },
  {
    id: "a12",
    src: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788341144/a12_xehxke.jpg",
    title: "Retail Display Unit 12",
  },
];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const DEFAULT_TRANSITION = {
  type: "spring",
  bounce: 0.14,
  duration: 0.85,
};

/* ---------------------------------------
   DIAGONAL CAROUSEL
--------------------------------------- */
function DiagonalCarousel({
  items,
  onImageClick,
  loop = true,
  slideSize: slideSizeProp,
  rotationStep = 28,
  verticalStep = 90,
  inactiveScale = 0.62,
  transition = DEFAULT_TRANSITION,
}) {
  const maxIndex = Math.max(0, items.length - 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(slideSizeProp || 240);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [dragX, setDragX] = useState(0);
  const reduceMotion = useReducedMotion();

  // Responsive slide size
  useEffect(() => {
    if (slideSizeProp) {
      setSlideSize(slideSizeProp);
      return;
    }
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setSlideSize(160);
      else if (w < 768) setSlideSize(190);
      else if (w < 1024) setSlideSize(230);
      else if (w < 1280) setSlideSize(260);
      else setSlideSize(290);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [slideSizeProp]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying || isHovered || reduceMotion || !items.length) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) =>
        loop ? (prev + 1) % items.length : clamp(prev + 1, 0, maxIndex)
      );
    }, 3200);
    return () => clearInterval(id);
  }, [isPlaying, isHovered, reduceMotion, items.length, loop, maxIndex]);

  const selectSlide = useCallback(
    (next) => {
      if (!items.length) return;
      const resolved = loop
        ? (next + items.length) % items.length
        : clamp(next, 0, maxIndex);
      setCurrentIndex(resolved);
    },
    [items.length, loop, maxIndex]
  );

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      selectSlide(currentIndex - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      selectSlide(currentIndex + 1);
    }
  };

  const onDragEnd = (_, info) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -60) selectSlide(currentIndex + 1);
    else if (swipe > 60) selectSlide(currentIndex - 1);
    setDragX(0);
  };

  if (!items.length) return null;

  const isPrevDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === maxIndex;
  const vStep = Math.round(slideSize * 0.38);
  const rotStep = rotationStep;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Furniture fixtures gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative isolate h-full w-full overflow-hidden outline-none"
    >
      {/* Track */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[28%] flex w-fit cursor-grab active:cursor-grabbing sm:top-[30%]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDrag={(_, info) => setDragX(info.offset.x)}
          onDragEnd={onDragEnd}
          animate={{
            x: -(currentIndex * slideSize + slideSize / 2) + dragX * 0.15,
          }}
          transition={transition}
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index;

            // Shortest circular distance calculation for seamless loop
            let distance = index - currentIndex;
            if (loop && items.length > 0) {
              const half = Math.floor(items.length / 2);
              if (distance > half) distance -= items.length;
              if (distance < -half) distance += items.length;
            }

            const wrapOffset = (distance - (index - currentIndex)) * slideSize;

            return (
              <motion.div
                key={item.id}
                className="flex shrink-0 flex-col items-center gap-2 will-change-transform sm:gap-3"
                style={{ width: slideSize }}
                animate={{
                  x: wrapOffset,
                  rotate: distance * rotStep,
                  scale: isActive ? 1 : inactiveScale,
                  y: distance * vStep,
                  zIndex: 50 - Math.abs(distance),
                }}
                transition={transition}
              >
                {/* Title above active slide */}
                <motion.div
                  className="flex flex-col items-center"
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.85,
                    y: isActive ? 0 : 8,
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="font-mono text-[8px] font-bold tracking-[0.25em] text-red-500 sm:text-[9px]">
                    {String(index + 1).padStart(2, "0")} / {items.length}
                  </span>
                  <p className="mt-1 whitespace-nowrap font-display text-sm font-bold tracking-tight text-white sm:text-base lg:text-lg">
                    {item.title}
                  </p>
                </motion.div>

                <motion.button
                  type="button"
                  layoutId={`ff-${item.id}`}
                  aria-label={`Show ${item.title}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative aspect-square w-full overflow-hidden rounded-2xl border transition-colors duration-500 ${
                    isActive
                      ? "cursor-zoom-in border-red-500/45 shadow-[0_20px_50px_rgba(220,38,38,0.22)]"
                      : "cursor-pointer border-white/10 bg-[#0a0a0a] shadow-xl"
                  }`}
                  onClick={() =>
                    isActive ? onImageClick?.(item) : selectSlide(index)
                  }
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    draggable={false}
                    className={`h-full w-full select-none object-contain transition-all duration-700 ${
                      isActive
                        ? "opacity-100 grayscale-0"
                        : "opacity-45 grayscale"
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                  {isActive && (
                    <>
                      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-red-500/80" />
                      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-red-500/80" />
                      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-red-500/80" />
                      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-red-500/80" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-3 z-10 mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/65 px-2 py-1.5 shadow-2xl backdrop-blur-md sm:bottom-5 sm:gap-3 sm:px-3 sm:py-2">
        <button
          type="button"
          aria-label="Previous"
          disabled={isPrevDisabled}
          onClick={() => selectSlide(currentIndex - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
        >
          <ChevronLeft size={15} />
        </button>

        <button
          type="button"
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={() => setIsPlaying((p) => !p)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-red-600 sm:h-9 sm:w-9"
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
        </button>

        <div className="flex items-center gap-1 px-1 sm:gap-1.5">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Slide ${index + 1}`}
              onClick={() => selectSlide(index)}
              className={`h-1.5 rounded-full bg-current transition-all duration-300 ${
                currentIndex === index
                  ? "w-5 text-red-500 opacity-100 sm:w-6"
                  : "w-1.5 text-white opacity-30 hover:opacity-60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next"
          disabled={isNextDisabled}
          onClick={() => selectSlide(currentIndex + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------
   PAGE
--------------------------------------- */
export default function FurnitureFixturePage() {
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#050505] text-white"
    >
      {/* Atmosphere */}
      <motion.div
        style={reduceMotion ? undefined : { y: bgY }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#080000] to-[#050505]"
      />
      <div className="pointer-events-none absolute left-1/2 top-[40%] h-[50%] w-[70%] -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ---------- TITLE ---------- */}
      <section className="relative z-10 pt-28 sm:pt-36 lg:pt-40">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5">
                  <Layers size={11} className="text-red-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-400">
                    Portfolio · Vertical 03
                  </span>
                </span>
                <span className="h-px w-8 bg-red-600" />
              </div>

              {/* Single Line Long Heading */}
              <h1 className="whitespace-nowrap font-display text-[clamp(1.8rem,4.5vw,4.5rem)] font-bold leading-none tracking-tight">
                Furniture &amp; <span className="italic text-red-500">Fixtures.</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
                Custom retail furniture, POS units, and in-store fixture systems —
                fabricated and finished by DDSPL for brand environments that sell.
              </p>
            </div>

            <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-md">
              <div>
                <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {String(ITEMS.length).padStart(2, "0")}
                </p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Pieces
                </p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="font-display text-3xl font-bold text-red-500 sm:text-4xl">
                  FSU
                </p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Display · POSM
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ---------- DIAGONAL CAROUSEL ---------- */}
      <section className="relative z-10 mt-6 sm:mt-8">
        <div className="relative h-[520px] w-full sm:h-[600px] md:h-[680px] lg:h-[720px]">
          <DiagonalCarousel items={ITEMS} onImageClick={setSelected} loop />
        </div>

        <Container>
          <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-white/30 sm:mt-6">
            Drag · Arrow keys · Click center image to expand
          </p>
        </Container>
      </section>

      {/* ---------- BOTTOM CTA ---------- */}
      <section className="relative z-10 border-t border-white/10 py-14 sm:py-20">
        <Container>
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              Custom Fabrication
            </span>
            <h2 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-tight">
              Need a  fixture system?
            </h2>
            <p className="max-w-md text-sm text-white/45">
              From free-standing units to full retail fit-outs — engineered,
              finished, and installed by DDSPL.
            </p>
            <a
              href="/contact"
              className="group mt-2 inline-flex items-center gap-2.5 rounded-full bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-red-500 hover:shadow-[0_0_28px_rgba(220,38,38,0.45)]"
            >
              Start a Project
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:rotate-45"
              />
            </a>
          </div>
        </Container>
      </section>

      {/* ---------- LIGHTBOX ---------- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-6"
          >
            <div className="absolute left-3 top-3 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-2">
              <Layers size={12} className="text-red-500" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">
                DDSPL · Fixtures
              </span>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-all hover:border-red-500 hover:bg-red-600 sm:right-5 sm:top-5 sm:h-11 sm:w-11"
            >
              <X size={16} />
            </button>

            <motion.div
              layoutId={`ff-${selected.id}`}
              className="relative max-h-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={selected.src}
                alt={selected.title}
                className="h-auto max-h-[82vh] w-auto object-contain"
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4 }}
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-5 sm:p-7"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-red-500">
                  Furniture &amp; Fixtures
                </p>
                <p className="mt-1.5 font-display text-xl font-bold text-white sm:text-2xl">
                  {selected.title}
                </p>
              </motion.div>
            </motion.div>

            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-medium uppercase tracking-widest text-white/35 sm:bottom-4">
              ESC or click outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}