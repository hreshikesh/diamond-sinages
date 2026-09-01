// src/components/common/Navbar/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus, X, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoUrl from "../../assets/images/logo/logo.jpg";

import { MAIN_LINKS,MORE_LINKS } from "../data/siteData";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [hovered, setHovered] = useState(null);
  const location = useLocation();

  const moreRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Live clock for Bangalore time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Click outside "More"
  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ========================================
          DESKTOP: FLOATING PILL NAVBAR
      ======================================== */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed left-1/2 top-4 z-[100] w-[calc(100%-2rem)] max-w-[1400px] -translate-x-1/2 transition-all duration-500 sm:top-6 ${
          scrolled ? "scale-[0.98]" : "scale-100"
        }`}
      >
        <div
          className={`relative flex items-center justify-between rounded-full border transition-all duration-500 ${
            scrolled
              ? "border-white/15 bg-black/70 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              : "border-white/10 bg-black/40"
          } px-2 py-2 backdrop-blur-2xl sm:px-3`}
        >
          {/* LOGO SECTION */}
          <Link
            to="/"
            className="group flex items-center gap-3 pl-2 pr-4 sm:pl-3"
          >
            {/* Logo mark with rotating ring */}
            <div className="relative flex h-9 w-9 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-red-500/40 border-dashed"
              />
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white p-0.5">
                <img
                  src={logoUrl}
                  alt="DDSPL"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="hidden flex-col leading-tight md:flex">
              <span className="font-display text-sm font-bold tracking-tight text-white">
                DDSPL
              </span>
              <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/40">
                Since 1998
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {MAIN_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHovered(link.path)}
                className="relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white lg:text-[13px]"
              >
                {/* Hover pill background */}
                {hovered === link.path && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Active dot */}
                {isActive(link.path) && (
                  <span className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-500" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}

            {/* MORE DROPDOWN */}
            <div ref={moreRef} className="relative">
              <button
                onMouseEnter={() => {
                  setMoreOpen(true);
                  setHovered("more");
                }}
                className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors lg:text-[13px] ${
                  moreOpen ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {hovered === "more" && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">More</span>
                <motion.span
                  animate={{ rotate: moreOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <Plus size={13} strokeWidth={2.5} />
                </motion.span>
              </button>

              {/* Dropdown Panel */}
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    onMouseLeave={() => setMoreOpen(false)}
                    className="absolute right-0 top-[calc(100%+16px)] w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                  >
                    <div className="mb-2 flex items-center justify-between px-2 py-1">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-500">
                        Explore More
                      </span>
                      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/30">
                        {MORE_LINKS.length} Areas
                      </span>
                    </div>

                    <div className="space-y-1">
                      {MORE_LINKS.map((item, i) => (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <Link
                            to={item.path}
                            className="group flex items-center gap-3 rounded-xl p-2.5 transition-all hover:bg-white/5"
                          >
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-900">
                              <img
                                src={item.image}
                                alt=""
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white transition-colors group-hover:text-red-400">
                                {item.label}
                              </p>
                           
                            </div>
                            <ArrowUpRight
                              size={14}
                              className="text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-400"
                            />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* RIGHT SIDE: Time + CTA */}
          <div className="flex items-center gap-2">
           

            {/* CTA Button */}
            <Link
              to="/contact"
              className="group hidden items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] md:flex"
            >
              <span>Start Project</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            {/* MOBILE MENU TOGGLE */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={open ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X size={16} /> : <Menu size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ========================================
          MOBILE: FULLSCREEN LUXURY MENU
      ======================================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{
              clipPath: "circle(0% at calc(100% - 40px) 40px)",
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
            }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] flex flex-col justify-between overflow-y-auto bg-gradient-to-br from-[#0a0000] via-black to-[#0a0000] text-white md:hidden"
          >
            {/* Background glows */}
            <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-red-600/15 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-800/10 blur-[150px]" />

            {/* Top Bar (matches navbar spacing) */}
            <div className="relative flex items-center justify-between px-5 pt-5 sm:px-6">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white p-0.5">
                  <img
                    src={logoUrl}
                    alt="DDSPL"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display text-sm font-bold">DDSPL</span>
                  <span className="mt-0.5 text-[7px] uppercase tracking-[0.25em] text-white/40">
                    Since 1998
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                </span>
                <span className="font-mono text-[10px] font-semibold text-white/70">
                  {time} IST
                </span>
              </div>
            </div>

            {/* Main Menu Links */}
            <nav className="relative flex flex-1 flex-col justify-center px-5 py-10 sm:px-6">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Navigation
                </span>
              </div>

              <div className="flex flex-col">
                {MAIN_LINKS.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.07,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between border-b border-white/10 py-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[10px] text-white/30">
                          0{i + 1}
                        </span>
                        <span className="font-display text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-red-500 sm:text-4xl">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        className="text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red-500"
                        size={22}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* More Section on Mobile */}
              <div className="mt-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-red-500" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                    Specialities
                  </span>
                </div>

                <div className="space-y-2">
                  {MORE_LINKS.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4 + i * 0.06,
                        duration: 0.5,
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-red-500/30 hover:bg-white/[0.05]"
                      >
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={item.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">
                            {item.label}
                          </p>
                          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
                            {item.desc}
                          </p>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-white/30 group-hover:text-red-400"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </nav>

            {/* Footer CTA + Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative border-t border-white/10 px-5 py-5 sm:px-6"
            >
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mb-4 flex w-full items-center justify-between rounded-full bg-red-600 px-5 py-3.5 text-white transition-colors hover:bg-red-500"
              >
                <span className="text-sm font-bold uppercase tracking-[0.15em]">
                  Start Your Project
                </span>
                <ArrowUpRight size={18} />
              </Link>

              <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.25em] text-white/40">
                <span>Diamond Display Solutions</span>
                <span>Est. 1998</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}