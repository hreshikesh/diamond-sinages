// src/components/sections/SignageUniverse/SignageUniverse.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React from "react";

import Container from "../../common/Container";
import logoUrl from "../../../assets/images/logo/logo.jpg";
import campusImg from "../../../assets/images/market/campus.webp";
import fashionImg from "../../../assets/images/market/fashion.webp";
import jewelleryImg from "../../../assets/images/market/jewellery.webp";
import pylonImg from "../../../assets/images/market/pylon.webp";
import supermarketImg from "../../../assets/images/market/supermarket.webp";

/* ---------------------------------------
   CONTENT: MARKETS & SECTORS
--------------------------------------- */
const pages = [
  { type: "cover" },
  {
    type: "intro",
    number: "00",
    title: "OUR MARKETS",
    subtitle: "Sectors We Transform",
    body: "Diamond Display Solutions (DDSPL) partners with leading brands across diverse industries. Explore our footprint across retail, commercial, and architectural landscapes.",
  },
  {
    type: "category",
    number: "01",
    title: "JEWELLERY SIGNS",
    label: "Sector Experience",
    image: jewelleryImg,
  },
  {
    type: "category",
    number: "02",
    title: "MALL SIGNS",
    label: "Sector Experience",
    image: campusImg,
  },
  {
    type: "category",
    number: "03",
    title: "FASHION OUTLET",
    label: "Sector Experience",
    image: fashionImg,
  },
  {
    type: "category",
    number: "04",
    title: "SUPERMARKET",
    label: "Sector Experience",
    image: supermarketImg,
  },
  {
    type: "category",
    number: "05",
    title: "PYLON SIGNS",
    label: "Sector Experience",
    image: pylonImg,
  },
  {
    type: "closing",
    title: "ELEVATE YOUR VISIBILITY.",
    body: "Ready to transform your brand's physical presence? Let's discuss your specific market requirements.",
  },
  { type: "back-cover" },
];

/* ---------------------------------------
   PAGE WRAPPER
--------------------------------------- */
const FlipPage = React.forwardRef(function FlipPage(
  { children, className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      className={`page relative h-full w-full overflow-hidden bg-[#0b0b0b] text-white ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {children}
    </div>
  );
});

/* ---------------------------------------
   COVER FRONT
--------------------------------------- */
function CoverFront() {
  return (
    <div className="relative flex h-full flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-[#1a0000] via-[#0a0000] to-black p-5 sm:p-7">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, #2a0808 0%, transparent 60%), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/90 to-transparent" />
      <div className="pointer-events-none absolute inset-3 border border-red-500/40 sm:inset-4" />
      <div className="pointer-events-none absolute inset-4 border border-red-500/20 sm:inset-5" />

      <div className="absolute left-4 top-4 h-3 w-3 border-l-2 border-t-2 border-red-500" />
      <div className="absolute right-4 top-4 h-3 w-3 border-r-2 border-t-2 border-red-500" />
      <div className="absolute bottom-4 left-4 h-3 w-3 border-b-2 border-l-2 border-red-500" />
      <div className="absolute bottom-4 right-4 h-3 w-3 border-b-2 border-r-2 border-red-500" />

      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[sweep_7s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="relative z-10 flex w-full items-center justify-between pt-2">
        <span className="font-mono text-[8px] tracking-[0.3em] text-red-500/80">VOL. 01</span>
        <span className="font-mono text-[8px] tracking-[0.3em] text-red-500/80">ESTD 1990</span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="rounded bg-white p-2 shadow-[0_4px_20px_rgba(220,38,38,0.4)]">
          <img src={logoUrl} alt="DDSPL" className="h-8 w-auto object-contain sm:h-10" />
        </div>
        <div className="flex items-center gap-2">
          <span className="h-px w-6 bg-red-500/60" />
          <span className="text-[7px] font-bold uppercase tracking-[0.35em] text-red-500 sm:text-[8px]">Diamond Display Solutions</span>
          <span className="h-px w-6 bg-red-500/60" />
        </div>
        <div className="mt-2">
          <h2
            className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.0] tracking-tight text-white"
            style={{ textShadow: "0 1px 0 rgba(0,0,0,0.6), 0 2px 4px rgba(220,38,38,0.3)" }}
          >
            MARKETS & <br /><span className="text-red-600">SECTORS.</span>
          </h2>
        </div>
        <p className="mt-2 max-w-[80%] text-[8px] font-medium uppercase tracking-[0.22em] text-white/40 sm:text-[9px]">
          Lookbook Edition
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center gap-2 pb-2">
        <div className="h-px w-16 bg-red-500/40" />
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/40">Drag corner to open</span>
      </div>
    </div>
  );
}

function IntroPage({ page }) {
  return (
    <div className="relative flex h-full flex-col justify-between bg-[#0a0a0a] p-5 sm:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.08),transparent_50%)]" />
      <div className="relative">
        <span className="font-mono text-[8px] tracking-[0.25em] text-red-500">{page.number} — OVERVIEW</span>
        <h3 className="mt-4 font-display text-[clamp(1.3rem,2.8vw,2.2rem)] font-bold leading-[0.95] tracking-tight text-white">{page.title}</h3>
        <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.22em] text-white/40 sm:text-[9px]">{page.subtitle}</p>
      </div>
      <p className="relative max-w-[95%] text-[11px] leading-relaxed text-white/60 sm:text-xs sm:leading-6">{page.body}</p>
      <div className="relative border-t border-white/10 pt-3 text-[8px] uppercase tracking-[0.25em] text-white/30">Turn page to explore →</div>
    </div>
  );
}

/* ---------------------------------------
   LOOKBOOK STYLE CATEGORY PAGE (Full Bleed Image)
--------------------------------------- */
function CategoryPage({ page }) {
  return (
    <div className="relative flex h-full w-full flex-col bg-[#050505]">
      {/* Full bleed image */}
      <img
        src={page.image}
        alt={page.title}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      
      {/* Heavy gradient at bottom to make text pop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

      {/* Page number badge */}
      <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 font-mono text-[7px] tracking-[0.2em] text-white/90 backdrop-blur-md sm:text-[8px]">
        {page.number} / 05
      </div>

      {/* Content overlaid at the bottom */}
      <div className="absolute bottom-0 left-0 w-full p-5 sm:p-7">
        <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-red-500 shadow-black drop-shadow-md sm:text-[9px]">
          {page.label}
        </span>
        <h3 className="mt-1 font-display text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-[1.0] tracking-tight text-white shadow-black drop-shadow-lg">
          {page.title}
        </h3>
      </div>
    </div>
  );
}

function ClosingPage({ page }) {
  return (
    <div className="relative flex h-full flex-col justify-between bg-[#080808] p-5 sm:p-8">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-600/15 blur-[80px]" />
      <div className="relative">
        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-red-500">End of Collection</span>
        <h3 className="mt-4 font-display text-[clamp(1.3rem,3vw,2.4rem)] font-bold leading-[0.95] tracking-tight text-white">
          {page.title.split("ELEVATE").map((part, i) =>
            i === 0 ? (<span key={i}>{part}</span>) : (<span key={i} className="text-red-600">ELEVATE{part}</span>)
          )}
        </h3>
        <p className="mt-3 max-w-[95%] text-[11px] leading-relaxed text-white/50 sm:text-xs">{page.body}</p>
      </div>
      <a href="/contact" className="group relative inline-flex w-fit items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
        Start a Project <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

function CoverBack() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a0000] via-[#0a0000] to-black p-6 text-center">
      <div className="absolute inset-0 opacity-30 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" />
      <div className="pointer-events-none absolute inset-3 border border-red-500/30 sm:inset-4" />
      <div className="relative rounded bg-white p-2">
        <img src={logoUrl} alt="DDSPL" className="h-8 w-auto object-contain sm:h-10" />
      </div>
      <p className="relative mt-3 text-[8px] font-bold uppercase tracking-[0.3em] text-white/40">Diamond Display Solutions</p>
      <div className="relative mt-6 flex items-center gap-2">
        <span className="h-px w-6 bg-red-500/60" />
        <p className="font-mono text-[8px] tracking-[0.25em] text-red-500">EST. 1998 · INDIA</p>
        <span className="h-px w-6 bg-red-500/60" />
      </div>
    </div>
  );
}

const renderPageContent = (page) => {
  switch (page.type) {
    case "cover": return <CoverFront />;
    case "intro": return <IntroPage page={page} />;
    case "category": return <CategoryPage page={page} />;
    case "closing": return <ClosingPage page={page} />;
    case "back-cover": return <CoverBack />;
    default: return null;
  }
};

/* ---------------------------------------
   BOOK SIZE LOGIC
--------------------------------------- */
function useBookSize() {
  const [size, setSize] = useState({ width: 340, height: 460 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 380) { setSize({ width: w - 40, height: (w - 40) * 1.3 }); }
      else if (w < 640) { setSize({ width: 280, height: 380 }); }
      else if (w < 900) { setSize({ width: 320, height: 430 }); }
      else if (w < 1280) { setSize({ width: 340, height: 460 }); }
      else { setSize({ width: Math.min(380, h * 0.55), height: Math.min(500, h * 0.72) }); }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

/* ---------------------------------------
   MAIN COMPONENT
--------------------------------------- */
export default function SignageUniverse() {
  const bookRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { width, height } = useBookSize();

  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(pages.length);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onFlip = useCallback((e) => setPageIndex(e.data), []);
  const onInit = useCallback((e) => {
    try { setTotalPages(e.object.getPageCount()); } catch { setTotalPages(pages.length); }
  }, []);

  const flipNext = () => bookRef.current?.pageFlip()?.flipNext();
  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const goTo = (index) => bookRef.current?.pageFlip()?.flip(index);

  const categoryPages = pages.map((p, i) => ({ ...p, index: i })).filter((p) => p.type === "category");
  const progressLabel = `${String(pageIndex + 1).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex >= totalPages - 1;

  return (
    <section
      className={`relative overflow-hidden bg-[#020202] text-white ${
        isFullscreen ? "fixed inset-0 z-[100] flex flex-col justify-center py-4" : "py-2 sm:py-6 lg:py-5"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1787612498827-0109e4693409?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-full w-full object-cover opacity-[0.12] saturate-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/80 to-[#020202]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(215,25,32,0.08),transparent_70%)]" />
      </div>

      <Container className={isFullscreen ? "flex flex-1 flex-col" : ""}>
        {!isFullscreen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex flex-col items-start gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-red-600" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 sm:text-[10px]">
                  Sectors
                </span>
              </div>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3.5vw,3rem)] font-bold tracking-tight">
                Markets We <span className="text-red-600">Serve.</span>
              </h2>
            </div>
            <span className="hidden font-mono text-[9px] tracking-[0.2em] text-red-500/70 sm:block">
              LOOKBOOK EDITION
            </span>
          </motion.div>
        )}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`relative flex flex-col items-center ${isFullscreen ? "flex-1 justify-center" : ""}`}
        >
          <div className="pointer-events-none absolute bottom-[70px] left-1/2 h-6 w-[60%] max-w-[300px] -translate-x-1/2 rounded-[100%] bg-black/80 blur-2xl" />

          <div className="relative z-10 flex items-center justify-center w-full max-w-5xl">
            <button
              onClick={flipPrev}
              disabled={isFirstPage}
              className={`group absolute -left-4 sm:-left-12 lg:-left-16 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-300 md:flex ${
                isFirstPage ? "pointer-events-none opacity-20" : "opacity-80 hover:scale-110 hover:border-red-500/50 hover:bg-red-600 hover:opacity-100"
              }`}
            >
              <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
            </button>

            <div style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.85))" }}>
              <HTMLFlipBook
                ref={bookRef}
                width={width}
                height={height}
                size="fixed"
                minWidth={240}
                maxWidth={480}
                minHeight={330}
                maxHeight={620}
                drawShadow
                flippingTime={950}
                usePortrait
                startPage={0}
                autoSize={false}
                maxShadowOpacity={0.6}
                showCover
                mobileScrollSupport
                clickEventForward
                useMouseEvents
                swipeDistance={30}
                showPageCorners
                disableFlipByClick={false}
                onFlip={onFlip}
                onInit={onInit}
                className="ddspl-flipbook"
                style={{ background: "transparent" }}
              >
                {pages.map((page, i) => (
                  <FlipPage key={`${page.type}-${page.number || i}`}>
                    {renderPageContent(page)}
                    <div className="pointer-events-none absolute inset-0 z-20 border border-white/5 shadow-[inset_0_0_8px_rgba(255,255,255,0.04)]" />
                  </FlipPage>
                ))}
              </HTMLFlipBook>
            </div>

            <button
              onClick={flipNext}
              disabled={isLastPage}
              className={`group absolute -right-4 sm:-right-12 lg:-right-16 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-300 md:flex ${
                isLastPage ? "pointer-events-none opacity-20" : "opacity-80 hover:scale-110 hover:border-red-500/50 hover:bg-red-600 hover:opacity-100"
              }`}
            >
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="relative z-20 mt-6 w-full max-w-2xl">
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-black/50 p-2 shadow-2xl backdrop-blur-xl sm:flex-row sm:justify-between sm:gap-2 sm:rounded-full sm:px-3">
              <div className="flex items-center gap-2">
                <button onClick={flipPrev} disabled={isFirstPage} className={`group flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition-colors ${isFirstPage ? "opacity-30" : "hover:bg-red-600"}`}>
                  <ArrowLeft size={14} />
                </button>
                <span className="min-w-[54px] text-center font-mono text-[9px] tracking-[0.2em] text-white/60">{progressLabel}</span>
                <button onClick={flipNext} disabled={isLastPage} className={`group flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition-colors ${isLastPage ? "opacity-30" : "hover:bg-red-600"}`}>
                  <ArrowRight size={14} />
                </button>
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:text-white">
                  {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                </button>
              </div>

              <div className="flex w-full items-center gap-1 overflow-x-auto scrollbar-hide sm:w-auto">
                {categoryPages.map((cat) => {
                  const selected = pageIndex === cat.index || pageIndex + 1 === cat.index;
                  return (
                    <button
                      key={cat.number}
                      onClick={() => goTo(cat.index)}
                      className={`shrink-0 rounded-full px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] transition-colors ${selected ? "bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]" : "text-white/40 hover:bg-white/10 hover:text-white"}`}
                    >
                      {cat.title.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-100%) skewX(-15deg); }
          25%, 100% { transform: translateX(200%) skewX(-15deg); }
        }
        .ddspl-flipbook { margin: 0 auto; }
        .ddspl-flipbook .page { background: #0b0b0b !important; }
        .ddspl-flipbook .stf__parent { perspective: 2500px !important; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}