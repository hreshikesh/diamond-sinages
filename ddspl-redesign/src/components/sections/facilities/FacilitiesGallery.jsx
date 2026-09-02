// src/components/sections/Facilities/FacilitiesGallery.jsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Search, Pause, Play } from "lucide-react";
import Container from "../../common/Container";
import logoSrc from "../../../assets/images/logo/logo.jpg";

function CompanyLogo({ className = "h-6", image = logoSrc }) {
  if (image) {
    return <img src={image} alt="Company Logo" className={`object-contain ${className}`} />;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Diamond Logo Mark */}
      <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-700 shadow-md shadow-red-900/40">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 text-white">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      </div>
      <div className="flex flex-col text-left leading-none">
        <span className="font-display text-xs font-black tracking-wider text-white">DDSPL</span>
        <span className="text-[7px] font-bold tracking-[0.2em] text-red-500">FACILITIES</span>
      </div>
    </div>
  );
}

/* ---------------------------------------
   IMAGE DATA
--------------------------------------- */
const CAROUSEL_IMAGES = [
  { id: "c1", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330361/5c67177d-7b67-4b91-a34c-9be88722effa.png" },
  { id: "c2", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330379/63035a1e-113c-41be-955e-7c81245251c0.png" },
  { id: "c3", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330400/86b7a750-6554-4241-80f1-90478a3ad9e1.png" },
  { id: "c4", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330423/aee626e9-0a1f-4bd0-95c3-6357b6702089.png" },
  { id: "c5", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330441/28a0d849-c6a4-42da-9e4d-caf6d3de0f39.png" },
  { id: "c6", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330461/0cc850ab-61d8-4a27-916a-2a5da32d2a5f.png" },
  { id: "c7", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330479/d9dd3176-21a2-47ad-992d-af1c4013549b.png" },
  { id: "c8", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330503/9c14ba43-cf3c-40b5-aee3-77213407c809.png" },
  { id: "c9", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330530/317f801c-34f2-429c-92f9-7ae47648e5f8.png" },
  { id: "c10", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330530/317f801c-34f2-429c-92f9-7ae47648e5f8.png" },
];

const MARQUEE_IMAGES = [
  { id: "m1", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330669/88a67021-3d9a-484a-8e46-24f36e62db18.png" },
  { id: "m2", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330724/38.jpg" },
  { id: "m3", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330725/34.jpg" },
  { id: "m4", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330727/33.jpg" },
  { id: "m5", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330727/32.jpg" },
  { id: "m6", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330729/36.jpg" },
  { id: "m7", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330730/26.jpg" },
  { id: "m8", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330734/23.jpg" },
  { id: "m9", src: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330734/23.jpg" },
];

/* Helper for shortest distance path in circular array */
const getCircularDistance = (index, current, total) => {
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
};

/* ---------------------------------------
   PERSPECTIVE CAROUSEL (Infinite Loop)
--------------------------------------- */
function PerspectiveCarousel({ items, onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(items.length / 2));
  const [slideWidth, setSlideWidth] = useState(200);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const transition = { type: "spring", bounce: 0.12, duration: 0.75 };

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) setSlideWidth(140);
      else if (w < 768) setSlideWidth(170);
      else if (w < 1024) setSlideWidth(200);
      else setSlideWidth(230);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isPlaying || isHovered || reduceMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, items.length, reduceMotion]);

  const selectPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const selectNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  return (
    <div
      className="relative isolate h-full w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
    >
      <div className="absolute inset-0 overflow-hidden" style={{ perspective: "1200px" }}>
        <div className="relative h-full w-full">
          {items.map((item, index) => {
            const diff = getCircularDistance(index, currentIndex, items.length);
            const isActive = diff === 0;
            const isVisible = Math.abs(diff) <= 3;

            return (
              <motion.div
                key={item.id}
                className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: slideWidth,
                  perspective: "1200px",
                  zIndex: 20 - Math.abs(diff),
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                animate={{
                  x: diff * (slideWidth * 0.88),
                  opacity: isVisible ? (isActive ? 1 : 0.6) : 0,
                }}
                transition={transition}
              >
                <motion.div
                  className="flex w-full flex-col items-center gap-2 will-change-transform sm:gap-3"
                  animate={{
                    rotateY: diff * -35,
                    scale: isActive ? 1 : Math.max(0.65, 0.76 - Math.abs(diff) * 0.05),
                  }}
                  transition={transition}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.button
                    layoutId={`gallery-${item.id}`}
                    type="button"
                    onClick={() => (isActive ? onImageClick(item) : setCurrentIndex(index))}
                    className={`aspect-[3/4] w-full overflow-hidden rounded-xl border transition-colors duration-500 sm:rounded-2xl ${
                      isActive
                        ? "cursor-zoom-in border-red-500/40 shadow-[0_12px_40px_rgba(220,38,38,0.2)]"
                        : "cursor-pointer border-white/10 bg-[#0a0a0a]"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt="Facility"
                      draggable={false}
                      className={`h-full w-full select-none object-contain transition-all duration-700 ${
                        isActive ? "opacity-100 grayscale-0" : "opacity-40 grayscale"
                      }`}
                    />
                  </motion.button>

                  <motion.div
                    className="flex flex-col items-center justify-center text-center"
                    animate={{
                      filter: isActive ? "blur(0px)" : "blur(3px)",
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : -6,
                    }}
                    transition={transition}
                  >
                    <p className="font-mono text-[8px] font-bold tracking-widest text-red-500">
                      {String(index + 1).padStart(2, "0")} / {items.length}
                    </p>
                    <div className="mt-1 flex items-center justify-center">
                      <img
                        src={logoSrc}
                        alt="Company Logo"
                        className="h-5 sm:h-6 max-w-[120px] object-contain filter drop-shadow"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-2 z-30 mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/60 px-2 py-1.5 backdrop-blur-md sm:bottom-3 sm:gap-3 sm:px-3 sm:py-2">
        <button
          onClick={selectPrev}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-red-600 sm:h-8 sm:w-8"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={13} />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-red-600 sm:h-8 sm:w-8"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={11} /> : <Play size={11} />}
        </button>

        <div className="flex items-center gap-1 px-0.5 sm:gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-500 ${
                currentIndex === idx ? "w-4 bg-red-600" : "w-1 bg-white/20 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={selectNext}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-red-600 sm:h-8 sm:w-8"
          aria-label="Next Slide"
        >
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------
   MARQUEE (compact cards)
--------------------------------------- */
function MarqueeRow({ items, onImageClick }) {
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const loop = [...items, ...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex w-max items-center gap-2.5 sm:gap-3.5"
        animate={reduceMotion || isPaused ? undefined : { x: ["0%", "-33.333%"] }}
        transition={{ duration: 36, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <motion.button
            key={`${item.id}-${i}`}
            layoutId={i < items.length ? `gallery-${item.id}` : undefined}
            onClick={() => onImageClick(item)}
            className="group relative aspect-[4/5] w-[130px] shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-[#111] transition-all duration-500 hover:border-red-500/40 sm:w-[160px] sm:rounded-xl md:w-[190px] lg:w-[210px]"
          >
            <img
              src={item.src}
              alt="Facility"
              loading="lazy"
              className="h-full w-full object-contain opacity-70 grayscale-[40%] transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
            />

            <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full bg-red-600/90 text-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Search size={13} />
            </div>

            <div className="absolute bottom-0 left-0 w-full translate-y-2 p-2.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-3">
              <img
                src={logoSrc}
                alt="Company Logo"
                className="h-4 sm:h-5 max-w-[100px] object-contain filter drop-shadow-md"
              />
              <div className="mt-1 h-[2px] w-5 bg-red-600" />
            </div>
          </motion.button>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#050505] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#050505] to-transparent sm:w-20" />
    </div>
  );
}

/* ---------------------------------------
   MAIN COMPONENT
--------------------------------------- */
export default function FacilitiesGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!selectedImage) return;
    const handler = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-14 lg:py-16">
      {/* Header */}
      <Container>
        <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
          <CompanyLogo className="mb-2 h-8 sm:h-10" />
          <h2 className="mt-2 font-display text-[clamp(1.5rem,3.2vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
            Uncompromising <span className="text-red-600">Scale.</span>
          </h2>
          <p className="mt-2 max-w-sm text-[11px] leading-relaxed text-white/40 sm:text-xs">
            Click any image to expand · Hover to pause
          </p>
        </div>
      </Container>

      {/* 3D Carousel */}
      <div className="relative h-[340px] w-full sm:h-[400px] lg:h-[440px]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[100px]" />
        <PerspectiveCarousel items={CAROUSEL_IMAGES} onImageClick={setSelectedImage} />
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center justify-center sm:my-8">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-10 bg-white/10" />
          <span className="font-mono text-[8px] font-bold tracking-[0.28em] text-white/30">
            MORE FROM THE FLOOR
          </span>
          <span className="h-px w-10 bg-white/10" />
        </div>
      </div>

      {/* Marquee */}
      <MarqueeRow items={MARQUEE_IMAGES} onImageClick={setSelectedImage} />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-6"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:border-red-500 hover:bg-red-600 sm:right-5 sm:top-5"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Lightbox Logo */}
            <div className="absolute left-3 top-3 z-20 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-2">
              <CompanyLogo className="h-5 sm:h-6" />
            </div>

            <motion.div
              layoutId={`gallery-${selectedImage.id}`}
              className="relative max-h-full max-w-5xl overflow-hidden rounded-xl border border-white/10 shadow-2xl sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={selectedImage.src}
                alt="Facility Detail"
                className="h-auto max-h-[82vh] w-auto object-contain"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-red-500">
                  Diamond Display Solutions
                </p>
                <div className="mt-1 flex items-center">
                  <img
                    src={logoSrc}
                    alt="Company Logo"
                    className="h-6 sm:h-8 max-w-[150px] object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>

            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-medium uppercase tracking-widest text-white/35 sm:bottom-4">
              ESC or click outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}