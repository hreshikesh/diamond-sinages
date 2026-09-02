// src/components/sections/Facilities/FacilitiesHero.jsx
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import Container from "../../common/Container";

/* ---------------------------------------
   ACCORDION DATA (5-6 panels ideal)
--------------------------------------- */
const ACCORDION_ITEMS = [
  { image: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330172/cc5bd8df-7016-4a6a-aafe-5bbf07b15406.png", label: "ThermoForming Machine" },
  { image: "https://res.cloudinary.com/pmmjjtib/image/upload/v1788330249/3fe8f47c-9cdd-4817-bf80-a235e2d065ac.png", label: "CNC Router" },
  
];

/* ---------------------------------------
   ACCORDION GALLERY COMPONENT
--------------------------------------- */
function AccordionGallery({
  items,
  defaultIndex = 2,
  expandRatio = 0.5,
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 6,
  stagger = 0.06,
  height = 500,
  gap = 8,
  radius = 20,
  accentColor = "#ef4444",
  overlayColor = "#050505",
}) {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const barRefs = useRef([]);
  const textRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(400);

  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const overlayBg = `linear-gradient(180deg, transparent 40%, ${overlayColor}dd 100%), ${overlayColor}55`;

  const applyLayout = useCallback(
    (animate) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;

        tl.to(
          panel,
          { flexGrow: isActive ? grow : 1, rotateY: rot, duration: dur, ease },
          0
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = isActive ? 0 : 1;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: isActive ? 0 : shift,
              "--ag-gray": gray,
              "--ag-dim": isActive ? 0 : 0.4,
              duration: dur,
              ease,
            },
            0
          );
        }

        if (bar && text) {
          if (isActive) {
            tl.to(
              [bar, text],
              {
                opacity: 1,
                x: 0,
                duration: dur,
                ease,
                stagger: prefersReduced ? 0 : stagger,
              },
              0
            );
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [active, count, expandRatio, duration, ease, tilt, parallax, stagger, prefersReduced]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(200, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.25);
      mediaSizeRef.current = size;
      el.style.setProperty("--ag-media-size", `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => () => tlRef.current?.kill(), []);

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-row max-w-full [perspective:1400px] max-[520px]:!flex-col max-[520px]:[perspective:none]"
      style={{ gap: `${gap}px`, height: `${height}px` }}
    >
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <div
            key={i}
            ref={(el) => (panelRefs.current[i] = el)}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
            className="group relative block min-w-0 min-h-0 flex-[1_1_0] cursor-pointer overflow-hidden bg-[#0a0a0a] outline-none [transform-style:preserve-3d] [transform-origin:center] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] focus-visible:shadow-[0_0_0_2px_#ef4444,0_10px_30px_-18px_rgba(0,0,0,0.8)] max-[520px]:min-h-[100px] max-[520px]:!transform-none"
            style={{
              borderRadius: `${radius}px`,
              willChange: "flex-grow, transform",
            }}
          >
            <span className="absolute inset-0 overflow-hidden [border-radius:inherit]">
              <span
                ref={(el) => (mediaRefs.current[i] = el)}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: "var(--ag-media-size, 400px)",
                  height: "100%",
                  filter: "grayscale(var(--ag-gray, 1))",
                  willChange: "transform, filter",
                }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  draggable="false"
                  className="block h-full w-full select-none object-contain"
                />
              </span>
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: overlayBg }}
              />

              {/* HUD Corner marks (only visible on expanded) */}
              {isActive && (
                <>
                  <span className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-red-500 opacity-80" />
                  <span className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-red-500 opacity-80" />
                </>
              )}

              {/* Index badge */}
              <span className="absolute right-4 top-4 z-10 font-mono text-[9px] font-bold tracking-widest text-white/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>

            {/* Label */}
            <span className="pointer-events-none absolute bottom-6 left-6 right-6 z-[2] flex items-end gap-3">
              <span
                ref={(el) => (barRefs.current[i] = el)}
                className="h-[32px] w-[3px] flex-none rounded-[3px] opacity-0"
                style={{
                  background: accentColor,
                  boxShadow: `0 0 16px ${accentColor}90`,
                }}
              />
              <span
                ref={(el) => (textRefs.current[i] = el)}
                className="overflow-hidden text-ellipsis whitespace-nowrap font-display text-[clamp(1rem,1.6vw,1.5rem)] font-bold tracking-tight opacity-0 text-white drop-shadow-lg"
              >
                {item.label}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------
   MAIN HERO
--------------------------------------- */
export default function FacilitiesHero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black text-white">
      <motion.div
        style={reduceMotion ? undefined : { y: bgY }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#050505] to-[#050505]"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at center, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container>
        <div className="grid min-h-[100svh] items-center gap-10 pt-24 pb-16 sm:pt-32 lg:grid-cols-12 lg:gap-12 lg:pb-24 lg:pt-28">
          
          {/* LEFT: Title */}
          <div className="relative z-10 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-red-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                05 — Infrastructure
              </span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-bold leading-[0.92] tracking-tight">
              OUR <br />
              <span className="text-red-600">FACILITIES.</span>
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50 sm:text-base">
              Equipped with industry-leading machinery and a 250+ strong workforce, our Bangalore facility is engineered for precision fabrication at scale.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
              <div>
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                  40,000<span className="text-red-600">+</span>
                </p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-white/40">
                  Sq. Ft Workspace
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                  24/7
                </p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-white/40">
                  Production Cycle
                </p>
              </div>
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-500/70">
              Hover panels →
            </p>
          </div>

          {/* RIGHT: Accordion (Width Expansion) */}
          <div className="relative w-full lg:col-span-8">
            <AccordionGallery
              items={ACCORDION_ITEMS}
              defaultIndex={2}
              expandRatio={0.5}
              height={520}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}